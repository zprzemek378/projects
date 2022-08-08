let vardistance = new Array;

vardistance =
[
{
    dis:21.7,
    city1:"Tomaszów Lubelski",
    city2:"Hubinek"
},
{
    dis:19.3,
    city1:"Tomaszów Lubelski",
    city2:"Gródek"
},
{
    dis:27.7,
    city1:"Tomaszów Lubelski",
    city2:"Łaszczów"
},
{
    dis:19.4,
    city1:"Tomaszów Lubelski",
    city2:"Jurów"
}
];


/*

może kiedyś ogarnę tego node.js

const fs = require('fs');
fs.readFile('database.txt', 'utf8', (err, data) => 
{
    if(err)
    {
        console.log(err);
        return;
    }
    console.log(data);
});

*/


const people = new Array;
people.push("Trasa całkowita");

let howManyDestinations = new Array;
howManyDestinations[0] = 0;

const cities = new Array;

function addName()
{
    people.push(document.getElementById("nameChoice").value);

    howManyDestinations[people.length-1] = 0;

    const newName = document.createElement("div");
    newName.innerHTML = 
    `
    <div id="pickRoute${people.length-1}">
        ${people.length-1}. ${people[people.length-1]}:</br>
        <span>
            <select id="route${people.length-1}x0" class="routeSelection">
                <option selected>-</option>
            </select>
        </span>

        <input type="submit" value="+" id="addingPlace${people.length-1}" onclick="addPlace(${people.length-1})"/>

        </br></br>
    </div>
    `
    document.getElementById(`pickRoute${people.length-2}`).insertAdjacentElement("afterend", newName);

    for(i=0; i<cities.length; i++)
    {
        const newCity = document.createElement("option");
        newCity.innerHTML = 
        `
        <option>${cities[i]}</option>
        `

        document.getElementById(`route${people.length-1}x0`).insertAdjacentElement("beforeend", newCity);
    }

    document.getElementById("nameChoice").value = "";
}

function addPlace(whichPerson)
{
    howManyDestinations[whichPerson]++;

    const newPlace = document.createElement("span");
    newPlace.innerHTML = 
    `
    <span>
        <img src="img/redArrow.png"></img>
        <select id="route${whichPerson}x${howManyDestinations[whichPerson]}" class="routeSelection">
            <option selected>-</option>
        </select>
    </span>
    `
    document.getElementById(`addingPlace${whichPerson}`).insertAdjacentElement("beforebegin", newPlace);


    for(i=0; i<cities.length; i++)
    {
        const newCity = document.createElement("option");
        newCity.innerHTML = 
        `
        <option>${cities[i]}</option>
        `

        document.getElementById(`route${whichPerson}x${howManyDestinations[whichPerson]}`).insertAdjacentElement("beforeend", newCity);
    }
}

function addCity()
{
    cities.push(document.getElementById("cityChoice").value);

    for(i=0; i<people.length; i++)
    {
        for(j=0; j<=howManyDestinations[i]; j++)
        {
            const newDestination = document.createElement("option");

            newDestination.innerHTML = 
            `
                <option>
                ${cities[cities.length-1]}
                </option>
            `
            document.getElementById(`route${i}x${j}`).insertAdjacentElement("beforeend", newDestination);
        }
    }
    document.getElementById("cityChoice").value = "";
}

function countFinal2()
{
    let kmOfPerson = new Array;

    for(i=0; i<people.length; i++)
    {
        kmOfPerson[i] = 0;
        for(j=0; j<howManyDestinations[i]; j++)
        {
            const cityA = document.getElementById(`route${i}x${j}`).value;
            const cityB = document.getElementById(`route${i}x${j+1}`).value;
            if((cityA == cityB) || (cityA == "-" && cityB == "-")) {}

            else
            {
                for(k=0; k<vardistance.length; k++)
                {
                    if((vardistance[k].city1 == cityA && vardistance[k].city2 == cityB) || (vardistance[k].city2 == cityA && vardistance[k].city1 == cityB))
                    kmOfPerson[i] = kmOfPerson[i]*1 + vardistance[k].dis*1;
                }
            }
        }
    }

    const totalPrice = document.getElementById("vehFuelUsage").value * (kmOfPerson[0]/100) * document.getElementById("vehFuelCost").value;
    let totalKm = 0;
    for(i=1; i<kmOfPerson.length; i++)
    {
        totalKm = totalKm + kmOfPerson[i];
    }
    document.getElementById("results2").innerHTML="";
    document.getElementById("results2").style.visibility = "visible";

    for(i=1; i<kmOfPerson.length; i++)
    {
        document.getElementById("results2").innerHTML+=
        `
        Koszt osoby ${people[i]} wynosi ${(kmOfPerson[i]/totalKm)*totalPrice}</br>
        `
    }
}

function countFinal()
{
    let sendAlert = false;

    for(i=0; i<vardistance.length; i++)
    {
        if(document.getElementById(`distance${i}`)!=null)
        {
            if(document.getElementById(`distance${i}`).value == 0) sendAlert = true;
        }

    }

    if(sendAlert==true) alert("Wybierz poprawne odległości");
    else
    {
        for(i=0; i<vardistance.length; i++)
        {
            if(document.getElementById(`distance${i}`)!=null)
            {
                vardistance[i].dis = document.getElementById(`distance${i}`).value;
            }

        }

        document.getElementById("results").style.visibility = "hidden";
        document.getElementById("results").innerHTML=
        `
        <div id="resultsHeader">Uzupełnij brakujące odległości:</div>
        `

        const vehConsumption = document.getElementById("vehFuelUsage").value;
        const vehFuelPrice = document.getElementById("vehFuelCost").value;

        let ifBreak = true;

        for(i=0; i<people.length; i++)
        {
            for(j=0; j<howManyDestinations[i]; j++)
            {
                let ifExists = false;

                const cityA = document.getElementById(`route${i}x${j}`).value;
                const cityB = document.getElementById(`route${i}x${j+1}`).value;
                if((cityA == "-" && cityB == "-") || (cityA == cityB)) {}
                
                else 
                {
                    for(k=0; k<vardistance.length; k++)
                    {
                        if((vardistance[k].city1==cityA && vardistance[k].city2==cityB) || (vardistance[k].city2==cityA && vardistance[k].city1==cityB)) ifExists = true;
                    }
                }

                if(ifExists == false)
                {
                    ifBreak = false;

                    vardistance.push(
                        {
                            dis: 0,
                            city1: cityA,
                            city2: cityB
                        })

                    document.getElementById("results").style.visibility = "visible";
                    const newDistance = document.createElement("div");
                    newDistance.innerHTML = 
                    `
                        <div>
                            ${cityA} <img src="img/redArrow.png"></img> ${cityB}
                            <input type="number" id="distance${vardistance.length-1}" class="distances"></input>
                        </div>
                    `

                    document.getElementById("results").insertAdjacentElement("beforeend", newDistance);
                }
            }
        }
        if(ifBreak==true) countFinal2();
    }

}

onkeydown = clickedEnter;
function clickedEnter(button)
{
    let clickedButton = button.key;

    if(clickedButton == "Enter")
    {
        const m = document.activeElement.id;

        if(m == "cityChoice") addCity();
        if(m == "nameChoice") addName();
    }
}