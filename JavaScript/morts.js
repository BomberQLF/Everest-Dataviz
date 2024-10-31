document.addEventListener("DOMContentLoaded", () => {
    const mortsContainer = document.querySelector(".morts_container");
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("inputContainer");
  
    // Liaison avec les données JSON
    fetch("/Dataviz/JSON/ascensionDeathYear.json")
      .then((resp) => resp.json())
      .then(function (data) {
  
        // Crée la structure HTML avec le nombre de morts par défaut pour 2013
        inputContainer.innerHTML = `
          <div class="range-container">
            <input type="range" id="range" min="0" max="10" value="0"> <!-- Correspond à 2013 -->
            <div class="dates" id="dates"></div>
          </div>
        `;
  
        mortsContainer.append(inputContainer);
  
        const dates = document.getElementById("dates");
  
        // Boucle pour créer les années sous l'INPUT
        let spanCount = 13;
        while (spanCount <= 23) {
          let createSpan = document.createElement("span");
          createSpan.classList.add(`span-${spanCount}`);
          dates.appendChild(createSpan);
  
          createSpan.textContent = `20${spanCount}`;
          createSpan.style.fontFamily = "Inter";
  
          // Stocker le nombre de morts dans un attribut de données
          const yearData = data.find(year => year.Année === 2000 + spanCount);
          createSpan.dataset.morts = yearData ? yearData.Morts : 0; 
  
          spanCount++;
        }
  
        // Gérer le changement de valeur du slider
        const input = document.getElementById("range");
        const nombreMorts = document.querySelector(".nombre_morts");
        
        input.addEventListener("input", (e) => {
          const selectedIndex = parseInt(e.target.value);
          const correspondingSpan = document.querySelector(`.span-${selectedIndex + 13}`); // Décalage pour matcher l'année
  
          // Récupérer la nouvelle valeur des morts
          const newMorts = correspondingSpan ? parseInt(correspondingSpan.dataset.morts) : 0;
  
          // Animer la transition de valeur avec GSAP
          gsap.fromTo(nombreMorts, 
            { textContent: parseInt(nombreMorts.textContent) || 0 }, 
            { 
              textContent: newMorts, 
              duration: 1.5, 
              ease: "power2.out", 
              snap: { textContent: 1 },
              onUpdate: function() {
                nombreMorts.textContent = Math.floor(this.targets()[0].textContent);
              }
            }
          );
        });
      });
  });
  