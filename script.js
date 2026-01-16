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
      
      // Toggle la classe active
      const wasActive = this.classList.contains('active');
      
      // Ferme tous les dropdowns
      dropdowns.forEach(d => d.classList.remove('active'));
      
      // Si n'était pas actif, on l'ouvre
      if (!wasActive) {
        this.classList.add('active');
      }
    });
    
    // Également pour le clic (backup)
    dropdown.addEventListener('click', function(e) {
      // Ne pas déclencher si on clique sur un lien
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
  
  // Ferme les dropdowns au toucher ailleurs
  document.addEventListener('touchstart', () => {
    dropdowns.forEach(d => d.classList.remove('active'));
  });
  
  // Permet le clic sur les liens du dropdown
  photoLinks.forEach(link => {
    link.addEventListener('touchstart', function(e) {
      e.stopPropagation();
    });
  });
});
