"use strict";

//--------Dom referencer--------------------------------------------------------

    //For at vi kan gribe fat i vores html elementer, gemmer vi dem i konstanter ved at bruge deres id.
        const inaktivTekst = document.getElementById("inaktivTekst");
        const progressFyld = document.getElementById("progressFyld");
        const quiz = document.querySelector(".quiz");
        const spoergsmaalTekst = document.getElementById("spoergsmaalTekst");
        const svarBobler = document.getElementById("svarBobler");
        const inputContainer = document.querySelector(".inputContainer");
        const egetSvar = document.getElementById("egetSvar");
        const egetSvarBoble = document.getElementById("egetSvarBoble");
        const wordcloudContainer = document.getElementById("wordcloudContainerId");
        const wordcloudId = document.getElementById("wordcloudId");
        const resetKnap = document.getElementById("resetKnapId");



//--------Webcam spejl--------------------------------------------------------

    //<----- funktion for start webcam ----->
        async function startWebcam() { //venter på adgang til kameraet før funktionen må kører
            const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Vi opetter en variabel som skal gemme det videosignal som kameraet levere, så vi kan sende videre til vores html. Denne linje gør også at der bliver spurgt adgang til kameraet, hvis bruger siger ja, må går den i gang.
            document.getElementById("webcam").srcObject = stream; // Vi henter html elementet id "webcam" og sætter dens srcObject til stream.
        }
        startWebcam(); //funktionen kører nu




//--------Intro--------------------------------------------------------    

    //<----- Array med intro tekster ----->
        const introTekster = [
        `Træd tættere på og se dig selv i øjnene`, // Vi har fjernet skjul fra teksten, så den er klar til at blive vist. Tilføjet også et html tag (span) med class linje.
        
        `<span class="linje">Kig op, portrætterne omkring dig stirrer, alle øjne kigger på dig. 
        Hvem ser de? Hvem er du?</span> 
        <span class="linje">Museets kunstnere malede deres inderside. Deres frygt, drømme, tanker og splittelse. 
        Mange mennekser skjuler tanker om sig selv. </span>
        <span class="linje">Tanker de tror, de står alene med. 
        Denne oplevelse handler om dig og din identiet, sårbarhed og hvordan vi ser os selv hvordan andre ser os. </span>
        `,
        ];


    //<----- Status og variabler ----->  
        let introStep = 0; // Vi laver en variable der hedder introStep, som starter på 0, så vi kan holde styr på hvilket intro tekst vi er kommet til. 0 fordi i et arrayet starter indeks på 0.

    //<----- Intro funktion ----->

        //Vi skal lave en funktion som viser vores introtekster, denne funktion kalder vi for visIntro()
            function visIntro() {
                inaktivTekst.classList.remove("vis"); //når funktionen først spilles fjerner den classen 'vis' fra vores html element inaktivTekst.

                setTimeout(() => { //vi bruger den inbygget javascript funktion setTimeout(), som kalder på en funktion efter x antal tid (fra w3 schools).

                    //-----Rengøring-----
                        inaktivTekst.classList.remove("introEt", "introTo"); //Derfor sørger vi for at fjerne de to class navne, så vi ikke risikere at den ikke med at have begge på en gang.

                    //-----Tilføjelse af classer-----
                        //Vi vil have lavet sådan at hver af de to intro tekster for hver deres class navn, så vi kan style dem forskeligt inde i css.

                        if (introStep === 0) { // denne sætning siger at hvis introStep er lig med 0 både datatypen og værdien (0 er index tallet)
                            inaktivTekst.classList.add("introEt"); // så tilføjer vi classen introEt
                        }

                        if (introStep === 1) { //hvis introStep er lige med 1 både datatypen og værdien (1 er index tallet)
                            inaktivTekst.classList.add("introTo"); // så tilføjer vi classen introTo
                        }


                    //-----Indsættelse af indhold-----
                        inaktivTekst.innerHTML = introTekster[introStep]; // Tag teksten fra arrayet introTekster på den plads vi er kommet. (introStep) og indsæt den ind i html elementet inaktivTekst.
                        inaktivTekst.classList.add("vis"); // Her tilføjes classen 'vis' igen efter x antal sekunder, hvor vi inde i css har gjort sådan at når denne class tilføjes bliver opacity sat til 1.
                        const linjer = document.querySelectorAll(".linje"); 

                    //----- Vis linjer med forsinkelse -----
                        // Vi vil have lavet sådan at hver linje får en class der hedder "visLinje" med et tidsrum imellem
                        setTimeout(() => {
                            linjer[0].classList.add("visLinje"); // vi tilføjer classen "visLinje" til den første linje, som vi med css styler til at blive synlig
                        }, 1000);

                        setTimeout(() => {
                            linjer[1].classList.add("visLinje");
                        }, 4000); //bliver synlig efter 4 sekunder

                        setTimeout(() => {
                            linjer[2].classList.add("visLinje");
                        }, 7000); //bliver synlig efter 7 sekunder
                }, 2000); //der går 2 sekunder før funktionen bliver affyrret
            }

