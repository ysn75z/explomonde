import { pays } from "./data.js";
import { afficherListe } from "./ui.js";

const grille = document.querySelector("#grille");
const champ = document.querySelector("#recherche");
const statut = document.querySelector("#statut");
const form = document.querySelector("form");
const filtreRegion = document.querySelector("#filtre-region");

function filtrer() {
    const recherche = champ.value.trim().toLowerCase();
    const region = filtreRegion.value;

    const resultats = pays.filter(pays => {
        const correspondNom = pays.nom.toLowerCase().includes(recherche);
        const correspondRegion =
            region === "Toutes" || pays.region === region;

        return correspondNom && correspondRegion;
    });

    afficherListe(resultats, grille);

    if (resultats.length === 0) {
        statut.textContent = "Aucun pays trouvé.";
    } else {
        statut.textContent = resultats.length + " pays trouvés";
    }
}

form.addEventListener("submit", e => {
    e.preventDefault();
    filtrer();
});

champ.addEventListener("input", filtrer);
filtreRegion.addEventListener("change", filtrer);

filtrer();