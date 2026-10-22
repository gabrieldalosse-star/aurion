export class SyncConflict extends Error {constructor(){super('Os dados foram alterados em outro dispositivo.');this.code='aurion/conflict'}}
export function createSyncQueue({commit,onState=()=>{},onCommitted=()=>{},onIdle=()=>{},delay=700}){
 let revision=0,pending=null,timer=null,running=null,closed=false,blocked=false;
 function status(type,error){onState({type,error,pending:pending!==null,revision})}
 function enqueue(payload){if(closed)throw Error('Sessão encerrada');pending=payload;status(blocked?'conflict':'pending');clearTimeout(timer);if(!blocked)timer=setTimeout(()=>flush().catch(()=>{}),delay)}
 async function work(){try{while(pending!==null&&!closed&&!blocked){const payload=pending;status('saving');const result=await commit(payload,revision);if(closed)return;revision=result;onCommitted(payload,revision);if(pending===payload)pending=null;}status(pending===null?'synced':'pending')}catch(error){if(error.code==='aurion/conflict')blocked=true;status(blocked?'conflict':'error',error);throw error}}
 async function flush(){clearTimeout(timer);if(closed||blocked)return false;if(running){await running;return pending===null}running=work();try{await running;return pending===null}finally{running=null;if(!closed)onIdle()}}
 return {enqueue,flush,get pending(){return pending!==null},get busy(){return !!running},get revision(){return revision},get blocked(){return blocked},setRevision(n){if(!pending&&!running)revision=n},close(){closed=true;clearTimeout(timer)},resume(n){if(running)throw Error('Aguarde a gravação');revision=n;blocked=false},discard(n){if(running)throw Error('Aguarde a gravação');pending=null;revision=n;blocked=false;clearTimeout(timer);status('synced')}};
}