//--------Progress Bar--------------------------------------------------------

    //Dette er funktionen der gør at progress baren bliver opdateret
        function opdaterProgressBar() {
            const total = spoergsmaal.length; //Her gemmer vi antal spørgsmål i en variabel, det gør vi ved at tjekke længden af arrayet spoergsmaal.
            const current = nuvaerendeSpoergsmaal; //Her gemmer vi det spørgsmål vi er kommet til i en variabel, så vi kan bruge det i funktionen. 
            const procent = (current / total) * 100; //Her regner vi ud hvor mange procent af quizzen vi er kommet igennem
            progressFyld.style.width = procent + "%"; // Her sætter vi bredden på progressFyld elementet til den procent vi har regnet ud, og tilføjer "%" for at gøre det til procent. Altså så når man er kommet 1/3 igennem, viser den en bar der er fyldt 33% ud.
        }




//--------Quiz - spørgsmål og svarmuligheder--------------------------------------------------------  

    //<----- Array med spørgsmål ----->
        //Her har vi spørgsmål til vores quiz og svarmuligheder. Det er et array med objekter, hvert objekt er et spørgsmål. Hvert spørgsmål har antributterne: id, spoergsmaalTekst og et array med svarmuligheder.
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
            "Min næse",
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



    //<----- Status og variabler ----->
        //Her har vi lavet en variable med værdien 0, så vi kan holde styr på hvor vi er kommet til. Vi bruger let fordi at vi ved at værdien vil ændre sig. 0 fordi i et arrayet starter indeks på 0.
        let nuvaerendeSpoergsmaal = 0;

        //Her har vi lavet et tomt objekt, som vi bruger til at samle de svar vi for fra de besøgende.
        const brugerSvar = {};



    //<----- Funktion som viser spørgsmål og svarmuligheder ----->
        function visSpoergsmaal() {
            opdaterProgressBar(); // Her kalder vi på funktionen opdaterProgressBar, så den bliver opdateret hver gang vi kommer til et nyt spørgsmål.
            const spoergsmaalData = spoergsmaal[nuvaerendeSpoergsmaal]; // Her gemmer vi det spørgsmål vi er kommet til i variablen spoergsmaalData.
            
            //-----Rengøring-----
                svarBobler.innerHTML = ""; // Her tømmer vi vores boble element (svaremuligheder), så det er klar til at vise de nye svarmuligheder.
                svarBobler.style.opacity = 0; // Boblerne bliver usynligt
                inputContainer.classList.remove("visInput");
                egetSvar.value = ""; // egetSvar værdi bliver tømt
                spoergsmaalTekst.classList.remove("vis"); // //Her fjerner vi classen 'vis' fra spørgsmåltekst, så den forsvinder.

            //-----spørgsmål fader ind-----
                setTimeout(() => { // Efter 1 sekund (1000 ms), så sker følgende:
                    spoergsmaalTekst.textContent = spoergsmaalData.spoergsmaalTekst; // Denne linje sætter teksten fra spørgsmålet ind på hjemmesiden
                    spoergsmaalTekst.classList.add("vis"); //Denne libje tilføjer CSS-klassen "vis" til elementet spørgsmålTekst.
                }, 1000); // Her sætter vi tiden til 1 sekund.

            //-----Svarmuligheder og input kommer senere-----
                setTimeout(() => { // efter 4 sekunder,så sker der følgende

                    spoergsmaalData.svarmuligheder.forEach((svar) => { //Her laver vi en loop der går igennem alle svarmulighederne for det spørgsmål vi er kommet til.
                    const boble = document.createElement("button"); // For hvert svar opretter vi en boble (knap).
                    boble.textContent = svar; // Her indsættes nye svarmuligheder og giver boblen den tekst, som svaret har.
                    boble.addEventListener("click", () => {
                        gemSvar(spoergsmaalData.id, svar);
                    }); // Nu har vi tilføjet at når man klikker på boblen (knappen) så afyres en funktion der gemmer det svar.

                    svarBobler.appendChild(boble); // Her tilføjes den sidste nye boble (knap) til resten af boblefamilien.
                    });
                    svarBobler.style.opacity = 1; // Boblerne bliver helt synlig
                    inputContainer.classList.add("visInput");
                }, 2000); //Her sætter vi tiden til 2 sekunder.
        }



    //<----- Funktion til at gemme svar ----->
        // I vores løsning vil vi gerne have gemt de besøgendes svar, derfor opretter vi en funktion til at gemme svarene.
        function gemSvar(spoergsmaalId, svar) { //Her opretter vi en funktion gemSvar med parameterne spoergsmaalId, svar
            svar = svar.trim().toLowerCase(); // Her bliver svaret trimmet og gjort til små bogstaver, for at sørge for, at vi får et ensartet format.

            brugerSvar[spoergsmaalId] = svar; // Svaret bliver gemt i brugerSvar efter det er gjort ensartet.

            //-----local storage-----
                // I vores løsning vil vi kun gemme svarene til spørgsmål 3 i local storage, derfor laver vi et if statement
                if (spoergsmaalId === 3) {   //Vi tjekker derfor om spoergsmaalId er 3. Det gør vi ved at bruge === som tjekker om både værdien og datatypen er 100% den samme.
                    const gamleSvar = JSON.parse(localStorage.getItem("wordcloudSvar")) || []; // her henter vi gamle svar i local storage som ligger under "wordcloudSvar". Med JSON.parse bliver teksten lavet til javascript data istedet for en lang tekststreng. Hvis der ikke er noget i local storage, så starter den med et tomt array.

                    gamleSvar.push(svar); // Her pushes det nye svar ind i arrayet af gamle svar.
                    localStorage.setItem("wordcloudSvar", JSON.stringify(gamleSvar)); // Her gemmer vi den opdaterede liste af svar i local storage og bruger .JSON.stringify for at lave arrayet tilbage til en string.
                }

            //-----Her kommer næste spørgsmål-----
                //først når svaret er blevet gemt, må vi gå videre til næste spørgsmål
                nuvaerendeSpoergsmaal++; // ++ bruges til at øge værdien af nuvaerendeSpoergsmaal med 1, og dermed gå til næste spørgsmål. Altså hvis vi er ved spørgsmål 1 (indeks 0), der bliver der plusset 1 på og det bliver til indeks 1, og så viser den spørgsmål 2. (spørgsmål 2 = indeks 1)
                
                if (nuvaerendeSpoergsmaal < spoergsmaal.length) { //hvis nuvaerendeSpoergsmaal er mindre end længden af det samlede antal objekter i arrayet spoergsmaal
                    visSpoergsmaal(); //hvis nuvaerendeSpoergsmaal er mindre end længden af det samlede antal objekter i arrayet vises spørgsmålet
                } else {
                    progressFyld.style.width = "100%"; // Her sætter vi bredden på progressFyld elementet til 100%, så den viser at quizzen er fuldført.
                    quiz.style.display = "none"; // Her sætter vi display på quiz elementet til "none", så quizzen forsvinder fra skærmen.
                    wordcloudId.style.display = "block"; // Her sætter vi display på wordcloudId elementet til "block", så wordclouden dukker op på skærmen.
                    visWordcloud();
                 }
                }
                

                // console.log(brugerSvar);
            

    //<----- Eget svar gemmes - Event listener på send knap ----->
        //Vi vil gerne have lavet det sådan at eget svar bliver gemt
        egetSvarBoble.addEventListener("click", () => { //Når egetSvarBoble (send knappen) klikkes på sker der:
            const tekst = egetSvar.value.trim().toLowerCase(); //Så gemmer vi det der står i inputfeltet i en variable tekst, og der bliver den trimmet og gjort til små bogstaver for at sikre et ensartet format.

            if (tekst === "") return; //Her bliver der tjekket om der er tilføjet tekst i inputfeltet. Hvis det er tomt, så sker der ikke noget.
            
            const spoergsmaalData = spoergsmaal[nuvaerendeSpoergsmaal]; //Her gemmer vi det spørgsmål vi er kommet til i en variable, så vi kan bruge det i funktionen gemSvar.

            gemSvar(spoergsmaalData.id, tekst); //Funktionen gemSvar sender spørgsmålets id videre sammen med den teskt der et i inputfeltet, så det kan gemmes på samme måde som de andre svar.
        });




