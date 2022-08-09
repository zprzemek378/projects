window.onload = function()
{
    document.getElementById("alcoholChoice").addEventListener("change", function()
    {
        if(document.getElementById("alcoholChoice").value == "another") document.getElementById("anotherPercentage").style.visibility = "visible";
        else document.getElementById("anotherPercentage").style.visibility = "hidden";
    });

    document.getElementById("quantityChoice").addEventListener("change", function()
    {
        if(document.getElementById("quantityChoice").value == "another") document.getElementById("anotherQuantity").style.visibility = "visible";
        else document.getElementById("anotherQuantity").style.visibility = "hidden";
    });

    document.getElementById("sizeChoice").addEventListener("change", function()
    {
        if(document.getElementById("sizeChoice").value == "another") document.getElementById("anotherSize").style.visibility = "visible";
        else document.getElementById("anotherSize").style.visibility = "hidden";
    });

    document.getElementById("alcoholChoiceR").addEventListener("change", function()
    {
        if(document.getElementById("alcoholChoiceR").value == "another") document.getElementById("anotherPercentageR").style.visibility = "visible";
        else document.getElementById("anotherPercentageR").style.visibility = "hidden";
    });
}

const typeOfAlcohol = new Array;
const quantityOfAlcohol = new Array;
const sizeOfAlcohol = new Array;

const typeOfAlcoholR = new Array;

let totalAlcohol = 0;

function addConvertFrom()
{
    document.getElementById("pick").style.visibility = "visible";

    if(document.getElementById("alcoholChoice").value != "another") typeOfAlcohol.push(document.getElementById("alcoholChoice").value);
    else typeOfAlcohol.push(document.getElementById("anotherPercentage").value);

    if(document.getElementById("quantityChoice").value != "another") quantityOfAlcohol.push(document.getElementById("quantityChoice").value);
    else quantityOfAlcohol.push(document.getElementById("anotherQuantity").value);

    if(document.getElementById("sizeChoice").value != "another") sizeOfAlcohol.push(document.getElementById("sizeChoice").value);
    else sizeOfAlcohol.push(document.getElementById("anotherSize").value);

    const newConvertFrom = document.createElement("div");

    if(typeOfAlcohol.length%2==0)
    {
        if(document.getElementById("alcoholChoice").value != "another")
        {
            newConvertFrom.innerHTML =
            `
            <span class="list1A">
                ${typeOfAlcohol.length}. ${document.getElementById("alcoholChoice").options[document.getElementById("alcoholChoice").selectedIndex].text}
            </span>
            `
        }
        else
        {
            newConvertFrom.innerHTML =
            `
            <span class="list1A">
                ${typeOfAlcohol.length}. Inne - ${document.getElementById("anotherPercentage").value}%
            </span>
            `
        }

        if(document.getElementById("quantityChoice").value != "another")
        {
            newConvertFrom.innerHTML +=
            `
            <span class="list2A">
            Ilość: ${quantityOfAlcohol[quantityOfAlcohol.length-1]}
            </span>
            `
        }
        else
        {
            newConvertFrom.innerHTML +=
            `
            <span class="list2A">
            Ilość: ${document.getElementById("anotherQuantity").value}
            </span>
            `
        }
        
        if(document.getElementById("sizeChoice").value != "another")
        {
            newConvertFrom.innerHTML +=
            `
            <span class="list3A">
            Wielkość: ${sizeOfAlcohol[sizeOfAlcohol.length-1]}ml
            </span>
            `
        }
        else
        {
            newConvertFrom.innerHTML +=
            `
            <span class="list3A">
            Wielkość: ${document.getElementById("anotherSize").value}ml
            </span>
            `
        }

        newConvertFrom.innerHTML+=
        `
        <span class="list4A">
        Ilość czystego alkoholu: ${(Math.round(100*(quantityOfAlcohol[quantityOfAlcohol.length-1]*(typeOfAlcohol[typeOfAlcohol.length-1]/100)*sizeOfAlcohol[sizeOfAlcohol.length-1])))/100}ml
        </span>
        `
    }

    else
    {
        if(document.getElementById("alcoholChoice").value != "another")
        {
            newConvertFrom.innerHTML =
            `
            <span class="list1B">
                ${typeOfAlcohol.length}. ${document.getElementById("alcoholChoice").options[document.getElementById("alcoholChoice").selectedIndex].text}
            </span>
            `
        }
        else
        {
            newConvertFrom.innerHTML =
            `
            <span class="list1B">
                ${typeOfAlcohol.length}. Inne - ${document.getElementById("anotherPercentage").value}%
            </span>
            `
        }

        if(document.getElementById("quantityChoice").value != "another")
        {
            newConvertFrom.innerHTML +=
            `
            <span class="list2B">
            Ilość: ${quantityOfAlcohol[quantityOfAlcohol.length-1]}
            </span>
            `
        }
        else
        {
            newConvertFrom.innerHTML +=
            `
            <span class="list2B">
            Ilość: ${document.getElementById("anotherQuantity").value}
            </span>
            `
        }
        
        if(document.getElementById("sizeChoice").value != "another")
        {
            newConvertFrom.innerHTML +=
            `
            <span class="list3B">
            Wielkość: ${sizeOfAlcohol[sizeOfAlcohol.length-1]}ml
            </span>
            `
        }
        else
        {
            newConvertFrom.innerHTML +=
            `
            <span class="list3B">
            Wielkość: ${document.getElementById("anotherSize").value}ml
            </span>
            `
        }

        newConvertFrom.innerHTML+=
        `
        <span class="list4B">
        Ilość czystego alkoholu: ${(Math.round(100*(quantityOfAlcohol[quantityOfAlcohol.length-1]*(typeOfAlcohol[typeOfAlcohol.length-1]/100)*sizeOfAlcohol[sizeOfAlcohol.length-1])))/100}ml
        </span>
        `
    }
    
    document.getElementById("pick").insertAdjacentElement("beforeend", newConvertFrom);

    totalAlcohol+=quantityOfAlcohol[quantityOfAlcohol.length-1]*(typeOfAlcohol[typeOfAlcohol.length-1]/100)*sizeOfAlcohol[sizeOfAlcohol.length-1];


    if(typeOfAlcoholR.length!=0)
    {
        for(i=0; i<typeOfAlcoholR.length; i++)
        {
            document.getElementById(`listResult${i}`).innerHTML=
            `
            ${(Math.round(100*totalAlcohol/(typeOfAlcoholR[i]/100)))/100}ml
            `
        }
    }
}

