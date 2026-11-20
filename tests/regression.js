// BOOMPUFF v9 — regresyon testleri (tarayıcıda, oyunun kendi nesneleri üzerinde çalışır)
// Kullanım: (0,eval)(await (await fetch('/tests/regression.js')).text()); await __reg.all()
// Not: Profil testleri localStorage'ı geçici olarak değiştirir; test sonunda eski kayıt geri yüklenir.
(function(){
const g=()=>window.__game,sleep=ms=>new Promise(r=>setTimeout(r,ms));
const MC=new MessageChannel(),TQ=[];MC.port1.onmessage=()=>{const f=TQ.shift();f&&f()};const tick=()=>new Promise(r=>{TQ.push(r);MC.port2.postMessage(0)});
async function toMyTurn(opts){const G=g();window.__start(opts);
 for(let i=0;i<600&&G.state==='loading';i++){if(window.__load.ready&&!window.__load.done)window.__load.tick();await sleep(20)}
 for(let i=0;i<3000&&!(G.state==='aim'&&G.active&&!G.active.team.ai);i++){G.step(1/60);if(G.state==='cine')G.skipCine();if(G.state==='place')G.placeT=Math.min(G.placeT,.01);if(G.state==='aim'&&G.active&&G.active.team.ai)G.timer=Math.min(G.timer,.01);if(i%200===0)await tick()}
 G.timer=999;return G}
// atış bittikten sonra sıra yeniden insan oyuncuya gelene kadar ilerlet (yapay zekâ turları hızlıca geçilir)
function settleAll(G,max=4000){for(let i=0;i<max;i++){G.step(1/60);if(G.state==='aim'&&G.active&&G.active.team.ai)G.timer=Math.min(G.timer,.01);if(G.state==='aim'&&G.active&&!G.active.team.ai&&!G.projs.length){G.timer=999;return i}if(G.state==='over')return-1}return max}
const R={};
// 1) Rüzgâr kılavuzu = gerçek mermi (aynı stepProjectile); karakterlerden uzak yukarı atışlar
R.windGuide=async()=>{const G=await toMyTurn({mode:'ai',diff:'easy',count:1,players:2,map:'jungle',species:'monkey',assist:'mid'});const out=[];
 for(const wid of['rocket','heavy','sticky','ice','grenade','bouncy','mine'])for(const wind of[-1,0,.8]){const p=G.active;G.state='aim';G.timer=999;G.projs=[];
  const w=window.__W.find(x=>x.id===wid);G.weapon=w;p.team.ammo[wid]=9;p.facing=1;p.aim=-1.05;G.wind=wind;G.power=.62;G.aiming=true;
  const pred=window.__predict(p,w,1,p.aim,.62,G.wind,G.terrain,8);let hit=null;const ex=G.explode.bind(G);G.explode=(x,y,pr)=>{if(!hit)hit={x,y};ex(x,y,pr)};
  const stickBefore=null;G.fire();for(let i=0;i<900&&G.projs.length;i++){G.step(1/60);const pr=G.projs[0];if(pr&&pr.stuck&&!hit)hit={x:pr.x,y:pr.y,stick:1}}
  if(!hit&&G.mines.length)hit={x:G.mines[G.mines.length-1].x,y:G.mines[G.mines.length-1].y,mine:1};delete G.explode;
  const showsRed=Math.abs(wind*(w.wind||0))>=.04;
  out.push({wid,wind,pred:pred.end&&[pred.end.x|0,pred.end.y|0],real:hit&&[hit.x|0,hit.y|0],d:pred.end&&hit?Math.round(Math.hypot(pred.end.x-hit.x,pred.end.y-hit.y)):null,redGuide:showsRed});settleAll(G);G.mines=[]}
 return out};
// 2) Atış kompası değerleri = gerçek atış değerleri
R.compass=async()=>{const G=await toMyTurn({mode:'ai',diff:'easy',count:1,players:2,map:'harbor',species:'fox',assist:'mid'});const out=[];
 for(const pw of[.08,.35,1])for(const aim of[-1.3,-.4,.3]){const p=G.active;G.state='aim';G.projs=[];G.weapon=window.__W[0];G.power=pw;p.aim=aim;p.facing=-1;G.aiming=true;G.fire();const s=G.lastShot,w=window.__W[0];
  const speed=Math.hypot(s.vx,s.vy),expSpeed=w.minS+(w.maxS-w.minS)*pw;out.push({pw,aim,shotPower:+s.power.toFixed(4),shownPct:Math.round(s.power*100),shownDeg:Math.round(-s.aim*180/Math.PI),speed:Math.round(speed),expSpeed:Math.round(expSpeed),ok:Math.abs(speed-expSpeed)<.5&&s.power===pw&&s.aim===aim});settleAll(G)}
 return out};
// 3) 10 silah: atış + patlama + arazi oyma
R.weapons=async()=>{const G=await toMyTurn({mode:'ai',diff:'easy',count:1,players:2,map:'desert',species:'bear',assist:'mid'});const out=[];const T=()=>G.terrain;
 for(const w of window.__W){const p=G.active;G.state='aim';G.projs=[];G.mines=[];p.team.ammo[w.id]=5;G.weapon=w;G.wind=0;let exploded=0;const ex=G.explode.bind(G);G.explode=(x,y,pr)=>{exploded++;ex(x,y,pr)};
  let solid0=0;const S=T().S;for(let i=0;i<S.length;i+=7)solid0+=S[i]?1:0;
  if(w.target){G.selectTarget(p.x+300,0)}else{p.facing=1;p.aim=-.5;G.power=.55;G.aiming=true;G.fire()}
  for(let i=0;i<900&&(G.projs.length||G.mines.length);i++){G.step(1/60);if(G.mines.length&&i>120){const m=G.mines[0];m.trig=.01}}
  delete G.explode;let solid1=0;for(let i=0;i<S.length;i+=7)solid1+=S[i]?1:0;out.push({w:w.id,exploded,carvedPx:(solid0-solid1)*7});settleAll(G)}
 return out};
// 4) Kayıt: v8 (v:1) göçü, bozuk kayıt → yedek, ikisi de bozuk → yeni profil (çökme yok)
R.save=async()=>{const M=window.__meta,keep=localStorage.getItem('bp_profile'),keepB=localStorage.getItem('bp_profile_bak'),out={};
 try{const v8={v:1,name:'Eski',level:7,xp:55,gold:1234,stats:{wins:9,kills:30},maps:{jungle:1},owned:{'hat:crown':1},outfits:{bear:{hat:'party'}},ach:{win1:1},mis:{q_win:1},species:'bear'};
  localStorage.setItem('bp_profile',JSON.stringify(v8));localStorage.removeItem('bp_profile_bak');M.load();const p=M.p;
  out.migrate={v:p.v,level:p.level,gold:p.gold,wins:p.stats.wins,name:p.name,owned:!!p.owned['hat:crown'],settings:typeof p.settings,ok:p.v===2&&p.level===7&&p.gold===1234&&p.stats.wins===9&&p.name==='Eski'};
  M.flush();p.gold=2000;M.flush(); // ana = 2000, yedek = 1234
  localStorage.setItem('bp_profile','{bozuk json');M.load();out.recover={gold:M.p.gold,recovered:M.recovered,ok:M.recovered&&M.p.gold===1234};
  localStorage.setItem('bp_profile','{x');localStorage.setItem('bp_profile_bak','[1,2');M.load();out.bothCorrupt={level:M.p.level,gold:M.p.gold,ok:M.p.level===1};
  localStorage.setItem('bp_profile',JSON.stringify({v:2,level:'abc',gold:-5,xp:NaN,stats:{wins:'x',kills:3},species:'dragon',outfits:{x:1}}));M.load();out.sanitize={level:M.p.level,gold:M.p.gold,xp:M.p.xp,kills:M.p.stats.kills,wins:M.p.stats.wins,species:M.p.species,ok:M.p.level===1&&M.p.gold===100&&M.p.stats.kills===3&&M.p.species==='monkey'};
 }finally{if(keep===null)localStorage.removeItem('bp_profile');else localStorage.setItem('bp_profile',keep);if(keepB===null)localStorage.removeItem('bp_profile_bak');else localStorage.setItem('bp_profile_bak',keepB);M.load()}
 return out};
// 5) Maç sonu ödülü + yeni maçta profilin korunması + kostüm satın alma/kuşanma
R.progress=async()=>{const M=window.__meta,keep=localStorage.getItem('bp_profile'),out={};
 try{localStorage.removeItem('bp_profile');M.load();M.p.gold=500;const G=await toMyTurn({mode:'ai',diff:'easy',count:1,players:2,map:'ice',species:'tiger',assist:'mid'});
  const xp0=M.p.xp+M.p.level*1000,g0=M.p.gold,m0=M.p.stats.matches||0;for(const c of G.chars)if(c.team!==G.teams[0]){c.hp=0;c.alive=false}G.gameOver();
  out.match={xpGain:(M.p.xp+M.p.level*1000)-xp0,goldGain:M.p.gold-g0,matches:(M.p.stats.matches||0)-m0,winner:G.winner===G.teams[0]};
  const hat={id:'beanie',name:'Bere',price:80},gb=M.p.gold;out.buy={ok:M.buy('hat',hat),goldSpent:gb-M.p.gold};M.equip('tiger','hat','beanie');out.equip=M.outfitFor('tiger').hat;
  const lvl=M.p.level,gold=M.p.gold;await sleep(1300);await toMyTurn({mode:'ai',diff:'easy',count:1,players:3,map:'city',species:'tiger',assist:'mid'});
  out.afterNewMatch={levelKept:M.p.level===lvl,goldKept:M.p.gold===gold,hat:M.outfitFor('tiger').hat,p1cos:g().teams[0].chars[0].cos&&g().teams[0].chars[0].cos.hat};
  M.flush();const stored=JSON.parse(localStorage.getItem('bp_profile'));out.persisted={gold:stored.gold===M.p.gold,hat:stored.outfits.tiger.hat};
 }finally{if(keep===null)localStorage.removeItem('bp_profile');else localStorage.setItem('bp_profile',keep);M.load()}
 return out};
// 6) Eğitim baştan sona (adımların koşulları gerçek oyun eylemleriyle sağlanır)
R.tutorial=async()=>{const M=window.__meta,keep=localStorage.getItem('bp_profile'),T=window.__tut,log=[];
 try{const G=g();window.__start({mode:'train',diff:'easy',count:1,players:2,map:'jungle',species:'monkey',assist:'full'});
  for(let i=0;i<600&&G.state==='loading';i++){if(window.__load.ready&&!window.__load.done)window.__load.tick();await sleep(20)}
  for(let i=0;i<600&&G.state!=='aim';i++){G.step(1/60);if(G.state==='cine')G.skipCine()}
  const p=G.teams[0].chars[0],d=G.teams[1].chars[0];const run=n=>{for(let i=0;i<n;i++){G.step(1/60);G.ui.frame(1/60)}};
  for(let step=0;step<12&&T.i<9;step++){const i0=T.i;log.push(T.i);
   if(T.i===0){G.input.joy.dir=1;run(90);G.input.joy.dir=0}
   else if(T.i===1){G.input.edges.Space=true;run(80)}
   else if(T.i>=2&&T.i<=5){G.state='aim';G.weapon=window.__W[T.i===5?1:0];p.facing=d.x>p.x?1:-1;const pred=(a,pw)=>window.__predict(p,G.weapon,p.facing,a,pw,G.wind,G.terrain,6).end;let best=null;for(let a=-1.4;a<.2;a+=.05)for(let pw=.2;pw<=1;pw+=.05){const e=pred(a,pw);if(!e)continue;const dd=Math.hypot(e.x-d.x,e.y-d.y);if(!best||dd<best.dd)best={a,pw,dd}}
    p.aim=best.a;G.power=best.pw;G.aiming=true;G.fire();for(let k=0;k<900&&G.state!=='aim';k++){G.step(1/60);G.ui.frame(1/60)}run(5)}
   else if(T.i===6){G.useDefense('heal');run(5)}else if(T.i===7){G.useDefense('shield');run(5)}else if(T.i===8){G.useUlti('heal');run(5)}
   if(T.i===i0)run(30)}
  log.push(T.i);return{steps:log.join('→'),done:T.i===9,trainingStat:M.p.stats.training||0}}
 finally{if(keep===null)localStorage.removeItem('bp_profile');else localStorage.setItem('bp_profile',keep);M.load()}};
// 7) Hayatta Kalma: dalga 1 kazan → dalga 2 (daha fazla düşman, can taşınır)
R.survival=async()=>{const M=window.__meta,keep=localStorage.getItem('bp_profile');
 try{const G=await toMyTurn({mode:'surv',wave:1,diff:'easy',count:1,players:2,map:'jungle',species:'bear',assist:'mid'});const n1=G.chars.length;
  for(const c of G.chars)if(c.team!==G.teams[0]){c.hp=0;c.alive=false}const hp=G.teams[0].chars[0].hp;G.gameOver();await sleep(1400);const title=document.getElementById('oTitle').textContent,btn=document.getElementById('bAgain').textContent;
  document.getElementById('bAgain').onclick();for(let i=0;i<600&&G.state==='loading';i++){if(window.__load.ready&&!window.__load.done)window.__load.tick();await sleep(20)}
  return{wave1Chars:n1,overTitle:title,againBtn:btn,wave2Chars:G.chars.length,wave:G.opts.wave,carriedHp:G.teams[0].chars[0].hp,hpBefore:hp,survBest:M.p.stats.survBest}}
 finally{if(keep===null)localStorage.removeItem('bp_profile');else localStorage.setItem('bp_profile',keep);M.load()}};
// 8) Yerel çok oyunculu: sıra tüm insan takımlarında döner; hiçbir takım yapay zekâ değil
R.local=async()=>{const G=await toMyTurn({mode:'local',diff:'normal',count:1,players:4,map:'volcano',species:'rabbit',assist:'mid'});const seq=[];
 for(let k=0;k<8;k++){seq.push(G.active.team.idx);G.timer=.01;for(let i=0;i<900;i++){G.step(1/60);if(G.state==='aim'&&G.active&&seq.length===k+1&&G.timer>1)break}G.timer=999}
 return{ai:G.teams.map(t=>t.ai),labels:G.teams.map(t=>t.label),turnOrder:seq.join(',')}};
// 9) Zafer / mağlubiyet ekranları
R.endScreens=async()=>{const out={};for(const win of[true,false]){const G=await toMyTurn({mode:'ai',diff:'easy',count:1,players:2,map:'harbor',species:'bee',assist:'mid'});for(const c of G.chars)if((c.team===G.teams[0])!==win){c.hp=0;c.alive=false}G.gameOver();await sleep(1400);out[win?'win':'lose']=document.getElementById('oTitle').textContent+' | '+document.getElementById('oRew').textContent;document.getElementById('over').classList.add('hidden')}return out};
R.counts=()=>({achievements:document.querySelectorAll?null:null});
window.__reg={...R,async all(){const res={};for(const k of['windGuide','compass','weapons','save','progress','tutorial','survival','local','endScreens']){try{res[k]=await R[k]()}catch(e){res[k]={ERROR:e.message+' @ '+(e.stack||'').split('\n')[1]}}await tick()}return res}};
})();
