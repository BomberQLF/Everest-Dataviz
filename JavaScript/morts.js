document.addEventListener("DOMContentLoaded", () => {
  // Récupération des éléments HTML essentiel
  const mortsContainer = document.querySelector(".morts_container");
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("inputContainer");

  // Liaison avec les données JSON
  fetch("./JSON/ascensionDeathYear.json")
    .then((resp) => resp.json())
    .then(function (data) {
      // Crée la structure HTML avec le nombre de morts par défaut pour 2013
      inputContainer.innerHTML = `
          <div class="range-container">
            <input type="range" id="range" min="0" max="10" value="0"> <!-- Correspond à 2013 -->
            <div class="dates" id="dates"></div>
          </div>
        `;

      // Séléction du container
      const mortsTextContainer = mortsContainer.querySelector(
        ".morts_text_container"
      );

      // Insère inputContainer avant morts_text_container
      mortsContainer.insertBefore(inputContainer, mortsTextContainer);
      const dates = document.getElementById("dates");

      // Boucle pour créer les années sous l'INPUT
      // Définition de spancount à 13 pour 2013 (pas la meilleure façon de faire)
      let spanCount = 13;
      // Création d'une boucle qui va de 13 jusqu'à 23 pour simuler 2013, 2014...
      while (spanCount <= 23) {
        let createSpan = document.createElement("span");
        // Création d'une classe à chaque élément avec l'année comme valeur
        createSpan.classList.add(`span-${spanCount}`);
        dates.appendChild(createSpan);

        // Le texte des span correspond maintenant à 20 (string) + le spancount pour simuler l'année
        createSpan.textContent = `20${spanCount}`;
        createSpan.style.fontFamily = "Inter";

        // Stocker le nombre de morts dans un attribut de données
        const yearData = data.find((year) => year.Année === 2000 + spanCount);
        createSpan.dataset.morts = yearData ? yearData.Morts : 0;

        // Incrémenter la valeur pour faire marcher le script et ne pas causer une boucle infini
        spanCount++;
      }

      // Gérer le changement de valeur du slider
      const input = document.getElementById("range");
      const nombreMorts = document.querySelector(".nombre_morts");

      // Écouteur d'évenement au changement de valeur
      input.addEventListener("input", (e) => {
        // Convertir le selectedIndex en un INTEGER
        const selectedIndex = parseInt(e.target.value);
        const correspondingSpan = document.querySelector(
          `.span-${selectedIndex + 13}`
        ); // Décalage pour matcher l'année

        // Récupérer la nouvelle valeur des morts avec une méthode ternaire
        const newMorts = correspondingSpan
          ? parseInt(correspondingSpan.dataset.morts)
          : 0;

        // Animer la transition des valeurs numériques avec GSAP
        gsap.fromTo(
          // On sélectionne l'élément cible nommé "nombreMorts"
          nombreMorts,
          // Valeur de départ : on initialise le texte à 0 ou à la valeur actuelle si elle existe
          { textContent: parseInt(nombreMorts.textContent) || 0 },
          {
            // Valeur d'arrivée : la nouvelle valeur à afficher (newMorts)
            textContent: newMorts,
            // Durée de l'animation (en secondes)
            duration: 1.5,
            // Courbe d'animation pour une transition fluide
            ease: "power2.out",
            // Arrondir les valeurs numériques pendant l'animation
            snap: { textContent: 1 },
            // Fonction appelée à chaque mise à jour de l'animation
            onUpdate: function () {
              // Mettre à jour le texte affiché dans "nombreMorts" avec la valeur arrondie
              nombreMorts.textContent = Math.floor(
                this.targets()[0].textContent // On récupère la valeur en cours d'animation
              );
            },
          }
        );
      });
    });
});
















