# BOOMPUFF v10.1 — 1. Grup (7 düzeltme)

Sunucu (`server/`) **değişmedi** — Render'a yalnızca istemci dosyaları gider. Değişen dosyalar: `www/index.html`, `www/sw.js` (önbellek adı), `package.json` (10.1.0), bu dosya.

| # | Konu | Ne yapıldı |
|---|---|---|
| 1 | Sunucu adresi | Varsayılan `wss://boompuff.onrender.com`. Öncelik: oyuncunun elle girdiği adres → `net-config.js` → yerel geliştirme (localhost / yerel ağ IP'si: aynı adres) → varsayılan. Sunucu alanı etkin adresi gösterir; boşaltınca varsayılana döner. Açılış bitince tek bir arka plan bağlantısı kurulur (uyuyan sunucuyu da erken uyandırır); mevcut bağlantı varsa yenisi açılmaz; yeniden bağlanma mantığı aynı. |
| 2 | Kodu kopyala | Kodun yanında kopyala butonu → Clipboard API → `execCommand('copy')` yedeği → ikisi de olmazsa kod seçili bırakılır + uyarı. Başarıda butonun üstünde "Kopyalandı!" balonu. |
| 3 | Mobil davet satırı | ≤520 px'te "Davet Et", ≤340 px'te yalnızca ikon; kod yazısı ekrana göre küçülür. 360 px'te taşma yok, kod tam görünür. Masaüstü görünümü aynı. |
| 4 | Joystick | Görünen halka 112→137 px (360 px telefonda), görünmez dokunma payı her yanda +24 px (dokunma kutusu 112→185 px, ~%65 büyük). Ölü bölge %10; hız mesafeyle %40→%100 kademesiz artar. Merkezdeki JUMP biraz küçüldü (yürüme halkası genişledi). Pointer Events / çoklu dokunma / klavye aynı. Alt panelin üstüne binmez. |
| 5 | Harita değiştir | Sonuç ekranında "Haritayı Değiştir" → harita kartları (menüdeki ön izleme görselleriyle). Yerel/bilgisayara karşı: sonraki "Tekrar Oyna" seçilen haritayla. Hayatta Kalma: sonraki dalga. Online: yalnızca oda sahibi seçer; seçim mevcut `settings` mesajıyla oda lobiye döner dönmez gönderilir, başlangıç mesajıyla herkese aynı harita gider. Diğer oyuncularda buton "Haritayı oda sahibi seçer". |
| 6 | Açılış/yüklenme | `#boot`: CSS ile anında oynayan ışın/halka/kıvılcım + logo; gerçek adımlar: yazı tipleri (≤2,5 sn) → silah/güç görselleri (≤6 sn) → menü haritası → seçili harita ön izlemesi → yumuşak geçiş. İlk açılış ≥1,9 sn, aynı oturumda ≥0,35 sn. Hata → "Tekrar dene / Yine de devam et"; betik hiç çalışmazsa 15 sn güvenlik zamanlayıcısı aynı ekranı gösterir. |
| 7 | Zafer/mağlubiyet | Tam ekran: zaferde altın-turuncu ışınlar + konfeti + "ZAFER" rozeti, kazanan karakter zıplar; mağlubiyette sakin mavi atmosfer + yavaş yükselen ışık kabarcıkları + "MAĞLUBİYET". Skor tablosu (taç, renk, ad, eleme, hasar), ödül paneli, büyük butonlar: Tekrar Oyna · Haritayı Değiştir · Odadan Ayrıl (çevrimdışıda "Ana Menü"). Kazanan hesabı değişmedi. |

## Bilinen / raporlanan
- **Düzeltildi — dar telefonda üst bar taşması:** v10'da eklenen XP kutusu yüzünden 360 px'te tur kutusu 30 px'e eziliyor, sağdaki butonlar kenara dayanıyordu. Yalnızca dikey ve ≤420 px ekranlarda: üst bar butonları 38→32 px, aralıklar ve kutu içi boşluklar daraldı, "?" (yardım) butonu gizlendi (ana menüde "Nasıl Oynanır?" var). Sonuç: 360 px'te tur kutusu 111 px, 320 px'te 84 px; ses, müzik ve çıkış butonları ekranda. Yatay ve geniş ekranlar değişmedi.
- PWA önbelleği: tarayıcısına oyunu "Ana Ekrana Ekle" ile kurmuş oyuncular yeni sürümü ilk açılışta değil, bir sonraki açılışta görür (önbellek adı 10.1.0 yapıldı, eski önbellek silinir).
