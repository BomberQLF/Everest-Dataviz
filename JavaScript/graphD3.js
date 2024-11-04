document.addEventListener("DOMContentLoaded", () => {
  const width = 700;
  const height = 450;
  const marginTop = 20;
  const marginRight = 90;
  const marginBottom = 50;
  const marginLeft = 50;

  const svg = d3
    .select(".ascensions_img_container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Créer des échelles pour l'axe des X et des Y
  const x = d3.scaleUtc().range([marginLeft, width - marginRight]);
  const y = d3.scaleLinear().range([height - marginBottom, marginTop]);

  // Charger et traiter les données
  d3.json("/Dataviz/JSON/ascensionDeathYear.json")
    .then((data) => {
      const parseYear = d3.timeParse("%Y");
      data.forEach((d) => {
        d.Année = parseYear(d.Année);
        d.Sommets = +d.Sommets;
      });

      // Filtrer les données pour conserver les années de 2013 à 2023
      data = data.filter(
        (d) => d.Année >= parseYear("2013") && d.Année <= parseYear("2023")
      );

      // Définir les domaines pour chaque échelle
      x.domain([parseYear("2013"), parseYear("2023")]); // Domaine fixe de 2013 à 2023 pour l'axe X
      y.domain([0, d3.max(data, (d) => d.Sommets)]);

      // Axe des X avec années complètes et styles de texte
      svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(d3.timeYear.every(1))
            .tickFormat(d3.timeFormat("%Y"))
        )
        .selectAll("text")
        .style("font-size", ".8rem")
        .style("font-weight", "bold")
        .style("font-family", "Staatliches")
        .style("fill", "#2E3B60");

      // Axe des Y avec style
      svg
        .append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", ".8rem")
        .style("font-family", "Staatliches")
        .style("font-weight", "bold")
        .style("fill", "#2E3B60");

      // Styliser les lignes des axes
      svg
        .selectAll(".domain, .tick line")
        .style("stroke", "#333")
        .style("stroke-width", "2px");

      // Ajouter des flocons comme points d'intersections
      const tooltip = d3.select("#tooltip");

      svg
        .selectAll("image")
        .data(data)
        .enter()
        .append("image")
        .attr("xlink:href", "/Dataviz/assets/flocon.svg")
        .attr("x", (d) => x(d.Année) - 10)
        .attr("y", (d) => y(d.Sommets) - 10)
        .attr("width", 20)
        .attr("height", 20)
        .attr("weight", "bold")
        .attr("fill", "#2E3B60")
        .attr("padding", "2%")
        .on("mouseover", (ev, d) => {
          tooltip
            .style("opacity", "1")
            .text(
              `Année: ${d3.timeFormat("%Y")(d.Année)} - Sommets: ${d.Sommets}`
            );
        })
        .on("mouseleave", () => {
          tooltip.style("opacity", "0"); // Cacher le tooltip lors du départ de la souris
        });

      // Générer la ligne avec d3.line()
      const line = d3
        .line()
        .x((d) => x(d.Année))
        .y((d) => y(d.Sommets))
        .curve(d3.curveCatmullRom.alpha(0.5));

      // Ajouter la ligne au SVG avec couleur et style
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#2E3B60")
        .attr("stroke-width", 2)
        .attr("d", line);

      //   // Ajouter des cercles pour chaque point de données
      //   svg
      //     .selectAll("circle")
      //     .data(data)
      //     .enter()
      //     .append("circle")
      //     .attr("cx", (d) => x(d.Année))
      //     .attr("cy", (d) => y(d.Sommets))
      //     .attr("r", 5)
      //     .attr("fill", "#2E3B60");
    })
    .catch((error) =>
      console.error("Erreur lors du chargement des données:", error)
    );
});
