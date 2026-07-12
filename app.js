// =====================================
// Keuzemachine Pro 2.0
// app.js
// Deel A
// =====================================


let wielen = [];

let bewerkIndex = -1;

let geluidAan = true;



// -----------------------------
// START
// -----------------------------


document.addEventListener(
"DOMContentLoaded",
()=>{


laadSpel();


});




// -----------------------------
// SPEL LADEN
// -----------------------------


async function laadSpel(){


let opgeslagen =
localStorage.getItem(
"keuzemachine"
);



if(opgeslagen){


wielen =
JSON.parse(opgeslagen);



toonWielen();


toonResultaat();



return;


}



try{


let antwoord =
await fetch(
"data.json"
);



let data =
await antwoord.json();



wielen =
data.wielen;



bewaar();



toonWielen();



}
catch(e){


console.log(
"Geen data.json gevonden"
);


}



}




// -----------------------------
// OPSLAAN
// -----------------------------


function bewaar(){


localStorage.setItem(

"keuzemachine",

JSON.stringify(wielen)

);


}





// -----------------------------
// WIELEN TONEN
// -----------------------------


function toonWielen(){


let scherm =
document.getElementById(
"wielen"
);



if(!scherm)return;



scherm.innerHTML="";



wielen.forEach(
(wiel,index)=>{


let kaart =
document.createElement(
"div"
);



kaart.className =
"wiel";



kaart.innerHTML = `


<div class="wiel-titel">

${wiel.icoon || "🎯"}
${wiel.naam}

${wiel.vergrendeld ? " 🔒" : ""}

</div>



<div class="wiel-waarde"
id="waarde${index}">

${wiel.resultaat || wiel.keuzes[0]}

</div>



<button
class="draaiKnop"
onclick="draaiWiel(${index})">

🎰 Draai

</button>


<button
onclick="vergrendelWiel(${index})">

${wiel.vergrendeld ? "🔒" : "🔓"}

</button>


`;



scherm.appendChild(
kaart
);



}



);


}





// -----------------------------
// DRAAIEN
// -----------------------------

function draaiWiel(index){

let wiel = wielen[index];


if(wiel.vergrendeld){

return;

}



let veld =
document.getElementById(
"waarde"+index
);



if(!veld)return;



let knop =
veld.parentElement.querySelector(
".draaiKnop"
);



if(knop){

knop.disabled = true;

knop.innerText =
"⏳ Bezig...";

}



speelGeluid();



let snelheid = 50;

let teller = 0;

let maxDraaien = 35;



function volgende(){



let keuze =

wiel.keuzes[

Math.floor(
Math.random()
*
wiel.keuzes.length
)

];



veld.innerText =
keuze;
speelGeluid();


teller++;



if(teller < maxDraaien){


snelheid += 8;



setTimeout(
volgende,
snelheid
);



}

else{


wiel.resultaat = keuze;


bewaar();


toonResultaat();



if(knop){

knop.disabled = false;

knop.innerText =
"🎰 Draai";

}



}


}



volgende();


}




// -----------------------------
// VERGRENDELEN
// -----------------------------


function vergrendelWiel(index){


wielen[index].vergrendeld =

!wielen[index].vergrendeld;



bewaar();



toonWielen();



}






// -----------------------------
// RESULTAAT SAMENVATTING
// -----------------------------

function toonResultaat(){

let tekst="";


wielen.forEach(
wiel=>{


if(wiel.resultaat){


tekst +=
(wiel.icoon || "🎯")
+
" "
+
wiel.naam
+
"\n"
+
wiel.resultaat
+
"\n\n";


}


}

);



let veld =
document.getElementById(
"samenvatting"
);



if(veld){

veld.innerText =
tekst.trim();

}


}





// -----------------------------
// GELUID
// -----------------------------


let audioContext;


function speelGeluid(){


if(!geluidAan) return;


if(!audioContext){

audioContext =
new (window.AudioContext ||
window.webkitAudioContext)();

}


let oscillator =
audioContext.createOscillator();


let versterker =
audioContext.createGain();



oscillator.type =
"square";


oscillator.frequency.value =
900;



versterker.gain.value =
0.03;



oscillator.connect(versterker);

versterker.connect(
audioContext.destination
);



oscillator.start();



setTimeout(()=>{

oscillator.stop();

},35);



}


}
// =====================================
// Keuzemachine Pro 2.0
// app.js
// Deel B
// =====================================



// -----------------------------
// INSTELLINGEN OPENEN
// -----------------------------


document
.getElementById("instellingenKnop")
?.addEventListener(
"click",
()=>{


document
.querySelector(".app")
.classList.add("verborgen");


document
.getElementById("instellingen")
.classList.remove("verborgen");


toonBeheer();


});





// -----------------------------
// TERUG
// -----------------------------


document
.getElementById("terugKnop")
?.addEventListener(
"click",
()=>{


document
.getElementById("instellingen")
.classList.add("verborgen");


document
.querySelector(".app")
.classList.remove("verborgen");


});






