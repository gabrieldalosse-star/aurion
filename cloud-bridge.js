/* Bridge between the independent ledger and Firebase modules. */
let cloudAccepted=JSON.parse(JSON.stringify(state));
window.AurionApp={
 read:()=>JSON.parse(JSON.stringify(state)),
 load(value){if(!validBackup(value))throw Error('Dados financeiros inválidos.');state=JSON.parse(JSON.stringify(value));cloudAccepted=JSON.parse(JSON.stringify(value));simulation=null;page='home';selectedMonth=month;chosenDay=today;dayOpen=false;sheetTag='';render()},
 blank:empty,demo,isValid:validBackup,notify:toast,
 bindStorage(fn){save=function(){try{fn(state);cloudAccepted=JSON.parse(JSON.stringify(state));return true}catch(e){state=JSON.parse(JSON.stringify(cloudAccepted));render();toast(e.message);return false}}},
 backup(value,name='aurion-backup'){download(name+'-'+today+'.json',JSON.stringify(value,null,2),'application/json')},
 confirm(title,message,fn){confirmAction(title,message,fn)},
 decorate(fn){const current=render;render=function(){current();fn()};fn()}
};
