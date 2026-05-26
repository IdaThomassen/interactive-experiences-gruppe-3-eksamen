"use strict";

//Array med spørgsmål

const spoergsmål = [
  {
    id: 1,
    spoergsmålTekst: "Hvad lægger du først mærke til, når du ser dig selv i et spejl?",
    svarmuligheder: [
      "Ensom",
      "Alle mine fejl",
      "Mit smil",
      "Mine øjne",
      "En taber",
      "Min hårfarve",
      "Skriv dit eget svar",
    ],
  },
  {
    id: 2,
    spoergsmålTekst: "Hvis andre skulle beskrive dig med ét ord, hvad ville de sige?",
    svarmuligheder: ["Dum", "Ond", "Grim", "Sød", "Skør"],
  },
  {
    id: 3,
    spoergsmålTekst: "Hvad er din største usikkerhed?",
    svarmuligheder: [
      "Mit grin",
      "Mine hænder",
      "At blive misforstået",
      "Ikke klog nok",
      "Ikke god nok",
    ],
  },
];

console.log(spoergsmål);

//Her kommer et seperart objekt for hver besøgendens svar på spørgsmål 1, 2 og 3. 
const brugerSvar = {
  1: null,       //Null er pladsholder, fordi den besøgende ikke svaret endnu, men bliver udskiftet når de har afgivet deres svar.
  2: null,
  3: null,
}; 



