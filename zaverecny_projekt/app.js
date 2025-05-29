let filmy = [];

// Načtení dat z JSON souboru
fetch('filmy.json')
  .then(response => response.json())
  .then(data => {
    filmy = data;
  })
  .catch(error => {
    console.error("Chyba při načítání JSON:", error);
  });

// Překlady žánrů a zpracování
const prelozZanr = {
  "sci-fi": "Sci-fi",
  "drama": "Drama",
  "komedie": "Komedie",
  "akcni": "Akční",
  "thriller": "Thriller",
  "krimi": "Krimi"
};

const prelozZpracovani = {
  "kvalitni": "Kvalitní",
  "normalni": "Normální",
  "kravina": "Kravina"
};

// Obsluha tlačítka
document.getElementById('generate-btn').addEventListener('click', () => {
  const zanr = document.getElementById('zanr-select').value;
  const zpracovani = document.getElementById('typ-select').value;

  // Filtrování podle výběru
  const vybraneFilmy = filmy.filter(film => {
    const zanrMatch = !zanr || film.zanr === zanr;
    const zpracovaniMatch = !zpracovani || film.zpracovani === zpracovani;
    return zanrMatch && zpracovaniMatch;
  });

  if (vybraneFilmy.length === 0) {
    document.getElementById('film-output').innerHTML = "<p>Žádný film neodpovídá zadanému výběru.</p>";
    return;
  }

  const nahodnyFilm = vybraneFilmy[Math.floor(Math.random() * vybraneFilmy.length)];

  const zanrCz = prelozZanr[nahodnyFilm.zanr] || nahodnyFilm.zanr;
  const zpracovaniCz = prelozZpracovani[nahodnyFilm.zpracovani] || nahodnyFilm.zpracovani;

  // Výpis do stránky
  document.getElementById('film-output').innerHTML = `
    <h2>${nahodnyFilm.nazev} (${nahodnyFilm.rok})</h2>
    <p><strong>Žánr:</strong> ${zanrCz}</p>
    <p><strong>Zpracování:</strong> ${zpracovaniCz}</p>
    <p><strong>Režisér:</strong> ${nahodnyFilm.reziser}</p>
    <img src="${nahodnyFilm.obrazek}" alt="Obrázek filmu" />
  `;
});
