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
inputSearch.addEventListener("input", filterProduk);
searchBtn.addEventListener("click", filterProduk);
checkboxes.forEach((cb) => {
  cb.addEventListener("change", (e) => {
    if (e.target.id === "semua" && e.target.checked) {
      checkboxes.forEach((box) => {
        if (box.id !== "semua") box.checked = false;
      });
    } else if (e.target.id !== "semua" && e.target.checked) {
      checkboxSemua.checked = false;
    }
    filterProduk();
  });
});
checkboxSemua.checked = true;
renderProduk(PRODUK);

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
