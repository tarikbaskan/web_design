# Kampüs Etkinlikleri — Sprint 9 (Tam CRUD, Arama ve Yaklaşan Etkinlikler)

Aynı repoda iki uygulama:
* **`frontend/`**: React + Vite (port `5173`) — Etkinlikleri gösteren arayüz uygulaması
* **`backend/`**: Node.js + Express + Mongoose (port `3000`) — Etkinlikleri MongoDB üzerinde kalıcı olarak tutan, tam CRUD ve sorgu destekli REST API sunucusu

## Canlı Vercel Adresi (Frontend)
* **Canlı Adres:** [https://tarikbaskan-frontend.vercel.app](https://tarikbaskan-frontend.vercel.app)

## Backend Kurulum ve Çalıştırma (`backend/`)

```bash
cd backend
npm install
cp .env.example .env
npm run seed     # Veritabanına 6 örnek etkinlik ekler (en az 2'si geçmiş tarihli)
npm run dev      # http://localhost:3000
```

### REST Sözleşmesi (`backend/`)

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| GET | `/health` | Sunucu sağlık kontrolü | 200 | — | çalışıyor |
| GET | `/events` | Listeyi getir (`?search=` & `?category=`) | 200 | — | çalışıyor |
| GET | `/events/upcoming` | Yaklaşan etkinlikler (tarihe göre sıralı) | 200 | — | çalışıyor |
| GET | `/events/:id` | Tek etkinlik (`_id`) | 200 | 404 | çalışıyor |
| POST | `/events` | Yeni etkinlik (Schema doğrulamalı) | 201 | 400 | çalışıyor |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | çalışıyor |
| DELETE | `/events/:id` | Sil | 204 | 404 | çalışıyor |

## Frontend Kurulum ve Çalıştırma (`frontend/`)

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
```

Üretim derlemesi ve önizleme için:
```bash
npm run build    # tsc -b && vite build
npm run preview
```

## Repo Yapısı

```
web_design/
  frontend/
  backend/
    src/
      config/database.js
      utils/date.js
      models/event-model.js
      data/seed-events.js
      seed.js
      app.js
      server.js
      routes/event-routes.js
      controllers/event-controller.js
    requests/
      kampus-api.json
      run-results.json
    .env.example
    .gitignore
    package.json
    README.md
  README.md
```

## Geliştirici
**Tarık Başkan** (`2416501012`)  
Süleyman Demirel Üniversitesi, Bilgisayar Mühendisliği
