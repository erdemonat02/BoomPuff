# BOOMPUFF v10.3 — 3. Grup (Geçit portalları + 3x çarpan küreleri)

Sunucu (`server/`) **değişmedi**. Değişen dosyalar: `www/index.html`, `www/sw.js` (önbellek 10.3.0), `package.json` (10.3.0), bu dosya.

## 11. Geçit portalları
| Konu | Nasıl |
|---|---|
| Konum | Harita üretildikten sonra harita tohumundan (seed) ve arazinin kendisinden hesaplanır → online'da her cihaz aynı yeri bulur, ek mesaj gerekmez. 2400 px dünyada 1 çift (sol ↔ sağ uç bölgeler); 4+ oyunculu geniş haritalarda 2 çift (ikinci çift orta bölgeler). Önce düz ve tünel girişinden uzak yer aranır; bulunamazsa eğimli, en son tünel kısıtı olmadan (her haritada portal çıkar — 6 harita × 2 genişlik × 2 tohum denendi). |
| Güvenli platform | Her portalın altında 92 px genişliğinde **kırılmaz** büyülü taş platform (mevcut "yıkılmaz" arazi türü — patlamalar oyamaz), üstünde 68×100 px boş geçiş alanı. Karakter platformun üstüne, portalın içine doğar → düşmez, sıkışmaz. |
| Geçiş | Karakter portalın içine girince bağlı portaldan çıkar; yatay hızı korunur (±260 ile sınırlı), aşağı hızı sıfırlanır. İki yönlü. Yürüyerek, zıplayarak ya da patlamayla savrularak girilebilir. |
| Sonsuz döngü koruması | Çıkılan portal kilitlenir; karakter ondan ~40 px uzaklaşana kadar tekrar tetiklenmez + 0,7 sn bekleme. (Test: çıkışta 1 sn beklendi → geri sekmedi; uzaklaşıp geri girince karşıya geçti.) |
| Görsel | Dönen spiral girdap (iki çift ters yönde döner), kesikli dönen enerji çerçevesi, taş kemer, parıltı, dönen kıvılcımlar. Çift renkleri: mor ● ve turuncu ◆ — aynı renk/simge = bağlı portallar. Geçişte iki uçta halka + kıvılcım + ses. |
| Kurallar | Başlangıç konumlandırmasında ve doğma noktalarında portal önü yasak ("Portalın önü"). Portalın bulunduğu yerdeki süs (ağaç vb.) kaldırılır. Ani ölümde sıvı portala ulaşırsa portal sönük görünür ve çalışmaz. Eğitim modunda portal yok. Mermiler portaldan geçmez (yalnızca karakterler). |
| Online | Geçişi yalnızca oda sahibi hesaplar; konum mevcut anlık görüntüyle gider, efekt için küçük `ev {k:'pt'}` olayı. |

## 12. 3x çarpan küreleri
| Konu | Nasıl |
|---|---|
| Ne zaman | Maçın başında yok. Her oyuncu ~2 tur oynadıktan sonra (tur ≥ max(5, 2×oyuncu+1)) gökyüzünde belirir. Aynı anda en fazla 1 küre (5+ oyuncuda 2). Kullanılmazsa ~2 tam tur sonra söner; yenisi en erken bir tam tur sonra gelir. |
| Nerede | Zeminin 170–340 px üstünde, araziden en az 46 px uzakta, oyunculara ve portallara yakın olmayan rastgele bir nokta (oda sahibinin ayrı rastgele üreticisi). |
| Etki | Mermi kürenin içinden geçerse (kare arası çizgi testi, kaçırma yok) 3'e bölünür: asıl mermi + ±9° açıyla ayrışan 2 kopya (hız ±%3). Kopyalar aynı silah, hasar çarpanı, Mega Atış, fitil süresi ve sahibini taşır → el bombası/sekmeli bomba aynı anda patlar, mayın 3 mayın kurar, yapışkan 3 ayrı yapışır, buz 3 kez dondurur, itici 3 kez iter. Küre tükenir. |
| Hangi silahlar | Roket, El Bombası, Ağır Füze, İtici, Yapışkan, Buz, Mayın, Sekmeli (8 silah — hepsi tek tek test edildi). **Hariç:** Çoklu Roket ve Hava Saldırısı (sizin isteğiniz). Şimşek ve ulti'ler hedef seçimli olduğu için uçan mermi oluşturmaz → küreyle etkileşmez. |
| Tekrar koruması | Çarpan alan merminin ve kopyalarının üzerinde işaret kalır; ikinci bir küreden geçseler de çoğalmazlar (test edildi). |
| Görsel | Turuncu-altın parlayan küre, içinde "3x", iki dönen enerji halkası, hafif nabız ve süzülme; çıkışta "3x KÜRESİ!" yazısı. Geçişte flaş + iki şok halkası + 30 kıvılcım + "3x!" + üç notalı ses. |
| Online | Algılama yalnızca oda sahibinde → tüm cihazlarda aynı sonuç. Küreler anlık görüntüde (`ob`), tüketilme `ev {k:'orb'}` olayıyla; kopya mermiler mevcut mermi senkronuyla dağılır. |

## Test edilenler (hedefli)
- 6 harita × 2 genişlik × 2 tohum: her durumda portal çifti oluştu; platform kırılmaz, geçiş alanı boş.
- Yerel: iki yönlü geçiş, döngü koruması, kilit açılması; küre doğuş kuralı (2. turda yok, 6. turda 1, ikinci eklenmedi); 8 silahın her biri 3'e bölündü; Çoklu Roket bölünmedi; ikinci küre tekrar çoğaltmadı.
- Online (iki sekme, Liman haritası): portallar iki cihazda aynı konumda; oda sahibi misafirin karakterini portala soktu → misafirde çıkış konumu ve iki portal efekti; oda sahibinin roketi küreden geçti → misafirde küre görüldü, "3x" patlaması bir kez oynadı, 3 mermi ve kraterler geldi. Konsol hatası yok.

## Elle kontrol
- Gerçek maçta portalların konumunun stratejik hissi; kürenin yüksekliğinin ulaşılabilirliği (atış gücüyle).
- Bilgisayar rakibi portalları ve küreleri bilerek kullanmaz (yürürken yanlışlıkla girebilir).
- Eski sürümle (10.1/10.2) karışık oda: portallar ve küreler eski istemcide görünmez → herkes güncel sürümde olmalı.
