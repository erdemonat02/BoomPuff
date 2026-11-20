# BOOMPUFF v9 — Test raporu

Ortam: masaüstü Chromium (otomatik testler oyunun kendi nesneleri ve fiziğiyle), headless Edge (ekran görüntüleri). Gerçek cihaz yok.
Test betikleri: `tests/tunnel-reach.js`, `tests/regression.js`.

## 1. Haritalar — 6 harita × 2/3/4/5/6 oyuncu (30 kombinasyon)
### 1a. Tünel erişimi (gerçek karakter fiziğiyle BFS — yürüme, zıplama, çift zıplama; en kısıtlı tür)
Her kombinasyon **2 farklı tohumla** = 60 koşu. Her odaya bir ağızdan (bina lobilerinde sokak kapısından) girilebiliyor mu + her odadan açık gökyüzüne çıkılabiliyor mu (sıkışma yok mu)?

| Harita | Koşu | Sonuç | Ağız sayısı | Oda sayısı |
|---|---|---|---|---|
| Orman Adası | 10 | **10/10** | 3–12 | 2–5 |
| Volkan | 10 | **10/10** | 4 | 3 |
| Neon Şehir | 10 | **10/10** | 2–6 (+lobi kapıları) | 5–9 (58 lobi toplam) |
| Buzul Adası | 10 | **10/10** | 4–6 | 2–3 |
| Kayıp Çöl | 10 | **10/10** | 6 | 3 |
| Lanetli Liman | 10 | **10/10** | 6 (+depo kapıları) | 6 |

Geliştirme sırasında yakalanıp düzeltilen hatalar: ağız rampasının yüzeye çıkmadan bitmesi (dikey kuyu), dar oda kenarı, gemi ambarında zıplanamayan sandık, şehir lobilerinin sokaktan bağımsız kalması, Volkan/5 oyuncuda tünel odasına dikilen sütun dekorunun çıkışı kapatması.

