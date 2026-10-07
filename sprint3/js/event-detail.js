import { events } from "./data.js";
import { formatDate, escapeHtml } from "./utils.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("#sayfa-baslik");

// Afişi olan etkinlikler; diğerleri için yer tutucu gösterilir.
const afisler = {
  "event-1": "afis.jpg",
  "event-2": "afis1.jpg"
};

if (container) {
  const id = new URLSearchParams(location.search).get("id");
  const event = events.find((e) => e.id === id);

  if (!event) {
    const mesaj = id
      ? `"${escapeHtml(id)}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
      : "Etkinlik seçilmedi. Listeden bir etkinlik seçin.";
    document.title = "Etkinlik bulunamadı";
    if (baslik) baslik.textContent = "Etkinlik bulunamadı";
    container.innerHTML = `
      <div class="hata-kutusu" role="alert">${mesaj}</div>
      <p><a class="buton" href="etkinlikler.html">← Listeye dön</a></p>`;
  } else {
    document.title = `${event.title} - Kampüs Etkinlikleri`;
    if (baslik) baslik.textContent = event.title;

    const afis = afisler[event.id]
      ? `<img src="${afisler[event.id]}" alt="${event.title} afişi">`
      : `<div class="afis-yer" role="img" aria-label="${event.title} görseli">
           <strong>${event.title}</strong>
           <span>${formatDate(event.date)} · ${event.location}</span>
         </div>`;

    container.innerHTML = `
      <article class="detay">
        <figure>
          ${afis}
          <figcaption>${event.title} afişi</figcaption>
        </figure>
        <section class="kunye">
          <h2>Etkinlik Künyesi</h2>
          <dl>
            <dt>Tarih</dt>
            <dd><time datetime="${event.date}T${event.time}">${formatDate(event.date)}, ${event.time}</time></dd>
            <dt>Yer</dt>
            <dd>${event.location}</dd>
            <dt>Kategori</dt>
            <dd>${event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>${event.capacity ? event.capacity + " kişi" : "Belirtilmedi"}</dd>
          </dl>
        </section>
        <div class="aciklama">
          <h2>Açıklama</h2>
          <p>${event.description}</p>
          <p class="butonlar">
            <a class="buton" href="etkinlikler.html">← Listeye dön</a>
            <a class="buton" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
          </p>
        </div>
      </article>`;
  }
}