//--------Wordcloud-------------------------------------------------------- 

    //<----- Wordcloud funktionen ----->
        //Her laver vi så at wordclouden fungere. For hver gang et ord gentages forstørres det. Det ord der er svaret flest gange i midten af ordskyen

        function visWordcloud() {
            const svar = JSON.parse(localStorage.getItem("wordcloudSvar")) || []; //Her henter vi svarene fra local storage, hvor den leder efter "wordcloudSvar". Hvis der ikke er noget i local storage, så starter den med et tomt array.

            wordcloudContainer.innerHTML = " "; //Vi tømmer wordcloud containeren for at gøre klar til at vise de nye svar.

            //-----Optællingsdelen i funktionen-----
                // I vores wordcloud, jo flere gange et ord bliver gentaget, jo større bliver ordet i wordcloud.
                const count = {}; // Vi laver et tomt objekt, hvor vi gemmer det i variablen (count)

                for (let ord of svar) { // Vi laver et loop, hvor for hvert ord der er i listen svar, bliver det ord lagt over i let ord variablen.

                    ord = ord.trim().toLowerCase(); // Ordet bliver trimmet og sat til lowercase, så alle ord bliver ensartet format.

                    if (count[ord]) { // Her tjekker den , hvor mange gange et ord optræder på listen.
                        count[ord]++; //Hvis ordet findes lægger der 1 til værdien. Jo flere gange den optræder, jo højere er optællingen.
                    } 
                    else {
                        count[ord] = 1; // hvis ordet ikke allerede findes på listen, tilføjes det på listen og optællings værdien til 1.
                    }
                }


            //-----Sortering af ordenes optælling i funktionen i funktionen-----
                //den optælling vil vi gerne have gemt i et nyt array, som vi skal bruge til at sortere ordene efter optælling 
                let ordArray = []; // her laver vi et array, hvor vi vil gemme ordene i

                for (let ord in count) { // For hvert ord i vores const count.
                    ordArray.push({tekst: ord, antal: count[ord],}); // pusher den hvert ord ind i vores ordArray, her laver den et lille objekt for hvert ord, hvor den tilføjer antributterne tekst og antal 
                }

                ordArray.sort((a, b) => b.antal - a.antal); // Her sorterer vi ordArray ved at den sammenligner to elementer og ser hvilket der har det højeste antal (den højeste optælling). Det ord med den højeste optælling bliver vist først, altså den får index [0]

                if (ordArray.length === 0) return; // Hvis listen er tom, så gør vi ikke noget

                const maxAntal = ordArray[0].antal; // Her gemmer vi det ord med den højeste optælling i en const maxAntal, som vi med .sort har fået til at være ordArray[0].antal 
                let centreretArray =[]; //Vi vil gerne have lagt vores højeste ord i midten af listen, så vi laver et nyt tomt array til det 


            //-----Centering af ordene i ordArray i funktionen-----
                ordArray.forEach((ordObj, index) => {
                    // Vi laver et loop i sortede ordArray. Her tager den hvert ord et efter et, og holder øje med hvilket nummer i rækken (index) 
                    if (index % 2 === 0) { // Hvis index er lige (altså 0, 2, 4...), så tilføjer vi ordObj til slutningen af centreretArray 
                        centreretArray.push(ordObj); // hvis tallet er lige så skal ordObj tilføjes til det ord til efter det centreret ord 
                    } 

                    else {
                        centreretArray.unshift(ordObj); //hvis tallet ikke er lige = derimod er ulige (altså 1, 3, 5...), så tilføjer vi ordObj til starten af centreretArray 
                    }
                });


            //-----Udseendet af wordcloud ordene i funktionen-----
                const farvePalet = [
                    //Museum Ovartacis farver
                    "#FA9D00",
                    "#595959",
                    "#301F15",
                    "#B58054",
                    "#1B4B81",
                    "#E14000",
                    "#E8272E",
                    "#87BA05",
                ]; /* Her har vi lavet en farvepalet, som er et array med de farver vi gerne vil bruge i vores wordcloud. */


                centreretArray.forEach((ordObj) => { //Her bygger vi selve wordclouden ved at lave et loop i det centreret array.

                    const span = document.createElement("span"); // For hvert ord opretter vi et span element.
                    span.classList.add("word"); // Her vi tilføjer vi classen word til span.
                    span.textContent = ordObj.tekst; // Teksten inde i span element, bliver nu til selve ordet.

                    const minSize = 20; // Her har vi sat en minimum størrelse på 20 pixels, så selv de ord der kun er nævnt en gang, stadig er synlige i wordclouden.
                    const maxSize = 95; // Her har vi sat en maksimum størrelse på 95 pixels, så de ord der er nævnt rigtig mange gange ikke bliver alt for store og dominerende i wordclouden.

                    let storrelse = minSize; // Her laver vi en variabel til størrelsen, som starter på minimum størrelsen.
                    if (maxAntal > 1) {
                        // Her tjekker vi om det højeste antal er større end 1, fordi hvis der kun er 1, så vil alle ord have samme størrelse.
                        storrelse = minSize + ((ordObj.antal - 1) / (maxAntal - 1)) * (maxSize - minSize); // Linjen beregner størrelsen ud fra hvor stort et antal et ord er sammenlignet med de andre ord.
                    } 
                    else {
                        storrelse = 35;
                    }

                    span.style.fontSize = storrelse + "px"; // Her sætter vi font størrelsen på span elementet til den størrelse vi har regnet ud, og tilføjer "px" for at gøre det til pixels.
                    const tilfaeldigFarve = farvePalet[Math.floor(Math.random() * farvePalet.length)]; // Denne linje vælger en tilfældig farve fra arrayet farvePalet.
                    span.style.color = tilfaeldigFarve; //Denne linje ændrer så tekstfarven.

                    span.style.margin = "6px 12px"; //Her tilføjer vi afstad uden om hvert ord, så de ikke klumper sig sammen.

                    wordcloudContainer.appendChild(span); // Her tilføjes et HTML-element på siden, så det bliver vist på siden.
                });
        }

        //<-----reset knap----->
            resetKnap.addEventListener("click", () => {
            localStorage.removeItem("wordcloudSvar"); // Her sletter vi "wordcloudSvar" fra local storage, så alle svarene bliver fjernet.
            visWordcloud();
            });



