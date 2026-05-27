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
const spoergsmaalData = spoergsmaal[nuvaerendeSpoergsmaal];
spoergsmaalTekst.textContent = spoergsmaalData.tekst;
svarBobler.innerHTML = "";
egetSvar.value = "";





}