String.prototype.replaceAll = function(from,to){
	var str = this;
	while(str.indexOf(from) >= 0){
		str = str.replace(from,to);
	}
	return str;
};
game.import(
	"extension",
	function(lib,game,ui,get,ai,_status){
		return {
			name:"代码搜索器",
			content:function (config,pack){
				game.cxyFindCode = {
					compare: function(str1,str2,arr){
						/* 
							var similar = 0 , lastPos = 0;
							for(var i=0;i<str1.length;i++) {
								for(var j=lastPos;j<str2.length;j++) {
									if(str1[i] == str2[j]) {
										similar ++;
										lastPos = j;
										break;
									}
								}
								if(similar==0)return 0;
							}
							return get.round(similar/str1.length,4); 
						*/
						var distence = Infinity , lenGap = str1.length - str2.length;
						var perDis = [1,1];
						if(arr){
							arr = arr.split("&");
							for(var i=0;i<arr.length;i++){
								str1 = str1.replaceAll(arr[i],String.fromCharCode("A".charCodeAt(0)+i));
								str2 = str2.replaceAll(arr[i],String.fromCharCode("A".charCodeAt(0)+i));
							}
							perDis = [0.5,1.5];
						}
						for(var i=0;i<str2.length;i++){
							var tmpDis = Math.max(0,lenGap);
							for(var k=0;k<Math.min(str1.length,str2.length);k++){
								if(str1[k] != str2[k+i])tmpDis+=(/[A-Z]/.test(str1[k])?perDis[1]:perDis[0]);
							}
							if(tmpDis < distence)distence = tmpDis;
							lenGap++;
						}
						return get.round((str1.length - distence)/str1.length,4);
					},
					find: function(str,num){
						var tmp = {};
						num = ({
							a:1,b:0.9,c:0.8,d:0.7,e:0.6,f:0.5
						})[lib.config.extension_代码搜索器_cxySimilar||'e'];
						var strs = str.split(" ");
						for(var i=0;i<strs.length;i++){
							strs[i] = strs[i].split("|");
						}
						for(var i in lib.skill) {
							var info = lib.translate[i+"_info"];
							if(!info)continue;
							if(typeof info != "string")continue;
							var similar = 0;
							for(var k=0;k<strs.length;k++){
								similar+=game.cxyFindCode.compare(strs[k][0],info,strs[k][1]||"");
							}
							similar = similar/strs.length;
							if(similar>(num||0.6)) {
								tmp[i] = get.round(similar,4);
							}
						}
						return tmp;
					},
				};
			},
			precontent:function(){
                var link = document.createElement("link");
				link.href = lib.assetURL + "extension/代码搜索器/"+(lib.config.extension_代码搜索器_cxyTheme||"extension")+".css";
				link.type = "text/css";
				link.rel = "stylesheet";
				document.getElementsByTagName("head")[0].appendChild(link);
				game.cxySetCodeColor = function(fileName){
					link.setAttribute("href",lib.assetURL + "extension/代码搜索器/"+fileName+".css");
				};
			},
			config: {
				cxyScroll: {
					name:"下滑助手",
					init: false,
					intro:"若存在无法下滑问题，可开启下滑助手",
				},
				cxyTheme: {
					name:"主题颜色",
					init:'extension',
					item: {
						extension:'默认',
						skin0:'黑夜',
					},
					onclick:function(item){
						game.saveConfig("extension_代码搜索器_cxyTheme",item);
						game.cxySetCodeColor(lib.config.extension_代码搜索器_cxyTheme);
					}
				},
				cxySimilar: {
					name:"设置相似度",
					intro:"设置显示搜索结果的最低相似度",
					item:{
						a:"1",
						b:"0.9",
						c:"0.8",
						d:"0.7",
						e:"0.6",
						f:"0.5",
					},
					init: 'f',
					onclick:function(item){
						game.saveConfig("extension_代码搜索器_cxySimilar",item);
					}
				},
				cxyFind: {
					name:"打开搜索器",
					clear: true,
					onclick: function(){
						try{
							function cxyShowText(title,info){
								var view = ui.create.div(".cxyFindCode_showText");
								var viewBody = ui.create.div(".cxyFindCode_showText_viewBody");
								
								var viewComps = {
									title: ui.create.div(".cxyFindCode_showText_viewBody_title"),
									text: ui.create.div(".cxyFindCode_showText_viewBody_text",info||""),
								};
								var viewTitleComps = {
									back: ui.create.div(".cxyFindCode_showText_viewBody_title_back","已阅"),
									text: ui.create.div(".cxyFindCode_showText_viewBody_title_text",title||""),
								};
								
								viewComps.text.setAttribute("contenteditable",true);
								viewTitleComps.back.addEventListener("click",function(){
									document.getElementById("cxyFindCode").removeChild(view);
								});
								
								for(var i in viewTitleComps){
									viewComps.title.appendChild(viewTitleComps[i]);
								}
								for(var i in viewComps){
									viewBody.appendChild(viewComps[i]);
								}
								view.appendChild(viewBody);
								if(lib.config.extension_代码搜索器_cxyScroll){
									var viewScroll = ui.create.div(".cxyFindCode_showText_viewScroll");
									var viewScrollComps = {
										toUp: ui.create.div(".cxyFindCode_showText_viewScroll_toUp","上滑"),
										toDown: ui.create.div(".cxyFindCode_showText_viewScroll_toDown","下滑"),
									};
									viewScrollComps.toUp.clicking = false;
									viewScrollComps.toUp.addEventListener("mousedown",function(){
										this.clicking = true;
										var that = this;
										var timer = function(time){
											if(!that.clicking)return ;
											if(time > 2) {
												viewComps.text.scrollTop = Math.max(0,viewComps.text.scrollTop-50);
											}
											setTimeout(function(){
												timer(time+1);
											},250);
										};
										timer(0);
									});
									viewScrollComps.toUp.addEventListener("mouseup",function(){
										this.clicking = false;
										viewComps.text.scrollTop = Math.max(0,viewComps.text.scrollTop-50);
									});
									viewScrollComps.toUp.addEventListener("touchstart",function(){
										this.clicking = true;
										var that = this;
										var timer = function(time){
											if(!that.clicking)return ;
											if(time > 2) {
												viewComps.text.scrollTop = Math.max(0,viewComps.text.scrollTop-50);
											}
											setTimeout(function(){
												timer(time+1);
											},250);
										};
										timer(0);
									});
									viewScrollComps.toUp.addEventListener("touchend",function(){
										this.clicking = false;
										viewComps.text.scrollTop = Math.max(0,viewComps.text.scrollTop-50);
									});
									viewScrollComps.toDown.clicking = false;
									viewScrollComps.toDown.addEventListener("mousedown",function(){
										this.clicking = true;
										var that = this;
										var timer = function(time){
											if(!that.clicking)return ;
											if(time > 2) {
												viewComps.text.scrollTop = Math.max(0,viewComps.text.scrollTop+50);
											}
											setTimeout(function(){
												timer(time+1);
											},250);
										};
										timer(0);
									});
									viewScrollComps.toDown.addEventListener("mouseup",function(){
										this.clicking = false;
										viewComps.text.scrollTop = Math.max(0,viewComps.text.scrollTop+50);
									});
									viewScrollComps.toDown.addEventListener("touchstart",function(){
										this.clicking = true;
										var that = this;
										var timer = function(time){
											if(!that.clicking)return ;
											if(time > 2) {
												viewComps.text.scrollTop = Math.max(0,viewComps.text.scrollTop+50);
											}
											setTimeout(function(){
												timer(time+1);
											},250);
										};
										timer(0);
									});
									viewScrollComps.toDown.addEventListener("touchend",function(){
										this.clicking = false;
										viewComps.text.scrollTop = Math.max(0,viewComps.text.scrollTop+50);
									});
									for(var i in viewScrollComps){
										viewScroll.appendChild(viewScrollComps[i]);
									}
									view.appendChild(viewScroll);
								}
								document.getElementById("cxyFindCode").appendChild(view);
							};
							
							var body = ui.create.div("#cxyFindCode");
							var bodyComps = {
								title: ui.create.div("#cxyFindCode_title"),
								input: ui.create.div("#cxyFindCode_input"),
								result: ui.create.div("#cxyFindCode_result"),
							};
							if(lib.config.extension_代码搜索器_cxyScroll) {
								bodyComps.result.id = "cxyFindCode_result2";
								bodyComps.scroll = ui.create.div("#cxyFindCode_scroll");
								var scrollComps = {
									toUp: ui.create.div("#cxyFindCode_scroll_toUp","上<br>滑"),
									toDown: ui.create.div("#cxyFindCode_scroll_toDown","下<br>滑"),
								};
								scrollComps.toUp.style["line-height"] = ((document.body.offsetHeight-95)*0.5 - 4)/2+"px";
								scrollComps.toDown.style["line-height"] = ((document.body.offsetHeight-95)*0.5 - 4)/2+"px";
								scrollComps.toUp.clicking = false;
								scrollComps.toUp.addEventListener("mousedown",function(){
									this.clicking = true;
									var that = this;
									var timer = function(time){
										if(!that.clicking)return ;
										if(time > 2) {
											bodyComps.result.scrollTop = Math.max(0,bodyComps.result.scrollTop-50);
										}
										setTimeout(function(){
											timer(time+1);
										},250);
									};
									timer(0);
								});
								scrollComps.toUp.addEventListener("mouseup",function(){
									this.clicking = false;
									bodyComps.result.scrollTop = Math.max(0,bodyComps.result.scrollTop-50);
								});
								scrollComps.toUp.addEventListener("touchstart",function(){
									this.clicking = true;
									var that = this;
									var timer = function(time){
										if(!that.clicking)return ;
										if(time > 2) {
											bodyComps.result.scrollTop = Math.max(0,bodyComps.result.scrollTop-50);
										}
										setTimeout(function(){
											timer(time+1);
										},250);
									};
									timer(0);
								});
								scrollComps.toUp.addEventListener("touchend",function(){
									this.clicking = false;
									bodyComps.result.scrollTop = Math.max(0,bodyComps.result.scrollTop-50);
								});
								scrollComps.toDown.clicking = false;
								scrollComps.toDown.addEventListener("mousedown",function(){
									this.clicking = true;
									var that = this;
									var timer = function(time){
										if(!that.clicking)return ;
										if(time > 2) {
											bodyComps.result.scrollTop = Math.max(0,bodyComps.result.scrollTop+50);
										}
										setTimeout(function(){
											timer(time+1);
										},250);
									};
									timer(0);
								});
								scrollComps.toDown.addEventListener("mouseup",function(){
									this.clicking = false;
									bodyComps.result.scrollTop = Math.max(0,bodyComps.result.scrollTop+50);
								});
								scrollComps.toDown.addEventListener("touchstart",function(){
									this.clicking = true;
									var that = this;
									var timer = function(time){
										if(!that.clicking)return ;
										if(time > 2) {
											bodyComps.result.scrollTop = Math.max(0,bodyComps.result.scrollTop+50);
										}
										setTimeout(function(){
											timer(time+1);
										},250);
									};
									timer(0);
								});
								scrollComps.toDown.addEventListener("touchend",function(){
									this.clicking = false;
									bodyComps.result.scrollTop = Math.max(0,bodyComps.result.scrollTop+50);
								});
								for(var i in scrollComps){
									bodyComps.scroll.appendChild(scrollComps[i]);
								}
							}
							var titleComps = {
								back: ui.create.div("#cxyFindCode_title_back","返回"),
								text: ui.create.div("#cxyFindCode_title_text","代码搜索器"),
							};
							var inputComps = {
								button: ui.create.div("#cxyFindCode_input_button","查找"),
								buttonBan: ui.create.div("#cxyFindCode_input_buttonBan"),
								textInput: ui.create.div("#cxyFindCode_input_textInput"),
							};
							
							var textInput = document.createElement("input");
							textInput.type = "text";
							textInput.id = "cxyFindCode_input_textInput_input";
							textInput.placeholder = "填写技能描述";
							textInput.addEventListener("focus",function(){
								inputComps.textInput.style["border-bottom"] = "0.5px solid rgb(255,128,10)";
							});
							textInput.addEventListener("blur",function(){
								inputComps.textInput.style["border-bottom"] = "0.5px solid rgb(180,180,180)";
							});
							textInput.addEventListener("keydown",function(){
								setTimeout(function(){
									if(textInput.value)inputComps.buttonBan.style.display = "none";
									else inputComps.buttonBan.style.display = "block";
								},100);
							});
							inputComps.textInput.appendChild(textInput);
							
							titleComps.back.addEventListener("click",function(){
								document.getElementById("window").removeChild(body);
							});
							inputComps.button.addEventListener("click",function(){
								bodyComps.result.innerHTML = "";
								var info = textInput.value;
								if(!info)return ;
								var infos = game.cxyFindCode.find(info,0.5);
								/*
									排序
								*/
								var sortInfos = [] , max_similar = null;
								function objlen(obj){
									for(var i in obj){
										return true;
									}
									return false;
								};
								while(objlen(infos)) {
									for(var i in infos) {
										if(max_similar == null){
											max_similar = i;
										}
										else if(infos[i] > infos[max_similar]) {
											max_similar = i;
										}
									}
									sortInfos.push([max_similar,infos[max_similar]]);
									delete infos[max_similar];
									max_similar = null;
								};
								/*
									输出
								*/
								titleComps.text.innerHTML = "代码搜索器[共查询到 "+sortInfos.length+" 条结果]"
								function print(arr){
									var tmp = ui.create.div(".cxyFindCode_result_tmp");
									var tmpComps = {
										lookCode: ui.create.div(".cxyFindCode_result_tmp_lookCode","查看代码"),
										lookInfo: ui.create.div(".cxyFindCode_result_tmp_lookInfo","查看描述"),
										textShow: ui.create.div(".cxyFindCode_result_tmp_textShow"),
									};
									tmpComps.lookCode.info = arr;
									tmpComps.lookInfo.info = arr;
									tmpComps.lookInfo.str = info;
									var textShowComps = {
										skillname: ui.create.div(".cxyFindCode_result_tmp_textShow_skillname",lib.translate[arr[0]]+"|"+arr[0]),
										similar: ui.create.div(".cxyFindCode_result_tmp_textShow_similar",(arr[1]*100)+"%"),
									};
									tmpComps.lookCode.addEventListener("click",function(){
										var skill = this.info[0];
										var title = "查看代码["+lib.translate[skill]+"|"+skill+"]";
										var skill_info = get.stringify(get.info(skill));
										var info = "";
										skill_info = skill_info.replaceAll(">","&gt;");
										skill_info = skill_info.replaceAll("<","&lt;");
										for(var i=0;i<skill_info.length;i++){
											if(skill_info.charCodeAt(i)==10){
												info += "<br>";
											}
											else if(skill_info.charCodeAt(i)==32){
												info += "&nbsp;"
											}
											else {
												info += skill_info[i];
											}
										}
										/*
											代码高亮
										*/
										function lightHight(info) {
											var Info = "<font class='cxyCode_red'>";
											var style = false , strnow = null;
											var specialCode = [
												"var","if","else","switch","case",
												"default","for","while","do","break",
												"continue","goto","undefined","Infinity",
												"function","return","&gt;",
												"&lt;",
											];
											for(var i=0;i<info.length;i++){
												if(info[i]=='<')style = true;
												if(style){
													Info += info[i];
													if(info[i]=='>')style = false;
													continue;
												}
												if(info[i]=='&'&&info.substr(i,6)=="&nbsp;"){
													Info+=info.substr(i,6);
													i += 5;
													continue;
												}
												if(info[i]=='\"' || info[i]=='\'') {
													if(strnow == null) {
														strnow = info[i];
														Info += "<font class='cxyCode_yellow'>"+info[i];
														continue;
													}
												}
												if(strnow){
													Info += info[i];
													if(info[i] == strnow){
														Info += "</font>";
														strnow = null;
													}
													continue;
												}
												var sc = false;
												for(var k=0;k<specialCode.length;k++){
													if(info.substr(i,specialCode[k].length)==specialCode[k]){
														Info += "<font class='cxyCode_oringe'>"+info.substr(i,specialCode[k].length)+"</font>";
														i += specialCode[k].length-1;
														sc = true;
														break;
													}
												}
												if(sc)continue;
												if(!/[A-Za-z0-9]/.test(info[i])){
													Info += "<font class='cxyCode_white'>"+info[i]+"</font>";
													continue;
												}
												Info += info[i];
											}
											Info+="</font>";
											return Info;
										};
										cxyShowText(title,lightHight(info));
									});
									tmpComps.lookInfo.addEventListener("click",function(){
										var skill = this.info[0];
										var str = this.str;
										var title = "查看描述["+lib.translate[skill]+"|"+skill+"]";
										var info = lib.translate[skill+"_info"] , lastPos = 0;
										str = str.split(" ");
										for(var t=0;t<str.length;t++){
											for(var i=0;i<str[t].length;i++){
												for(var k=lastPos;k<info.length;k++){
													if(str[t][i]==info[k]){
														info = info.substring(0,k)+"<font color=#f00>"+info[k]+"</font>"+info.substring(k+1,info.length);
														lastPos = k+1;
														break;
													}
												}
											}
											lastPos = 0;
										}
										cxyShowText(title,info);
									});
									for(var i in textShowComps){
										tmpComps.textShow.appendChild(textShowComps[i]);
									}
									for(var i in tmpComps) {
										tmp.appendChild(tmpComps[i]);
									}
									bodyComps.result.appendChild(tmp);
								}
								for(var i=0;i<sortInfos.length;i++){
									print(sortInfos[i]);
								}
							});
							
							for(var i in titleComps){
								bodyComps.title.appendChild(titleComps[i]);
							}
							for(var i in inputComps){
								bodyComps.input.appendChild(inputComps[i]);
							}
							for(var i in bodyComps){
								body.appendChild(bodyComps[i]);
							}
							document.getElementById("window").appendChild(body);
						}catch(e){game.print(e);}
					},
				},
			},
			editable:false,
		}
	}
)