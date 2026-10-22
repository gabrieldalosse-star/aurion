const assert=require('node:assert/strict'),F=require('./dist/engine.js');
const s={start:'2026-01-01',accounts:[{id:'cash',balance:100000}],cards:[],entries:[],paid:[]};
const t={id:'one',name:'Compra',amount:10000,date:'2026-01-31',type:'expense',repeat:'installments',count:3,account:'cash',card:''};
s.entries=[t];let es=F.occurrences(s,'2026-12-31');assert.deepEqual(es.map(t=>t.date),['2026-01-31','2026-02-28','2026-03-31']);assert.equal(es.reduce((s,t)=>s+t.amount,0),10000);assert.equal(F.balance(s,'2026-03-31'),90000);assert.equal(F.balance(s,'2026-03-31',true),100000);s.paid=['one:0'];assert.equal(F.balance(s,'2026-03-31',true),96666);
s.cards=[{id:'c',close:25,due:5}];s.entries=[{...t,card:'c',date:'2026-01-24',repeat:'once'}];assert.equal(F.occurrences(s,'2026-03-31')[0].due,'2026-02-05');s.entries[0].date='2026-01-25';assert.equal(F.occurrences(s,'2026-03-31')[0].due,'2026-03-05');assert.equal(F.balance(s,'2026-02-28'),100000);assert.equal(F.balance(s,'2026-03-05'),90000);
s.entries=[];let p=F.horizon(s,'2026-01-01',1,100);assert.equal(p[0].value,99900);assert.equal(p.at(-1).value,96800);
s.entries=[{...t,date:'2026-01-01',repeat:'monthly',until:'2026-03-01'}];assert.equal(F.occurrences(s,'2026-12-31').length,3);
let sim=F.horizon({...s,entries:[]},'2026-01-01',1,0,[{...t,date:'2026-01-01',repeat:'once'}]);assert.equal(sim.at(-1).value,90000);console.log('OK: parcelas, centavos, meses curtos, confirmação, vencimentos, recorrência, previsão e simulação.');
