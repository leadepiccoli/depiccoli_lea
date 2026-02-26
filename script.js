  });
  
  // Ferme les dropdowns au clic/touch ailleurs
  document.addEventListener("click", e => {
    if (!e.target.closest(".dropdown")) {
      dropdowns.forEach(d => d.classList.remove("active"));
    }
  });
  
  document.addEventListener("touchstart", e => {
    if (!e.target.closest(".dropdown")) {
      dropdowns.forEach(d => d.classList.remove("active"));
    }
  });
});

// =======================
// SLIDER
// =======================
function changeSlide(event, direction) {
  event.stopPropagation();
  const slider = event.target.closest(".slider-container");
  if (!slider) return;
  const slides = slider.querySelectorAll(".slider-image");
  const counter = slider.querySelector(".current-slide");
  let index = 0;
  slides.forEach((s, i) => {
    if (s.classList.contains("active")) index = i;
  });
  slides[index].classList.remove("active");
  let next = index + direction;
  if (next >= slides.length) next = 0;
  if (next < 0) next = slides.length - 1;
  slides[next].classList.add("active");
  if (counter) counter.textContent = next + 1;
}

// NAV CLAVIER
document.addEventListener("keydown", e => {
  const project = [...document.querySelectorAll(".project")]
    .find(p => p.style.display === "block");
  if (!project) return;
  const slider = project.querySelector(".slider-container");
  if (!slider) return;
  if (e.key === "ArrowRight") {
    const btn = slider.querySelector(".slider-btn.next");
    if (btn) changeSlide({ target: btn, stopPropagation() {} }, 1);
  }
  if (e.key === "ArrowLeft") {
    const btn = slider.querySelector(".slider-btn.prev");
    if (btn) changeSlide({ target: btn, stopPropagation() {} }, -1);
  }
});