//--------Flow--------------------------------------------------------  

    //<-----flowet----->
        //Man skal klikke sig igennem flowet

        document.body.addEventListener("click", startFlow); //Her har vi tilføjet en event listener til hele body element, hvor vi har sagt den skal lytte efter et click og derefter affyre funktionen startFlow.

        function startFlow(event) {   // Her har vi lavet en funktion startFlow, som tager event som parameter, så vi kan tjekke hvad der bliver klikket på.
            if (
                event.target.tagName === "BUTTON" || // hvis der bliver klikket på en knap
                event.target.tagName === "INPUT" // hvis der bliver klikket på et input felt
            ) {return;} // Hvis der bliver klikket på en knap eller et input felt, så stopper vi funktionen her.

            //-----Intro start-----
                if (introStep < introTekster.length - 1) { // hvis introStep er mindre end længden af introTekster, så
                    introStep++; // så øger vi introStep med 1, så vi kommer til næste introtekst.
                    visIntro(); // kalder på funktionen som viser introtekst.
                } 

                
            //-----Quiz start-----
                // Hvis vi er kommet til den sidste introtekst, så starter quizzen.
                else if ( introStep === introTekster.length - 1 ) { // Her tjekker vi om introStep er lig med længden af introTekster minus 1, fordi array starter på 0, så det sidste element er længden minus 1.
                    inaktivTekst.classList.remove("vis"); //Her fjerner vi classen 'vis' fra inaktivTekst, så den forsvinder.

                    setTimeout(() => {
                        // Efter 2,5 sekunder (2500 ms), så sker følgende:
                        inaktivTekst.style.display = "none"; // Her får vi inaktivTekst til at forsvinde helt ved at sætte display til "none".
                        quiz.style.display = "block"; // Her får vi quiz elementet til at dukke op ved at sætte display til "block".
                        visSpoergsmaal(); // Her kalder vi på funktionen visSpoergsmaal, så det første spørgsmål vises når quizzen starter.
                    }, 2500); // Her sætter vi tiden til 2500 ms, så det sker efter 2,5 sekunder.

                    introStep++; // her øger vi værdien af introStep med 1.
                }
        }

    //<-----Restart flow----->
        // Dette er en funktion der først går i gang, når man trykker på knappen.
        function restartFlow() {
          nuvaerendeSpoergsmaal = 0; //Her bliver quizzen nulstillede og ryger tilbage til spørgsmål 1. Det gør den ved at sætte nuvaerendeSpoergsmaal til 0.
          introStep = 0; //Her sker det samme, bare med introteksten. Så den starter nu fra "træd nærmere" teksten.
          progressFyld.style.width = "0%"; //Denne linje sørger for at progress baren bliver nulstillet ved at sætte bredden på progressFyld til 0%.
          wordcloudId.style.display = "none"; //Nu bliver wordclouden skjult igen ved at sætte display til "none".
          inaktivTekst.style.display = "block"; //Gør introteksten synlig igen ved at sætte display til "block".
          inaktivTekst.textContent = "Træd tættere på og se dig selv i øjnene"; //Sørger for at den rette tekst bliver vist
          inaktivTekst.classList.add("vis"); //Tilføjer css clssen "vis" til inaktivTekst, så den bliver synlig igen.
          inaktivTekst.classList.remove("introTo"); //Fjerner classen introTo, så den ikke forstyrrer styling af den første introtekst.
          inaktivTekst.classList.add("introEt"); //Sørger for at den første introtekst har den rigtige styling ved at fjerne classen introTo og tilføje classen introEt.
          quiz.style.display = "none"; //Fjerner quizzen fra skærmen ved at sætte display til "none".
        }

        restartKnap.addEventListener("click", restartFlow); //Når man klikker på knappen, så kører den restartFlow funktionen, som starter hele flowet forfra.

    

//----------------------------------------------------------------  
inaktivTekst.classList.add("vis");

// visSpoergsmaal(); // Her starter vi quizzen ved at vise det første spørgsmål.
// visWordcloud(); // Her viser vi wordclouden, så den er klar til at vise de nye svar når de kommer ind.
