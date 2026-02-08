document.addEventListener("DOMContentLoaded", () => {
  // Récupération des éléments
  const home = document.getElementById("home");
  const infoPage = document.getElementById("information");
  const selectedWork = document.getElementById("selected-work");
  const projects = document.querySelectorAll(".project");
  const homeBtn = document.getElementById("homeBtn");
  const infoBtn = document.getElementById("infoBtn");
  const selectedWorkBtn = document.getElementById("selectedWorkBtn");
  
  // Vérification que tous les éléments existent
  if (!home || !infoPage || !selectedWork || !homeBtn || !infoBtn || !selectedWorkBtn) {
    console.error("Un ou plusieurs éléments du DOM sont introuvables !");
    return;
  }
  
  // Fonction pour cacher toutes les sections
  function hideAllSections() {
    home.style.display = "none";
    infoPage.style.display = "none";
    selectedWork.style.display = "none";
    projects.forEach(p => p.style.display = "none");
  }
  
  // CLIQUE SUR LE LOGO → HERO
  homeBtn.addEventListener("click", () => {
    hideAllSections();
    home.style.display = "block";
  });
  
  // CLIQUE SUR INFORMATION
  infoBtn.addEventListener("click", () => {
    hideAllSections();
    infoPage.style.display = "flex";
  });
  
  // CLIQUE SUR SELECTED WORKS
  selectedWorkBtn.addEventListener("click", () => {
    hideAllSections();
    selectedWork.style.display = "block";
  });
  
  // DROPDOWN PROJECTS
  const photoLinks = document.querySelectorAll(".dropdown-menu li a");
  photoLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetProject = document.getElementById(targetId);
      
      if (!targetProject) {
        console.error(`Projet avec id "${targetId}" introuvable !`);
        return;
      }
      
      hideAllSections();
      targetProject.style.display = "block";
    });
  });
  
  // ========================================
  // FIX MOBILE : DROPDOWN AU TOUCHER
  // ========================================
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('touchstart', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const wasActive = this.classList.contains('active');
      dropdowns.forEach(d => d.classList.remove('active'));
      
      if (!wasActive) {
        this.classList.add('active');
      }
    });
    
    dropdown.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const wasActive = this.classList.contains('active');
      dropdowns.forEach(d => d.classList.remove('active'));
      
      if (!wasActive) {
        this.classList.add('active');
      }
    });
  });
  
  document.addEventListener('touchstart', () => {
    dropdowns.forEach(d => d.classList.remove('active'));
  });
  
  photoLinks.forEach(link => {
    link.addEventListener('touchstart', function(e) {
      e.stopPropagation();
    });
  });
}); // ← CETTE ACCOLADE FERME LE DOMContentLoaded

// ========================================
// FONCTION SLIDER
// ========================================
function changeSlide(event, direction) {
  event.stopPropagation();
  
  const sliderContainer = event.target.closest('.slider-container');
  const slides = sliderContainer.querySelectorAll('.slider-image');
  const counter = sliderContainer.querySelector('.current-slide');
  
  let currentIndex = 0;
  slides.forEach((slide, index) => {
    if (slide.classList.contains('active')) {
      currentIndex = index;
    }
  });
  
  let newIndex = currentIndex + direction;
  
  // Boucle infinie
  if (newIndex >= slides.length) {
    newIndex = 0;
  } else if (newIndex < 0) {
    newIndex = slides.length - 1;
  }
  
  slides[currentIndex].classList.remove('active');
  slides[newIndex].classList.add('active');
  
  if (counter) {
    counter.textContent = newIndex + 1;
  }
}

// Navigation au clavier (flèches gauche/droite)
document.addEventListener('keydown', (e) => {
  const activeProject = document.querySelector('.project:not(.hidden)');
  if (!activeProject) return;
  
  const sliderContainer = activeProject.querySelector('.slider-container');
  if (!sliderContainer) return;
  
  if (e.key === 'ArrowRight') {
    const nextBtn = sliderContainer.querySelector('.slider-btn.next');
    if (nextBtn) changeSlide({ target: nextBtn, stopPropagation: () => {} }, 1);
  } else if (e.key === 'ArrowLeft') {
    const prevBtn = sliderContainer.querySelector('.slider-btn.prev');
    if (prevBtn) changeSlide({ target: prevBtn, stopPropagation: () => {} }, -1);
  }
});
