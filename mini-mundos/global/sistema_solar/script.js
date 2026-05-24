function createStars() {
  const container = document.getElementById("stars");

  // ⭐ DENSIDADE ADAPTATIVA
  const starCount = window.innerWidth < 600 ? 300 : 800;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";

    const size = Math.random() * 2;
    const duration = Math.random() * 5 + 2;
    const delay = Math.random() * 5;

    star.style.width = size + "px";
    star.style.height = size + "px";

    // 🔥 ocupa tela inteira
    star.style.top = Math.random() * window.innerHeight + "px";
    star.style.left = Math.random() * window.innerWidth + "px";

    star.style.animationDuration = duration + "s";
    star.style.animationDelay = delay + "s";

    container.appendChild(star);
  }
}

createStars();

/* 🔄 recria estrelas ao redimensionar */
window.addEventListener("resize", () => {
  const stars = document.getElementById("stars");
  stars.innerHTML = "";
  createStars();
});