# BOOMPUFF v10.4 — 3. grup düzeltmeleri + 4. Grup (1v1 Ölüm Maçı)

Değişen dosyalar: `www/index.html`, `www/sw.js` (önbellek 10.4.0), `package.json` (10.4.0), **`server/server.js`** ve `server/package.json` (10.4.0), bu dosya.

> **Sunucu değişti (küçük, geriye uyumlu ekleme):** odaya `mode` ("classic" / "dm") ve `dur` (90/120/180) alanları eklendi. Oda, bağlantı, koltuk, oda sahibi otoritesi, anlık görüntü/olay aktarımı **aynı**. GitHub'a gönderince Render otomatik yeniden yükler. Eski sürüm istemciler yeni alanları görmezden gelir (Klasik oda olarak oynarlar); Ölüm Maçı için iki oyuncunun da 10.4'te olması gerekir.

## A. 3. grup geri bildirimleri (10.3.1)
| # | Konu | Ne yapıldı |
|---|---|---|
| 1 | Mermiler portaldan geçer | Uçan her mermi (roket, bomba, mayın, hava saldırısı bombası, meteor…) portala girince bağlı portalda **aynı göreli noktadan, aynı hız vektörüyle** çıkar; yerçekimi, rüzgâr, sekme, fitil aynen devam eder. Çıkış portalı mermi uzaklaşana kadar kilitli (geri sekme yok), bir mermi en fazla 6 kez geçebilir. Online: yalnızca oda sahibi hesaplar; istemcide iz çizgisi haritayı boydan boya çizmesin diye sıfırlanır. Test: roket P(372) → Q(2100) 2. karede geçti, hız korunarak devam etti, geri sekmedi. |
| 2 | 3x küre konumu | Artık haritanın **orta şeridinde** (%36–64) ve çevresindeki (±170 px) **en yüksek zeminin 200–340 px üstünde**, açık gökyüzünde doğar. 12 denemede x 870–1490 / 2400, zeminden 230–555 px yukarıda. |
| 3 | Harita şeridi döngüsü | Oda oluşturma/lobi şeridi sonsuz döngü: oklarla Liman → Rastgele → Orman (geri de), parmakla kaydırırken sona gelince görünmeden başa döner (kartlar 3 kopya, kaydırma durunca ortadaki kopyaya atlanır). |
| 4 | Türkçe karakter fontu | Başlık fontu Lilita One'da **Ş Ğ İ ş ğ yoktu** (ölçüldü) → başka fonta düşüyordu. Kelime içeren tüm başlıklar (pencere başlıkları ör. "ARKADAŞLARINLA OYNA", ZAFER/MAĞLUBİYET rozeti, yükleme ekranı ve maç girişi harita adı) projede zaten bulunan **Baloo 2 ExtraBold**'a geçti (tüm Türkçe harfler var). Lilita One yalnızca BOOMPUFF logosu, rakamlar ve davet kodunda kaldı (Türkçe harf yok). Büyük harfe çevirme Türkçe kurala göre (ŞEHİR, İ). |

### Testte bulunan ve düzeltilen
- **Davet kodu alanı eziliyordu (10.1 hatası):** sonuç ekranı skor satırına verdiğim `.orow` adı online ekranındaki kod satırıyla çakışmış; 360 px'te kod alanı 23 px'e düşmüştü → sonuç ekranı kuralları `#over` altına alındı; kod alanı 204 px.
- Açılış ekranı, açılış sürerken başlamış bir maçın (?demo= / davet bağlantısı) haritasını menü haritasıyla ezebiliyordu → yalnızca menüdeyken yükler.

