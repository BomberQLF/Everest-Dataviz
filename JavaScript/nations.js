fetch("/Dataviz/JSON/nation_count.json")
  .then((d) => d.json())
  .then(function (data) {
    // Trier les données par count (du plus grand au plus petit) et prendre les 3 premiers
    const topThreeData = data.sort((a, b) => b.count - a.count).slice(0, 3);

    // Code pour afficher la plus grosse valeur au milieu, la deuxième à gauche puis la dernière à droite comme un podium
    const arrangedData = [topThreeData[1], topThreeData[0], topThreeData[2]];

    // Extraire les noms des nations et les valeurs de count
    const nations = arrangedData.map((item) => item.nation.toLowerCase());
    const counts = arrangedData.map((item) => item.count);

    // Configuration du conteneur
    const container = document.getElementById("nations_graph_container");
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.gap = "50px";

    // Ici j'utilise le spread operator
    // Il sert à décomposer individuellement dans un tableau les éléments de count et séléctionner le plus grand élément
    const maxBarHeight = 300;
    const maxCount = Math.max(...counts);
    const scaleFactor = maxBarHeight / maxCount;

    // Boucle forEach qui va permettre de gérer les 3 barres
    counts.forEach((count, index) => {
      const barHeight = count * scaleFactor;
      const nation = nations[index];
    
      // Créer un conteneur pour la barre
      const bar = document.createElement("div");
      // Ajout de la classe approprié pour chaque nation
      bar.classList.add("bar", nation);
      bar.style.width = "120px";
      bar.style.height = `${barHeight}px`;
      bar.style.border = "1.5px solid #2E3B60";
      bar.style.position = "relative";
      bar.style.backgroundColor = "#F1F1F1";
    
      // Ajouter un élément <span> pour le texte du count
      const countText = document.createElement("span");
      countText.classList.add("count-text");
      countText.style.position = "absolute";
      countText.style.width = "100%";
      countText.style.top = "50%";
      countText.style.left = "0";
      countText.style.transform = "translateY(-50%)";
      countText.style.color = "#F1F1F1";
      countText.style.textAlign = "center";
      countText.style.zIndex = "10"; 
      countText.style.display = "none";
      countText.style.fontSize = "2rem";
      bar.appendChild(countText);
    
      // Ajouter la barre au conteneur principal
      container.appendChild(bar);
    
      // Ajouter l'événement de clic pour changer la couleur de la barre
      bar.addEventListener("click", () => {
        // Réinitialiser toutes les barres en blanc et masquer leur texte
        document.querySelectorAll(".bar").forEach((b) => {
          b.style.backgroundColor = "#F1F1F1";
          const textSpan = b.querySelector(".count-text");
          if (textSpan) {
            textSpan.style.display = "none";
          }
        });
    
        // Changer la couleur de la barre cliquée et afficher le count
        bar.style.backgroundColor = "#2E3B60"; 
        countText.textContent = count;
        countText.style.display = "block"; 
      });
    });

    // Partie intéractive avec le bar chart
    // Définition des variables de chaque bouton/bar
    const uk = document.querySelector(".uk");
    const usa = document.querySelector(".usa");
    const nepal = document.querySelector(".nepal");

    // Texte et titre par défaut
    const text = document.getElementById("default");
    const title = document.getElementById("defaultTitle");

    // Liste des titres
    const arrTitle = [
      `The Origin of Climbers`,
      `UK Climbers`,
      `USA Climbers`,
      `Nepalese Climbers`,
    ];

    // Liste des textes
    const arr = [
      `In 1953, Mount Everest was climbed for the first time by Tenzing Norgay, a Nepalese, and Sir Edmund Hillary, a Briton. This ascent subsequently attracted climbers of different nationalities from all over the world, making the mountain a symbol of adventure and challenge.
  In addition to climbers, Mount Everest has become a popular destination for adventure-seekers from all walks of life, leading to an increase in the number of climbers and a growing interest in climbing. This cultural diversity creates a unique atmosphere, where cultures meet and stories of climbs and challenges are shared.`,
      `The United Kingdom, with 212 ascents, remains among the leading countries represented on Everest. Since Sir Edmund Hillary’s first ascent in 1953, British climbers have continued to reach the summit, supported by a solid infrastructure and access to commercial expedition services. Over the years, these expeditions have become a major goal for many British climbers.`,
      `With 365 ascents, Americans represent the largest nationality on Everest. Well-funded and well-equipped, American climbers often benefit from cutting-edge technology and a vast support network to undertake this costly expedition. Their regular presence contributes significantly to the ascent statistics on Everest.`,
      `For Nepalis, especially the Sherpas, Everest is a vital source of income in a region with limited economic opportunities. Kami Rita Sherpa, who holds the record with 29 ascents of Everest, is a powerful example of this reality. For him and many other Sherpas, each expedition offers a chance to earn a livelihood by guiding and ensuring the safety of foreign climbers. Thanks to their unmatched knowledge of the mountain, they play a crucial role in the success of these expeditions, making Everest accessible while supporting their families and community.`,
    ];

    // Texte et titre par défaut
    title.textContent = arrTitle[0];
    text.textContent = arr[0];

    // Variable pour suivre la barre active
    let activeBar = null;

    // Fonction pour changer le texte
    const changeText = (index, bar) => {
      if (activeBar === bar) {
        // Si la barre est déjà active, réinitialiser
        activeBar.style.backgroundColor = "#F1F1F1";
        title.textContent = arrTitle[0];
        text.textContent = arr[0];
        activeBar = null;
      } else {
        // Si une autre barre est active, réinitialiser la barre en questio
        if (activeBar) activeBar.style.backgroundColor = "#F1F1F1";

        // Mettre la nouvelle barre en bleu et mettre à jour le texte/titre
        bar.style.transition = "1s";
        bar.style.backgroundColor = "#2E3B60";
        title.textContent = arrTitle[index];
        text.textContent = arr[index];
        activeBar = bar;
      }
    };

    // Ajout d'événements aux éléments
    uk.addEventListener("click", () => changeText(1, uk));
    usa.addEventListener("click", () => changeText(2, usa));
    nepal.addEventListener("click", () => changeText(3, nepal));

    // Texte par défaut
    text.textContent = arr[0];
  })

  .catch((error) => {
    console.error("Erreur lors du chargement du fichier JSON:", error);
  });












  