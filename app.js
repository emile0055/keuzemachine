// Keuzemachine Pro
// Complete versie


let wielen = [];

const container = document.getElementById("wielen");


// ----------------------------
// DATA LADEN
// ----------------------------

async function laadData() {

    let opgeslagen =
    localStorage.getItem("keuzemachine");


    if (opgeslagen) {

        wielen = JSON.parse(opgeslagen);

        bouwScherm();

    } else {


        let antwoord =
        await fetch("data.json");


        let data =
        await antwoord.json();


        wielen = data.wielen;


        bewaar();


        if(document.getElementById("spelNaam")){
            document.getElementById("spelNaam").textContent =
            data.spelnaam;
        }


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
        ${wiel.icoon}
        ${wiel.naam}
        </div>


        <div class="wiel-waarde" id="waarde${index}">
        ${wiel.keuzes[0] || ""}
        </div>


        <button onclick="draai(${index})">

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

        }


    },80);

}



// ----------------------------
// INSTELLINGEN OPENEN
// ----------------------------

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



// ----------------------------
// INSTELLINGEN TONEN
// ----------------------------

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

}



// ----------------------------
// TERUG KNOP
// ----------------------------

if(document.getElementById("terugKnop")){

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



// ----------------------------
// WIEL VERWIJDEREN
// ----------------------------

function verwijderWiel(index){

    let naam =
    wielen[index].naam;


    if(confirm(
    "Wiel '"+naam+"' verwijderen?"
    )){


        wielen.splice(index,1);


        bewaar();


        bouwScherm();


        maakInstellingen();

    }

}



// ----------------------------
// NIEUW WIEL OPENEN
// ----------------------------

if(document.getElementById("nieuwWiel")){


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


}



// ----------------------------
// EXTRA REGEL
// ----------------------------

if(document.getElementById("regelToevoegen")){


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

}



// ----------------------------
// NIEUW WIEL OPSLAAN
// ----------------------------

if(document.getElementById("bewaarNieuwWiel")){


document
.getElementById("bewaarNieuwWiel")
.onclick=function(){


let naam =
document.getElementById("nieuwWielNaam").value;


let icoon =
document.getElementById("nieuwWielIcoon").value;


let velden =
document.querySelectorAll(".keuzeRegel");


let keuzes=[];


velden.forEach(v=>{


v.value
.split("\n")
.forEach(regel=>{


if(regel.trim()!=""){

keuzes.push(
regel.trim()
);

}


});


});



if(naam && keuzes.length){


wielen.push({

naam:naam,

icoon:icoon,

keuzes:keuzes

});


bewaar();


bouwScherm();


document
.getElementById("nieuwWielScherm")
.classList.add("verborgen");


document
.querySelector(".app")
.classList.remove("verborgen");


}


};


}



// ----------------------------
// ANNULEREN NIEUW WIEL
// ----------------------------

if(document.getElementById("annuleerNieuwWiel")){


document
.getElementById("annuleerNieuwWiel")
.onclick=function(){


document
.getElementById("nieuwWielScherm")
.classList.add("verborgen");


document
.querySelector(".app")
.classList.remove("verborgen");


};

}



// ----------------------------
// EXPORT
// ----------------------------

if(document.getElementById("exporteerSpel")){


document
.getElementById("exporteerSpel")
.onclick=function(){


let blob =
new Blob(
[
JSON.stringify(
{wielen:wielen},
null,
2)
],
{
type:"application/json"
});


let link =
document.createElement("a");


link.href =
URL.createObjectURL(blob);


link.download =
"keuzemachine-spel.json";


link.click();


};

}



// ----------------------------
// IMPORT
// ----------------------------

if(document.getElementById("importeerSpelKnop")){


document
.getElementById("importeerSpelKnop")
.onclick=function(){

document
.getElementById("importeerBestand")
.click();

};

}



if(document.getElementById("importeerBestand")){


document
.getElementById("importeerBestand")
.onchange=function(e){


let bestand =
e.target.files[0];


let lezen =
new FileReader();


lezen.onload=function(){


let data =
JSON.parse(lezen.result);


if(confirm(
"Huidig spel vervangen?"
)){


wielen=data.wielen;


bewaar();


bouwScherm();


alert(
"Spel geïmporteerd"
);


}


};


lezen.readAsText(bestand);


};

}



// START

laadData();
