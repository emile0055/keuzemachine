// Keuzemachine Pro 5.0
// Data wordt geladen uit data.json

let wielen = [];

const container = document.getElementById("wielen");


// Data laden

async function laadData() {

    try {

        const antwoord = await fetch("data.json");

        const data = await antwoord.json();

        wielen = data.wielen;

        document.getElementById("spelNaam").textContent =
            data.spelnaam;


        bouwScherm();

    }

    catch(error){

        console.log("Fout bij laden data:", error);

        container.innerHTML =
        "Kan data.json niet laden";

    }

}




// Kaarten maken

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





// Draaien

function draai(index){


    let wiel=wielen[index];

    let tekst=document.getElementById(
        "waarde"+index
    );


    tekst.classList.add("draaien");


    let teller=0;


    let timer=setInterval(()=>{


        let keuze =
        wiel.keuzes[
            Math.floor(
                Math.random()
                *
                wiel.keuzes.length
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
            wiel.keuzes[
                Math.floor(
                    Math.random()
                    *
                    wiel.keuzes.length
                )
            ];


            tekst.textContent=eind;


        }


    },80);


}





// Instellingen openen

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





// Instellingen tonen

function maakInstellingen(){


let plek =
document.getElementById(
"instellingLijsten"
);


plek.innerHTML="";


wielen.forEach((wiel,index)=>{


let blok=document.createElement("div");

blok.className="lijst";


blok.innerHTML=`

<h2>
${wiel.icoon}
${wiel.naam}
</h2>

<textarea id="lijst${index}">
${wiel.keuzes.join("\n")}
</textarea>

`;


plek.appendChild(blok);


});


}





// Terug uit instellingen

document
.getElementById("terugKnop")
.onclick=function(){


wielen.forEach((wiel,index)=>{


let tekst=
document.getElementById(
"lijst"+index
).value;



wiel.keuzes =
tekst
.split("\n")
.filter(
regel=>regel.trim()!=""
);


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





// Start app

laadData();
