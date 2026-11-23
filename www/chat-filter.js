/* BOOMPUFF v11 — merkezi sohbet filtresi (Türkçe + İngilizce). Hem istemci (www) hem sunucu (server.js require) aynı dosyayı kullanır.
 * Kelime eklemek için yalnızca aşağıdaki listeleri düzenleyin:
 *   EXACT    → kelimenin tamamı eşleşirse sansürlenir (kısa/çok anlamlı kelimeler; "ama", "amca", "got" gibi normal kelimeler korunur)
 *   PREFIX   → kelime bu kökle başlarsa sansürlenir (Türkçe ekler: "siktir", "orospunun" …)
 *   CONTAINS → kelimenin içinde geçerse sansürlenir (yalnızca normal bir kelimenin içinde geçmesi pek mümkün olmayan kökler)
 * Atlatma girişimleri: büyük/küçük harf, harf tekrarı (fuuuck), rakam/simge (f*ck, s1kt1r, @mk), kelime içi noktalama (s.i.k.t.i.r)
 * ve harfler arasına boşluk (s i k t i r) yakalanır. Algılanan kelime "**" ile değiştirilir.
 * Türkçe harfler iki ayrı biçimde kontrol edilir: "ı/i, ö/o" farkını koruyan biçim (kısa kelimeler; "sıkı" ≠ "sik") ve
 * ASCII'ye indirgenmiş biçim (uzun kökler; "orospu"/"oruspu" vb.). */
(function (root) {
  'use strict';
  // Not: "sıktı/sıkıştım/sıkıntı" gibi kelimeler Türkçe klavyesiz "sikti/sikistim/sikinti" yazılabildiği için bu kökler bilerek listede YOK.
  const EXACT = ['amk', 'amq', 'aq', 'amına', 'oç', 'piç', 'göt', 'götü', 'götün', 'sik', 'sike', 'sikim', 'sikem', 'sg', 'sktr', 'skm', 'yarak', 'mk',
    'dick', 'cock', 'fag', 'twat', 'wanker', 'prick'];
  const PREFIX = ['sikik', 'sikiş', 'siker', 'sikey', 'sikiyim', 'orospu', 'oruspu', 'orosbu', 'yarrak', 'yarağ', 'yarag', 'amcık', 'amcik', 'amına', 'amina', 'amını', 'amini',
    'pezevenk', 'kahpe', 'kaltak', 'gavat', 'ibne', 'puşt', 'yavşak', 'yavsak', 'dalyarak', 'dalyarrak', 'taşak', 'tasak', 'götveren', 'gotveren', 'götlek', 'şerefsiz', 'serefsiz', 'kancık', 'kancik', 'sürtük', 'surtuk',
    'bitch', 'bastard', 'asshole', 'cunt', 'whore', 'slut', 'faggot', 'shit', 'dickhead', 'jerkoff', 'motherf'];
  const CONTAINS = ['fuck', 'fck', 'orospu', 'yarrak', 'siktir', 'pezevenk', 'nigger', 'nigga', 'motherfuck'];
  const LEET = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '@': 'a', '$': 's', '!': 'i', '€': 'e', '|': 'i' };
  const FOLD = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'â': 'a', 'î': 'i', 'û': 'u' };
  const lower = s => s.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase();
  // harf dışı her şeyi at (leet önce çevrilir), tekrar eden harfleri teke indir
  const keep = s => { let o = ''; for (const ch of lower(s)) { const c = LEET[ch] || ch; if (/[a-zçğıöşüâîû]/.test(c) && c !== o[o.length - 1]) o += c; } return o; };
  const fold = s => s.replace(/[çğıöşüâîû]/g, c => FOLD[c]);
  const norm = w => keep(w);
  const Lx = EXACT.map(norm), Lp = PREFIX.map(norm), Lc = CONTAINS.map(norm);
  const ok5 = w => w.length >= 5 && !w.startsWith('sik'); // "sik…" kökleri ASCII'ye indirgenmiş biçimde denetlenmez ("sıkışmak" → "sikismak" korunur)
  const LxF = Lx.filter(ok5).map(fold), LpF = Lp.filter(ok5).map(fold), LcF = Lc.map(fold);
  // ASCII "i" ile yazılmış kısa kökler (sik, sike…) "ı" yazımıyla karışmasın diye yalnızca korunan biçimde denetlenir
  function bad(word) {
    const k = keep(word); if (!k) return false; const f = fold(k);
    if (Lx.includes(k) || LxF.includes(f)) return true;
    for (const p of Lp) if (k.startsWith(p)) return true;
    for (const p of LpF) if (f.startsWith(p)) return true;
    for (const c of LcF) if (f.includes(c)) return true;
    return false;
  }
  function censor(text) {
    const s = String(text == null ? '' : text);
    // parçalar: boşluk dışı diziler + boşluklar (biçim korunur)
    const parts = s.split(/(\s+)/), words = [];
    for (let i = 0; i < parts.length; i++) if (parts[i] && !/^\s+$/.test(parts[i])) words.push(i);
    let hit = false; const out = parts.slice();
    for (const i of words) if (bad(parts[i])) { out[i] = '**'; hit = true; }
    // "s i k t i r" — art arda gelen tek harfli parçaları birleştirip denetle
    for (let a = 0; a < words.length;) {
      let b = a; while (b < words.length && keep(parts[words[b]]).length === 1) b++;
      if (b - a >= 2) { const joined = words.slice(a, b).map(i => parts[i]).join(''); if (bad(joined)) { for (let j = a; j < b; j++) out[words[j]] = j === a ? '**' : ''; hit = true; } }
      a = b > a ? b : a + 1;
    }
    let r = out.join(''); if (hit) r = r.replace(/\s{2,}/g, ' ').trim();
    return r;
  }
  const API = { censor, isBad: bad, lists: { EXACT, PREFIX, CONTAINS } };
  if (typeof module === 'object' && module.exports) module.exports = API; else root.CHATFILTER = API;
})(typeof window !== 'undefined' ? window : globalThis);
