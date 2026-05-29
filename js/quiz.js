"use strict";

//<----- Webcam spejl ----->
async function startWebcam() {
  //venter adgang til kameraet
  const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Vi opetter en variabel som skal gemme det videosignal som kameraet levere, så vi kan sende videre til vores html. Denne linje gør også at der bliver spurgt adgang til kameraet, hvis bruger siger ja, må går den i gang.
  document.getElementById("webcam").srcObject = stream; // Vi henter html elementet id "webcam" og videotagget bliver vist live.
}
startWebcam(); //funktionen kører nu

//<----- Intro tekster ----->
const introTekster = [ 
  `Træd tættere på og se dig selv i øjnene`, // Vi har fjernet skjul fra teksten, så den er klar til at blive vist. Tilføjet også et html tag (span) med class linje. 
  `
 <span class="linje">Kig op, portrætterne omkring dig stirrer, alle øjne kigger på dig. 
  Hvem ser de? Hvem er du?</span> 
  <span class="linje">Museets kunstnere malede deres inderside. Deres frygt, drømme, tanker og splittelse. 
  Mange mennekser skjuler tanker om sig selv. </span>
  <span class="linje">Tanker de tror, de står alene med. 
  Denne oplevelse handler om dig og din identiet, sårbarhed og hvordan vi ser os selv hvordan andre ser os. </span>
  `,
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

//<----- HTML elementer ----->

//For at vi kan gribe fat i vores html elementer, gemmer vi dem i konstanter ved at bruge deres id.
const inaktivTekst = document.getElementById("inaktivTekst");
const quiz = document.querySelector(".quiz");
const spoergsmaalTekst = document.getElementById("spoergsmaalTekst");
const svarBobler = document.getElementById("svarBobler");
const egetSvar = document.getElementById("egetSvar");
const egetSvarBoble = document.getElementById("egetSvarBoble");
const wordcloudContainer = document.getElementById("wordcloudContainerId");
const wordcloudId = document.getElementById("wordcloudId");
const resetKnap = document.getElementById("resetKnapId");

//<----- Intro funktion ----->

//Vi skal lave en funktion som viser vores introtekster, denne funktion kalder vi for visIntro()
function visIntro() {
  inaktivTekst.classList.remove("vis"); //når funktionen først spilles fjerner den classen 'vis' fra vores html element inaktivTekst.

  setTimeout(() => {
    //vi bruger den inbygget javascript funktion setTimeout(), som kalder på en funktion efter x antal tid (fra w3 schools).

    //Vi vil have lavet sådan at hver af de to intro tekster for hver deres class navn, så vi kan style dem forskeligt inde i css.
    inaktivTekst.classList.remove("introEt", "introTo"); //Derfor sørger vi for at fjerne de to class navne, så vi ikke risikere at den ikke med at have begge på en gang.

    if (introStep === 0) {
      // denne sætning siger at hvis introStep er lige med 0 både datatypen og værdien (0 er index tallet)
      inaktivTekst.classList.add("introEt"); // så tilføjer vi classen introEt
    }

    if (introStep === 1) {
      //hvis introStep er lige med 1 både datatypen og værdien (1 er index tallet)
      inaktivTekst.classList.add("introTo"); // så tilføjer vi classen introTo
    }

    inaktivTekst.innerHTML = introTekster[introStep]; // Tag teksten fra arrayet introTekster på den plads vi er kommet. (introStep) og indsæt den ind i html elementet inaktivTekst.
    inaktivTekst.classList.add("vis"); // Her tilføjes classen 'vis' igen efter x antal sekunder, hvor vi inde i css har gjort sådan at når denne class tilføjes bliver opacity sat til 1.
    const linjer = document.querySelectorAll(".linje");
    setTimeout(() => {
      linjer[0].classList.add("visLinje");
    }, 1000);
    setTimeout(() => {
      linjer[1].classList.add("visLinje");
    }, 4000);
    setTimeout(() => {
      linjer[2].classList.add("visLinje");
    }, 7000);
  }, 2000);
}

//<----- Flow ----->

//Man skal klikke sig igennem flowet

document.body.addEventListener("click", startFlow); //Her har vi tilføjet en event listener til hele body element, hvor vi har sagt den skal lytte efter et click og derefter affyre funktionen startFlow.

function startFlow(event) {
  // Her har vi lavet en funktion startFlow, som tager event som parameter, så vi kan tjekke hvad der bliver klikket på.
  if (
    event.target.tagName === "BUTTON" || // hvis der bliver klikket på en knap
    event.target.tagName === "INPUT" // hvis der bliver klikket på et input felt
  ) {
    return; // Hvis der bliver klikket på en knap eller et input felt, så stopper vi funktionen her.
  }

  if (introStep < introTekster.length - 1) {
    // hvis introStep er mindre end længden af introTekster, så
    introStep++; // så øger vi introStep med 1, så vi kommer til næste introtekst.
    visIntro(); // denne viser den næste introtekst.
  } else if (
    // Hvis vi er kommet til den sidste introtekst, så starter quizzen.
    introStep ===
    introTekster.length - 1 // Her tjekker vi om introStep er lig med længden af introTekster minus 1, fordi array starter på 0, så det sidste element er længden minus 1.
  ) {
    inaktivTekst.classList.remove("vis"); //Her fjerner vi classen 'vis' fra inaktivTekst, så den forsvinder.
    setTimeout(() => {
      // Efter 2,5 sekunder (2500 ms), så sker følgende:
      inaktivTekst.style.display = "none"; // Her får vi inaktivTekst til at forsvinde helt ved at sætte display til "none".
      quiz.style.display = "block"; // Her får vi quiz elementet til at dukke op ved at sætte display til "block".
      visSpoergsmaal(); // Her kalder vi på funktionen visSpoergsmaal, så det første spørgsmål vises når quizzen starter.
    }, 2500); // Her sætter vi tiden til 2500 ms, så det sker efter 2,5 sekunder.
    introStep++;
  }
}

//<----- Her kommer en funktion der skal vise spørgsmålene ----->
function visSpoergsmaal() {
  const spoergsmaalData = spoergsmaal[nuvaerendeSpoergsmaal]; // Her gemmer vi spørgsmålene som vi er kommet til i en variable.
  spoergsmaalTekst.textContent = spoergsmaalData.spoergsmaalTekst; // Her ændrer vi teksten i vores html element til det spørgsmål vi er kommet til.
  svarBobler.innerHTML = ""; // Her tømmer vi vores boble element (svaremuligheder), så det er klar til at vise de nye svarmuligheder.
  svarBobler.style.opacity = 0; // Boblerne bliver usynligt
  egetSvar.value = ""; // Her sker det samme, bare med svarinput.
  spoergsmaalTekst.classList.remove("vis"); // //Her fjerner vi classen 'vis' fra spørgsmåltekst, så den forsvinder.

  //spørgsmål fader ind
  setTimeout(() => {
    // Efter 1 sekund (1000 ms), så sker følgende:
    spoergsmaalTekst.textContent = spoergsmaalData.spoergsmaalTekst; // Denne linje sætter teksten fra spørgsmålet ind på hjemmesiden
    spoergsmaalTekst.classList.add("vis"); //Denne libje tilføjer CSS-klassen "vis" til elementet spørgsmålTekst.
  }, 1000); // Her sætter vi tiden til 1 sekund.

  // svar kommer senere
  setTimeout(() => {
    // efter 4 sekunder,så sker der følgende

    spoergsmaalData.svarmuligheder.forEach((svar) => {
      //Her laver vi en loop der går igennem alle svarmulighederne for det spørgsmål vi er kommet til.
      const boble = document.createElement("button"); // For hvert svar opretter vi en boble (knap).
      boble.textContent = svar; // Her indsættes nye svarmuligheder og giver boblen den tekst, som svaret har.
      boble.addEventListener("click", () => {
        gemSvar(spoergsmaalData.id, svar);
      }); // Nu har vi tilføjet at når man klikker på boblen (knappen) så afyres en funktion der gemmer det svar.

      svarBobler.appendChild(boble); // Her tilføjes den sidste nye boble (knap) til resten af boblefamilien.
    });
    svarBobler.style.opacity = 1; // Boblerne bliver helt synlig
  }, 2000); //Her sætter vi tiden til 2 sekunder.
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
  }

  //Her kommer næste spørgsmål
  nuvaerendeSpoergsmaal++; // ++ bruges til at øge værdien af nuvaerendeSpoergsmaal med 1, og dermed gå til næste spørgsmål. Altså hvis vi er ved spørgsmål 1, der bliver der plusset 1 på spørgsmålet og det bliver til 2, og så viser den spørgsmål 2.
  if (nuvaerendeSpoergsmaal < spoergsmaal.length) {
    //hvis nuvaerendeSpoergsmaal er mindre end længden af det samlede antal objekter i arrayet spoergsmaal
    visSpoergsmaal(); //hvis nuvaerendeSpoergsmaal er mindre end længden af det samlede antal objekter i arrayet vises spørgsmålet
  } else {
    //ellers så viser den følgende:
    quiz.style.display = "none";
    wordcloudId.style.display = "block";
    visWordcloud(); // Funktion kaldes på så wordclouden vises med de nye svar.

    // SKAL MÅSKE ÆNDRES
    // spoergsmaalTekst.textContent = "Tak for vise dit indre"; // Her ændres teksten til en tak for at deltage
    // svarBobler.innerHTML = ""; //Her tømmer vi indholdet i boblerne
    // egetSvar.style.display = "none"; //Her får vi inputsfeltet med eget svar til at forvinde
    // egetSvarBoble.style.display = "none"; //Her får vi knappen til inputsfeltet til at forsvinde

    // console.log(brugerSvar);
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

inaktivTekst.classList.add("vis");

// visSpoergsmaal(); // Her starter vi quizzen ved at vise det første spørgsmål.
// visWordcloud(); // Her viser vi wordclouden, så den er klar til at vise de nye svar når de kommer ind.

//<----- Restart flowet ----->

// Dette er en funktion der først går i gang, når man trykker på knappen.
function restartFlow() {
  nuvaerendeSpoergsmaal = 0; //Her bliver quizzen nulstillede og ryger tilbage til spørgsmål 1. Det gør den ved at sætte nuvaerendeSpoergsmaal til 0.
  introStep = 0; //Her sker det samme, bare med introteksten. Så den starter nu fra "træd nærmere" teksten.
  wordcloudId.style.display = "none"; //Nu bliver wordclouden skjult igen ved at sætte display til "none".
  inaktivTekst.style.display = "block"; //Gør introteksten synlig igen ved at sætte display til "block".
  inaktivTekst.textContent = "Træd tættere på og se dig selv i øjnene"; //Sørger for at den rette tekst bliver vist
  inaktivTekst.classList.add("vis"); //Tilføjer css clssen "vis" til inaktivTekst, så den bliver synlig igen.
  quiz.style.display = "none"; //Fjerner quizzen fra skærmen ved at sætte display til "none".
}

restartKnap.addEventListener("click", restartFlow); //Når man klikker på knappen, så kører den restartFlow funktionen, som starter hele flowet forfra.
