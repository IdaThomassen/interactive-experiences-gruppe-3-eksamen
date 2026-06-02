# interactive-experiences-gruppe-3-eksamen

## Eksamensprojekt: Det interaktive spejl

Dette repository indeholder vores eksamensprojekt *“Det interaktive spejl”*, udviklet i forbindelse med faget **Interactive Experiences**.  
Vi er gruppe 3 på Multimediedesigneruddannelsen på Erhvervsakademi Aarhus, 2. semester (MDU-E25EXD).

## Gruppemedlemmer
Melissa Pearl Lund Gerad  
Yulia Ivanova Metodieva  
Josephine Kirstine Nielsen  
Ida Clausager Thomassen  

**Projektperiode:** 08.05.2026 – 09.06.2026  

---

## Projektbeskrivelse

Projektet handler om at skabe en interaktiv digital installation til Museum Ovartaci, hvor den besøgende konfronteres med sig selv gennem en refleksiv oplevelse med fokus på identitet, usikkerhed og selvopfattelse.

Installationen er udviklet til det sidste udstillingsrum på Museum Ovartaci. Her er værker skabt af kunstnere med erfaringer fra psykiatrien og udforsker temaer som identitet, følelser og sårbarhed. Vores installation tager udgangspunkt i disse temaer og omsætter dem til en personlig digital oplevelse.

---

## Produktbeskrivelse

Vi har udviklet et interaktivt spejl, der kombinerer live webcam, tekstbaserede refleksioner og interaktive spørgsmål, som guider brugeren gennem oplevelsen.

Oplevelsen starter med et live webcam, hvor brugeren ser sig selv i det digitale spejl. Herefter følger en kort intro og tre refleksionsspørgsmål, hvor brugeren enten kan vælge mellem svarmuligheder eller skrive egne svar. Til sidst indgår brugerens svar sammen med tidligere besøgendes i en fælles wordcloud, som viser, at man ikke står alene med sine tanker og usikkerheder.

---

## W3C-validering
### Validering af vores index.htm 

![Fundet fejl i vores index.html](/billederTilReadme/htmlValidering1.png "Validering af index.html")

Efter den første validering af index.html, fik vi en warning og fire info. De fire info er, fordi vi har en / ved slut-tagget />. Warningen er fordi vi har et tomt H2 element.

![Rettelse af fejl i index.html efter validering](/billederTilReadme/htmlValidering2.png "Fikset fejl efter vi har valideret index.html")

Vi fik rettet info ved at fjerne / fra slut-taggene. Dog har vi stadig en warning, men dette ændrer vi ikke, fordi der gennem javascripten bliver sprøjtet tekst ind.

### Validering af vores css

![Fundet fejl i vores css](/billederTilReadme/cssValidering1.png "Validering af css")

Vi opdagede efter vi validere første gang at “srgba” var en fejl, ved “svarBobler button “ Det er en fejl, fordi man skal skrive “rgba” og ikke”s” foran “rgba”. Vi opdagede også at “color” stod foran rgba, efter vi validerede anden gang og det skulle hellere ikke stå der.

![Ingen fejl i css](/billederTilReadme/cssValidering2.png "Fjernet fejl efter validering")

Vi har ingen fejl længere. Det eneste vi har tilbage er warnings. Dog kommer disse warnings af, at vi har defineret farven vi bruger som en variable i vores root. Så disse warnings ignoreres. 

### Validering af vores JavaScript

![Fundet fejl i JavaScript](/billederTilReadme/jsValidering1.png "Validering af JavaScript")

Vi brugte https://www.minifier.org/ til at validere vores JavaScript-kode. Værktøjet fandt tre fejl. Den første fejl er ikke reelt en fejl, da det ikke har nogen betydning for om koden fungerer, om man bruger ‘ ’ eller “ ” til at skrive teksten.

Den anden fejl skyldes, at validatoren er sat til en ældre version af JavaScript, og derfor kan den ikke genkende nyere syntaks. Fejlen kan derfor ignoreres.

Den tredje fejl skyldes, at restartKnap ikke er blevet defineret som en const.

![Fikset fejl i JavaScript](/billederTilReadme/jsValidering2.png "Fjernet fejl efter validering")

Fejl 1: Vi testede, om der var forskel på at bruge ‘use strict’ skrevet med ‘ ’ eller “ ”. Der er ingen funktionel forskel, men da W3Schools anbefaler brug af “ ”, har vi valgt at følge denne konvention og skrive “use strict”.

Fejl 2: Denne fejl skyldes, at validatoren er sat til en ældre JavaScript-version. Det er derfor ikke en fejl i selve koden, men en begrænsning i validatoren, og den kan derfor ignoreres.

Fejl 3: Vi tilføjede restartKnap som en const sammen med de øvrige variabler, hvilket løste fejlen.

![Tilføjet restartKnap som en const](/billederTilReadme/constRestartKnap.png "Vi tilføjet const restartKnap til resten af const")

## Github
Projektet er udviklet og dokumenteret gennem GitHub.

#### Her har vi brugt GitHub til:

* At samarbejde i gruppen. Ved at oprette et repository og invitere de andre gruppemedlemmer, er det muligt at klone det ned på ens egen computer. Dermed kan alle gruppemedlemmer arbejde på koden fra sin egen computer. Det skaber en mere effektiv og fleksibel arbejdsfordeling, da man ikke er afhængig af en persons computer.

* At dokumentere vores udviklingsproces gennem løbende commits. Alle commits er navngivet med en dybdegående beskrivelse, som gør det nemt for de andre at følge udviklingsprocessen.

![Det er vores mappestruktur](/billederTilReadme/mappeStruktur.png "Mappestruktur")


---

## Web konventioner for navngivning 
For at sørge for at vores løsning lever op til web konventionerne, har vi sat følgende regler:
Navngivning af mapper, filer, variabler og funktioner skal være relevante for indholdet.
Altid start med lille forbogstav i navngivningen.
Ingen special tegn eller danske bogstaver som æ, ø og å, bliver brugt til navngivning.
Skrives med camelCase

---

## Navngivning af filer og mapper
Med disse regler i mente, har vi navngivet vores filer og mapper med de relevante navne:
index.html
css/
style.css
js/
quiz.js
sound/
bobleLyd.mp3

Folder and file structure: tag et billede af vores mapper og undermapper og beskriv kort hvad der er hvad og hvordan det er skrevet

---
