import { chercherPays, chercherEurope } from "./api.js";
import { afficherListe } from "./ui.js";

const grille = document.querySelector("#grille");
const champ = document.querySelector("#recherche");
const statut = document.querySelector("#statut");
const form = document.querySelector("form");

let minuteur;

async function chargerPays() {
    statut.textContent = "Chargement des pays...";

    try {
        const resultats = await chercherEurope();

        afficherListe(resultats, grille);
        statut.textContent = resultats.length + " pays trouvés";
    } catch (erreur) {
        grille.replaceChildren();
        statut.textContent = "Impossible de charger les pays.";
        
        const bouton = document.createElement("button");
        bouton.textContent = "Réessayer";
        bouton.addEventListener("click", chargerPays);

        grille.append(bouton);
    }
}

async function rechercher() {
    const recherche = champ.value.trim();

    if (recherche.length < 2) {
        chargerPays();
        return;
    }

    statut.textContent = "Chargement...";

    try {
        const resultats = await chercherPays(recherche);

        if (resultats.length === 0) {
            grille.replaceChildren();
            statut.textContent = "Aucun pays trouvé.";
            return;
        }

        afficherListe(resultats, grille);
        statut.textContent = resultats.length + " pays trouvés";
    } catch (erreur) {
        grille.replaceChildren();
        statut.textContent = "Erreur lors de la recherche.";

        const bouton = document.createElement("button");
        bouton.textContent = "Réessayer";
        bouton.addEventListener("click", rechercher);

        grille.append(bouton);
    }
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    rechercher();
});

champ.addEventListener("input", function() {
    clearTimeout(minuteur);

    minuteur = setTimeout(function() {
        rechercher();
    }, 300);
});

chargerPays();