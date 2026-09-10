const base = "https://restcountries.com/v3.1";

function normaliser(pays) {
    return {
        code: pays.cca2,
        nom: pays.translations?.fra?.common ?? pays.name.common,
        capitale: pays.capital?.[0] ?? "Non renseignée",
        region: pays.region ?? "Inconnue",
        population: pays.population ?? 0,
        drapeau: pays.flags?.svg ?? ""
    };
}

export async function chercherPays(nom) {
    const url = base + "/name/" + encodeURIComponent(nom);

    const reponse = await fetch(url);

    if (!reponse.ok) {
        throw new Error("Erreur HTTP " + reponse.status);
    }

    const donnees = await reponse.json();

    return donnees.map(normaliser);
}

export async function chercherEurope() {
    const url = base + "/region/europe";

    const reponse = await fetch(url);

    if (!reponse.ok) {
        throw new Error("Erreur HTTP " + reponse.status);
    }

    const donnees = await reponse.json();

    return donnees.map(normaliser);
}