// BOOMPUFF v9 — tünel / gizli bölme erişilebilirlik testi
// Oyunun GERÇEK karakter fiziğini (game.stepFighter + game.jump) kullanır: bir başlangıç noktasından
// yürüme / zıplama / çift zıplama hareketleriyle ulaşılabilen tüm duruş noktaları taranır (BFS).
// Varsayılan (en kısıtlı) tür kullanılır: zıplama ×1, tırmanma 8 px — Tavşan/Maymun daha da rahat geçer.
// Kontroller (her oda için):
//   1) Tünel ağızlarından (bina lobileri için sokak kapılarından) odaya ulaşılabiliyor mu?
//   2) Odadan açık gökyüzüne geri çıkılabiliyor mu? (sıkışma testi)
// Kullanım (sunucu proje kökünü yayınlarken):
//   (0,eval)(await (await fetch('/tests/tunnel-reach.js')).text()); await __tunTest('jungle',2)
(function(){
const DT=1/60,LIQ=1105;const MC=new MessageChannel(),TQ=[];MC.port1.onmessage=()=>{const f=TQ.shift();f&&f()};const tick=()=>new Promise(r=>{TQ.push(r);MC.port2.postMessage(0)});
function mk(x,y){return{x,y,vx:0,vy:0,r:14,S:{},hp:100,maxHp:100,ghost:100,alive:true,facing:1,aim:-.6,onGround:false,walkDir:0,walkAnim:0,landT:0,hurtT:0,fireT:0,blinkT:3,wingT:0,healUsed:false,shieldUsed:false,shield:false,shieldHit:0,healFx:0,hitFlash:0,sv:0,team:{ai:true},air:1}}
function clone(c){const o=mk(c.x,c.y);o.vx=c.vx;o.vy=c.vy;o.onGround=c.onGround;o.facing=c.facing;o.sv=c.sv;o.air=c.air;return o}
function settle(g,c,max=240){for(let i=0;i<max;i++){g.stepFighter(c,DT);if(!c.alive)return false;if(c.onGround&&Math.abs(c.sv||0)<3)return true}return c.onGround}
function act(g,s,kind,dir){const c=clone(s);c.facing=dir;
 if(kind==='walk'){c.walkDir=dir;for(let i=0;i<12;i++){g.stepFighter(c,DT);if(!c.alive)return null;if(!c.onGround)break}c.walkDir=0;}
 else{g.jump(c);let dbl=kind==='dj';for(let i=0;i<240;i++){g.stepFighter(c,DT);if(!c.alive)return null;if(dbl&&c.vy>=-20&&!c.onGround){g.jump(c);dbl=false}if(c.onGround&&i>2)break}}
 if(!settle(g,c))return null;if(c.y>LIQ-10)return null;return c}
function exposed(T,c){for(let y=c.y-20;y>c.y-260;y-=6)if(T.isSolid(c.x,y))return false;return true}
function bfs(g,start,box,maxStates=6000){const seen=new Set(),q=[start],out=[];const key=c=>((c.x>>2)<<12)|(c.y>>2);seen.add(key(start));
 while(q.length&&out.length<maxStates){const s=q.shift();out.push(s);if(s.x<box[0]||s.x>box[2]||s.y<box[1]||s.y>box[3])continue;
  for(const k of['walk','jump','dj'])for(const d of[-1,1]){const n=act(g,s,k,d);if(!n)continue;const kk=key(n);if(seen.has(kk))continue;seen.add(kk);q.push(n)}}
 return out}
const near=(s,R)=>Math.abs(s.x-R.x)<Math.max(40,R.w/2-10)&&Math.abs(s.y+14-R.y)<26;
window.__tunTest=async function(map,players,seed){const g=window.__game,W=Math.round(2400*({2:1,3:1.15,4:1.35,5:1.55,6:1.7})[players]/8)*8;
 g.loadMap(map,seed??(1000+players*7),W);const T=g.terrain,tn=g.tun;
 g.rescue=c=>{c.alive=false};g.drown=c=>{c.alive=false};g.damage=()=>{};g.active=null;
 try{
  let bx0=1e9,by0=1e9,bx1=-1e9,by1=-1e9;for(const[ax,ay,bx,by]of tn.paths){bx0=Math.min(bx0,ax,bx);bx1=Math.max(bx1,ax,bx);by0=Math.min(by0,ay,by);by1=Math.max(by1,ay,by)}
  for(const R of tn.rooms){bx0=Math.min(bx0,R.x-R.w);bx1=Math.max(bx1,R.x+R.w);by0=Math.min(by0,R.y-200);by1=Math.max(by1,R.y+20)}
  const box=[bx0-260,by0-320,bx1+260,by1+60];
  const res={map,players,W,mouths:tn.mouths.length,rooms:tn.rooms.length,lobbies:tn.rooms.filter(R=>R.bld).length,states:0,fail:[]};
  const reached=[];for(const m of tn.mouths){const c=mk(m.x,m.y-24);if(!settle(g,c)){res.fail.push('ağız oturmadı '+m.x+','+m.y);continue}
   const st=bfs(g,c,box);for(const s of st)reached.push(s);await tick()}
  res.states=reached.length;
  for(const R of tn.rooms){let ok=reached.some(s=>near(s,R));
   if(!ok&&R.doors)for(const d of R.doors){const c=mk(d.x,d.y-40);if(!settle(g,c))continue;if(bfs(g,c,[d.x-400,d.y-300,d.x+400,d.y+200],800).some(s=>near(s,R))){ok=true;break}}
   if(!ok)res.fail.push(`odaya girilemedi x=${R.x|0} y=${R.y|0}${R.bld?' (lobi)':''}`)}
  for(const R of tn.rooms){const c=mk(R.x,R.y-30);if(!settle(g,c)){res.fail.push('oda zemini yok x='+(R.x|0));continue}
   const st=bfs(g,c,box,4000);if(!st.some(s=>exposed(T,s)))res.fail.push(`odadan çıkış yok x=${R.x|0} y=${R.y|0}`);await tick()}
  res.ok=res.fail.length===0;return res}
 finally{delete g.rescue;delete g.drown;delete g.damage}}
})();
