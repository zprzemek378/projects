const products = new Array;
const prices = new Array;
const people = new Array;
const owners = new Array;

let howMuchPaid = new Array;
let totalCost = 0;



onkeydown = clickedEnter;

function clickedEnter(button)
{
    let clickedButton = button.key;

    if(clickedButton == "Enter")
    {
        const m = document.activeElement.id;

        if(m=='productChoice' || m=='priceChoice' || m=='ownerChoice' || m=='resetPickingOwner' || m=='addingProduct')  addProductCondition();

        if(m=='nameChoice' || m=='addingName') addName();
    }
}


function addProductCondition()
{
    if(document.getElementById("ownerChoice").value == "Właściciel produktu")
    alert("Wybierz właściciela produktu");

    else addProduct();
}


function addProduct()
{
    products.push(document.getElementById("productChoice").value);
    prices.push(document.getElementById("priceChoice").value);
    owners.push(document.getElementById("ownerChoice").value);

    howMuchPaid[document.getElementById("ownerChoice").value] += (prices[products.length - 1])/1;
    totalCost += (prices[products.length - 1])/1;

    const newProduct = document.createElement("div");
    newProduct.innerHTML =
    `
        <span id="containerOfProductId${products.length-1}">
            <span class="numberOfProduct">${products.length}.</span>
            <span class="nameOfProduct">${products[products.length-1]} (${people[owners[owners.length-1]]})</span>
            <span class="priceOfProduct">${prices[products.length-1]} zł</span>
        </span>
    `;
    document.getElementById("pick").insertAdjacentElement("beforeend", newProduct);

    if (products.length % 2 == 0) document.getElementById(`containerOfProductId${products.length-1}`).className = "background1";

    else document.getElementById(`containerOfProductId${products.length-1}`).className = "background2";


    for(i=0; i<people.length; i++)
    {
        if((products.length-1) % 2 == 0)
        {
            const newName = document.createElement("span");
            newName.innerHTML = 
            `   <span class="checkboxes2" id="containerOfCheckbox${i}x${products.length-1}">
                        <input type="checkbox" id="checkbox${i}x${products.length-1}"/>
                </span>
            `;
            document.getElementById(`containerOfProductId${products.length-1}`).insertAdjacentElement("afterend", newName);
        }

        else
        {
            const newName = document.createElement("span");
            newName.innerHTML = 
            `   <span class="checkboxes1" id="containerOfCheckbox${i}x${products.length-1}">
                        <input type="checkbox" id="checkbox${i}x${products.length-1}"/>
                </span>
            `;
            document.getElementById(`containerOfProductId${products.length-1}`).insertAdjacentElement("afterend", newName);
        }
    }

    if(products.length == 1)
    {
        for(i=0; i<people.length; i++)
        {
            const nameName = document.createElement("div");
            nameName.innerHTML = 
            `
                <div class="nameNames">
                    ${people[i]}
                </div>
            `
            document.getElementById(`checkbox${i}x0`).insertAdjacentElement("beforebegin", nameName);
        }
    }


    document.getElementById("productChoice").value = "";
    document.getElementById("priceChoice").value = "";

    const resetOwner = document.getElementById("resetPickingOwner");
    if (resetOwner.checked == true)
    document.getElementById("ownerChoice").value = "Właściciel produktu";
}

