// Keuzemachine Pro 5.0
// Dynamische wielen + instellingen


let wielen = [];

const container = document.getElementById("wielen");


// ----------------------------
// DATA LADEN
// ----------------------------

async function laadData(){

    let opgeslagen =
    localStorage.getItem("keuzemachine");


    if(opgeslagen){

        wielen = JSON.parse(opgeslagen);

        bouwScherm();

    }
    else {


        const antwoord =
        await fetch("data.json");


        const data =
        await antwoord.json();


        wielen=data.wielen;


        bewaar();


        document.getElementById("spelNaam")
        .textContent=data.spelnaam;


        bouwScherm();

    }

}




// ----------------------------
// OPSLAAN
// ----------------------------

function bewaar(){

    localStorage.setItem(
        "keuzemachine",
        JSON.stringify(wielen)
    );

}





// ----------------------------
// HOOFDSCHERM
// ----------------------------

function bouwScherm(){

    container.innerHTML="";


    wielen.forEach((wiel,index)=>{


        let kaart =
        document.createElement("div");


        kaart.className="wiel-kaart";


        kaart.innerHTML=`

        <div class="wiel-titel">

        <span class="wiel-icoon">
        ${wiel.icoon}
        </span>

        ${wiel.naam}

        </div>


        <div class="wiel-waarde"
        id="waarde${index}">

        ${wiel.keuzes[0]}

        </div>


        <button class="draaiKnop"
        onclick="draai(${index})">

        Draai ${wiel.naam}

        </button>

        `;


        container.appendChild(kaart);


    });

}





// ----------------------------
// DRAAIEN
// ----------------------------

function draai(index){


let wiel=wielen[index];


let tekst =
document.getElementById(
"waarde"+index
);



tekst.classList.add(
"draaien"
);



let teller=0;


let timer=setInterval(()=>{


tekst.textContent =
wiel.keuzes[
Math.floor(
Math.random()*wiel.keuzes.length
)
];


teller++;


if(teller>15){


clearInterval(timer);


tekst.classList.remove(
"draaien"
);


}



},80);


}





// ----------------------------
// INSTELLINGEN
// ----------------------------
document
.getElementById("terugKnop")
.onclick=function(){

document
.getElementById("instellingen")
.classList.add("verborgen");


document
.querySelector(".app")
.classList.remove("verborgen");

};
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






function maakInstellingen(){


let plek =
document.getElementById(
"instellingLijsten"
);



plek.innerHTML="";


wielen.forEach((wiel,index)=>{


let blok =
document.createElement("div");


blok.className="lijst";


blok.innerHTML=`

<h2>
${wiel.icoon}
${wiel.naam}
</h2>

<p>
${wiel.keuzes.length} keuzes
</p>


<button onclick="verwijderWiel(${index})">

🗑 Verwijderen

</button>

`;


plek.appendChild(blok);


});

function verwijderWiel(index){


let naam =
wielen[index].naam;


let akkoord =
confirm(
"Wiel '"+naam+"' verwijderen?"
);



if(akkoord){


wielen.splice(index,1);


bewaar();


maakInstellingen();


bouwScherm();


}


}

}




// ----------------------------
// NIEUW WIEL
// ----------------------------


document
.getElementById("nieuwWiel")
.onclick=function(){


document
.getElementById("instellingen")
.classList.add("verborgen");


document
.getElementById("nieuwWielScherm")
.classList.remove("verborgen");


};





// extra regel toevoegen

document
.getElementById("regelToevoegen")
.onclick=function(){


let veld =
document.createElement("textarea");


veld.className="keuzeRegel";


veld.placeholder="Nieuwe keuze";


document
.getElementById("nieuweKeuzes")
.appendChild(veld);


};





// nieuw wiel bewaren

document
.getElementById("bewaarNieuwWiel")
.onclick=function(){



let naam =
document
.getElementById("nieuwWielNaam")
.value;



let icoon =
document
.getElementById("nieuwWielIcoon")
.value;



let velden =
document
.querySelectorAll(".keuzeRegel");



let keuzes=[];


velden.forEach(v=>{

let regels = v.value
.split("\n")
.filter(regel => regel.trim() !== "");


regels.forEach(regel => {

keuzes.push(regel.trim());

});

});





if(
naam &&
keuzes.length>0
){


wielen.push({

naam:naam,

icoon:icoon,

keuzes:keuzes

});



bewaar();



bouwScherm();



terugNaarHoofdscherm();



}



};






// annuleren

document
.getElementById("annuleerNieuwWiel")
.onclick=function(){

terugNaarHoofdscherm();

};





function terugNaarHoofdscherm(){


document
.getElementById("nieuwWielScherm")
.classList.add("verborgen");


document
.getElementById("instellingen")
.classList.add("verborgen");


document
.querySelector(".app")
.classList.remove("verborgen");

document
.getElementById("terugKnop")
.onclick=function(){

document
.getElementById("instellingen")
.classList.add("verborgen");


document
.querySelector(".app")
.classList.remove("verborgen");

};    

}






// START
// ----------------------------
// EXPORTEREN
// ----------------------------

document
.getElementById("exporteerSpel")
.onclick=function(){

let bestand = JSON.stringify(
{
    spelnaam:
    document.getElementById("spelNaam").textContent,

    wielen:wielen
},
null,
2
);


let blob = new Blob(
[bestand],
{
type:"application/json"
}
);


let link=document.createElement("a");

link.href=
URL.createObjectURL(blob);


link.download=
"keuzemachine-spel.json";


link.click();

};




// ----------------------------
// IMPORTEREN OPENEN
// ----------------------------

document
.getElementById("importeerSpelKnop")
.onclick=function(){

document
.getElementById("importeerBestand")
.click();

};




// ----------------------------
// IMPORTEREN UITVOEREN
// ----------------------------

document
.getElementById("importeerBestand")
.onchange=function(event){


let bestand =
event.target.files[0];


let lezen =
new FileReader();


lezen.onload=function(){


let data =
JSON.parse(lezen.result);



let akkoord =
confirm(
"Het huidige spel wordt vervangen.\n\nDoorgaan?"
);



if(!akkoord){

return;

}



wielen =
data.wielen;



bewaar();


bouwScherm();



alert(
"Spel geïmporteerd"
);


};




lezen.readAsText(bestand);



};
laadData();
