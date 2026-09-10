export function creerCarte(pays) {
    const article = document.createElement("article");
    article.className = "carte";
    article.dataset.code = pays.code;

    const titre = document.createElement("h3");
    titre.textContent = pays.nom;

    const capitale = document.createElement("p");
    capitale.textContent = "Capitale : " + pays.capitale;

    const region = document.createElement("p");
    region.textContent = "Région : " + pays.region;

    const population = document.createElement("p");
    population.textContent = "Population : " + pays.population.toLocaleString();

    article.append(titre, capitale, region, population);

    return article;
}

export function afficherListe(liste, conteneur) {
    const fragment = document.createDocumentFragment();

    liste.forEach(p => fragment.append(creerCarte(p)));

    conteneur.replaceChildren(fragment);
}