function addConvertFromCondition()
{
    if(document.getElementById("alcoholChoice").value=="-" ||
    document.getElementById("quantityChoice").value=="-" ||
    document.getElementById("sizeChoice").value=="-" ||
    (document.getElementById("alcoholChoice").value=="another" && document.getElementById("anotherPercentage").value=="") ||
    (document.getElementById("quantityChoice").value=="another" && document.getElementById("anotherQuantity").value=="") ||
    (document.getElementById("sizeChoice").value=="another" && document.getElementById("anotherSize").value==""))
    alert("Wybierz poprawne wartości");

    else addConvertFrom();
}


function addConvertTo()
{
    document.getElementById("results").style.visibility = "visible";

    if(document.getElementById("alcoholChoiceR").value != "another") typeOfAlcoholR.push(document.getElementById("alcoholChoiceR").value);
    else typeOfAlcoholR.push(document.getElementById("anotherPercentageR").value);

    if(typeOfAlcoholR.length>1)
    {
        const newOr = document.createElement("div");
        newOr.innerHTML = 
        `
        <span class="listOr">
            lub
        </span>
        `

        document.getElementById("results").insertAdjacentElement("beforeend", newOr);
    }


    const newConvertTo = document.createElement("div");

    if(typeOfAlcoholR.length%2==0)
    {
        if(document.getElementById("alcoholChoiceR").value != "another")
        {
            newConvertTo.innerHTML = 
            `
            <span class="list1A">
                ${document.getElementById("alcoholChoiceR").options[document.getElementById("alcoholChoiceR").selectedIndex].text}
            </span>
            <span class="list2A" id="listResult${typeOfAlcoholR.length-1}">
                ${(Math.round(100*totalAlcohol/(typeOfAlcoholR[typeOfAlcoholR.length-1]/100)))/100}ml 
            </span>
            `
        }
        else
        {
            newConvertTo.innerHTML = 
            `
            <span class="list1A">
                Inne - ${document.getElementById("anotherPercentageR").value}%
            </span>
            <span class="list2A" id="listResult${typeOfAlcoholR.length-1}">
                ${(Math.round(100*totalAlcohol/(typeOfAlcoholR[typeOfAlcoholR.length-1]/100)))/100}ml 
            </span>
            `
        }

    }

    else
    {
        if(document.getElementById("alcoholChoiceR").value != "another")
        {
            newConvertTo.innerHTML = 
            `
            <span class="list1B">
                ${document.getElementById("alcoholChoiceR").options[document.getElementById("alcoholChoiceR").selectedIndex].text}
            </span>
            <span class="list2B" id="listResult${typeOfAlcoholR.length-1}">
                ${(Math.round(100*totalAlcohol/(typeOfAlcoholR[typeOfAlcoholR.length-1]/100)))/100}ml 
            </span>
            `
        }
        else
        {
            newConvertTo.innerHTML = 
            `
            <span class="list1B">
                Inne - ${document.getElementById("anotherPercentageR").value}%
            </span>
            <span class="list2B" id="listResult${typeOfAlcoholR.length-1}">
                ${(Math.round(100*totalAlcohol/(typeOfAlcoholR[typeOfAlcoholR.length-1]/100)))/100}ml 
            </span>
            `
        }
    }

    document.getElementById("results").insertAdjacentElement("beforeend", newConvertTo);

}

function addConvertToCondition()
{
    if(document.getElementById("alcoholChoiceR").value=="-" ||
    (document.getElementById("alcoholChoiceR").value=="another" && document.getElementById("anotherPercentageR").value==""))
    alert("Wybierz poprawne wartości");

    else addConvertTo();
}