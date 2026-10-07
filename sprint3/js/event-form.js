import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const alan = document.querySelector("#form-alani");
const mesaj = document.querySelector("#form-mesaj");

const ALANLAR = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

function dogrula(data) {
  const errors = {};
  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (!data.category) errors.kategori = "Bir kategori seçin.";
  if (!data.date) errors.tarih = "Tarih seçin.";
  if (!data.time) errors.saat = "Saat seçin.";
  if (!data.location) errors.yer = "Yer bilgisini yazın.";
  if (data.capacity !== null &&
      (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir sayı olmalı.";
  }
  return errors;
}

function hatalariGoster(errors) {
  let ilkHatali = null;
  ALANLAR.forEach((ad) => {
    const input = form.elements[ad];
    const yer = document.querySelector(`#${ad}-hata`);
    if (errors[ad]) {
      yer.textContent = errors[ad];
      input.setAttribute("aria-invalid", "true");
      if (!ilkHatali) ilkHatali = input;
    } else {
      yer.textContent = ""; // düzeltilen alanın eski hatasını temizle
      input.removeAttribute("aria-invalid");
    }
  });
  if (ilkHatali) ilkHatali.focus();
}

function sonrakiId() {
  const sayilar = events.map((e) => Number(e.id.replace("event-", "")));
  return `event-${Math.max(...sayilar) + 1}`;
}

function init() {
  if (!form) return;

  // Kategori seçenekleri veriden gelir.
  [...new Set(events.map((e) => e.category))]
    .forEach((k) => form.elements.kategori.add(new Option(k, k)));

  const guncelleme = form.dataset.mode === "guncelle";
  let etkinlik = null;

  if (guncelleme) {
    const id = new URLSearchParams(location.search).get("id");
    etkinlik = events.find((e) => e.id === id);

    if (!etkinlik) {
      // id yok / geçersiz: boş form yerine uyarı göster
      alan.innerHTML = `
        <div class="hata-kutusu" role="alert">
          Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin,
          detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
        </div>
        <p><a class="buton" href="etkinlikler.html">Etkinliklere git</a></p>`;
      return;
    }

    form.elements.ad.value = etkinlik.title;
    form.elements.kategori.value = etkinlik.category;
    form.elements.tarih.value = etkinlik.date;
    form.elements.saat.value = etkinlik.time;
    form.elements.yer.value = etkinlik.location;
    form.elements.kontenjan.value = etkinlik.capacity ?? "";
    form.elements.aciklama.value = etkinlik.description;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const kontenjanHam = fd.get("kontenjan").trim();
    const data = {
      id: guncelleme ? etkinlik.id : sonrakiId(),
      title: fd.get("ad").trim(),
      category: fd.get("kategori"),
      date: fd.get("tarih"),
      time: fd.get("saat"),
      location: fd.get("yer").trim(),
      capacity: kontenjanHam === "" ? null : Number(kontenjanHam),
      description: fd.get("aciklama").trim()
    };

    const errors = dogrula(data);
    hatalariGoster(errors);

    if (Object.keys(errors).length > 0) {
      mesaj.className = "hata-kutusu";
      mesaj.textContent = "Formda hatalı alanlar var. Lütfen işaretli alanları düzeltin.";
      return;
    }

    // Veri kaydedilmez (localStorage yok); nesne sadece gösterilir.
    mesaj.className = "basari-kutusu";
    mesaj.innerHTML = `<p>${guncelleme ? "Etkinlik güncellendi" : "Etkinlik oluşturuldu"} (bu sprintte kaydedilmez):</p><pre></pre>`;
    mesaj.querySelector("pre").textContent = JSON.stringify(data, null, 2);
  });
}

init();
