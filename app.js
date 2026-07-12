// Keuzemachine Pro 5.0
// Basisversie


const standaardWielen = [

{
naam:"Handeling",
icoon:"🎯",
items:[
"Wandelen",
"Springen",
"Rennen",
"Dansen",
"Lezen",
"Tekenen",
"Schrijven",
"Fietsen",
"Klimmen",
"Zingen",
"Koken",
"Bouwen",
"Rollen",
"Lachen",
"Fluiten"
]
},


{
naam:"Attribuut",
icoon:"🎒",
items:[
"Rode bal",
"Blauwe bal",
"Touw",
"Boek",
"Stoel",
"Paraplu",
"Zaklamp",
"Fles",
"Bloem",
"Potlood",
"Doos",
"Horloge",
"Ring",
"Kaart",
"Steen"
]
},


{
naam:"Duur",
icoon:"⏱️",
items:[
"10 seconden",
"20 seconden",
"30 seconden",
"1 minuut",
"2 minuten",
"5 minuten",
"10 minuten",
"15 minuten",
"30 minuten",
"1 uur"
]
},


{
naam:"Aantal",
icoon:"🔢",
items:[
"1",
"2",
"3",
"4",
"5",
"6",
"10",
"20",
"50"
]
}

];



// gegevens ophalen

let wielen =
JSON.parse(localStorage.getItem("keuzemachine"))
||
standaardWielen;



const container =
document.getElementById("wielen");



function bouwScherm(){


container.innerHTML="";


wielen.forEach((wiel,index)=>{


let kaart=document.createElement("div");

kaart.className="wiel-kaart";


kaart.innerHTML=`

<div class="wiel-titel">

<span class="wiel-icoon">
${wiel.icoon}
</span>

${wiel.naam}

</div>


<div class="wiel-waarde" id="waarde${index}">
${wiel.items[0]}
</div>


<button class="draaiKnop" onclick="draai(${index})">

Draai ${wiel.naam}

</button>

`;


container.appendChild(kaart);


});


}



function draai(index){


let wiel=wielen[index];


let tekst=document.getElementById(
"waarde"+index
);


tekst.classList.add("draaien");


let teller=0;


let timer=setInterval(()=>{


let keuze =
wiel.items[
Math.floor(
Math.random()*wiel.items.length
)
];


tekst.textContent=keuze;


teller++;



if(teller>15){


clearInterval(timer);


tekst.classList.remove(
"draaien"
);



let eind =
wiel.items[
Math.floor(
Math.random()*wiel.items.length
)
];


tekst.textContent=eind;


}


},80);


}




// instellingen openen

document
.getElementById("openInstellingen")
.onclick=function(){


document
.querySelector(".app")
.classList.add("verborgen");


document
.getElementById("instellingen")
.classList.remove("verborgen");


maakInstellingen();


};




// instellingen maken

function maakInstellingen(){


let plek =
document.getElementById(
"instellingLijsten"
);


plek.innerHTML="";


wielen.forEach((wiel,index)=>{


let div=document.createElement("div");

div.className="lijst";


div.innerHTML=`

<h2>
${wiel.icoon}
${wiel.naam}
</h2>


<textarea id="lijst${index}">
${wiel.items.join("\n")}
</textarea>

`;


plek.appendChild(div);



});


}




document
.getElementById("terugKnop")
.onclick=function(){


wielen.forEach((wiel,index)=>{


let tekst=
document.getElementById(
"lijst"+index
).value;



wiel.items =
tekst
.split("\n")
.filter(x=>x.trim()!="");


});


localStorage.setItem(
"keuzemachine",
JSON.stringify(wielen)
);



document
.getElementById("instellingen")
.classList.add("verborgen");


document
.querySelector(".app")
.classList.remove("verborgen");


bouwScherm();


};




bouwScherm();