// -----------------------------
// BEHEERLIJST
// -----------------------------


function toonBeheer(){


let lijst =
document.getElementById(
"wielBeheer"
);



if(!lijst)return;



lijst.innerHTML="";



wielen.forEach(
(wiel,index)=>{


let blok =
document.createElement(
"div"
);



blok.innerHTML=`

<h3>
${wiel.icoon || "🎯"}
${wiel.naam}
</h3>


<p>
${wiel.keuzes.length} keuzes
</p>


<button onclick="bewerkWiel(${index})">

✏️ Bewerken

</button>


<button onclick="verwijderWiel(${index})">

🗑 Verwijderen

</button>

`;



lijst.appendChild(
blok
);



}

);



}






// -----------------------------
// NIEUW WIEL
// -----------------------------


document
.getElementById("nieuwWiel")
?.addEventListener(
"click",
()=>{


bewerkIndex=-1;



document
.getElementById("editorTitel")
.innerText =
"Nieuw wiel";



openEditor();



});






function openEditor(){


document
.getElementById("instellingen")
.classList.add("verborgen");



document
.getElementById("wielEditor")
.classList.remove("verborgen");



document
.getElementById("wielNaam")
.value="";



document
.getElementById("wielIcoon")
.value="🎯";



document
.getElementById("wielKeuzes")
.value="";



}





// -----------------------------
// BEWERKEN
// -----------------------------


function bewerkWiel(index){


bewerkIndex=index;



let wiel =
wielen[index];



document
.getElementById("editorTitel")
.innerText =
"Wiel bewerken";



document
.getElementById("wielNaam")
.value =
wiel.naam;



document
.getElementById("wielIcoon")
.value =
wiel.icoon;



document
.getElementById("wielKeuzes")
.value =
wiel.keuzes.join("\n");



document
.getElementById("instellingen")
.classList.add("verborgen");



document
.getElementById("wielEditor")
.classList.remove("verborgen");



}





// -----------------------------
// OPSLAAN WIEL
// -----------------------------


document
.getElementById("opslaanWiel")
?.addEventListener(
"click",
()=>{


let nieuwWiel={


naam:
document
.getElementById("wielNaam")
.value.trim(),


icoon:
document
.getElementById("wielIcoon")
.value.trim(),


keuzes:

document
.getElementById("wielKeuzes")
.value

.split("\n")

.map(x=>x.trim())

.filter(x=>x!="")



};



if(!nieuwWiel.naam ||
nieuwWiel.keuzes.length===0){


alert(
"Vul een naam en minimaal één keuze in"
);


return;


}




if(bewerkIndex>=0){


nieuwWiel.resultaat =
wielen[bewerkIndex].resultaat;


nieuwWiel.vergrendeld =
wielen[bewerkIndex].vergrendeld;


wielen[bewerkIndex]=
nieuwWiel;



}
else{


wielen.push(
nieuwWiel
);



}



bewaar();



toonWielen();



document
.getElementById("wielEditor")
.classList.add("verborgen");


document
.querySelector(".app")
.classList.remove("verborgen");



bewerkIndex=-1;



});







// -----------------------------
// ANNULEREN
// -----------------------------


document
.getElementById("annuleerWiel")
?.addEventListener(
"click",
()=>{


document
.getElementById("wielEditor")
.classList.add("verborgen");


document
.querySelector(".app")
.classList.remove("verborgen");



bewerkIndex=-1;



});







// -----------------------------
// VERWIJDEREN
// -----------------------------


function verwijderWiel(index){


if(confirm(

"Wiel verwijderen?"

)){


wielen.splice(
index,
1
);



bewaar();



toonWielen();



toonBeheer();



}


}





// -----------------------------
// EXPORT
// -----------------------------


document
.getElementById("exporteerSpel")
?.addEventListener(
"click",
()=>{


let bestand =
new Blob(

[
JSON.stringify(
{
wielen:wielen
},
null,
2
)

],

{
type:"application/json"
}

);



let link =
document.createElement("a");



link.href =
URL.createObjectURL(
bestand
);



link.download =
"keuzemachine.json";



link.click();



});







// -----------------------------
// IMPORT
// -----------------------------


document
.getElementById("importeerSpelKnop")
?.addEventListener(
"click",
()=>{


document
.getElementById("importeerBestand")
.click();



});





document
.getElementById("importeerBestand")
?.addEventListener(
"change",
(e)=>{


let bestand =
e.target.files[0];



if(!bestand)return;



let lezen =
new FileReader();



lezen.onload=()=>{


let data =
JSON.parse(
lezen.result
);



if(data.wielen){


wielen =
data.wielen;



bewaar();



toonWielen();



alert(
"Import klaar"
);



}



};



lezen.readAsText(
bestand
);



});






// =====================================
// EINDE Keuzemachine Pro 2.0
// =====================================
