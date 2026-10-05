// dark mode
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const html = document.documentElement;

const savedTheme = localStorage.getItem("ecoSaldo-theme") || "light";
html.setAttribute("data-theme", savedTheme);
themeIcon.src = savedTheme === "dark" ? "assets/sun.png" : "assets/moon.png";

themeToggle.addEventListener("click", () => {
  const isDark = html.getAttribute("data-theme") === "dark";
  const next = isDark ? "light" : "dark";
  html.setAttribute("data-theme", next);
  themeIcon.src = next === "dark" ? "assets/sun.png" : "assets/moon.png";
  localStorage.setItem("ecoSaldo-theme", next);
});

// PRODUK
const PRODUK = [
  {
    id: 1,
    nama: "Botol Plastik PET",
    kategori: "plastik",
    harga: 3000,
    gambar:
      "https://media.istockphoto.com/id/906016838/id/foto/sekali-pakai-sampah-botol-plastik-tpa.jpg?s=612x612&w=0&k=20&c=DXd-jm1V1h7te562tYgNYI7NH6z2qe_Eycx8OK29abo=",
  },
  {
    id: 2,
    nama: "Gelas Plastik",
    kategori: "plastik",
    harga: 2500,
    gambar:
      "https://media.istockphoto.com/id/906016838/id/foto/sekali-pakai-sampah-botol-plastik-tpa.jpg?s=612x612&w=0&k=20&c=DXd-jm1V1h7te562tYgNYI7NH6z2qe_Eycx8OK29abo=",
  },
  {
    id: 3,
    nama: "Kertas HVS & Buku",
    kategori: "kertas",
    harga: 2000,
    gambar:
      "https://news.ralali.com/wp-content/uploads/2015/09/Cara-Memanfaatkan-Limbah-Kertas.jpg",
  },
  {
    id: 4,
    nama: "Kardus Bekas",
    kategori: "kertas",
    harga: 1500,
    gambar:
      "https://news.ralali.com/wp-content/uploads/2015/09/Cara-Memanfaatkan-Limbah-Kertas.jpg",
  },
  {
    id: 5,
    nama: "Pecahan Kaca",
    kategori: "kaca",
    harga: 1000,
    gambar:
      "https://mesinpengolahsampah.files.wordpress.com/2015/02/limbah-kaca.jpg?w=262&h=262",
  },
  {
    id: 6,
    nama: "Besi Tua",
    kategori: "logam",
    harga: 4500,
    gambar:
      "https://media.istockphoto.com/id/1467985832/id/foto/tumpukan-kaleng-bekas-pemilahan-sampah-dan-pengolahan-sampah-bahan-yang-dapat-didaur-ulang.jpg?s=170667a&w=0&k=20&c=ZfDOWR9dX6L4a9jS_fTnJXpnn_rkc6Yr13FiWd7vprQ=",
  },
  {
    id: 7,
    nama: "Kaleng Aluminium",
    kategori: "logam",
    harga: 5000,
    gambar:
      "https://media.istockphoto.com/id/1467985832/id/foto/tumpukan-kaleng-bekas-pemilahan-sampah-dan-pengolahan-sampah-bahan-yang-dapat-didaur-ulang.jpg?s=170667a&w=0&k=20&c=ZfDOWR9dX6L4a9jS_fTnJXpnn_rkc6Yr13FiWd7vprQ=",
  },
  {
    id: 8,
    nama: "Limbah Elektronik",
    kategori: "elektronik",
    harga: 7000,
    gambar:
      "https://media.istockphoto.com/id/1467985832/id/foto/tumpukan-kaleng-bekas-pemilahan-sampah-dan-pengolahan-sampah-bahan-yang-dapat-didaur-ulang.jpg?s=170667a&w=0&k=20&c=ZfDOWR9dX6L4a9jS_fTnJXpnn_rkc6Yr13FiWd7vprQ=",
  },
];
const inputSearch = document.getElementById("inputSearch");
const searchBtn = document.getElementById("searchBtn");
const containerKatalog = document.getElementById("katalog");
const checkboxes = document.querySelectorAll(
  '.filterKatalog input[type="checkbox"]',
);
const checkboxSemua = document.getElementById("semua");
// render produk
function renderProduk(items) {
  let html = "";

  if (items.length === 0) {
    html = `<p class="empty-state">Data sampah tidak ditemukan.</p>`;
  } else {
    items.forEach((p) => {
      html += `
        <div class="itemProduk">
          <img src="${p.gambar}" alt="${p.nama}" onerror="this.src='assets/placeholder.png'" />
          <div class="detailProduk">
            <h3><span>${p.nama}</span></h3>
            <span class="badgeKategori ${p.kategori}">${p.kategori.toUpperCase()}</span>
            <p class="harga">Rp ${p.harga} / kg</p>
          </div>
        </div>
      `;
    });
  }
  containerKatalog.innerHTML = html;
}
// search & filter
function filterProduk() {
  const keyword = inputSearch.value.toLowerCase().trim();
  const kategoriAktif = Array.from(checkboxes)
    .filter((cb) => cb.checked && cb.id !== "semua")
    .map((cb) => cb.value);
  const isSemuaChecked = checkboxSemua.checked;

  const dataTersaring = PRODUK.filter((p) => {
    const matchKeyword = p.nama.toLowerCase().includes(keyword);
    let matchKategori = true;
    if (!isSemuaChecked && kategoriAktif.length > 0) {
      matchKategori = kategoriAktif.includes(p.kategori);
    }
    return matchKeyword && matchKategori;
  });
  renderProduk(dataTersaring);
}
if (inputSearch) {
  inputSearch.addEventListener("input", filterProduk);
}
if (searchBtn) {
  searchBtn.addEventListener("click", filterProduk);
}
if (checkboxes.length > 0) {
  checkboxes.forEach((cb) => {
    cb.addEventListener("change", (e) => {
      if (e.target.id === "semua" && e.target.checked) {
        checkboxes.forEach((box) => {
          if (box.id !== "semua") box.checked = false;
        });
      } else if (e.target.id !== "semua" && e.target.checked) {
        if (checkboxSemua) checkboxSemua.checked = false;
      }
      filterProduk();
    });
  });
}
if (containerKatalog) {
  if (checkboxSemua) checkboxSemua.checked = true;
  renderProduk(PRODUK);
}

