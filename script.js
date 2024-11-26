// Kontrollera om JavaScript-filen är korrekt länkad
console.log("JavaScript-filen är länkad och fungerar!");

// En enkel funktion för att ändra rubrikens text
function ändraRubrik() {
  const rubrik = document.querySelector("h1");
  rubrik.textContent = "Rubriken har ändrats med JavaScript!";
  rubrik.style.color = "#007BFF"; // Ändrar färgen på rubriken
}

// Lägg till en knapp som aktiverar funktionen
document.addEventListener("DOMContentLoaded", () => {
  const knapp = document.createElement("button");
  knapp.textContent = "Klicka för att ändra rubriken";
  knapp.style.marginTop = "20px";
  knapp.addEventListener("click", ändraRubrik);

  document.body.appendChild(knapp); // Lägg till knappen på sidan
});
