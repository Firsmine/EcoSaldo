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
