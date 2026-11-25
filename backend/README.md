# Kampüs Etkinlikleri — Backend REST API (Sprint 9: Tam CRUD, Arama ve Yaklaşan Etkinlikler)

Node.js, Express ve Mongoose kullanılarak geliştirilmiş, kampüs etkinliklerini MongoDB veritabanında kalıcı olarak saklayan ve tam CRUD, arama/filtreleme ile yaklaşan etkinlik sorgularını sunan REST API sunucusu.

## Kurulum ve Çalıştırma

Projeyi yerel ortamda çalıştırmak için `backend` klasöründe aşağıdaki komutları uygulayın:

```bash
cd backend
npm install
cp .env.example .env
npm run seed     # Örnek 6 etkinliği veritabanına yükler (en az 2'si geçmiş tarihli)
npm run dev      # http://localhost:3000 (dosya değişince yeniden başlar)
```

Normal başlatma için:

```bash
npm start        # node src/server.js
```

## Ortam Değişkenleri (`.env`)

Sunucu ve veritabanı bağlantı ayarları `.env` dosyasından (`dotenv/config`) okunur. Repoyu klonladıktan sonra `.env.example` dosyasını kopyalayarak `.env` oluşturun ve kendi bağlantı adresinizi tanımlayın:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/kampus
```

* `PORT`: API sunucusunun dinleyeceği port numarası (varsayılan: `3000`).
* `MONGODB_URI`: MongoDB yerel veya Atlas bağlantı adresi.
* `.env` ve `node_modules/` klasörü `.gitignore` içindedir ve GitHub'a gönderilmez.

## Health Check Endpoint'i

Sunucunun ayakta olduğunu kontrol etmek için:

* **İstek:** `GET http://localhost:3000/health`
* **Yanıt (`200 OK`):**
```json
{
  "status": "ok",
  "time": "2026-11-25T09:30:00.000Z",
  "student": "2416501012"
}
```

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| GET | `/health` | Sunucu sağlık kontrolü | 200 | — | çalışıyor |
| GET | `/events` | Listeyi getir (`?search=` & `?category=`) | 200 | — | çalışıyor |
| GET | `/events/upcoming` | Yaklaşan etkinlikler (tarihe göre sıralı) | 200 | — | çalışıyor |
| GET | `/events/:id` | Tek etkinlik (`_id`) | 200 | 404 | çalışıyor |
| POST | `/events` | Yeni etkinlik | 201 | 400 | çalışıyor |
| PATCH | `/events/:id` | Güncelle (güncel kayıt döner) | 200 | 400, 404 | çalışıyor |
| DELETE | `/events/:id` | Sil (gövde yok) | 204 | 404 | çalışıyor |

* **Tarih Biçimi:** API'de her yerde `"GG-AA-YYYY"` (ör. `"15-10-2026"`), veritabanında gerçek `Date` olarak saklanır.
* **Geçersiz veya olmayan `_id`:** Her yerde `404` döner.

### Status Code'lar
* `200` tamam
* `201` oluşturuldu
* `204` içerik yok (gövde yok)
* `400` eksik/yanlış veri (`ValidationError`, `CastError`, boş gövde veya korunan alan)
* `404` bulunamadı (geçersiz veya olmayan `_id`)
* `500` beklenmeyen sunucu hatası

### Standart Hata Biçimi
Bütün hatalar aynı JSON biçiminde döner:
```json
{
  "error": {
    "message": "Event not found"
  }
}
```

## Testler (Postman & Newman)

Backend açıkken (`npm run seed` ve `npm run dev` sonrası):

```bash
newman run https://webdersi.vercel.app/test.json
```

Postman Collection Runner sonuçları `backend/requests/run-results.json` olarak dışa aktarılır.

## Klasör Yapısı

```
backend/
  src/
    config/
      database.js
    utils/
      date.js
    models/
      event-model.js
    data/
      seed-events.js
    seed.js
    app.js
    server.js
    routes/
      event-routes.js
    controllers/
      event-controller.js
  requests/
    kampus-api.json
    run-results.json
  .env.example
  .gitignore
  package.json
  README.md
```

## Geliştirici
**Tarık Başkan** (`2416501012`)  
Süleyman Demirel Üniversitesi, Bilgisayar Mühendisliği
