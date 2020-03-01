'use strict';
(function(){
    var isUseVersion = false;
    var DEBUG = true;
    var ALERT_DEBUG = false;
    if(localStorage.getItem('noname_inited')) return;
    var app = {
        initialize: function() {
            this.bindEvents();
        },
        bindEvents: function() {
            if(window.require&&window.__dirname){
                this.onDeviceReady();
            }
            else{
                var script=document.createElement('script');
                script.src='cordova.js';
                document.head.appendChild(script);
                document.addEventListener('deviceready', this.onDeviceReady, false);
            }
        },
        onDeviceReady: function() {
            //*********************************自定义方法区*************************************
            /** 自定义方法：获取分支版本文件夹：master,v1.xxx之类 */
			function getVersionUrl(isV,versionStr){
				if(isV) {
					if(versionStr) return "v"+versionStr+"/";
					return "v"+version+"/";
				}
					
				return "master/";
            }
            
            /** 自定义方法：alert打印debug */
            function printDebug(){
                if(ALERT_DEBUG && DEBUG) return;
                let rest = Array.prototype.splice.call(arguments, 0);
                //之后可再此对应将类型结构化打印
                let body2 = "";
                if (rest && rest.length > 0) {
                    body2 = rest.join("\n");
                }
                alert(body2);
            }
            /** 输出打印日志的到控制台与日志文件 */
            function createConsoleDebugLog() {
                /** 添加format方法 */
                Date.prototype.format = function (format) {
    
                    if (!format) {
                        format = 'yyyy-MM-dd HH:mm:ss';
                    }
    
                    // 用0补齐指定位数
                    let padNum = function (value, digits) {
                        return Array(digits - value.toString().length + 1).join('0') + value;
                    };
    
                    // 指定格式字符
                    let cfg = {
                        yyyy: this.getFullYear(),             // 年
                        MM: padNum(this.getMonth() + 1, 2),        // 月
                        dd: padNum(this.getDate(), 2),           // 日
                        HH: padNum(this.getHours(), 2),          // 时
                        mm: padNum(this.getMinutes(), 2),         // 分
                        ss: padNum(this.getSeconds(), 2),         // 秒
                        fff: padNum(this.getMilliseconds(), 3),      // 毫秒
                    };
    
                    return format.replace(/([a-z]|[A-Z])(\1)*/ig, function (m) {
                        return cfg[m];
                    });
                }
                if(typeof __dirname==='string'&&__dirname.length && require) { //fs环境下
                    
                    let fs = require('fs');
                    let options = {
                        flags: 'a',     // append模式
                        encoding: 'utf8',  // utf8编码
                    };
                    let outUrl = './log.txt';
                    let outErrorUrl = "./errorLog.txt";
                    if( fs.existsSync(outUrl) ) {
                        fs.unlink(outUrl,function(){});
                    }
                    if( fs.existsSync(outErrorUrl) ) {
                        fs.unlink(outErrorUrl,function(){});
                    }
                    // let stdout = fs.createWriteStream('./stdout.log', options);
                    // let stderr = fs.createWriteStream('./stderr.log', options);
                             
                    // printDebug("createConsoleDebugLog"+console.Console);
                    // 创建logger(运行环境中没有console.Console)
                    // let logger = new console.Console(stdout, stderr);
                    let outQueue = [];
                    let outErrorQueue = [];
                    function loggerLog() {
                        if(!DEBUG) return;
                        let time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
                        let start = `[${time}] - log message:`;
                        let rest = Array.prototype.splice.call(arguments, 0);
                        // logger.log(`[${time}] - log message:`,rest);
                        var data = start+rest.join("\n")+"\n";
                        outQueue.push(data);
                        fs.appendFile(outUrl,outQueue.shift(),function(){});
                    }
                    function errorLog() {
                        if(!DEBUG) return;
                        let time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
                        let start = `[${time}] - err message:`;
                        let rest = Array.prototype.splice.call(arguments, 0);
                        // logger.error(`[${time}] - err message:`,rest);
                        var data = start+rest.join("\n")+"\n";
                        outErrorQueue.push(data);
                        fs.appendFile(outErrorUrl,outErrorQueue.shift(),function(){});
                    }

                    return [
                        loggerLog,
                        errorLog
                    ]
                }

                return [console.log,console.error];
            }

            var printLogFun = createConsoleDebugLog();
            /** 输出日志 */
            var printLog = printLogFun[0];
            /** 输出错误日志 */
            var printErrorLog = printLogFun[1];


			var site_g='http://ctos1197457256.asuscomm.com:30000/eve/noname-ts/raw/';
			//var site_g='https://gitee.com/null_778/noname_source/raw/';
            //var site_g='https://raw.githubusercontent.com/libccy/noname/';
            var site_c='https://nakamurayuri.coding.net/p/noname/d/noname/git/raw/';
			//var site_c='https://gitee.com/null_778/noname_source/raw/';
            var site=site_g;
            var button,changesite,help,version,versionnode;
            var req=function(url,onload,onerror,target){
				var sScriptURL=url;
				var oReq=new XMLHttpRequest();
				if(onload) oReq.addEventListener("load",function(){
                    // printDebug("responseText:"+this.responseText);
                    printLog("responseText: "+this.responseText);
                    try{
                        eval(this.responseText);
                        if(target&&!window[target]){
                            throw('err');
                        }
                    }
                    catch(e){
                        onerror(e);
                        return;
                    }
                    onload();
                    if(target){
                        delete window[target];
                    }
                });
				if(onerror) oReq.addEventListener("error",onerror);
				oReq.open("GET", sScriptURL);
				oReq.send();
			}

            var checkConnection=function(){
                button.innerHTML='正在连接';
                button.classList.add('disabled');
                versionnode.innerHTML='';
                req(site+'master/game/update.js',function(){
                    button.classList.remove('disabled');
                    button.innerHTML='下载无名杀';
                    version=window.noname_update.version;
                    versionnode.innerHTML='v'+version;
                },function(){
                    button.classList.add('disabled');
                    button.innerHTML='连接失败';
                },'noname_update');
            };

            var dir;
            var ua=navigator.userAgent.toLowerCase();
            if(ua.indexOf('android')!=-1){
                dir=cordova.file.externalApplicationStorageDirectory;
            }
            else if(ua.indexOf('iphone')!=-1||ua.indexOf('ipad')!=-1){
                dir=cordova.file.documentsDirectory;
            }

            var update=function(){
                button.innerHTML='正在连接';
                button.classList.add('disabled');
                versionnode.innerHTML='';
				//site+'v'+version+'/game/source.js'
                req(site+getVersionUrl(isUseVersion)+'game/source.js',function(){
                    button.remove();
                    changesite.remove();
                    help.remove();
                    versionnode.remove();

                    var prompt=document.createElement('div');
                    prompt.style.height='40px';
                    prompt.style.top='calc(50% - 40px)';
                    prompt.style.lineHeight='40px';
                    prompt.innerHTML='正在下载游戏文件';
                    document.body.appendChild(prompt);
					
                    var progress=document.createElement('div');
                    progress.style.top='calc(50% + 20px)';
                    progress.style.fontSize='20px';
                    progress.innerHTML='0/0';
                    document.body.appendChild(progress);

                    var updates=window.noname_source_list;
                    delete window.noname_source_list;

    				var n1=0;
    				var n2=updates.length;
                    progress.innerHTML=n1+'/'+n2;
                    /** 下载完成回调 */
    				var finish=function(){
                        prompt.innerHTML='游戏文件下载完毕';
    					progress.innerHTML=n1+'/'+n2;
                        if(window.FileTransfer){
                            localStorage.setItem('noname_inited',dir);
                        }
                        else{
                            localStorage.setItem('noname_inited','nodejs');
                        }
    					setTimeout(function(){
                            window.location.reload();
                        },1000);
    				}
                    var downloadFile;
                    if(window.FileTransfer){
                        downloadFile=function(url,folder,onsuccess,onerror){
        					var fileTransfer = new FileTransfer();
        					//url=site+'v'+version+'/'+url;
							url=site+getVersionUrl(isUseVersion)+url;
        					folder=dir+folder;
							// printDebug("window.FileTransfer  downloadFile Url:"+url,folder);
                            console.log(url);
        					fileTransfer.download(encodeURI(url),folder,onsuccess,onerror);
        				};
                    }
                    else{
                        var fs=require('fs');
                        // 原版
                        // var http=require('https');
                        /** todo：通过检测，协议头，采用不同得方式【http/https】的get */
                        var adapterFor = (function () {
                            var url = require('url'),
                            adapters = {
                                'http:': require('http'),
                                'https:': require('https'),
                            };
                            return function (inputUrl) {
                                return adapters[url.parse(inputUrl).protocol]
                            }
                        }());

                        /** 下载文件 */
                        downloadFile=function(url,folder,onsuccess,onerror){
                            //url=site+'v'+version+'/'+url;
							url=site+getVersionUrl(isUseVersion)+url;
                            var dir=folder.split('/');
                            // printDebug("fs downloadFile Url:"+url+";\nfolder:"+folder+";\ndir:"+dir); //todo:手动查看下载了什么文件
                            printLog("fs downloadFile Url: "+url,"folder: "+folder,"dir: "+dir);
                            var str='';
                            let count = 0;
                            /** 下载部分 */
                            var download=function(){
                                try{
                                    printLog("start createWriteStream: "+__dirname+'/'+folder);
                                    var file = fs.createWriteStream(__dirname+'/'+folder);
                                    printLog("end createWriteStream: "+__dirname+'/'+folder);
                                }
                                catch(e){
                                    onerror(e);
                                    printDebug("download err:"+e);
                                    printErrorLog("download err: "+e);
                                }
                                var opts = require('url').parse(encodeURI(url));
                                opts.headers={'User-Agent': 'AppleWebkit'};
                                //修改成这个试试，原：http.get
                                try{
                                    printLog("start get :"+ url);
                                    var isGetError = false;
                                    var request = adapterFor(url).get(opts, function(response) {
                                        printLog("start stream :"+ opts.href);
                                        var stream=response.pipe(file);
                                        stream.on('finish',onsuccess);
                                        stream.on('error',onerror);
                                        printLog("end stream :"+ opts.href);
                                    });
                                    //顺序：finish > error > close
                                    request.addListener('finish',function(){
                                        printLog("request finish: "+ url);
                                    });
                                    request.addListener('error',function(e){
                                        printLog("request error: "+e);
                                        isGetError = true;
                                        // printDebug("request err:",e);
                                        // printErrorLog("request err: "+e);
                                    });
                                    request.addListener('close',function(){
                                        if(isGetError) {
                                            printLog(`准备重新尝试更新一次该文件: ${url} => 第${++count}次尝试`);
                                            download();
                                        } else {
                                            printLog(`request close :${url} =======>完成下载该文件！`);
                                        }
                                    });
                                    // request.addListener('connect',function(){
                                    //     printLog("request connect: "+ url);
                                    // });
                                    // request.addListener('timeout',function(){
                                    //     printLog("request timeout: "+ url);
                                    // });
                                    printLog("end get :"+ url);
                                } catch(e){
                                    onerror(e);
                                    printDebug("get err:"+e);
                                    printErrorLog("get err: "+e);
                                }
                            }
                            /** 文件夹创建部分 */
                            var access=function(){
                                if(dir.length<=1){
                                    download();
                                }
                                else{
                                    str+='/'+dir.shift();
                                    try{
                                        fs.access(__dirname+str,function(e){
                                            printLog("start fs.access: "+__dirname+str);
                                            if(e){
                                                try{
                                                    printLog("start create dir: "+__dirname+str);
                                                    fs.mkdir(__dirname+str,access);
                                                    printLog("end create dir: "+__dirname+str);
                                                }
                                                catch(e){
                                                    onerror(e);
                                                    printDebug("fs.mkdir err:"+e);
                                                    printErrorLog("fs.mkdir err: "+e);
                                                }
                                            }
                                            else{
                                                access();
                                            }
                                            printLog("end fs.access: "+__dirname+str);
                                        });
                                    } catch(e){
                                        onerror(e);
                                        printDebug("fs.access err:"+e);
                                        printErrorLog("s.access err: "+e);
                                    }
                                }
                            }
                            access();
                        };
                    }
                    var multiDownload=function(list,onsuccess,onerror,onfinish){
                        list=list.slice(0);
                        var download=function(){
                            if(list.length){
                                var current=list.shift();
                                downloadFile(current,current,function(){
                                    if(onsuccess) onsuccess(current);
                                    download();
                                },function(){
                                    if(onerror) onerror(e);
                                    printDebug("downloadFile onerror:",e);
                                    printErrorLog("downloadFile onerror: "+e);
                                    download();
                                });
                            }
                            else{
                                if(onfinish) onfinish();
                            }
                        }
                        download();
                    };
                    multiDownload(updates,function(e){
                        n1++;
                        progress.innerHTML=n1+'/'+n2;
                        printLog("fs downloadFile onsuccess Url: "+e,"进度: "+n1+'/'+n2);
                    },function(e){
                        printDebug("multiDownload  onerror:"+e);
                        printErrorLog("multiDownload  onerror:"+e);
					},function(e){
                        setTimeout(finish,500);
                    });
                },function(){
                    button.classList.add('disabled');
                    button.innerHTML='连接失败';
                },'noname_source_list');
            }
			
            var link=document.createElement('link');
            link.rel='stylesheet';
            link.href='app/index.css';
            document.head.appendChild(link);

            button=document.createElement('div');
            button.id='button';

            var touchstart=function(e){
                if(this.classList.contains('disabled')) return;
                this.style.transform='scale(0.98)';
            };
            var touchend=function(){
                this.style.transform='';
            };
            button.ontouchstart=touchstart;
            button.ontouchend=touchend;
            button.onmousedown=touchstart;
            button.onmouseup=touchend;
            button.onmouseleave=touchend;
            button.onclick=function(){
                if(button.classList.contains('disabled')) return;
                update();
            };
            document.body.appendChild(button);
            document.ontouchmove=function(e){
                e.preventDefault();
            };

            changesite=document.createElement('div');
            changesite.id='changesite';
            changesite.innerHTML='下载源: GitHub';
            document.body.appendChild(changesite);

            versionnode=document.createElement('div');
            versionnode.id='version';
            help=document.createElement('div');
            help.id='help';
            help.innerHTML='无法在线下载？';
            var helpnode=document.createElement('div');
            helpnode.id='noname_init_help';
            var helpnodetext=document.createElement('div');
            helpnodetext.innerHTML=
            '<div><ol><li>访问<a href="https://github.com/libccy/noname/releases/latest">https://github.com/libccy/noname/releases/latest</a>，下载zip文件'+
            '<li>解压后将noname-master目录内的所有文件放入对应文件夹：<br>windows/linux：resources/app<br>mac：（右键显示包内容）contents/resources/app<br>android：android/data/com.widget.noname<br>ios：documents（itunes—应用—文件共享）'+
            '<li>完成上述步骤后，<a href="javascript:localStorage.setItem(\'noname_inited\',window.tempSetNoname);window.location.reload()">点击此处</a></div>';
            helpnode.appendChild(helpnodetext);
            help.onclick=function(){
                document.body.appendChild(helpnode);
            }

            var back=document.createElement('div');
            back.id='back';
            back.innerHTML='返回';
            back.onclick=function(){
                helpnode.remove();
            };
            helpnode.appendChild(back);
            document.body.appendChild(help);
            document.body.appendChild(versionnode);
            checkConnection();

            if(window.FileTransfer){
                window.tempSetNoname=dir;
            }
            else{
                window.tempSetNoname='nodejs';
            }
            changesite.onclick=function(){
                if(this.classList.toggle('bluetext')){
                    site=site_c;
                    this.innerHTML='下载源: Coding'
                }
                else{
                    site=site_g;
                    this.innerHTML='下载源: GitHub'
                }
                checkConnection();
            };
        }
    };

    app.initialize();
}())
