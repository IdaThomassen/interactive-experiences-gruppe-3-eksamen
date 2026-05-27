"use strict";

//<----- Array med spørgsmål ----->
//Her har vi spørgsmål til vores quiz og svarmuligheder. Det er et array med objekter, hvert objekt er et spørgsmål. Hvert spørgsmål har en id, en tekst og et array med svarmuligheder.

const spoergsmaal = [
  {
    id: 1,
    spoergsmaalTekst:
      "Hvad lægger du først mærke til, når du ser dig selv i et spejl?",
    svarmuligheder: [
      "Ensomhed",
      "Alle mine fejl",
      "Mit smil",
      "Mine øjne",
      "En taber",
      "Min hårfarve",
      "Mine næse",
    ],
  },
  {
    id: 2,
    spoergsmaalTekst:
      "Hvis andre skulle beskrive dig med ét ord, hvad ville de sige?",
    svarmuligheder: [
      "Dum",
      "Grim",
      "Sød",
      "Skør",
      "Underlig",
      "Snaksaglig",
      "Venlig",
    ],
  },
  {
    id: 3,
    spoergsmaalTekst: "Hvad er din største usikkerhed?",
    svarmuligheder: [
      "Mit grin",
      "Mine hænder",
      "At blive misforstået",
      "Ikke klog nok",
      "Ikke god nok",
      "Min krop",
      "For stille",
    ],
  },
];

//<----- Titel ----->
//Her har vi lavet en variable med værdien 0, så vi kan holde styr på hvilket vi er kommet til. Vi bruger let fordi at vi ved at værdien vil ændre sig.
let nuvaerendeSpoergsmaal = 0;

//Her har vi lavet et tomt objekt, som vi bruger til at samle de svar vi for fra de besøgende.
const brugerSvar = {};

//<----- HTML ELEMENTER ----->

//For at vi kan gribe fat i vores html elementer, gemmer vi dem i konstanter ved at bruge deres id.
const spoergsmaalTekst = document.getElementById("spoergsmaalTekst");
const svarBobler = document.getElementById("svarBobler");
const egetSvar = document.getElementById("egetSvar");
const egetSvarBoble = document.getElementById("egetSvarBoble");

//<----- Her kommer en funktion der skal vise spørgsmålene ----->
function visSpoergsmaal() {
  const spoergsmaalData = spoergsmaal[nuvaerendeSpoergsmaal]; // Her gemmer vi spørgsmålene som vi er kommet til i en variable.
  spoergsmaalTekst.textContent = spoergsmaalData.tekst; // Her ændrer vi teksten i vores html element til det spørgsmål vi er kommet til.
  svarBobler.innerHTML = ""; // Her tømmer vi vores boble element (svaremuligheder), så det er klar til at vise de nye svarmuligheder.
  egetSvar.value = ""; // Her sker det samme, bare med svarinput.

  spoergsmaalData.svarmuligheder.forEach((svar) => {
    //Her laver vi en loop der går igennem alle svarmulighederne for det spørgsmål vi er kommet til.
    const boble = document.createElement("button"); // For hvert svar opretter vi en boble (knap).
    boble.textContent = svar; // Her indsættes nye svarmuligheder og giver boblen den tekst, som svaret har.
    boble.addEventListener("click", () => {
      gemSvar(spoergsmaalData.id, svar);
    }); // Nu har vi tilføjet at når man klikker på boblen (knappen) så afyres en funktion der gemmer det svar.

    svarBobler.appendChild(boble); // Her tilføjes den sidste nye boble (knap) til resten af boblefamilien.
  });
}

//<----- Funktion til at gemme svar ----->
function gemSvar(spoergsmaalId, svar) {
  //Her opretter vi en funktion gemSvar med parameterne spoergsmaalId, svar
  svar = svar.trim().toLowerCase(); // Her bliver svaret trimmet og gjort til små bogstaver, for at sørge for at vi får et ensartet format.

  brugerSvar[spoergsmaalId] = svar; // Svaret bliver gemt i brugerSvar efter det er gjort ensartet.

  // I vores løsning vil vi kun gemme svarene til spørgsmål 3 i local storage, derfor laver vi et if statement
  if (spoergsmaalId === 3) {
    //Vi tjekker derfor om spoergsmaalId er 3. Det gør vi ved at bruge === som tjekker om både værdien og datatypen er 100% den samme.
    const gamleSvar = JSON.parse(localStorage.getItem("wordcloudSvar")) || []; // gamle svar bliver hentet fra local storage, hvor den leder efter "wordcloudSvar" ved at bruge JSON.parse bliver teksten lavet til javascript data (skriv mere senere).

    gamleSvar.push(svar); // Her pushes det nye svar ind i arrayet af gamle svar.
    localStorage.setItem("wordcloudSvar", JSON.stringify(gamleSvar)); // Her gemmer vi den opdaterede liste af svar i local storage og bruger .JSON.stringify for at lave arrayet tilbage til en string.

    visWordcloud(); // Funktion kaldes på så wordclouden vises med de nye svar.
  }

  //Her kommer næste spørgsmål
}
