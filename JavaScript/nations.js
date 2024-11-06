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

    const maxBarHeight = 300;
    const maxCount = Math.max(...counts);
    const scaleFactor = maxBarHeight / maxCount;

    // Créer chaque barre avec une classe spécifique pour chaque nation
    counts.forEach((count, index) => {
      const barHeight = count * scaleFactor;
      const nation = nations[index];

      // Créer un conteneur pour la barre
      const bar = document.createElement("div");
      bar.classList.add("bar", nation);
      bar.style.width = "120px";
      bar.style.height = `${barHeight}px`;
      bar.style.border = "1.5px solid #2E3B60";
      bar.style.position = "relative";

      // Ajouter les éléments au conteneur
      container.appendChild(bar);

      // Ajouter l'événement de clic pour changer la couleur de la barre
      bar.addEventListener("click", () => {
        // Réinitialiser toutes les barres en blanc
        document.querySelectorAll(".bar").forEach((b) => {
          b.style.backgroundColor = "#F1F1F1";
        });

        // Changer la couleur de la barre cliquée en bleu
        bar.style.backgroundColor = "#2E3B60";
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

// Liste des titres (correction de la virgule manquante)
const arrTitle = [
  `The Origin of Climbers`,
  `UK Climbers`,
  `USA Climbers`,
  `Nepalese Climbers`
];

// Liste des textes
const arr = [
  `In 1953, Mount Everest was climbed for the first time by Tenzing Norgay, a Nepalese, and Sir Edmund Hillary, a Briton. This ascent subsequently attracted climbers of different nationalities from all over the world, making the mountain a symbol of adventure and challenge.
  In addition to climbers, Mount Everest has become a popular destination for adventure-seekers from all walks of life, leading to an increase in the number of climbers and a growing interest in climbing. This cultural diversity creates a unique atmosphere, where cultures meet and stories of climbs and challenges are shared.`,
  `Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam Alexandrini nobilis mors repentina; cuius socrus cum misceri sibi generum, flagrans eius amore, non impetraret, ut ferebatur, per palatii pseudothyrum`,
  `introducta, oblato pretioso reginae monili id adsecuta est, ut ad Honoratum tum comitem orientis formula missa letali omnino scelere nullo contactus idem Clematius nec hiscere nec loqui permissus occideretur.`,
  `Since 1978, the deadliest years were 1996 with 15 deaths, 2014 with 16 deaths and 2023 with 18 deaths. The top 3 causes of death on Everest are Avalanche, Falls, and Acute mountain sickness. There are different steps during the ascension, and the more you go in altitude, the more it can be fatal. The higher risk of death is at the summit, between 8000 and 8850m. This is “The Death Zone”, at this altitude, the body begins to die minute by minute and cell by cell due to a lack of oxygen.`,
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
    bar.style.transition = '1s';
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
