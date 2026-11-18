# Kampüs Etkinlikleri — Backend REST API (Sprint 8: MongoDB ve Mongoose)

Node.js, Express ve Mongoose kullanılarak geliştirilmiş, kampüs etkinliklerini MongoDB veritabanında kalıcı olarak saklayan ve JSON formatında sunan REST API sunucusu.

## Kurulum ve Çalıştırma

Projeyi yerel ortamda çalıştırmak için `backend` klasöründe aşağıdaki komutları uygulayın:

```bash
cd backend
npm install
cp .env.example .env
npm run seed     # Örnek 6 etkinliği veritabanına yükler
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
  "time": "2026-11-18T09:30:00.000Z",
  "student": "2416501012"
}
```

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| GET | `/events` | Listeyi getir | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik (`_id`) | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

### Status Code'lar
* `200` tamam
* `201` oluşturuldu
* `204` içerik yok
* `400` eksik/yanlış veri (`ValidationError`)
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

## Klasör Yapısı

```
backend/
  src/
    config/
      database.js
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
  .env.example
  .gitignore
  package.json
  README.md
```

## Geliştirici
**Tarık Başkan** (`2416501012`)  
Süleyman Demirel Üniversitesi, Bilgisayar Mühendisliği
