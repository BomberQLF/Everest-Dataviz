// Appel du JSON et traitement des données
fetch('/Dataviz/JSON/nation_count.json')
    .then(d => d.json())
    .then(function (data) {
        // Trier les données par count (du plus grand au plus petit) et prendre les 3 premiers
        const topThreeData = data
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);

        // Code pour afficher la plus grosse valeur au milieu, la deuxième à gauche puis la dernière à droite comme un podium
        const arrangedData = [topThreeData[1], topThreeData[0], topThreeData[2]];

        // Extraire les noms des nations et les valeurs de count
        const nations = arrangedData.map((item) => item.nation);
        const counts = arrangedData.map((item) => item.count);

        // Configuration du canvas
        const canvas = document.getElementById("nations_graph");
        const ctx = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 400;

        const barWidth = 120;
        const spacing = 50;   
        const maxBarHeight = 300; 

        // Calculer l'échelle pour ajuster la hauteur des barres au canvas
        const maxCount = Math.max(...counts);
        const scaleFactor = maxBarHeight / maxCount;

        // Position de départ pour centrer les trois barres
        const totalWidth = 3 * barWidth + 2 * spacing;
        const startX = (canvas.width - totalWidth) / 2; 

        // Dessiner les barres
        counts.forEach((count, index) => {
            // Ajuster la hauteur avec le facteur d'échelle
            const barHeight = count * scaleFactor; 
            const xPosition = startX + index * (barWidth + spacing);

            ctx.fillStyle = '#2E3B60'; 
            ctx.fillRect(
                xPosition,                   
                canvas.height - barHeight,   
                barWidth,                   
                barHeight                    
            );

            // A SUPPRIMER QUAND J'AURAIS LES DRAPEAUX À LA PLACE
            ctx.fillStyle = '#F1F1F1';
            ctx.font = '1rem Inter';
            ctx.fillText(
                nations[index], 
                xPosition + barWidth / 2 - ctx.measureText(nations[index]).width / 2, 
                canvas.height - 10
            );
        });
    })
    .catch(error => {
        console.error("Erreur lors du chargement u fichier JSON:", error);
    });