# Kampüs Etkinlikleri — Sprint 7 (Express ile REST API ve React Frontend)

Aynı repoda iki uygulama:
* **`frontend/`**: React + Vite (port `5173`) — Etkinlikleri gösteren arayüz uygulaması
* **`backend/`**: Node.js + Express (port `3000`) — Etkinlikleri JSON olarak sunan REST API sunucusu

## Canlı Vercel Adresi (Frontend)
* **Canlı Adres:** [https://tarikbaskan-frontend.vercel.app](https://tarikbaskan-frontend.vercel.app)

## Backend Kurulum ve Çalıştırma (`backend/`)

```bash
cd backend
npm install
cp .env.example .env
npm run dev      # http://localhost:3000
```

### REST Sözleşmesi (`backend/`)

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| GET | `/health` | Sunucu sağlık kontrolü | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

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
      app.js
      server.js
      routes/event-routes.js
      controllers/event-controller.js
      data/events.js
    requests/kampus-api.json
    .env.example
    .gitignore
    package.json
    README.md
  README.md
```

## Geliştirici
**Tarık Başkan** (`2416501012`)  
Süleyman Demirel Üniversitesi, Bilgisayar Mühendisliği
