export function creerCarte(pays) {
    const article = document.createElement("article");

    article.className = "carte";
    article.dataset.code = pays.code;
    article.style.cursor = "pointer";

    const titre = document.createElement("h3");
    titre.textContent = pays.nom;

    const capitale = document.createElement("p");
    capitale.textContent = "Capitale : " + pays.capitale;

    const region = document.createElement("p");
    region.textContent = "Région : " + pays.region;

    const population = document.createElement("p");
    population.textContent = "Population : " + pays.population;

    article.append(titre, capitale, region, population);

    return article;
}

export function afficherListe(liste, conteneur) {
    const fragment = document.createDocumentFragment();

    liste.forEach(pays => {
        fragment.append(creerCarte(pays));
    });

    conteneur.replaceChildren(fragment);
}