function addName()
{
    people.push(document.getElementById("nameChoice").value);

    howMuchPaid[people.length-1] = 0;

    const i = people.length-1;

    for(j=0; j<products.length; j++)
    {
        if(j % 2 == 0)
        {
            const newName = document.createElement("span");
            newName.innerHTML = 
            `   <span class="checkboxes2" id="containerOfCheckbox${i}x${j}">
                        <input type="checkbox" id="checkbox${i}x${j}"/>
                </span>
            `;
            document.getElementById(`containerOfProductId${j}`).insertAdjacentElement("afterend", newName);
        }

        else
        {
            const newName = document.createElement("span");
            newName.innerHTML = 
            `   <span class="checkboxes1" id="containerOfCheckbox${i}x${j}">
                        <input type="checkbox" id="checkbox${i}x${j}"/>
                </span>
            `;
            document.getElementById(`containerOfProductId${j}`).insertAdjacentElement("afterend", newName);
        }
    }


    if(products.length > 0)
    {
        const nameName = document.createElement("div");
        nameName.innerHTML = 
        `
            <div class="nameNames">
                ${people[i]}
            </div>
        `
        document.getElementById(`checkbox${i}x0`).insertAdjacentElement("beforebegin", nameName);
    }

    const hostOptions = document.getElementById("hostChoice");
    hostOptions.options.add(new Option(people[i],i));

    const ownerOptions = document.getElementById("ownerChoice");
    ownerOptions.options.add(new Option(people[i],i))

    const x = 799 / people.length - 6.8;

    let widthJS = document.documentElement;

    widthJS.style.setProperty('--widthCSS1', x + "px");
    widthJS.style.setProperty('--widthCSS2', x + "px");


    document.getElementById("nameChoice").value = "";
}

function countFinalCondition()
{
    if(people.length>0 && products.length>0)    countFinal();

    else window.alert("Dodaj co najmniej jeden produkt i co najmniej jedną osobę");
}

function countFinal()
{
        let boxes = new Array();

        let perPersonForProduct = new Array();
        let numberOfPeoplePerProduct = new Array();
        let priceOfPerson = new Array();

        let costForHost = new Array();


    let hostPerson = document.getElementById("hostChoice").value;

    if(hostPerson == "auto")
    {
        hostPerson = 0;

        for(i=1; i<people.length; i++)
        {
            if(howMuchPaid[i]>howMuchPaid[hostPerson])  hostPerson = i;
        }
    }


    document.getElementById("results").innerHTML = "";
    document.getElementById("results").style.visibility="visible";

    
    document.getElementById("results2").innerHTML = "";
    document.getElementById("results2").style.visibility="visible";

    for (i=0; i<people.length; i++)
    {
        boxes[i] = new Array();

        for (j=0; j<products.length; j++)
        {

            boxes[i][j] = document.getElementById(`checkbox${i}x${j}`);
        }
    }


    for (j=0; j<products.length; j++)
    {
        numberOfPeoplePerProduct[j] = 0;
        for (i=0; i<people.length; i++)
        {
            if(boxes[i][j].checked == true)   numberOfPeoplePerProduct[j]++;
        }
        perPersonForProduct[j] = prices[j] / numberOfPeoplePerProduct[j];
    }


    for (i=0; i<people.length; i++)
    {
        priceOfPerson[i] = 0;
        for (j=0; j<products.length; j++)
        {
            if(boxes[i][j].checked == true) priceOfPerson[i] += perPersonForProduct[j];
        }

        costForHost[i] = priceOfPerson[i];
        costForHost[i] = costForHost[i] - howMuchPaid[i];

        if (hostPerson != i)
        {
            if(costForHost[i]>0)
            {
                let z = Math.round(costForHost[i]*100) / 100;
    
                document.getElementById("results2").innerHTML += `${people[i]} przekazuje ${people[hostPerson]} ${z} </br>`;
            }
    
            if(costForHost[i]<0)
            {
                let z = -1 * (Math.round(costForHost[i]*100) / 100);
    
                document.getElementById("results2").innerHTML += `${people[hostPerson]} przekazuje ${people[i]} ${z} </br>`;
            }
        }


        let y = Math.round(priceOfPerson[i]*100) / 100;
        document.getElementById("results").innerHTML += `Koszt ${people[i]} wynosi ${y} </br>`;
    }

    document.getElementById("results").innerHTML += `</br>Całkowity koszt imprezy wynosi ${totalCost}`;
}