## B. 4. Grup — 1v1 Ölüm Maçı
| Konu | Nasıl |
|---|---|
| Nerede | Ana menü → Mod → **⚔️ 1v1 Ölüm Maçı** (bilgisayara karşı; zorluk seçilebilir). Online: Oda oluştur → **Oyun türü: Klasik / 1v1 Ölüm Maçı** + maç süresi. Lobide oda sahibi türü ve süreyi değiştirebilir; misafir "⚔️ 1v1 Ölüm Maçı · 120 sn" görür; açık oda listesinde de yazar. |
| Süre | Geri sayım: **90 / 120 / 180 sn** (onayladığınız seçenekler). Saat, başlangıç konumlandırması bitince başlar; yeniden doğma sırasında da akar. Süre bitince oynanmakta olan atış tamamlanır, yeni tur başlamaz. |
| Tur | Her oyuncunun turu **15 sn**. Sıra tabanlı yapı aynen korunur (mevcut mod değişmedi). |
| Skor | Rakip ölünce +1. Kendi atışıyla ya da suya/lavlara düşerek ölen oyuncunun skoru **rakibe** yazılır. Ani ölüm (yükselen sıvı) bu modda yok. |
| Yeniden doğma | Ölüm maçı bitirmez. Turlar arasında ölen savaşçı tam canla canlanır, önce otomatik olarak rakipten uzak güvenli bir noktaya konur; **8 sn** içinde sürükleyip istediği uygun yere bırakabilir (mevcut konum kontrolü: harita dışı, su/boşluk, arazi içi, portal önü, dar zemin, rakibe çok yakın — hepsi yasak). Bu sırada diğer oyuncu kendi karakterini taşıyamaz. Bilgisayar 1,4 sn'de yerleşir. Yeniden doğuşta beyaz parıltı + halka. Mermi/silah hakları maç boyunca sürer. |
| Skorbord | Üst barın altında ortada: iki taraf takım renginde, avatar + ad + büyük skor; ortada mavi kapsülde **kalan süre** ve ilerleme çubuğu. Skor artınca sayı zıplar, önde olanın üstünde 👑, son 10 sn kırmızı nabız, süre bitince gri. Atış Kompası bu modda skorbordun altına iner. |
| Sonuç | En çok öldüren kazanır; başlıkta skor ("Zafer! 3 – 1"). Eşitlikte **BERABERE** görünümü. Sonuç tablosunda "öldürme" sütunu. |
| Online | Saat, skor ve yeniden doğanlar oda sahibinde hesaplanır ve anlık görüntüyle herkese gider; misafirin konum seçimi mevcut `place` komutuyla. Yeni bağımsız sistem yok. |

## Test edilenler (hedefli)
- Yerel (bilgisayara karşı, 90 sn): saat akıyor, tur 15 sn; rakip ölünce skor 1–0, rakip 1,4 sn'de geçerli bir noktada doğdu, sıra ona geçti; oyuncu ölünce 8 sn konum seçimi, seçilen yer uygulandı, rakip karakteri sürüklenemedi, saat bu sırada da aktı; süre bitince "BERABERE · 1 – 1". Tekrar Oyna aynı ayarla başladı. Skorbord ekran görüntüsü (360 px): 3–1, 👑, kırmızı 0:08.
- Online (iki sekme, 180 sn): oda Ölüm Maçı olarak kuruldu (kapasite 2, tur 15); misafir lobide türü gördü; oda sahibi misafiri öldürdü → iki tarafta 1–0; misafirde "YENİDEN DOĞ!", seçtiği yer oda sahibinde uygulandı; süre bitince oda sahibinde "ZAFER 1 – 0", misafirde "MAĞLUBİYET 1 – 0". Lobide Klasik'e dönüş (tur 30, kapasite artırılabilir) ve tekrar Ölüm Maçı (2 kişi, 15 sn) sunucu kurallarıyla doğrulandı.
- 360 px ana menü: 3 mod düğmesi taşmıyor.

## Bilinen / elle kontrol
- Ölüm Maçı yerelde yalnızca bilgisayara karşı; arkadaşla oynamak için online oda. (İsterseniz aynı cihazda iki kişilik Ölüm Maçı da eklenebilir.)
- Gerçek telefonda: skorbordun oyun alanını kapatma hissi, 8 sn yeniden doğma süresinin yeterliliği.
- Test tarayıcısında animasyonlu kaydırma çalışmadığı için şerit oklarının yumuşak kayması telefonda görülmeli (seçim mantığı doğrulandı).