Kapalı boşluk ölçümü (S maskesinde gökyüzüne bağlı olmayan, 600 px'ten büyük, sıvı seviyesinin üstündeki boşluklar): v8'de haritalarda 3–22 adet; v9'da tünel ve odalar için **0** (kalanlar yalnızca suyun/lavın içindeki iskele ayakları arası ve köprü altı alanlar).

### 1b. Başlangıç noktaları ve üretim süresi (masaüstü)
| Harita | 2 / 3 / 4 / 5 / 6 oyuncu — en yakın iki spawn (px) | Harita dışı/sıvı | Üretim (ms) |
|---|---|---|---|
| Orman | 1077 / 824 / 746 / 694 / 609 | 0 | 550–1000 |
| Volkan | 1056 / 824 / 696 / 676 / 611 | 0 | 176–340 |
| Neon Şehir | 1064 / 808 / 747 / 640 / 592 | 0 | 111–207 |
| Buzul | 1057 / 817 / 763 / 515 / 597 | 0 | 233–636 |
| Çöl | 1063 / 824 / 750 / 514 / 640 | 0 | 251–475 |
| Liman | 1122 / 864 / 706 / 535 / 433 | 0 | 168–278 |
Harita genişliği 2400 → 2760 → 3240 → 3720 → 4080 px (değişmedi). Kamera sınırları dünya genişliğini izliyor.

### 1c. Arazi yıkımı ve tüneller
- Aynı patlamada astarlı tünel duvarı **138 px**, doğal toprak **309 px** kaybetti (≈%55 daha dayanıklı, ama yıkılabilir).
- Oda tavanına 3 roket: tavan açıldı (37/37 hücre boş) — açılan geçit çarpışma maskesine anında yansır (aynı `S` dizisi).
- Oda zemini ile alt seviye / sıvı arasında 67–268 px katı kaya; zemin delinip düşen karakter mevcut kurtarma sistemine tabi.

## 2. Kontroller
| Test | Yöntem | Sonuç |
|---|---|---|
| Joystick sağa tam sürükleme | sentetik PointerEvent | yön +1, hız ×1 ✔ |
| Joystick yarım sürükleme | 〃 | hız ×0.55 ✔ |
| JUMP (yürürken, ikinci parmak) | 〃 | zıpladı (vy −318), yürüme sürdü ✔ |
| JUMP parmağı yana kaydı | 〃 | yürüme yönü değişmedi ✔ |
| Joystick + nişan (üçüncü parmak, tuval) | 〃 | nişan güç/açı aldı, yürüme sürdü, yön korundu ✔ |
| Joystick bırak → dur, nişan sürer | 〃 | ✔; atış gerçekleşti |
| Çift zıplama / Tavşan zıplaması / donmuş karakter | kod yolu değişmedi (`Game.jump`, `frozenTurn` kontrolü); tünel BFS'i çift zıplamayı gerçek fizikle kullanıyor | eğitimin zıplama adımı ✔; donmuş/Tavşan için ayrı otomatik test yok |
| Klavye (A/D/←/→, Boşluk/W/↑, 1–0, H, J, U, M, N, Esc) | kod yolu korunarak birleştirildi | eğitimde klavye olaylarıyla zıplama ✔ |
| Yön değişimi | 375×812 ↔ 812×375 ↔ 360×640 düzen kontrolü | joystick/HUD/kompas yerleşimi doğru ✔ |
| **Gerçek dokunmatik ekranda çoklu dokunma** | — | **test edilmedi** |

## 3. Atış
| Test | Sonuç |
|---|---|
| Kompas = gerçek değer (9 güç×açı kombinasyonu) | 9/9: gösterilen güç = `fire()` gücü, gösterilen hız = gerçek mermi hızı (261 / 466 / 960), açı birebir |
| Kırmızı kılavuz = gerçek çarpma (Roket, Ağır Füze, Yapışkan, Buz, El Bombası × rüzgâr −1/0/+0.8) | 15/15 birebir (0 px) |
| Sekmeli Bomba (düzeltme sonrası) | 3/4 birebir; 1 atışta mermi bir savaşçıdan sekti (kılavuz karakterleri hesaba katmaz — v8 ile aynı) |
| Rüzgârdan etkilenmeyen silahlar (El Bombası, Mayın) | kırmızı kılavuz çizilmiyor ✔; kompas "RÜZGÂR ETKİLEMEZ" |
| 10 silah atış + patlama + arazi oyma | 10/10 (Çoklu Roket 6 patlama, Hava Saldırısı 5) |

## 4. Regresyon
| Test | Sonuç |
|---|---|
| Eğitim baştan sona (9 adım + ödül) | ✔ 0→9, `training` istatistiği 1 |
| Hayatta Kalma dalga 1 → 2 | ✔ "Dalga 1 temizlendi!", "SONRAKİ DALGA", dalga 2'de 3 savaşçı, rekor kaydı |
| Yerel çok oyunculu 4 oyuncu | ✔ yapay zekâ yok, sıra 0,1,2,3,0,1,2,3 |
| Zafer / mağlubiyet ekranı | ✔ "Zafer! +60 XP +40", "Yenildin! +20 XP +10" |
| Maç sonu XP/altın, seviye atlama | ✔ |
| Kostüm satın al / kuşan / yeni maçta P1'de görünür / kayıtta kalıcı | ✔ |
| Yeni maçta profil sıfırlanmıyor | ✔ seviye ve altın korundu |
| v8 kaydı (v:1) → v2 göçü | ✔ seviye 7, 1234 altın, 9 galibiyet, kostüm korundu |
| Bozuk ana kayıt → yedek | ✔ geri yüklendi + bildirim |
| İkisi de bozuk / anlamsız alanlar | ✔ çökmeden yeni/onarılmış profil |
| 14 görev, 25 başarım | tanımlar değişmedi (sayılar kodda doğrulandı); hepsinin tek tek kazanılması otomatik test edilmedi |
| JavaScript konsolu | hata yok (yalnızca favicon 404 — v9'da ikon eklendi) |

## 5. Performans (masaüstü ölçümü; telefon ölçümü yok)
- Harita üretimi 110–1000 ms (en uzun: 6 oyunculu Orman); boyama dilimlere bölündü, yükleme ekranı canlı kalır.
- Uyarlanabilir çözünürlük ve ekran dışı dekor atlama eklendi; parçacık sınırı (mobil 520) korundu.
- Bellek: 6 oyunculu haritada arazi tuvalleri ~2×19.6 MB + diziler ~15 MB (tahmini, ölçülmedi).
- **Düşük/orta seviye Android'de FPS, bellek ve uzun maç ölçümü yapılmadı.**

## 6. Gerçek cihaz test planı (yapılmadı — kullanıcı tarafından uygulanacak)
En az: küçük ekran (360×640 dp, Android 10–11), orta (Android 13–14), güncel (Android 15–16, çentikli/edge-to-edge).
1. İlk kurulum ve açılış (splash, yazı tipleri, ses izni gerektirmeden ses) · 2. Ana menü/karakter seçimi · 3. Harita seçimi ve yükleme süresi (6 oyuncu) · 4. 2 oyunculu maç · 5. 6 oyunculu maç (FPS) · 6. Joystick yürüyüş (yavaş/hızlı) · 7. JUMP + çift zıplama · 8. Nişan + atış, joystick ile aynı anda · 9. Her haritada en az bir tünelden geçiş · 10. Tünel tavanını patlatma · 11. Profil kaydı · 12. Uygulamayı kapatıp açma (ilerleme) · 13. 20+ dakikalık maç (ısınma/bellek) · 14. Arka plana alıp dönme (ses durmalı, kayıp olmamalı) · 15. Dikey/yatay ve farklı en-boy oranları, çentik · 16. Geri tuşu davranışı.

## 7. Yayın adayı kabul kriterleri
| # | Kriter | Durum |
|---|---|---|
| 1 | Önceki aşamaların temel özellikleri çalışıyor | ✔ (masaüstü) |
| 2 | 6 haritada gizli bölmelere girilebiliyor | ✔ 60/60 |
| 3 | Tüneller oynanışa dahil | ✔ (siper, YZ konum adayı, yıkılabilir) |
| 4 | Joystick + JUMP mobilde düzgün | ◐ emülasyon + sentetik dokunma ✔, **gerçek cihaz ✗** |
| 5 | Atış göstergesi gerçek değerler | ✔ |
| 6 | Rüzgâr kılavuzu = gerçek fizik | ✔ |
| 7 | 2–6 oyuncuda kritik harita hatası yok | ✔ |
| 8 | Kayıtlar korunuyor | ✔ |
| 9 | Android paketi oluşturuluyor | ✔ debug APK + imzasız release AAB (Capacitor 8.6.2, AGP/Gradle 8.14.3, targetSdk 36); aapt2 ile manifest doğrulandı, web dosyaları ve gömülü yazı tipleri pakette |
| 10 | Release'te kritik hata yok | **✗ release/debug paketi hiçbir cihazda veya emülatörde çalıştırılmadı** |
| 11 | Mağaza materyalleri | ✔ (gizlilik politikası URL'si hariç) |
| 12 | Gizlilik/mağaza gereklilikleri kontrol | ✔ notlar hazır; politika yayını kullanıcıda |
| 13 | Test edilmeyenler raporlandı | ✔ |

**Sonuç: v9 yayın adayı olarak işaretlenmedi.** Eksik: paketin cihazda çalıştırılması (10), gerçek dokunmatik test (4) ve AAB'nin yükleme anahtarıyla imzalanması.
