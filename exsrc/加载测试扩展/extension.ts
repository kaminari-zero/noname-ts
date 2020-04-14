/// <reference path="../../interface/Utils/DevUtil.ts" />

/**
 * 加载测试扩展
 */
module Km0TestEx {
    export let type = NG.ImportType.Extension;

    export function extensionFun(lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status): ExtensionInfoConfigData {
        //武将
        let heros: CharacterConfigData = {
            character: {
            },
            characterTitle: {
            },
            characterIntro: {
            },
            skill: {
            },
            translate: {

            }
        };

        //技能
        let skills: ExSkillConifgData = {
            skill: {
                
            },
            translate: {

            }
        };
        //卡牌
        let cards: CardHolderConfigData = {
            card: {

            },
            skill: {

            },
            list: [],
            translate: {

            }
        };

        //extension扩展数据
        let extensionData: ExtensionInfoConfigData = {
            name: "优化下载",
            key: "Km0TestEx",
            editable: true,
            //选项
            config: {

            },
            precontent: function (data: SMap<any>) {
                //若需要联机，请将下面package的扩展，移动到这里，在源码中加入
                //（因为正常导入时，需要!_status.connectMode结果为true时，才能导入该扩展）
            },
            content: function (config: SMap<any>, pack: PackageData) {
                //扩展还是直接原生写吧，要不好多方法属性，要加声明，否则报错
                //重新修复下载
                //记录当前的下载方法
                let download = game.download;

                //只修改下载
                // lib.updateURL = NG.DevUtil.updateUrl;
                // // @ts-ignore
                // lib.updateURLs = {
                //     coding: lib.updateURL,
			    //     github:'https://raw.githubusercontent.com/libccy/noname',
                // };

                if (lib.device) {
                    //指移动端，使用的是：lib.init.cordovaReady
                    if (lib.init.cordovaReady) {
                        //暂时不懂这个库怎么搞
                        game.download=function(url,folder,onsuccess,onerror,dev,onprogress){
							if(url.indexOf('http')!=0){
								url=get.url(dev)+url;
                            }
                            // @ts-ignore
							var fileTransfer = new FileTransfer();
							folder=lib.assetURL+folder;
							if(onprogress){
								fileTransfer.onprogress=function(progressEvent){
									onprogress(progressEvent.loaded,progressEvent.total);
								};
							}
							lib.config.brokenFile.add(folder);
							game.saveConfigValue('brokenFile');
							fileTransfer.download(encodeURI(url),encodeURI(folder),function(){
								lib.config.brokenFile.remove(folder);
								game.saveConfigValue('brokenFile');
								if(onsuccess){
									onsuccess();
								}
							},onerror);
						};
                    }
                } else if (typeof window.require == 'function') {
                    let count = 0;
                    game.download = function(url,folder,onsuccess,onerror,dev,onprogress){
                        if(url.indexOf('http')!=0){
							url=get.url(dev)+url;
                        }
                        var dir=folder.split('/');
                        NG.DevUtil.printLog("fs downloadFile Url: "+url,"folder: "+folder,"dir: "+dir);
						game.ensureDirectory(folder,function(){
							try{
                                // @ts-ignore
								var file = lib.node.fs.createWriteStream(__dirname+'/'+folder);
							}
							catch(e){
								if(onerror) onerror();
							}
							lib.config.brokenFile.add(folder);
                            game.saveConfigValue('brokenFile');
                            // @ts-ignore
                            if(!lib.node.http) lib.node.http=require('http');
                            // @ts-ignore
                            if(!lib.node.https) lib.node.https=require('https');
                            // @ts-ignore
							var opts = require('url').parse(encodeURI(url));
                            opts.headers={'User-Agent': 'AppleWebkit'};
                            var isGetError = false;
							var request = (url.indexOf('https')==0?lib.node.https:lib.node.http).get(opts, function(response) {
								var stream=response.pipe(file);
								stream.on('finish',function(){
									lib.config.brokenFile.remove(folder);
									game.saveConfigValue('brokenFile');
									if(onsuccess){
                                        onsuccess();
									}
								});
								stream.on('error',(e)=>{
                                    if(onerror) onerror();
                                    NG.DevUtil.printErrorLog("stream error: "+e);
                                });
								if(onprogress){
									var streamInterval=setInterval(function(){
										if(stream.closed){
											clearInterval(streamInterval);
										}
										else{
											onprogress(stream.bytesWritten);
										}
									},200);
								}
                            });
                            //顺序：finish > error > close
                            request.addListener('finish',function(){
                                NG.DevUtil.printLog("request finish: "+ url);
                            });
                            request.addListener('error',function(e){
                                NG.DevUtil.printLog("request error: "+e);
                                isGetError = true;
                                // NG.DevUtil.printDebug("request err:",e);
                                NG.DevUtil.printErrorLog("request err: "+e);
                            });
                            request.addListener('close',function(){
                                if(isGetError) {
                                    if(count >= 5) { //超过5次强制当做完成
                                        NG.DevUtil.printLog(`request onerror :${url} =======>重试超过5次都失败，跳过！`);
                                        if(onerror) onerror();
                                    } else {
                                        NG.DevUtil.printLog(`准备重新尝试更新一次该文件: ${url} => 第${++count}次尝试`);
                                        game.download(url,folder,onsuccess,onerror,dev,onprogress);
                                    }
                                } else {
                                    NG.DevUtil.printLog(`request close :${url} =======>完成下载该文件！`);
                                }
                            });
						},true);
                    }
                }
                
            },
            //删除扩展时
            onremove: function () {

            },
            package: {
                author: "神雷zero",
                intro: "优化下载测试，修改game.download的bug（主要提供nodejs环境PC端使用）",
                version: "1.0.0",

                character: heros,
                skill: skills,
                card: cards,
            },
            translate: {
                
            },
            help: {
               
            }
        };

        return extensionData;
    }

}

//执行导入扩展
game.import(Km0TestEx.type, Km0TestEx.extensionFun);