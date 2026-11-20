// BOOMPUFF v10 — silah / mermi / özel güç vektör çizimleri (kaynak). Her görsel elle tasarlanmış SVG'dir.
// tools/art-sheet.html bunları PNG'ye (şeffaf arka plan) dönüştürür; çıktılar asset-pack/ ve www/assets/ altına yazılır.
// Stil: kalın koyu mor dış hat (#2b1d3a), degrade dolgular, parlama vurguları — oyunun çizgi film karakterleriyle aynı dil.
(function(G){
const O='#2b1d3a';
let uid=0;const id=p=>p+(++uid);
const svg=(w,h,body)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`;
const lin=(i,x1,y1,x2,y2,...st)=>`<linearGradient id="${i}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${st.map((c,k)=>`<stop offset="${k/(st.length-1)}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const rad=(i,cx,cy,r,...st)=>`<radialGradient id="${i}" cx="${cx}" cy="${cy}" r="${r}">${st.map((c,k)=>`<stop offset="${k/(st.length-1)}" stop-color="${c}"/>`).join('')}</radialGradient>`;
const shadow=(cx,cy,rx,ry)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity=".16"/>`;
const hl=(x,y,w,h,r,o=.55)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="#fff" opacity="${o}"/>`;
const flame=(x,y,s=1)=>{const a=id('fl');return`<defs>${rad(a,'.85','.5','.9','#fff8c4','#ffd23f','#ff7a2f','#ff4d2f')}</defs><path d="M${x} ${y-16*s} Q${x-34*s} ${y-12*s} ${x-58*s} ${y} Q${x-34*s} ${y+12*s} ${x} ${y+16*s} Z" fill="url(#${a})" stroke="${O}" stroke-width="${5*s}" stroke-linejoin="round"/><path d="M${x} ${y-7*s} Q${x-18*s} ${y-5*s} ${x-30*s} ${y} Q${x-18*s} ${y+5*s} ${x} ${y+7*s} Z" fill="#fff8d0"/>`};

// ---------- MERMİLER (yatay, sağa bakar; 256×128) ----------
function rocket(o={}){const b=id('b'),n=id('n'),f=id('f');const body=o.body||['#ffffff','#d9dce8','#a8aec4'],nose=o.nose||['#ff8a8a','#ff4d5a','#c92a3a'];
 return`<defs>${lin(b,0,0,0,1,...body)}${lin(n,0,0,0,1,...nose)}${lin(f,0,0,0,1,...nose)}</defs>
 ${o.flame===false?'':flame(58,64,o.fs||1)}
 <path d="M70 40 L44 18 L44 46 Z M70 88 L44 110 L44 82 Z" fill="url(#${f})" stroke="${O}" stroke-width="6" stroke-linejoin="round"/>
 <rect x="54" y="${64-(o.h||22)}" width="${o.len||130}" height="${2*(o.h||22)}" rx="${o.h||22}" fill="url(#${b})" stroke="${O}" stroke-width="7"/>
 <path d="M${54+(o.len||130)-14} ${64-(o.h||22)} Q${(o.len||130)+100} ${64-(o.h||22)+2} ${(o.len||130)+112} 64 Q${(o.len||130)+100} ${64+(o.h||22)-2} ${54+(o.len||130)-14} ${64+(o.h||22)} Z" fill="url(#${n})" stroke="${O}" stroke-width="7" stroke-linejoin="round"/>
 ${o.band||`<rect x="96" y="${64-(o.h||22)}" width="14" height="${2*(o.h||22)}" fill="${nose[1]}" stroke="${O}" stroke-width="4"/>`}
 ${o.win===false?'':`<circle cx="${o.wx||140}" cy="64" r="9" fill="#9be7ff" stroke="${O}" stroke-width="4"/><circle cx="${(o.wx||140)-3}" cy="61" r="3" fill="#fff"/>`}
 ${hl(66,64-(o.h||22)+6,(o.len||130)-30,7,3.5)}`}
const P={
 rocket:()=>svg(256,128,rocket()),
 heavy:()=>{const band=`<g><rect x="88" y="34" width="30" height="60" fill="#ffd23f" stroke="${O}" stroke-width="4"/><path d="M92 34 L104 34 L92 94 Z M108 34 L118 34 L118 46 L106 94 L98 94 Z" fill="#2b2236"/></g>`;
  return svg(256,128,rocket({body:['#7d8598','#4b5262','#2e3340'],nose:['#fff2a8','#ffd23f','#e0a020'],h:30,len:136,band,wx:150,fs:1.25}))},
 cluster:()=>{const pod=id('pod');const band=`<g>${[0,1,2].map(i=>`<circle cx="${84+i*26}" cy="64" r="11" fill="#ffb23f" stroke="${O}" stroke-width="4"/><circle cx="${81+i*26}" cy="60" r="3.5" fill="#fff" opacity=".8"/>`).join('')}</g>`;
  return svg(256,128,rocket({body:['#ffe1c2','#ffb07a','#e07a3a'],nose:['#ffd08a','#ff8a2f','#c9541a'],h:24,len:128,band,win:false}))},
 grenade:()=>{const g=id('g');return svg(256,128,`<defs>${rad(g,'.35','.3','.8','#a6e07a','#5a8a3c','#2f5a1e')}</defs>
  <ellipse cx="128" cy="70" rx="44" ry="50" fill="url(#${g})" stroke="${O}" stroke-width="7"/>
  <path d="M90 58 H166 M88 82 H168 M110 24 V116 M146 24 V116" stroke="#2f5a1e" stroke-width="5" opacity=".7"/>
  <rect x="112" y="10" width="34" height="20" rx="5" fill="#9aa0b0" stroke="${O}" stroke-width="6"/><path d="M146 18 Q178 14 176 44" fill="none" stroke="#9aa0b0" stroke-width="9" stroke-linecap="round"/><path d="M146 18 Q178 14 176 44" fill="none" stroke="${O}" stroke-width="3" stroke-linecap="round" opacity=".5"/>
  <circle cx="104" cy="16" r="9" fill="none" stroke="#ffd23f" stroke-width="5"/>${hl(104,40,16,30,8,.45)}`)},
 push:()=>{const g=id('g');return svg(256,128,`<defs>${rad(g,'.35','.3','.8','#e8ccff','#b57aff','#6a3ab8')}</defs>
  <path d="M40 40 Q20 64 40 88 M58 30 Q30 64 58 98" fill="none" stroke="#d6b3ff" stroke-width="7" stroke-linecap="round" opacity=".8"/>
  <circle cx="140" cy="64" r="48" fill="url(#${g})" stroke="${O}" stroke-width="7"/>
  <path d="M118 44 L146 64 L118 84 M140 44 L168 64 L140 84" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse cx="122" cy="34" rx="16" ry="8" fill="#fff" opacity=".55"/>`)},
 sticky:()=>{const g=id('g');return svg(256,128,`<defs>${rad(g,'.35','.3','.85','#e2ffc0','#8ee04f','#4c9a1e')}</defs>
  <path d="M84 80 Q84 112 96 112 Q102 100 104 86 M150 86 Q154 118 166 118 Q172 104 170 84 M124 92 Q122 106 128 110 Q134 104 132 92" fill="#7bd03c" stroke="${O}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M80 70 Q72 26 124 20 Q178 16 180 64 Q184 98 130 98 Q80 100 80 70 Z" fill="url(#${g})" stroke="${O}" stroke-width="7" stroke-linejoin="round"/>
  <circle cx="110" cy="46" r="10" fill="#f2ffe0" opacity=".85"/><circle cx="148" cy="58" r="6" fill="#f2ffe0" opacity=".6"/><circle cx="96" cy="70" r="4" fill="#f2ffe0" opacity=".6"/>
  <rect x="122" y="6" width="16" height="16" rx="3" fill="#6e6e7a" stroke="${O}" stroke-width="5"/>`)},
 ice:()=>{const g=id('g');return svg(256,128,`<defs>${rad(g,'.35','.3','.85','#ffffff','#9fe3ff','#3f8ed0')}</defs>
  <path d="M128 4 L138 26 L118 26 Z M196 64 L176 74 L176 54 Z M60 64 L80 54 L80 74 Z M128 124 L118 102 L138 102 Z" fill="#dff6ff" stroke="${O}" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="128" cy="64" r="44" fill="url(#${g})" stroke="${O}" stroke-width="7"/>
  <g stroke="#fff" stroke-width="6" stroke-linecap="round"><path d="M128 36 V92 M104 50 L152 78 M152 50 L104 78"/></g>
  <g stroke="#fff" stroke-width="4" stroke-linecap="round"><path d="M128 44 L120 38 M128 44 L136 38 M128 84 L120 90 M128 84 L136 90"/></g>
  <ellipse cx="110" cy="38" rx="12" ry="6" fill="#fff" opacity=".7"/>`)},
 mine:()=>{const g=id('g'),t=id('t');return svg(256,128,`<defs>${lin(g,0,0,0,1,'#8d95a8','#59606e','#3a404e')}${rad(t,'.5','.4','.6','#ffd0d0','#ff3b4e','#8a1020')}</defs>
  ${[56,92,164,200].map(x=>`<path d="M${x-8} 64 L${x} 44 L${x+8} 64 Z" fill="#9aa0b0" stroke="${O}" stroke-width="5" stroke-linejoin="round"/>`).join('')}
  <ellipse cx="128" cy="88" rx="96" ry="26" fill="#3a404e" stroke="${O}" stroke-width="7"/>
  <path d="M44 84 Q44 44 128 42 Q212 44 212 84 Z" fill="url(#${g})" stroke="${O}" stroke-width="7" stroke-linejoin="round"/>
  <rect x="116" y="26" width="24" height="18" rx="5" fill="#2b2236" stroke="${O}" stroke-width="5"/><circle cx="128" cy="24" r="11" fill="url(#${t})" stroke="${O}" stroke-width="5"/>
  ${hl(70,54,60,8,4,.4)}`)},
 bouncy:()=>{const g=id('g');return svg(256,128,`<defs>${rad(g,'.35','.3','.85','#fff1c4','#ffb23f','#ff6a2f')}</defs>
  <path d="M30 96 Q50 70 70 96 M40 112 Q58 92 76 112" fill="none" stroke="#ffd23f" stroke-width="6" stroke-linecap="round"/>
  <circle cx="138" cy="62" r="50" fill="url(#${g})" stroke="${O}" stroke-width="7"/>
  <path d="M92 50 Q138 78 184 50 M92 76 Q138 104 184 76" fill="none" stroke="#fff" stroke-width="7" opacity=".9"/>
  <path d="M138 12 Q120 62 138 112" fill="none" stroke="#c9541a" stroke-width="5" opacity=".6"/>
  <ellipse cx="118" cy="32" rx="16" ry="8" fill="#fff" opacity=".6"/>`)},
 bomb:()=>{const g=id('g');return svg(256,128,`<defs>${lin(g,0,0,0,1,'#6a6278','#2b2236','#1a1424')}</defs>
  <path d="M60 40 L34 22 L34 106 L60 88 Z" fill="#ffd23f" stroke="${O}" stroke-width="6" stroke-linejoin="round"/><path d="M44 64 H70" stroke="${O}" stroke-width="5"/>
  <path d="M56 40 Q60 32 120 30 Q200 32 222 64 Q200 96 120 98 Q60 96 56 88 Z" fill="url(#${g})" stroke="${O}" stroke-width="7" stroke-linejoin="round"/>
  <rect x="104" y="30" width="12" height="68" fill="#ffd23f" opacity=".85"/>${hl(74,42,100,8,4,.35)}`)},
 bomblet:()=>{const g=id('g');return svg(256,128,`<defs>${rad(g,'.35','.3','.85','#ffe0b0','#ff8a3d','#c9541a')}</defs>
  ${flame(84,64,.8)}<circle cx="132" cy="64" r="40" fill="url(#${g})" stroke="${O}" stroke-width="7"/><path d="M168 64 L196 64" stroke="${O}" stroke-width="7" stroke-linecap="round"/><ellipse cx="118" cy="44" rx="12" ry="6" fill="#fff" opacity=".6"/>`)},
};
// ---------- ELDE TUTULAN FIRLATICILAR (yatay, 256×128; namlu sağda) ----------
function launcher(o){const b=id('b'),m=id('m');return svg(256,128,`<defs>${lin(b,0,0,0,1,...o.c)}${lin(m,0,0,0,1,'#ffe08a','#ffd23f','#d99a2b')}</defs>
 <path d="M70 84 L60 116 L84 116 L96 84 Z" fill="#4a3a5a" stroke="${O}" stroke-width="6" stroke-linejoin="round"/>
 <rect x="16" y="${64-o.h}" width="214" height="${2*o.h}" rx="${o.h*.6}" fill="url(#${b})" stroke="${O}" stroke-width="7"/>
 <rect x="212" y="${64-o.h-6}" width="30" height="${2*o.h+12}" rx="6" fill="url(#${m})" stroke="${O}" stroke-width="6"/>
 <rect x="8" y="${64-o.h-4}" width="22" height="${2*o.h+8}" rx="5" fill="#2e3340" stroke="${O}" stroke-width="6"/>
 <rect x="104" y="${64-o.h-14}" width="40" height="14" rx="4" fill="#2e3340" stroke="${O}" stroke-width="5"/>
 ${o.extra||''}${hl(36,64-o.h+5,160,6,3,.45)}`)}
const H={
 rocket:()=>launcher({c:['#7aa8ff','#3a6fd6','#1d3f96'],h:20}),
 heavy:()=>launcher({c:['#8d95a8','#4b5262','#2e3340'],h:27,extra:`<rect x="150" y="37" width="34" height="54" fill="#ffd23f" stroke="${O}" stroke-width="4"/><path d="M154 37 L166 37 L154 91 Z M170 37 L184 37 L184 51 L172 91 L162 91 Z" fill="#2b2236"/>`}),
 cluster:()=>{const b=id('b');return svg(256,128,`<defs>${lin(b,0,0,0,1,'#ffd0a0','#ff8a3d','#c9541a')}</defs>
  <path d="M70 92 L60 120 L84 120 L96 92 Z" fill="#4a3a5a" stroke="${O}" stroke-width="6" stroke-linejoin="round"/>
  ${[38,64,90].map(y=>`<rect x="20" y="${y-13}" width="200" height="26" rx="13" fill="url(#${b})" stroke="${O}" stroke-width="6"/><circle cx="226" cy="${y}" r="10" fill="#2b2236" stroke="${O}" stroke-width="5"/>`).join('')}
  <rect x="96" y="20" width="16" height="88" rx="4" fill="#2e3340" stroke="${O}" stroke-width="5"/>${hl(30,30,150,5,2.5,.45)}`)},
};
// ---------- MENÜ İKONLARI (256×256, gölgeli, eğik) ----------
const icon=(inner,rot=-30,sc=1.05)=>svg(256,256,`${shadow(128,214,78,14)}<g transform="translate(128 120) rotate(${rot}) scale(${sc}) translate(-128 -64)">${inner}</g>`);
const strip=s=>s.replace(/^<svg[^>]*>|<\/svg>$/g,'');
const I={
 rocket:()=>icon(strip(P.rocket()),-35),
 heavy:()=>icon(strip(P.heavy()),-35,1.0),
 cluster:()=>svg(256,256,`${shadow(128,220,82,14)}${[[-1,-22,70],[0,0,128],[1,22,186]].map(([k,dy,x])=>`<g transform="translate(${x} ${118+dy*0.2}) rotate(-62) scale(.62) translate(-128 -64)">${strip(P.cluster())}</g>`).join('')}`),
 grenade:()=>svg(256,256,`${shadow(128,222,62,13)}<g transform="translate(128 132) rotate(-12) scale(1.45) translate(-128 -64)">${strip(P.grenade())}</g>`),
 air:()=>{const w=id('w');return svg(256,256,`<defs>${lin(w,0,0,0,1,'#e8f4ff','#9bc4ee','#5a86c4')}</defs>${shadow(128,226,70,10)}
  <circle cx="128" cy="176" r="40" fill="none" stroke="#ff4d5a" stroke-width="8"/><path d="M128 124 V150 M128 202 V228 M76 176 H102 M154 176 H180" stroke="#ff4d5a" stroke-width="8" stroke-linecap="round"/>
  <g transform="translate(128 64)"><path d="M-96 6 Q-20 -6 70 -4 Q104 0 112 8 Q104 16 70 18 Q-20 20 -96 10 Z" fill="url(#${w})" stroke="${O}" stroke-width="7" stroke-linejoin="round"/>
  <path d="M-8 4 L-46 -46 L-22 -46 L34 4 Z M-8 14 L-46 56 L-22 56 L30 14 Z M-84 4 L-104 -26 L-88 -26 L-66 4 Z" fill="#7aa8d8" stroke="${O}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M78 2 Q96 4 104 8 L78 10 Z" fill="#3f4a66"/></g>
  ${[[96,118],[128,132],[160,118]].map(([x,y])=>`<g transform="translate(${x} ${y}) rotate(90) scale(.28) translate(-128 -64)">${strip(P.bomb())}</g>`).join('')}`)},
 push:()=>icon(strip(P.push()),0,1.12),
 sticky:()=>icon(strip(P.sticky()),0,1.4),
 ice:()=>icon(strip(P.ice()),0,1.5),
 mine:()=>icon(strip(P.mine()),0,1.15),
 bouncy:()=>icon(strip(P.bouncy()),-8,1.3),
};
// ---------- ÖZEL GÜÇLER ----------
const POW={
 health_50:()=>{const h=id('h');return svg(256,256,`<defs>${rad(h,'.35','.3','.85','#c4ffd6','#3fd16b','#1d8a44')}</defs>${shadow(128,226,70,12)}
  <path d="M128 222 C40 166 22 118 34 82 C48 40 104 32 128 74 C152 32 208 40 222 82 C234 118 216 166 128 222 Z" fill="url(#${h})" stroke="${O}" stroke-width="9" stroke-linejoin="round"/>
  <path d="M128 92 V170 M89 131 H167" stroke="#fff" stroke-width="22" stroke-linecap="round"/><path d="M128 92 V170 M89 131 H167" stroke="#e2ffe9" stroke-width="10" stroke-linecap="round"/>
  <ellipse cx="78" cy="78" rx="22" ry="11" transform="rotate(-30 78 78)" fill="#fff" opacity=".6"/>
  <g transform="translate(184 52)"><circle r="40" fill="#ffd23f" stroke="${O}" stroke-width="7"/><text y="13" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="36" fill="${O}">+50</text></g>`)},
 shield:()=>{const s=id('s'),g=id('g');return svg(256,256,`<defs>${lin(s,0,0,0,1,'#bff2ff','#3fa9ff','#1d4fae')}${rad(g,'.5','.45','.55','#9be7ff','#3fa9ff00')}</defs>
  <circle cx="128" cy="124" r="118" fill="url(#${g})" opacity=".55"/>${shadow(128,232,64,10)}
  <path d="M128 18 L214 50 V118 C214 172 176 206 128 226 C80 206 42 172 42 118 V50 Z" fill="url(#${s})" stroke="${O}" stroke-width="9" stroke-linejoin="round"/>
  <path d="M128 40 L194 64 V118 C194 158 166 186 128 202 Z" fill="#fff" opacity=".28"/>
  <path d="M92 120 L118 146 L168 92" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse cx="88" cy="68" rx="20" ry="9" transform="rotate(-24 88 68)" fill="#fff" opacity=".6"/>`)},
};
G.WEAPON_ART={P,H,I,POW,
 // dosya adları (istenen adlandırma)
 names:{rocket:'rocket',grenade:'grenade',heavy:'heavy_missile',cluster:'cluster_rocket',air:'air_strike',push:'push_bomb',sticky:'sticky_bomb',ice:'ice_bomb',mine:'land_mine',bouncy:'bouncy_bomb',bomb:'air_strike_bomb',bomblet:'cluster_bomblet'}};
})(typeof window!=='undefined'?window:globalThis);
