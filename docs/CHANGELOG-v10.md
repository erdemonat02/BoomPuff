# BOOMPUFF v9 → v10 değişiklik raporu

## 1. Gardırop: ön izleme ve onaylı satın alma (hata düzeltmesi)
- Ürün kartına dokunmak artık **yalnızca ön izler**: karakter büyük ön izlemede ürünle görünür (her 4 sn'de sağa/sola döner), seçili kart mavi çerçeve alır. Altın değişmez, kalıcı kuşanma olmaz.
- Detay alanı: ürün görseli (karakter üzerinde), ad, kategori, fiyat, bakiye ve duruma göre **SATIN AL · 🪙 fiyat / KUŞAN / KUŞANILDI / 🔒 Başarım** butonu.
- SATIN AL → onay penceresi (ürün, harcanacak altın, kalan bakiye, **VAZGEÇ / SATIN AL**). Altın yalnızca onayda düşer. Yetersiz altında pencere açılmaz, uyarı çıkar.
- Satın alınan ürün envantere eklenir ama otomatik kuşanılmaz; KUŞAN ücretsizdir. Aynı ürün ikinci kez satın alınamaz. Gardırop kapanınca ön izleme iptal olur.

## 2. ARKADAŞLARINLA OYNA — gerçek online oda sistemi
- `server/server.js`: Node.js + `ws` WebSocket sunucusu (aynı süreç oyun dosyalarını da sunar). Oda oluştur (2–8 kişi, harita, tur süresi 20/30/45 sn, herkese açık/özel), 6 haneli davet kodu, herkese açık oda listesi, hazır durumu, oda sahibi ayarları ve başlatma, ayrılma, dolu/başlamış/bulunamadı uyarıları, 60 sn yeniden bağlanma, oda sahibi kopunca 45 sn bekleme ve kapanma, sonuç doğrulama.
- Oyun (`NET`, `ONUI` modülleri): oda sahibi otoritesi — oda sahibi fiziği çalıştırır, diğer oyuncuların joystick/zıplama/nişan/atış/silah/savunma/ULTİ/konum girdilerini uygular; 15 Hz durum görüntüsü + anlık patlama olayları. Herkes aynı tohumla aynı haritayı üretir, patlamalar tam koordinatla uygulanır (iki istemcide arazi birebir aynı çıktı). Yeniden bağlanana tüm patlama kaydı gönderilir. Bağlantısı kopan oyuncunun turu 4 sn'de geçilir.
- Online maçlarda herkesin kendi adı, karakteri ve **kostümleri** görünür. Davet: paylaşım menüsü / panoya kopyalama (`?join=KOD` bağlantısı web'de doğrudan katılır).
- 7–8 oyuncu: 6 oyunculuk harita genişliği (4080 px), 2 yeni takım rengi (Pembe, Turkuaz). Yerel çok oyunculu mod değişmedi (2–6, çevrimdışı).

## 3. Silah ve özel güç görsel paketi
- `tools/weapon-art.js`: elle tasarlanmış vektör çizimler (kalın dış hat, degrade hacim, parlama). Her silahın **ayrı** ikonu ve mermisi; 3 fırlatıcı için elde tutulan silah; Hava Saldırısı bombası ve Çoklu Roket alt mermisi; +50 HP ve Kalkan ikonları.
- `asset-pack/`: 512 px kaynak PNG'ler (şeffaf) + kontak sayfası; `www/assets/`: oyun içi optimize PNG'ler (ikon 128 px, mermi/fırlatıcı 128×64; toplam ~193 KB).
- Kullanım: silah kartları, Atış Kompası'ndaki silah ikonu, karakterin elindeki silah, uçan mermiler (yönlü mermiler hız yönüne, bombalar kendi etrafında döner), yere kurulu mayın, +50 HP / Kalkan butonları. Görsel yüklenemezse v9 çizimine geri düşer.
- Patlama efektleri kod içi parçacık sistemi olarak kaldı (yeni görsel dosya üretilmedi).

## 4–5. XP, seviye ve profil
- Maç/bölüm sırasında seviye atlama penceresi ve görev/başarım bildirimleri **gösterilmez**; arka planda kaydedilir (`META.run`).
- Sonuç ekranı: önceki seviye, kazanılan XP, altın, yeni toplam XP, atlanan seviyeler (sırayla animasyon, seviye rozeti "patlar"), özel ödüller (başarım/görev) listesi. Dokununca sona atlar. Her maçın ödül özeti bir kez sunulur. Eğitim bitişinde aynı panel eğitim kutusunda gösterilir. Maçtan sonuç ekranı olmadan çıkılırsa ana menüde tek seviye bildirimi.
- Üst bara **XP kutusu**: "SV 12 · 2.450 / 3.000 XP" + ilerleme çubuğu; dar ekranda "SV 12 · %82". XP kazanıldıkça güncellenir.

## 6. Konumlandırma süresi 10 sn
- `PLACE_T=10` (yerel ve online). Online'da sayaç oda sahibinden gelir; herkes yüklenene kadar (en çok 20 sn) bekleme ekranı, sonra aynı anda başlar. Erken yerleşen kimse süreyi bitirmez; yerleşmeyenler güvenli dağıtılmış başlangıç noktasında kalır.

## 7. Mega Atış
- Seçildiği andan merminin patlamasına kadar karakter yumuşak şekilde **%25 büyür** (ayaklar sabit, oranlar korunur), pembe/altın enerji halesi ve kıvılcımlar; elindeki silah da büyür. Mermi **%40 büyük** çizilir ve karakterlere çarpma yarıçapı aynı oranda büyür (arazi çarpışması nokta tabanlı — duvardan geçmez). Hasar ×2,5, krater ×1,5 (v9 ile aynı). Patlamadan sonra karakter normale döner. Online'da büyüme ve büyük mermi herkese yansır.

## Değişen dosyalar
`www/index.html`, `www/sw.js`, `www/net-config.js` (yeni), `www/assets/**` (yeni), `server/` (yeni), `tools/weapon-art.js`, `tools/art-sheet.html`, `tools/make-weapon-assets.ps1` (yeni), `asset-pack/` (yeni), `package.json`, `android/app/build.gradle` (10.0.0 / 10), `README.md`, `docs/CHANGELOG-v10.md`, `docs/TEST-RAPORU-v10.md`.
