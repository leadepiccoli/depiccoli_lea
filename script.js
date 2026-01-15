document.addEventListener("DOMContentLoaded", function() {
  const sections = {
    home: document.getElementById("home"),
    information: document.getElementById("information"),
    selectedWork: document.getElementById("selected-work"),
    project1: document.getElementById("project1"),
    project2: document.getElementById("project2"),
    project3: document.getElementById("project3")
  };

  function hideAll() {
    for (let key in sections) sections[key].classList.add("hidden");
  }

  hideAll();
  sections.home.classList.remove("hidden");

  // Click sur logo = home
  document.getElementById("homeBtn").addEventListener("click", () => {
    hideAll();
    sections.home.classList.remove("hidden");
  });

  // Click information
  document.getElementById("infoBtn").addEventListener("click", () => {
    hideAll();
    sections.information.classList.remove("hidden");
  });

  // Click Selected Work
  document.getElementById("selectedWorkBtn").addEventListener("click", () => {
    hideAll();
    sections.selectedWork.classList.remove("hidden");
  });

  // Click sur projets photography
  const photolinks = document.querySelectorAll(".dropdown-menu li a");
  photolinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href").replace("#","");
      hideAll();
      if(sections[target]) sections[target].classList.remove("hidden");
    });
  });
});
