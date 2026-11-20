# BOOMPUFF v8 → v9 sürüm değişiklik raporu

## v8 kod denetimi bulguları (değişiklikten önce)
| Kontrol | Bulgu |
|---|---|
| README'deki özellikler kodda var mı? | 10 silah, 6 karakter, 6 harita, konumlandırma, kurtarma balonu, rüzgâr kılavuzu, eğitim/görev/hayatta kalma, XP/altın/kostüm, kayıt kodda **mevcut ve çalışıyor**. |
| Görsel mi, oynanışa etkili mi? | **Mağaralar/gizli bölmeler yalnızca görseldi**: orman kemer tüneli, rastgele mağaralar, buz mağarası, volkan magma odası, piramit odası/koridoru (ayrıca 24 px yüksekliğinde — karakter sığmazdı), tapınak mahzeni, gemi ambarı, fener kapısı, depo/bina odaları ve addCover "kaya girintileri" araziye **tamamen kapalı** boşluklardı. Ölçüm: haritalarda 3–22 kapalı boşluk, hiçbirine girilemiyordu. |
| 6 harita × 2–6 oyuncu | Harita üretimi ve başlangıç noktaları sorunsuz (yeniden ölçüldü, aşağıda). |
| Yeni maçta profil korunuyor mu? | Evet. Ancak kayıt 150 ms gecikmeli yazılıyordu; uygulama o arada kapanırsa son ilerleme kaybolabiliyordu. Bozuk kayıtta yedek yoktu, alan doğrulaması yoktu. |
| Yerel çok oyunculu sıra/kontrol | Doğru (tüm takımlar insan, sıra döngüsü doğru). Menüde mod etiketi "2 oyuncu" yazıyordu ama 2–6 oyuncu destekleniyordu. |
| Fizik | Silahlar/patlama/arazi doğru. **Sekmeli Bomba'nın kılavuz bitiş noktası** "3 sekişte patla" kuralını bilmiyordu (gerçekle 185–444 px fark). Oyun döngüsü yavaş cihazda biriken zaman açığını atmıyordu (gecikme sarmalı). |
| Mobil HUD | 375 px'te sığıyor; ◀ ▶ ⤒ butonları küçük ve ayrık. Harita üretimi ana iş parçacığını tek seferde kilitliyordu (yükleme çubuğu donuyordu). |

## Eklenenler
- **Oynanabilir tünel/mağara motoru** (`tunInit/tunSeg/tunPassage/tunMouth/tunRoom/tunLower/bldRooms/tunDress`): yüzeyi izleyen eğim sınırlı geçitler, yüzeye çıkana kadar süren giriş rampaları (dikey kuyu oluşmaz), kubbeli odalar, alt seviye paralel koridorlar, ince tavan kuralı, dayanıklı astar (Z=232, HARD 0.62), haritaya özgü renk paleti ve ışık/dekor.
- 6 haritaya özgün tünel ağları (README tablosu). Tünel odaları yapay zekâ konum adayı; ağızlar önüne dekor/siper/kaya konmaz; üstü açılmış oda zeminlerine dekor dikilmez.
- **Joystick + JUMP** (`#joy`): sol alt, yarı saydam, ışıklı halka; merkezdeki JUMP ayrı dokunma alanı (orada başlayan parmak hiç yürütmez); sürükleme mesafesine göre %55 / %100 hız; donmuş karakterde JUMP gri; kendi turun değilken soluk. Nişan alırken yürüme ve zıplama serbest (yürümek atış yönünü çevirmez).
- **Atış Kompası** (`drawCompass`): kavisli açı skalası + iğne, 12 kademeli renk değiştiren enerji halkası ve yeni dolan kademe parlaması, %güç, derece, rüzgâr etkisi (ARKADAN / KARŞIDAN / ETKİLEMEZ / YOK, katsayı), silah ikonu+adı, gerçek mermi hızı, "BIRAK → ATEŞ" ipucu ve atış anında altın parlama. Küçük ekranda tek satırlık kompakt sürüm; bir savaşçı altında kalırsa saydamlaşır / sola geçer. Karakterin yanında eş zamanlı açı yayı + derece.
- PWA: manifest, service worker (çevrimdışı), ikonlar. Capacitor 8 yapılandırması, Android geri tuşu (panel kapat → çift basışla menü → çift basışla çıkış), arka plana alma (ses askıya, kayıt diske), uyarlanabilir çözünürlük (uzun süre <42 FPS → piksel yoğunluğu 2 → 1.5 → 1).
- Marka: oyunun kendi çizimleriyle ikon (192/512/maskable/1024), adaptive ikon katmanları, 2732 splash, 1024×500 tanıtım görseli; 7 gerçek oyun ekran görüntüsü.

## Düzeltilenler
- Tüm kapalı mağara/oda/girintiler gerçek girişlere bağlandı; "kaya girintileri" alçak yamaca açılıyor ve ağızları sonradan kapatılmıyor.
- Harita üretimi parça parça (boyama 260 sütunluk dilimler) → yükleme ekranı gerçek ilerleme gösterir ve donmaz; iptal edilen yükleme sonradan durumu bozamaz (token).
- Oyun döngüsü: 8 adımı aşan açık atılır.
- Kayıt şeması **v2** + göç (v8 kayıtları korunur), alan doğrulama/onarım, bozuk ana kayıtta yedekten (`bp_profile_bak`) geri yükleme + bildirim, `pagehide`/`visibilitychange`/Capacitor `pause`'da anında yazma.
- Sekmeli Bomba kılavuz bitiş noktası gerçek kuralla birebir.
- 360 px genişlikte ipucu satırı joystick ve karakterle çakışmıyor; mod etiketi "Yerel çok oyunculu (aynı cihaz, sırayla)".
- Ekran dışı dekorlar çizilmiyor (büyük haritalarda kare süresi).

## Değişmeden korunanlar
6 karakter ve özellikleri, 10 silah ve değerleri, 6 harita teması ve olayları (volkan patlaması, kum fırtınası, sis, buz kayması), haritanın oyuncu sayısıyla büyümesi, 5 sn konumlandırma, güvenli düşüş + kurtarma balonu, kırmızı kesikli rüzgâr kılavuzu, eğitim/görevler/hayatta kalma, XP/altın/seviye/25 başarım/14 görev, gardırop, sinematik yükleme ekranları, ses/müzik, oyun sonu animasyonları, klavye kontrolleri.

## Test edilen ortamlar
Masaüstü Chromium (Claude tarayıcı paneli) — 1280 px, 375×812, 360×640, 812×375 emülasyonları; headless Microsoft Edge (ekran görüntüleri, 360×640 ve 640×360 @3x). **Gerçek telefon / Android WebView: test edilmedi.**
