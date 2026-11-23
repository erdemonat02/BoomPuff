# BOOMPUFF 11.0.0 — Yeni ana menü, karakter ilerlemesi, mağaza, sohbet, 200 HP, skorbord

## 11.0.1 düzeltmeleri (kullanıcı geri bildirimi)
- Ana menü referans düzene geçti: karakter ortada; solda Görevler/Profil/Fırsatlar (geri sayım), sağda Mağaza/Arkadaşlar/Modlar süzülen kutular; altta mod seçici + büyük **OYNA!** (seçili modu doğrudan başlatır).
- Mağaza kartları: eşit yükseklik, görseller ve düğmeler aynı hizada.
- Gardırop: zafer efektleri (konfeti, kalpler, havai fişek, şimşek) önizlemede canlı oynar.
- Oyuna Katıl: harita önizlemesi dikeyde ortalı.
- Sunucu alanı "gelişmiş" olarak kapalı; otomatik olduğu yazıyor (yayındaki sürümde adres göndermeye gerek yok).
- Portal–dekor çakışması: portallar artık mantar/kulübe gibi dekorun üstüne kurulup onu kesmiyor (en son çare dışında).
- Alt bar: kaydırmalı silah şeridi yerine seçili silah düğmesi + açılır silah ızgarası; oyuncu kartlarında kaydırma çubuğu yok; dikeyde bar 158 → 90 px. PNG ikon yüklenemezse çizim ikonuna düşer.
- Üst bar: ad/istatistik ile seviye kutusu üst üste binmez.
- Sohbet: online maçta yüzen yeşil **SOHBET** düğmesi (okunmamış sayacı), panelde kapatma düğmesi; bekleme odasında belirgin "ODA SOHBETİ" kutusu.

## Kararlar (kullanıcı onaylı)
- Kalıcı kayıt şimdilik **cihazda** (localStorage, şema v3). Hesap/veritabanı yok.
- Gerçek ödeme hedefi: **Google Play Billing**. Sunucu doğrulaması hazır, kimlik bilgileri bekleniyor.
- Karakter güçleri: **pasif** (onaylı tablo). P2W: **hafif maç avantajı** (Cephane Paketi).

## Karakter tablosu (taban can 200)
| Karakter | Açılma | Can | Güç | Zayıf yön |
|---|---|---|---|---|
| Maymun / Arı | Başlangıç seçimi (diğeri Sv 2) | 200 | Tırmanış / Süzülme | — |
| Tavşan | Sv 4 | 200 | Süper zıplama | — |
| Tilki | Sv 7 | 200 | Hızlı koşu ×1,35 | — |
| Ayı | Sv 10 | 240 | +40 can (maç başından, kalıcı; Şifa/+50 HP 240'ı aşamaz) | — |
| Kaplan | Sv 13 | 200 | +%15 hasar | — |
| Baykuş | Sv 17 | 190 | Kendi atışları rüzgârdan %50 az etkilenir (nişan önizlemesi dahil) | −10 can |
| Yılan | Sv 21 | 200 | İsabet ettiği rakip kendi 2 turunun sonunda 6'şar zehir hasarı alır | Zıplama ×0,85 |
| Boğa | Sv 25 | 220 | Patlama itmesi ×1,35; kendisi ×0,6 savrulur | Yürüme ×0,85 |
| Ejderha | Sv 30 | 185 | Patlama yarıçapı ×1,15 (krater dahil) | −15 can |

- XP eğrisi: `100 + (seviye−1)×20` → Sv 30 ≈ 11.020 XP. Seviye başına +25×sv altın ve **+5 elmas**.
- Maç XP'sine verilen hasar/10 (en fazla 40) eklendi. Karakter ustalık seviyesi: o karakterle her 3 maçta +1 (en fazla 10).
- Eski (v2) profiller: önceki 6 karakter açık kalır (kimse karakter kaybetmez); yeni 4 karakter seviyeyle açılır.

## 200 HP
- `BASE_HP=200` (Fighter). Silah hasarları DEĞİŞMEDİ. Öldürme isabet sayısı: Roket (45) ≈5, Ağır Füze (70) 3, El Bombası (50) 4.
- Yapay zekâ savunma/şifa eşikleri can oranına göre ölçeklendi. Eğitim kuklası (400) ve Hayatta Kalma ölçeği aynı mantıkla çalışır.
- Öneri (uygulanmadı): +50 HP / Şifa → +80 (200 HP'de oransal etkisi yarıya indi).

## Yeni / değişen dosyalar
- `www/index.html` — ana menü, Oyuna Katıl paneli, mağaza, ayarlar, başlangıç seçimi, sohbet arayüzü, 4 karakter çizimi, güçler, istatistik, skorbord; v10.6'da bozulan `fonts/fonts.css` bağlantısı onarıldı.
- `www/i18n.js` — yeni metinlerin İngilizcesi; joystick konum ifadeleri nötrleştirildi.
- `www/chat-filter.js` (yeni) — TR/EN küfür filtresi; istemci + sunucu ortak.
- `www/sw.js` — önbellek v11, `/api/` önbelleğe alınmaz.
- `server/server.js` — yeni karakterler, sohbet (filtre + hız sınırı + son 30 mesaj), Cephane Paketi koltuk bilgisi, `/api/catalog`, `/api/iap/verify`.
- `server/catalog.js` (yeni) — merkezi gerçek para ürün kataloğu.
- `server/iap.js` (yeni) — Google Play doğrulaması (hizmet hesabı JWT), tekrar işleme koruması.
- `.gitignore`, `package.json`, `server/package.json` (11.0.0), `.claude/launch.json` (yerel test).

## Bekleyen dış yapılandırma (Google Play)
1. Play Console'da `server/catalog.js` içindeki kimliklerle tüketilebilir ürünler: gems_100, gems_550, gems_1200, gold_3000, gold_8000, starter_pack.
2. Google Cloud hizmet hesabı + Play Console'da API erişimi (finansal veri izni).
3. Render ortam değişkenleri: `GOOGLE_PLAY_PACKAGE=com.boompuff.game`, `GOOGLE_PLAY_SA_JSON=<JSON ya da base64>`.
4. Kalıcı disk (Render ücretli) ya da veritabanı → `IAP_LEDGER_FILE`; ücretsiz planda işlenen ödeme kaydı yeniden başlatmada silinir.
5. Uygulamaya `cordova-plugin-purchase` eklenmeli (`npm i cordova-plugin-purchase && npx cap sync android`), ardından Play iç test kanalında test hesaplarıyla deneme.
