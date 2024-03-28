function loadtheme() {
  document.documentElement.style.setProperty(
    "--customtheme",
    localStorage.getItem("theme") || "aqua"
  );
}

function changetheme() {
  const element = document.querySelectorAll(".themebutton");
  element.forEach((item) => {
    item.addEventListener("click", () => {
      localStorage.setItem("theme", item.textContent);
      loadtheme();
    });
  });
  loadtheme();
}

function shakeasteroid() {
const image = document.querySelector(".asteroid img");
image.addEventListener("click", () => {
    image.classList.toggle("shake");
});
}

changetheme();
shakeasteroid();
