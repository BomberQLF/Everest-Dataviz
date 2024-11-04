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
      bar.style.backgroundColor = "#2E3B60";
      bar.style.position = "relative";

      // Ajouter les éléments au conteneur
      container.appendChild(bar);
    });

    // Partie intéractive avec le bar chart

    // Array qui contient les différents textes à afficher
    const arr = [
      `Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam Alexandrini nobilis mors repentina; cuius socrus cum misceri sibi generum, flagrans eius amore, non impetraret, ut ferebatur, per palatii pseudothyrum`,
      `introducta, oblato pretioso reginae monili id adsecuta est, ut ad Honoratum tum comitem orientis formula missa letali omnino scelere nullo contactus idem Clematius nec hiscere nec loqui permissus occideretur.`,
      `Since 1978, the deadliest years were 1996 with 15 deaths, 2014 with 16 deaths and 2023 with 18  deaths. The top 3 causes of death on Everest are Avalanche, Falls, and Acute mountain sickness. There are different steps during the ascension, and the more you go in altitude, the more it can be fatal. The higher risk of death is at the summit, between 8000 and 8850m. This is “The Death Zone”, at this altitude, the body begins to die minute by minute and cell by cell due to a
        lack of oxygen.`,
    ];

    console.log(arr[0]);
  })

  .catch((error) => {
    console.error("Erreur lors du chargement du fichier JSON:", error);
  });