// berat sampah transaksi
const btnBerat = document.querySelectorAll(".btnBerat");
btnBerat.forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.parentElement.querySelector(".inputBerat");
    let value = parseInt(input.value) || 0;
    if (button.dataset.quantity === "plus") {
      value++;
    }
    if (button.dataset.quantity === "minus" && value > 0) {
      value--;
    }
    input.value = value;
  });
});

// KALKULATOR
const KATALOG_HARGA = [
  { id: "plastik_pet", nama: "Plastik PET", harga: 2000 },
  { id: "kertas", nama: "Kertas/Kardus", harga: 1500 },
  { id: "kaca", nama: "Kaca", harga: 1000 },
  { id: "logam", nama: "Logam", harga: 3000 },
  { id: "elektronik", nama: "Elektronik", harga: 15000 },
];
const tabelInput = document.getElementById("tabelInput");
const tabelEstimasi = document.getElementById("tabelEstimasi");
const btnAddSampah = document.getElementById("btnAddSampah");
const btnHitung = document.getElementById("btnHitung");
const labelTotal = document.querySelector(".estimasiNilai h1");

function tambahBarisInput() {
  const tr = document.createElement("tr");
  tr.className = "baris-item";
  let opsiKategori = `<option value="" disabled selected>Pilih Jenis</option>`;
  KATALOG_HARGA.forEach((item) => {
    opsiKategori += `<option value="${item.id}" data-harga="${item.harga}">${item.nama}</option>`;
  });
  tr.innerHTML = `
    <td>
      <select class="input-jenis">
        ${opsiKategori}
      </select>
    </td>
    <td>
      <input type="text" class="input-harga" value="Rp 0" readonly>
    </td>
    <td>
      <input type="number" class="input-berat" min="0" value="0">
    </td>
  `;
  tabelInput.appendChild(tr);
  const selectJenis = tr.querySelector(".input-jenis");
  const inputHarga = tr.querySelector(".input-harga");
  selectJenis.addEventListener("change", function () {
    const harga = this.options[this.selectedIndex].getAttribute("data-harga");
    inputHarga.value = `Rp ${parseInt(harga).toLocaleString("id-ID")}`;
  });
}

function hitungEstimasi() {
  const semuaBaris = document.querySelectorAll(".baris-item");
  let totalKeseluruhan = 0;
  tabelEstimasi.innerHTML = `
    <tr>
      <th>Jenis</th>
      <th>Berat</th>
      <th>Jumlah</th>
    </tr>
  `;
  semuaBaris.forEach((baris) => {
    const select = baris.querySelector(".input-jenis");
    const inputBerat = baris.querySelector(".input-berat");
    const berat = parseFloat(inputBerat.value) || 0;
    if (select.value !== "" && berat > 0) {
      const nama = select.options[select.selectedIndex].text;
      const hargaPerKg = parseInt(
        select.options[select.selectedIndex].getAttribute("data-harga"),
      );
      const subTotal = hargaPerKg * berat;
      totalKeseluruhan += subTotal;
      tabelEstimasi.insertAdjacentHTML(
        "beforeend",
        `
        <tr>
          <td>${nama}</td>
          <td>${berat} kg</td>
          <td>Rp ${subTotal.toLocaleString("id-ID")}</td>
        </tr>
      `,
      );
    }
  });
  labelTotal.innerText = `Rp ${totalKeseluruhan.toLocaleString("id-ID")}`;
}
btnAddSampah.addEventListener("click", tambahBarisInput);
btnHitung.addEventListener("click", hitungEstimasi);
tambahBarisInput();
