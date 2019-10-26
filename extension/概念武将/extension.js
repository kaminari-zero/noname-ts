game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"概念武将",content:function (config,pack){
    
},precontent:function (config){if(config.tenManon){
			//------------------------------十人----------------------------------//
			lib.mode.identity.config.player_number.item={
				'2':'两人',
				'3':'三人',
				'4':'四人',
				'5':'五人',
				'6':'六人',
				'7':'七人',
				'8':'八人',
				'10':'十人',
			}
			lib.mode.guozhan.config.player_number.item={
				'2':'两人',
				'3':'三人',
				'4':'四人',
				'5':'五人',
				'6':'六人',
				'7':'七人',
				'8':'八人',
				'10':'十人',
			}
			var cssStyle=function(){
				var style=document.createElement('style');
				style.innerHTML="[data-number='10']>.player[data-position='1']{top:calc(200% / 3 - 145px);left:calc(95% - 75px);}";
				style.innerHTML+="[data-number='10']>.player[data-position='2']{top:calc(100% / 3 - 120px);left:calc(95% - 75px);}";
				style.innerHTML+="[data-number='10']>.player[data-position='3']{top:30px;left:calc(80% - 75px);}";
				style.innerHTML+="[data-number='10']>.player[data-position='4']{top:5px;left:calc(65% - 75px);}";
				style.innerHTML+="[data-number='10']>.player[data-position='5']{top:0;left:calc(50% - 75px);}";
				style.innerHTML+="[data-number='10']>.player[data-position='6']{top:5px;left:calc(35% - 75px);}";
				style.innerHTML+="[data-number='10']>.player[data-position='7']{top:30px;left:calc(20% - 75px);}";
				style.innerHTML+="[data-number='10']>.player[data-position='8']{top:calc(100% / 3 - 120px);left:calc(5% - 75px);}";
				style.innerHTML+="[data-number='10']>.player[data-position='9']{top:calc(200% / 3 - 145px);left:calc(5% - 75px);}";
				document.head.appendChild(style);
			}
			cssStyle();					
			lib.arenaReady.push(function(){
				if((get.mode()=='identity')||(get.mode()=='guozhan')){			
					if(lib.device){
						var zoom=function(num){
							var zoom=num;
							game.documentZoom=game.deviceZoom*zoom;
							document.documentElement.style.zoom=game.documentZoom;
						};
						zoom(0.8);
					}
					ui.arenalog.style.top='240px';
					ui.arenalog.style.height='35%';
					lib.translate.unknown8='九号位';
					lib.translate.unknown9='十号位';
				}
			});
			//------------------------------十人身份----------------------------------//
			if(config.tenMan=='1'){
				lib.config.mode_config.identity.identity.push([],['zhu','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan']);
			}
			else{
				lib.config.mode_config.identity.identity.push([],['zhu','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan']);
			}
		}
		//------------------------------------------------------------------------//		
			game.findCardInCardPile=function(name){
				var card;
				for(var i=0;i<ui.cardPile.childNodes.length;i++){
					card=ui.cardPile.childNodes[i];
					if(typeof name=='string'){
						if(card.name==name){
							return card;
						}
					}
					else if(typeof name=='function'){
						if(name(card)){
							return card;
						}
					}
				}
				return null;
			}		
			lib.group.push('shen');
			lib.translate.shen='神';
			lib.translate.shenColor="#FFFF00",		
			lib.translate.madx='堕落';
			lib.translate.madx_bg='魔';
			lib.skill.madx={
				mark:true,
				intro:{
					content:'已堕落',
					name:'堕落',
                   	onunmark:function(storage,player){
    					game.log(player,'清醒！');
              		}
				}							
			};	
			lib.element.player.isMad=function(){
				return this.hasSkill('mad')||this.hasSkill('madx');
			}		
			lib.element.player.isMad=function(){
				return this.hasSkill('mad')||this.hasSkill('madx');
			}		
        	lib.skill._choince={
				trigger:{global:['gameDrawAfter','phaseBegin']},
				forced:true,
				unique:true,
				popup:false,
				silent:true,
				filter:function(event,player){
					return (player.group&&player.group=='shen');
				},			
				content:function(){
					"step 0"				
					var controls=[];
					for(var i in lib.character){ 
						if(!controls.contains(lib.character[i][1])&&lib.character[i][1]!='shen'){
							controls.push(lib.character[i][1]);  
						}
					}							
   				    var str='请选择一个势力';
					player.chooseControl(controls,ui.create.dialog(str,'hidden')).ai=function(){
						return Math.floor(Math.random()*controls.length);
					};
					"step 1"
					if(result.control){
						player.group=result.control;
						if(get.mode()=='guozhan'){
							player.identity=result.control;
							player._group=result.control;
							player.node.identity.firstChild.innerHTML=get.translation(result.control);
							player.node.identity.dataset.color=player.identity;		
							if(player.name) lib.character[player.name][1]=result.control;
							if(player.name1) lib.character[player.name1][1]=result.control;
							if(player.name2) lib.character[player.name2][1]=result.control;				
						}
						else{
							if(player.name) lib.character[player.name][1]=result.control;
							if(player.name1) lib.character[player.name1][1]=result.control;
							if(player.name2) lib.character[player.name2][1]=result.control;			
						}
					}
					"step 2"
					switch(player.group){
						case 'wei':player.node.name.dataset.nature='watermm';break;
						case 'shu':player.node.name.dataset.nature='soilmm';break;
						case 'wu':player.node.name.dataset.nature='woodmm';break;
						case 'qun':player.node.name.dataset.nature='metalmm';break;
						default:player.node.name.dataset.nature='fire';break;
					}									
				}			
			}
			get.number=function(card){
				if(get.owner(card)){
					return game.checkMod(card,card.number,'number',get.owner(card).get('s'));
				}				
				return card.number;
			}		
			get.goodTag=function(card){
				if(get.tag(card,'recover')||get.tag(card,'draw')) return true;
				return false;			
			}
			lib.ondisabled=[];
			get.badTag=function(card){
				if(get.tag(card,'damage')||get.tag(card,'discard')||get.tag(card,'loseCard')||get.tag(card,'loseHp')) return true;
				return false;			
			}
    
},help:{},config:{"enable_boss":{"name":"非挑战模式使用挑战boss","init":false},"tenManon":{"name":"开启十人身份","init":false},"nineMan":{"name":"九人场身份","init":"1","item":{"1":"2忠2内"}},"tenMan":{"name":"十人场身份","init":"1","item":{"1":"5反1内","2":"4反2内"}}},package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
            "还魂丹":{
                type:"basic",
                enable:function (){return game.dead.length>0},
                notarget:true,
                mode:["identity","guozhan"],
                fullskin:true,
                content:function (){
        "step 0"
        var list=[];
        for(var i=0;i<game.dead.length;i++){
            list.push(game.dead[i].name);
        }
        player.chooseButton(ui.create.dialog('选择要复活的角色',[list,'character']),function(button){
            for(var i=0;i<game.dead.length&&game.dead[i].name!=button.link;i++);
            return ai.get.attitude(_status.event.player,game.dead[i]);
        },true);
        "step 1"
        if(result.bool){
            for(var i=0;i<game.dead.length&&game.dead[i].name!=result.buttons[0].link;i++);
            var dead=game.dead[i];
            dead.revive(1);
            game.addVideo('revive',dead);
            event.dead=dead;
        }
        else{
            event.finish();
        }
        "step 2"
        if(event.dead) event.dead.draw();
    },
                ai:{
                    basic:{
                        useful:[4,2],
                        value:[7,2],
                    },
                    order:function (card,player){
            for(var i=0;i<game.dead.length;i++){
                if(ai.get.attitude(player,game.dead[i])>3) return 7;
            }
            return -10;
        },
                    result:{
                        player:function (player){
                for(var i=0;i<game.dead.length;i++){
                    if(ai.get.attitude(player,game.dead[i])>3) return 2;
                }
                return -10;
            },
                    },
                },
            },
            "蟠桃":{
                fullskin:true,
                type:"basic",
                enable:function (card,player){
        return player.hp<player.maxHp;
    },
                savable:true,
                selectTarget:-1,
                filterTarget:function (card,player,target){
        return target==player&&target.hp<target.maxHp;
    },
                modTarget:function (card,player,target){
        return target.hp<target.maxHp;
    },
                content:function (){
        target.recover(2);
        target.changeHujia();
    },
                ai:{
                    basic:{
                        order:function (card,player){
                if(player.hasSkillTag('pretao')) return 5;
                return 2;
            },
                        useful:11,
                        value:11,
                    },
                    result:{
                        target:function (player,target){
                // if(player==target&&player.hp<=0) return 2;
                var nh=target.num('h');
                var keep=false;
                if(nh<=target.hp){
                    keep=true;
                }
                else if(nh==target.hp+1&&target.hp>=2&&target.num('h','tao')<=1){
                    keep=true;
                }
                var mode=get.mode();
                if(target.hp>=2&&keep&&target.hasFriend()){
                                     for(var i=0;i<game.players.length;i++){
                                         if(target.hp>2) return 0;
                    if(target.hp==2){
                            if(target!=game.players[i]&&ai.get.attitude(target,game.players[i])>=3){
                                if(game.players[i].hp<=1) return 0;
                                if(mode=='identity'&&game.players[i].isZhu&&game.players[i].hp<=2) return 0;
                            }
                        }
                    }
                }
                if(target.hp<0&&target!=player&&target.identity!='zhu') return 0;
                var att=ai.get.attitude(player,target);
                if(att<3&&att>=0&&player!=target) return 0;
                var tri=_status.event.getTrigger();
                if(mode=='identity'&&player.identity=='fan'&&target.identity=='fan'){
                    if(tri&&tri.name=='dying'&&tri.source&&tri.source.identity=='fan'&&tri.source!=target){
                        var num=0;
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i].identity=='fan'){
                                num+=game.players[i].num('h','tao');      
                                if(num>2) return 2;
                            }
                        }
                        if(num>1&&player==target) return 2;
                        return 0;
                    }
                }
                if(mode=='identity'&&player.identity=='zhu'&&target.identity=='nei'){
                    if(tri&&tri.name=='dying'&&tri.source&&tri.source.identity=='zhong'){
                        return 0;
                    }
                }
                if(mode=='stone'&&target.isMin()&&
                player!=target&&tri&&tri.name=='dying'&&player.side==target.side&&
                tri.source!=target.getEnemy()){
                    return 0;
                }
                return 2;
            },
                    },
                    tag:{
                        recover:2,
                        save:2,
                    },
                },
            },
            "破绝阵":{
                type:"zhenfa",
                chongzhu:true,
                enable:true,
                filterTarget:true,
                selectTarget:-1,
                multitarget:true,
                content:function (){
        var n=game.players.length;
        while(n--){
            game.swapSeat(game.players.randomGet(),game.players.randomGet());
        }
    },
                mode:["guozhan"],
                ai:{
                    order:8,
                    result:{
                        player:1,
                    },
                },
                fullskin:true,
            },
        },
        translate:{
            "还魂丹":"还魂丹",
            "还魂丹_info":"使一名角色复活",
            "蟠桃":"蟠桃",
            "蟠桃_info":"回复2点体力和1点护甲",
            "破绝阵":"破绝阵",
            "破绝阵_info":"使所有玩家重新随机排列座位",
        },
        list:[["spade","1","还魂丹"],["heart","2","蟠桃"],["club","10","破绝阵"]],
    },
    skill:{
        skill:{
        },
        translate:{
        },
    },
},files:{"character":[],"card":["蟠桃.png","破绝阵.png","还魂丹.png"],"skill":[]}}})