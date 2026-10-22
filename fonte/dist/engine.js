/* Integer-cent ledger. Dates are ISO local calendar dates. */
(function(root){
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const parse=s=>new Date(s+'T12:00:00');
const addMonth=(s,n)=>{let d=parse(s),day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+n);d.setDate(Math.min(day,new Date(d.getFullYear(),d.getMonth()+1,0).getDate()));return iso(d)};
function occurrences(state,end){
 let out=[];
 for(const t of state.entries){
  const count=t.repeat==='monthly'?Math.max(0,(+end.slice(0,4)- +t.date.slice(0,4))*12+(+end.slice(5,7)- +t.date.slice(5,7))+1):t.repeat==='installments'?t.count:1;
  for(let i=0;i<Math.min(count,1200);i++){
   const date=addMonth(t.date,i);if(date>end||t.until&&date>t.until)continue;
   const amount=t.repeat==='installments'?Math.floor(t.amount/t.count)+(i<t.amount%t.count?1:0):t.amount;
   let due=date;const card=state.cards.find(c=>c.id===t.card);
   if(card){let d=parse(date),cycle=d.getDate()>=card.close?1:0;d.setDate(1);d.setMonth(d.getMonth()+cycle);if(card.due<=card.close)d.setMonth(d.getMonth()+1);d.setDate(Math.min(card.due,new Date(d.getFullYear(),d.getMonth()+1,0).getDate()));due=iso(d);}
   out.push({...t,date,due,amount,key:t.id+':'+i,index:i,label:t.repeat==='installments'?`${t.name} · ${i+1}/${t.count}`:t.name,paid:state.paid.includes(t.id+':'+i)});
  }
 }
 return out.sort((a,b)=>a.due.localeCompare(b.due));
}
function balance(state,day,actual=false){return state.accounts.reduce((s,a)=>s+a.balance,0)+occurrences(state,day).filter(t=>t.due>=state.start&&t.due<=day&&(!actual||t.paid)).reduce((s,t)=>s+(t.type==='income'?t.amount:-t.amount),0)}
function horizon(state,start,months=6,daily=0,extra=[]){let date=parse(start),end=addMonth(start,months),all=occurrences({...state,entries:[...state.entries,...extra]},end),v=balance(state,iso(new Date(date.getFullYear(),date.getMonth(),date.getDate()-1))),points=[];for(let i=0;i<370;i++){let day=iso(date);if(day>end)break;v+=all.filter(t=>t.due===day&&t.due>=state.start).reduce((s,t)=>s+(t.type==='income'?t.amount:-t.amount),0)-daily;points.push({date:day,value:v});date.setDate(date.getDate()+1)}return points}
const api={iso,parse,addMonth,occurrences,balance,horizon};if(typeof module!=='undefined')module.exports=api;else root.Finance=api;
})(typeof window==='undefined'?globalThis:window);
