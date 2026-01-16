document.addEventListener("DOMContentLoaded", () => {
  // Récupération des éléments
  const home = document.getElementById("home");
  const infoPage = document.getElementById("information");
  const selectedWork = document.getElementById("selected-work");
  const projects = document.querySelectorAll(".project");
  const homeBtn = document.getElementById("homeBtn");  // logo cliquable
  const infoBtn = document.getElementById("infoBtn");
  const selectedWorkBtn = document.getElementById("selectedWorkBtn");
  
  // Vérification que tous les éléments existent
  if (!home || !infoPage || !selectedWork || !homeBtn || !infoBtn || !selectedWorkBtn) {
    console.error("Un ou plusieurs éléments du DOM sont introuvables !");
    return; // arrête le script pour éviter les erreurs
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
    infoPage.style.display = "flex"; // flex pour centrer verticalement
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
  // FIX POUR MOBILE : DROPDOWN AU CLIC
  // ========================================
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    // Au clic sur le parent (PHOTOGRAPHY ou VIDEO)
    dropdown.addEventListener('click', function(e) {
      // Si on clique directement sur le dropdown (pas sur un lien enfant)
      if (e.target === this || e.target.tagName === 'LI') {
        e.stopPropagation();
        
        // Toggle : ouvre/ferme ce dropdown
        const menu = this.querySelector('.dropdown-menu');
        const isOpen = menu.style.display === 'block';
        
        // Ferme tous les autres dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(m => {
          m.style.display = 'none';
        });
        
        // Toggle celui-ci
        menu.style.display = isOpen ? 'none' : 'block';
      }
    });
  });
  
  // Ferme les dropdowns si on clique ailleurs
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.style.display = 'none';
    });
  });
});
