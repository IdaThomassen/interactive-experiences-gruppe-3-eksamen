"use strict";

//<----- Intro tekster ----->
const introTekster = [
  `Kig op, portrætterne omkring dig stirrer, alle øjne kigger på dig. 
  Hvem ser de? Hvem er du? 
  Museets kunstnere malede deres inderside. Deres frygt, drømme, tanker og splittelse. 
  Mange mennekser skjuler tanker om sig selv. 
  Tanker de tror, de står alene med. 
  Denne oplevelse handler om dig og din identiet, sårbarhed og hvordan vi ser os selv hvordan andre ser os.`,
];

let introStep = 0; // Vi laver en variable der hedder introStep, som starter på 0, så vi kan holde styr på hvilket intro tekst vi er kommet til.

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
const introTekst = document.getElementById("introTekst");
const quiz = document.querySelector(".quiz");
const spoergsmaalTekst = document.getElementById("spoergsmaalTekst");
const svarBobler = document.getElementById("svarBobler");
const egetSvar = document.getElementById("egetSvar");
const egetSvarBoble = document.getElementById("egetSvarBoble");
const wordcloudContainer = document.getElementById("wordcloudContainerId");
const wordcloudId = document.getElementById("wordcloudId");
const resetKnap = document.getElementById("resetKnapId");

//<----- Her kommer en funktion der skal vise spørgsmålene ----->
function visSpoergsmaal() {
  const spoergsmaalData = spoergsmaal[nuvaerendeSpoergsmaal]; // Her gemmer vi spørgsmålene som vi er kommet til i en variable.
  spoergsmaalTekst.textContent = spoergsmaalData.spoergsmaalTekst; // Her ændrer vi teksten i vores html element til det spørgsmål vi er kommet til.
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
  nuvaerendeSpoergsmaal++; // ++ bruges til at øge værdien af nuvaerendeSpoergsmaal med 1, og dermed gå til næste spørgsmål. Altså hvis vi er ved spørgsmål 1, der bliver der plusset 1 på spørgsmålet og det bliver til 2, og så viser den spørgsmål 2.
  if (nuvaerendeSpoergsmaal < spoergsmaal.length) {
    //hvis nuvaerendeSpoergsmaal er mindre end længden af det samlede antal objekter i arrayet spoergsmaal
    visSpoergsmaal(); //hvis nuvaerendeSpoergsmaal er mindre end længden af det samlede antal objekter i arrayet vises spørgsmålet
  } else {
    //ellers så viser den følgende:
    spoergsmaalTekst.textContent = "Tak for vise dit indre"; // Her ændres teksten til en tak for at deltage
    svarBobler.innerHTML = ""; //Her tømmer vi indholdet i boblerne
    egetSvar.style.display = "none"; //Her får vi inputsfeltet med eget svar til at forvinde
    egetSvarBoble.style.display = "none"; //Her får vi knappen til inputsfeltet til at forsvinde

    console.log(brugerSvar);
  }
}

//<----- Eget svar ----->
//Her laver vi så at eget svar bliver trimmet og gjort til små bogstaver.

egetSvarBoble.addEventListener("click", () => {
  //Her er så det er muligt at klikke på knappen
  const tekst = egetSvar.value.trim().toLowerCase(); //Her gemmer vi det der står i inputfeltet i en variable, og der bliver også trimmet og gjort til små bogstaver for at sikre et ensartet format.

  if (tekst === "") return; //Her bliver der tjekket om der er tilføjet tekst i inputfeltet. Hvis det er tomt, så sker der ikke noget.
  const spoergsmaalData = spoergsmaal[nuvaerendeSpoergsmaal]; //Her gemmer vi det spørgsmål vi er kommet til i en variable, så vi kan bruge det i funktionen gemSvar.

  gemSvar(spoergsmaalData.id, tekst); //Funktionen gemSvar sender spørgsmålets id videre sammen med den teskt der et i inputfeltet, så det kan gemmes på samme måde som de andre svar.
});

//<----- Wordcloud funktionen ----->
//Her laver vi så at wordclouden fungere

function visWordcloud() {
  const svar = JSON.parse(localStorage.getItem("wordcloudSvar")) || []; //Her henter vi svarene fra local storage, hvor den leder efter "wordcloudSvar". Hvis der ikke er noget i local storage, så starter den med et tomt array.

  wordcloudContainer.innerHTML = " "; //Vi tømmer wordcloud containeren for at gøre klar til at vise de nye svar.

  // I vores wordcloud, jo flere gange et ord bliver gentaget, jo større bliver ordet i wordcloud.
  const count = {}; // Vi laver et tomt objekt, hvor vi gemmer det i variablen (count)

  for (let ord of svar) {
    // Vi laver et loop, hvor for hvert ord der er i listens, bliver det ord lagt over i let ord variablen.

    ord = ord.trim().toLowerCase(); // Ordet bliver trimmet og sat til lowercase, så alle ord bliver ensartet format.

    if (count[ord]) {
      // Her tjekker den , hvor mange gange et ord optræder på listen.
      count[ord]++; //Hvis ordet findes lægger den 1 point til, hvis ikke det findes for det 1 point. Jo flere gange den optræder , jo flere point får den.
    } else {
      count[ord] = 1; // hvis ordet ikke allerede findes på listen, tilføjes det på listen og optællings værdien til 1.
    }
  }

  // vis ord

  for (let ord in count) {
    // For hvert ord i vores const count.
    const span = document.createElement("span"); // For hvert ord opretter vi et span element.
    span.classList.add("word"); // Som vi tilføjes word.
    span.textContent = ord; // Teksten inde i span element, bliver til selve ordet.
    const størrelse = 16 + count[ord] * 12; // Her bestemmer vi størrelsen på ordet. Jo flere gange det optræder, jo større bliver det.
    span.style.fontSize = størrelse + "px"; // Her sætter vi størrelsen på ordet ved at bruge style.fontSize og tilføje "px" for at gøre det til pixels.
    wordcloudContainer.appendChild(span); // Her tilføjes det nye span element til wordcloud containeren, så det vises på siden.
  }
}

resetKnap.addEventListener("click", () => {
  localStorage.removeItem("wordcloudSvar"); // Her sletter vi "wordcloudSvar" fra local storage, så alle svarene bliver fjernet.
  visWordcloud();
});

visSpoergsmaal(); // Her starter vi quizzen ved at vise det første spørgsmål.
visWordcloud(); // Her viser vi wordclouden, så den er klar til at vise de nye svar når de kommer ind.
