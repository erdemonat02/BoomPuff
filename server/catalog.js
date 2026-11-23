// BOOMPUFF v11 — merkezi ürün kataloğu (gerçek para ürünleri). Fiyat ve içerik YALNIZCA burada tanımlanır.
// • id'ler Google Play Console → Uygulama içi ürünler bölümünde AYNI kimlikle "tüketilebilir" ürün olarak oluşturulmalıdır.
// • Görünen fiyat (price) yalnızca bilgi amaçlıdır; gerçek fiyatı ve para birimini Google Play belirler (cihazda mağazadan okunur).
// • grant: doğrulanmış ödeme karşılığı hesaba eklenecek içerik. İstemci bu tabloyu DEĞİŞTİREMEZ; sunucu doğrulamasından sonra döner.
'use strict';
const PRODUCTS = [
  { id: 'gems_100', title: 'Avuç Dolusu Elmas', price: '₺29,99', grant: { gems: 100 } },
  { id: 'gems_550', title: 'Elmas Kesesi', price: '₺129,99', grant: { gems: 550 }, tag: 'POPÜLER' },
  { id: 'gems_1200', title: 'Elmas Sandığı', price: '₺249,99', grant: { gems: 1200 }, tag: 'EN AVANTAJLI' },
  { id: 'gold_3000', title: 'Altın Kesesi', price: '₺24,99', grant: { gold: 3000 } },
  { id: 'gold_8000', title: 'Altın Sandığı', price: '₺54,99', grant: { gold: 8000 } },
  { id: 'starter_pack', title: 'Kaşif Paketi (tek sefer)', price: '₺39,99', grant: { gems: 250, gold: 2500, frame: 'tropic', boost: 3 }, once: true, tag: 'YENİ OYUNCU' },
];
const byId = id => PRODUCTS.find(p => p.id === id) || null;
module.exports = { PRODUCTS, byId };
