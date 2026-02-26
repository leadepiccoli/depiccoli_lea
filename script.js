document.addEventListener("DOMContentLoaded", () => {
  const home = document.getElementById("home");
  const infoPage = document.getElementById("information");
  const selectedWork = document.getElementById("selected-work");
  const projects = document.querySelectorAll(".project");
  const homeBtn = document.getElementById("homeBtn");
  const infoBtn = document.getElementById("infoBtn");
  const selectedWorkBtn = document.getElementById("selectedWorkBtn");
  
  if (!home || !infoPage || !selectedWork || !homeBtn || !infoBtn || !selectedWorkBtn) {
    console.error("DOM incomplet");
    return;
  }
  
  // CACHE TOUT
  function hideAllSections() {
    home.style.display = "none";
    infoPage.style.display = "none";
    selectedWork.style.display = "none";
    projects.forEach(p => {
      p.style.display = "none";
    });
  }
  
  // HOME
  homeBtn.addEventListener("click", () => {
    hideAllSections();
    home.style.display = "block";
  });
  
  // INFO
  infoBtn.addEventListener("click", () => {
    hideAllSections();
    infoPage.style.display = "flex";
  });
  
  // SELECTED WORKS
  selectedWorkBtn.addEventListener("click", () => {
    hideAllSections();
    selectedWork.style.display = "block";
  });
  
  // PROJECTS
  const projectLinks = document.querySelectorAll(".dropdown-menu li a");
  projectLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").replace("#", "");
      const project = document.getElementById(targetId);
      if (!project) return;
      
      hideAllSections();
      project.style.display = "block";
      
      // FORCE LE PREMIER SLIDE
      const slides = project.querySelectorAll(".slider-image");
      slides.forEach(s => s.classList.remove("active"));
      if (slides.length > 0) {
        slides[0].classList.add("active");
      }
      
      // FERME LES DROPDOWNS
      const dropdowns = document.querySelectorAll(".dropdown");
      dropdowns.forEach(d => d.classList.remove("active"));
    });
  });
  
  // DROPDOWN MOBILE
  const dropdowns = document.querySelectorAll(".dropdown");
  
  dropdowns.forEach(dropdown => {
    // Gestion du clic
    dropdown.addEventListener("click", e => {
      if (e.target.tagName === "A") return;
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle("active");
    });
    
    // Gestion du touch pour mobile
    dropdown.addEventListener("touchstart", e => {
      if (e.target.tagName === "A") return;
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle("active");
    });
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
