# BOOMPUFF v10 — Hedefli test raporu (yalnızca v10 değişiklikleri)

Ortam: masaüstü Chromium (Claude tarayıcı paneli), yerel sunucu `server/server.js` (http://localhost:8787). Kullanım kotasını korumak için **v9'da test edilmiş hiçbir sistem yeniden test edilmedi.**

## Gardırop
| Kontrol | Sonuç |
|---|---|
| Ürüne dokununca satın alma olmuyor (altın 300 → 300, sahiplik yok, kuşanma yok) | ✔ |
| Ön izleme karakter üzerinde görünüyor (ekran görüntüsüyle: Kovboy şapkası maymun üzerinde) | ✔ |
| Başka ürüne dokununca ön izleme geçiyor | ✔ |
| SATIN AL → onay penceresi; VAZGEÇ altın değiştirmiyor | ✔ |
| Onay sonrası altın düşüyor (−150), ürün envantere ekleniyor, otomatik kuşanılmıyor | ✔ |
| KUŞAN ücretsiz; tekrar satın alma altın düşürmüyor | ✔ |
| Yetersiz altında onay açılmıyor, altın değişmiyor | ✔ |
| Kapanınca kuşanılan korunuyor; kayıt diske yazılıyor | ✔ |

## Online (aynı bilgisayarda **iki ayrı tarayıcı sekmesi**, yerel sunucu)
| Kontrol | Sonuç |
|---|---|
| Oda oluşturma, 6 haneli kod, herkese açık listede görünme | ✔ |
| Hatalı kod uyarısı ("Bu kodla bir oda bulunamadı.") | ✔ |
| Kodla katılma, oyuncu listesi, hazır durumu, oda sahibinin başlatması | ✔ |
| İki istemcinin aynı maça bağlanması (aynı tohum, aynı harita genişliği, iki takım) | ✔ |
| Konumlandırma sayacı oda sahibinden: istemcide 10 sn'den geri sayım; istemcinin konum isteği oda sahibinde uygulanıp geri yansıdı | ✔ |
| Oda sahibinin atışı → istemcide patlama/arazi | ✔ |
| İstemcinin turu: joystick ile yürüme (85 px, oda sahibinin fiziğiyle), silah değiştirme, atış → iki tarafta patlama | ✔ |
| 3 patlama sonrası arazi özeti iki istemcide **aynı** (ilk denemede yuvarlama farkı bulundu ve düzeltildi) | ✔ |
| İstemci kopması → "yeniden bağlanılıyor" → otomatik dönüş, maç sürüyor; oda sahibine "Bağlandı" bildirimi | ✔ |
| Oda sahibi kopması → istemcide "45 sn bekleniyor"; dönünce devam | ✔ |
| Oda sahibi 45 sn dönmeyince oda kapandı, istemci ana menüye döndü | ✔ |
| Maç sonucu: oda sahibinde "Zafer!", istemcide "EvSahibi kazandı!" + kendi ödülleri | ✔ |
| 7–8 oyuncu: harita 4080 px (6 oyunculuk); 8 spawn arası en az 480 px, harita dışı/sıvı 0 (kod üzerinden) | ✔ |
| **Farklı cihazlar / farklı internet bağlantıları arası gerçek test** | **YAPILMADI** — sunucu internete yayınlanmadı |
| 3+ gerçek oyunculu maç, mobil ağda gecikme, uzun maç | **test edilmedi** |

## Görsel paket
| Kontrol | Sonuç |
|---|---|
| 26 oyun içi PNG'nin yüklenmesi (ağ kaydı: hepsi 200) | ✔ (gereksiz 2 ikon isteği bulunup kaldırıldı) |
| Silah kartlarında, Atış Kompası'nda, elde tutulan silahta, uçan mermide, +50 HP/Kalkan butonlarında görünme | ✔ ekran görüntüsü |
| Şeffaf arka plan (kontak sayfası) | ✔ |

## XP ve profil
| Kontrol | Sonuç |
|---|---|
| Maç içinde 2 seviye atlandı + başarım açıldı → seviye penceresi açılmadı | ✔ |
| Sonuç ekranında toplu gösterim (+310 XP, +395 altın, "2 SEVİYE · SEVİYE 3!", başarım listesi), animasyon sonu SV 3, çubuk %14 = 35/250 | ✔ |
| Üst bar XP kutusu güncel (SV 3 · 35 / 250 XP) | ✔ |
| Ödül özeti tüketildi (ikinci kez gösterilmez) | ✔ |

## Konumlandırma ve Mega Atış
| Kontrol | Sonuç |
|---|---|
| Süre 10 sn (yerel `PLACE_T`, online sayaç) | ✔ |
| Süre bitince yerleşmeyenler başlangıç noktasında, maç başladı | ✔ (online testte oda sahibi yerleşmedi) |
| Mega: ulti 3 → 0, karakter 1,00 → 1,25, mermi ölçeği 1,4 (+krater ×1,5), patlama sonrası 1,00, sonraki turda kapalı | ✔ |

## Bilerek tekrarlanmayan testler
v9'da yapılmış: 60 tünel erişim koşusu, 30 harita/oyuncu kombinasyonu, eğitim, görevler/başarımlar listesi, hayatta kalma, karakter/harita seçimi, 10 silah fiziği, rüzgâr kılavuzu, kayıt göçü, joystick, Atış Kompası değerleri.

## Bilinen eksikler / sınırlar
- Online maç **oda sahibi otoritelidir**, tam sunucu otoritesi değildir (sunucu koltuk sahipliğini ve sonucu doğrular, fiziği değil).
- Oda sahibi maçtan tamamen çıkarsa oda kapanır (oda sahipliği devri yok).
- İstemcide kendi karakterinin hareketi oda sahibi üzerinden döner; yüksek gecikmede yürüme hafif gecikmeli hissedilebilir.
- Hava Saldırısı/Meteor gibi ULTİ ve olay görselleri (volkan dumanı vb.) istemcide kısmen sadeleştirilmiş gösterilir; hasar/konum doğruluğu etkilenmez.
- Yeni görseller vektör çizimdir (yapay zekâ görsel üretim aracı kullanılmadı / yoktu); 3D render değildir.
- Android APK/AAB yeniden derlendi ancak **cihazda çalıştırılmadı**; uygulamada online için `net-config.js`'e wss:// adres yazılmalı.
