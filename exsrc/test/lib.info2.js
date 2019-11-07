// function test() {
//     setTimeout(_ => {
//         console.log(4)
//     });
//     new Promise(resolve => {
//         resolve();
//         console.log(1);
//         setTimeout(_ => {
//             console.log(5)
//         });
//     }).then(_ => {
//         console.log(3);
//     });
//     console.log(2);
// }

// function test2() {
//     document.body.addEventListener('click', _ => console.log('click'))

//     // document.body.click()
//     document.body.dispatchEvent(new Event('click'))
//     console.log('done')
// }

// function test3() {
//     setTimeout(_ => console.log(4))

//     async function main() {
//         console.log(1)
//         await Promise.resolve()
//         console.log(3)
//     }

//     main()

//     console.log(2)
// }

// function test4() {
//     console.log('1');

//     setTimeout(function () {
//         console.log('2');
//         setTimeout(function () {
//             console.log('3');
//         })
//         new Promise(function (resolve) {
//             console.log('4');
//             resolve();
//         }).then(function () {
//             console.log('5')
//         })
//     })
//     setTimeout(function () {
//         console.log('6');
//     })
//     new Promise(function (resolve) {
//         console.log('7');
//         resolve();
//     }).then(function () {
//         console.log('8')
//     })

//     setTimeout(function () {
//         console.log('9');
//         setTimeout(function () {
//             console.log('10');
//         })
//         new Promise(function (resolve) {
//             console.log('11');
//             resolve();
//         }).then(function () {
//             console.log('12')
//         })
//     })
// }

// for(i in character){
//     if(character[i].character){
//         lib.characterPack[i]=character[i].character
//     }
//     for(j in character[i]){
//         if(j=='mode'||j=='forbid') continue;
//         if(j=='connect'){
//             connectCharacterPack.push(i);
//             continue;
//         }
//         if(j=='character'&&!lib.config.characters.contains(i)&&lib.config.mode!='connect'){
//             if(lib.config.mode=='chess'&&get.config('chess_mode')=='leader'){
//                 for(k in character[i][j]){
//                     lib.hiddenCharacters.push(k);
//                 }
//             }
//             else if(lib.config.mode!='boss'||i!='boss'){
//                 continue;
//             }
//         }
//         if(Array.isArray(lib[j])&&Array.isArray(character[i][j])){
//             lib[j].addArray(character[i][j]);
//             continue;
//         }
//         for(k in character[i][j]){
//             if(j=='character'){
//                 if(!character[i][j][k][4]){
//                     character[i][j][k][4]=[];
//                 }
//                 if(character[i][j][k][4].contains('boss')||
//                     character[i][j][k][4].contains('hiddenboss')){
//                     lib.config.forbidai.add(k);
//                 }
//                 if(lib.config.forbidai_user&&lib.config.forbidai_user.contains(k)){
//                     lib.config.forbidai.add(k);
//                 }
//                 for(var l=0;l<character[i][j][k][3].length;l++){
//                     lib.skilllist.add(character[i][j][k][3][l]);
//                 }
//             }
//             if(j=='skill'&&k[0]=='_'&&(!lib.config.characters.contains(i)||(lib.config.mode=='connect'&&!character[i].connect))){
//                 continue;
//             }
//             if(j=='translate'&&k==i){
//                 lib[j][k+'_character_config']=character[i][j][k];
//             }
//             else{
//                 if(lib[j][k]==undefined){
//                     if(j=='skill'&&lib.config.mode=='connect'&&!character[i].connect){
//                         lib[j][k]={
//                             nopop:character[i][j][k].nopop,
//                             derivation:character[i][j][k].derivation
//                         };
//                     }
//                     else{
//                         lib[j][k]=character[i][j][k];
//                     }
//                     if(j=='card'&&lib[j][k].derivation){
//                         if(!lib.cardPack.mode_derivation){
//                             lib.cardPack.mode_derivation=[k];
//                         }
//                         else{
//                             lib.cardPack.mode_derivation.push(k);
//                         }
//                     }
//                 }
//                 else if(Array.isArray(lib[j][k])&&Array.isArray(character[i][j][k])){
//                     lib[j][k].addArray(character[i][j][k]);
//                 }
//                 else{
//                     console.log('dublicate '+j+' in character '+i+':\n'+k+'\n'+': '+lib[j][k]+'\n'+character[i][j][k]);
//                 }
//             }
//         }
//     }
// }

// for(i in card){
//     lib.cardPack[i]=[];
//     if(card[i].card){
//         for(var j in card[i].card){
//             if(!card[i].card[j].hidden&&card[i].translate[j+'_info']){
//                 lib.cardPack[i].push(j);
//             }
//         }
//     }
//     for(j in card[i]){
//         if(j=='mode'||j=='forbid') continue;
//         if(j=='connect'){
//             connectCardPack.push(i);
//             continue;
//         }
//         if(j=='list'){
//             if(lib.config.mode=='connect'){
//                 lib.cardPackList[i]=card[i][j];
//             }
//             else{
//                 if(lib.config.cards.contains(i)){
//                     var pile;
//                     if(typeof card[i][j]=='function'){
//                         pile=card[i][j]();
//                     }
//                     else{
//                         pile=card[i][j];
//                     }
//                     lib.cardPile[i]=pile.slice(0);
//                     if(lib.config.bannedpile[i]){
//                         for(var k=0;k<lib.config.bannedpile[i].length;k++){
//                             pile[lib.config.bannedpile[i][k]]=null;
//                         }
//                     }
//                     for(var k=0;k<pile.length;k++){
//                         if(!pile[k]){
//                             pile.splice(k--,1);
//                         }
//                     }
//                     if(lib.config.addedpile[i]){
//                         for(var k=0;k<lib.config.addedpile[i].length;k++){
//                             pile.push(lib.config.addedpile[i][k]);
//                         }
//                     }
//                     lib.card.list=lib.card.list.concat(pile);
//                 }
//             }
//         }
//         else{
//             for(k in card[i][j]){
//                 if(j=='skill'&&k[0]=='_'&&(!lib.config.cards.contains(i)||(lib.config.mode=='connect'&&!card[i].connect))){
//                     continue;
//                 }
//                 if(j=='translate'&&k==i){
//                     lib[j][k+'_card_config']=card[i][j][k];
//                 }
//                 else{
//                     if(lib[j][k]==undefined){
//                         if(j=='skill'&&lib.config.mode=='connect'&&!card[i].connect){
//                             lib[j][k]={
//                                 nopop:card[i][j][k].nopop,
//                                 derivation:card[i][j][k].derivation
//                             };
//                         }
//                         else{
//                             lib[j][k]=card[i][j][k];
//                         }
//                     }
//                     else console.log('dublicate '+j+' in card '+i+':\n'+k+'\n'+lib[j][k]+'\n'+card[i][j][k]);
//                     if(j=='card'&&lib[j][k].derivation){
//                         if(!lib.cardPack.mode_derivation){
//                             lib.cardPack.mode_derivation=[k];
//                         }
//                         else{
//                             lib.cardPack.mode_derivation.push(k);
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }