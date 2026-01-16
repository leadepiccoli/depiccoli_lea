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
});
```

---

## 📦 **Structure de votre dossier GitHub :**
```
votre-repo/
├── index.html
├── style.css
└── script.js
