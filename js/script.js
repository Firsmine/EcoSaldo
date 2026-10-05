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
if (btnAddSampah) {
  btnAddSampah.addEventListener("click", tambahBarisInput);
}
if (btnHitung) {
  btnHitung.addEventListener("click", hitungEstimasi);
}
if (tabelInput) {
  tambahBarisInput();
}

// TRANSAKSI
const containerTransaksi = document.getElementById("transaksiContainer");
if (containerTransaksi) {
  const HARGA_SAMPAH = {
    plastik: { nama: "Plastik PET", harga: 2000 },
    kertas: { nama: "Kertas/Kardus", harga: 1500 },
    kaca: { nama: "Kaca", harga: 1000 },
    logam: { nama: "Logam", harga: 3000 },
    elektronik: { nama: "Elektronik", harga: 15000 },
  };
  let keranjangTransaksi = [];
  let riwayatTransaksi =
    JSON.parse(localStorage.getItem("ecoSaldo-riwayat")) || [];
  const inputNama = document.getElementById("namaNasabah");
  const inputTelp = document.getElementById("telpNasabah");
  const inputAlamat = document.getElementById("alamatNasabah");
  const selectSampah = document.getElementById("sampahNasabah");
  const inputBerat = document.querySelector(".inputBerat");
  const btnAddList = document.getElementById("btnAddListTransaksi");
  const btnSave = document.getElementById("btnSaveTransaksi");
  const tabelList = document.getElementById("listTransaksi");
  const labelTotal = document.querySelector(".daftarTransaksi h1");
  const divRiwayat = document.getElementById("riwayatContainer");
  const listRiwayat = document.getElementById("listRiwayat");

  const btnBeratList = document.querySelectorAll(".btnBerat");
  btnBeratList.forEach((btn) => {
    btn.addEventListener("click", () => {
      let value = parseInt(inputBerat.value) || 0;
      if (btn.dataset.quantity === "plus") value++;
      if (btn.dataset.quantity === "minus" && value > 0) value--;
      inputBerat.value = value;
    });
  });
  function renderKeranjang() {
    tabelList.innerHTML = `
      <tr>
        <th>No.</th>
        <th>Jenis Sampah</th>
        <th>Berat (kg)</th>
        <th>Nilai (Rp)</th>
      </tr>
    `;
    let totalKeseluruhan = 0;
    if (keranjangTransaksi.length === 0) {
      tabelList.insertAdjacentHTML(
        "beforeend",
        `
        <tr>
          <td colspan="4" class="empty-state-table">
            <p>Belum ada transaksi</p>
            <span>Tambahkan sampah terlebih dahulu.</span>
          </td>
        </tr>
      `,
      );
      btnSave.classList.add("disabled");
    } else {
      btnSave.classList.remove("disabled");
      keranjangTransaksi.forEach((item, index) => {
        totalKeseluruhan += item.nilai;
        tabelList.insertAdjacentHTML(
          "beforeend",
          `
          <tr>
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.berat}</td>
            <td>Rp ${item.nilai.toLocaleString("id-ID")}</td>
          </tr>
        `,
        );
      });
    }
    labelTotal.innerText = `Rp ${totalKeseluruhan.toLocaleString("id-ID")}`;
  }
  function renderRiwayat() {
    if (riwayatTransaksi.length === 0) {
      divRiwayat.style.display = "none";
      return;
    }
    divRiwayat.style.display = "block";
    const riwayatTerbaru = [...riwayatTransaksi].reverse();
    riwayatTerbaru.forEach((trx) => {
      let rincianItems = trx.items
        .map((i) => `${i.nama} (${i.berat}kg)`)
        .join(", ");
      listRiwayat.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card-riwayat">
          <div class="riwayat-header">
            <h4>${trx.nama} <span>(${trx.tanggal})</span></h4>
            <h3 class="riwayat-total">Rp ${trx.total.toLocaleString("id-ID")}</h3>
          </div>
          <p class="riwayat-rincian"><strong>Item:</strong> ${rincianItems}</p>
        </div>
      `,
      );
    });
  }
  btnAddList.addEventListener("click", () => {
    const jenis = selectSampah.value;
    const berat = parseFloat(inputBerat.value) || 0;
    if (jenis === "none") return alert("Silakan pilih jenis sampah!");
    if (berat <= 0) return alert("Berat sampah harus lebih dari 0!");
    const hargaPerKg = HARGA_SAMPAH[jenis].harga;
    const namaSampah = HARGA_SAMPAH[jenis].nama;
    keranjangTransaksi.push({
      jenisId: jenis,
      nama: namaSampah,
      berat: berat,
      nilai: berat * hargaPerKg,
    });
    selectSampah.value = "none";
    inputBerat.value = 0;
    renderKeranjang();
  });
  btnSave.addEventListener("click", () => {
    if (keranjangTransaksi.length === 0) return;
    if (
      !inputNama.value.trim() ||
      !inputTelp.value.trim() ||
      !inputAlamat.value.trim()
    ) {
      return alert("Mohon lengkapi Data Nasabah terlebih dahulu!");
    }
    const total = keranjangTransaksi.reduce((sum, item) => sum + item.nilai, 0);
    const transaksiBaru = {
      id: Date.now(),
      tanggal: new Date().toLocaleDateString("id-ID"),
      nama: inputNama.value,
      telp: inputTelp.value,
      alamat: inputAlamat.value,
      items: [...keranjangTransaksi],
      total: total,
    };
    riwayatTransaksi.push(transaksiBaru);
    localStorage.setItem("ecoSaldo-riwayat", JSON.stringify(riwayatTransaksi));
    inputNama.value = "";
    inputTelp.value = "";
    inputAlamat.value = "";
    keranjangTransaksi = [];
    alert("Transaksi berhasil disimpan!");
    renderKeranjang();
    renderRiwayat();
  });
  renderKeranjang();
  renderRiwayat();
}
