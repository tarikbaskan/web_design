import { events } from "./data.js";
import { formatDate } from "./utils.js";

const list = document.querySelector("#etkinlik-listesi");

function createCard(event) {
  const kontenjan = event.capacity ? `<p>Kontenjan: ${event.capacity} kişi</p>` : "";
  return `<article class="etkinlik-kart">
    <h3>${event.title}</h3>
    <span class="rozet">${event.category}</span>
    <p>Tarih: ${formatDate(event.date)}, ${event.time}</p>
    <p>Yer: ${event.location}</p>
    ${kontenjan}
    <p>${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör →</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

// Filtre alanlarını (sadece etkinlikler.html'de var) kurar.
function setupFilters() {
  const form = document.querySelector("#filtre-formu");
  const arama = document.querySelector("#arama");
  const kategoriSecimi = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");
  if (!form || !arama || !kategoriSecimi || !sonucSatiri) return;

  // Kategori seçenekleri veriden üretilir, her biri bir kez.
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriSecimi.innerHTML +=
    kategoriler.map((k) => `<option value="${k}">${k}</option>`).join("");

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const secilen = kategoriSecimi.value;

    const sonuc = events.filter((e) => {
      const metin = `${e.title} ${e.description} ${e.category}`
        .toLocaleLowerCase("tr-TR");
      const metinUyuyor = metin.includes(aranan);
      const kategoriUyuyor = secilen === "" || e.category === secilen;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);
    sonucSatiri.textContent = sonuc.length === 0
      ? "Aramanıza uygun etkinlik bulunamadı."
      : `${sonuc.length} etkinlik listeleniyor.`;
  }

  form.addEventListener("submit", (e) => e.preventDefault()); // Enter sayfayı yenilemesin
  arama.addEventListener("input", filtrele);
  kategoriSecimi.addEventListener("change", filtrele);
  filtrele();
}

if (list) {
  if (list.dataset.limit) {
    // Ana sayfa: tarihi en yakın N etkinlik (önce kopyala, sonra sırala)
    const yaklasan = [...events]
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    // Liste sayfası: hepsi + filtre
    render(events);
    setupFilters();
  }
}
