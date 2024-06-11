//const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/eur/in";

const BASE_URL = "https://v6.exchangerate-api.com/v6/09294f2369194df2032bdfa1/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const result = document.querySelector(".msg")

/*
for(let code in countryList){   
    console.log(code, countryList[code]);
}
*/

window.addEventListener("load", ()=>{
    getExchangeRate();
});


for(let select of dropdowns){
    for(let Currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = Currcode;
        newOption.value = Currcode;
        if(select.name === "from" && Currcode === "USD"){
            newOption.selected = "selected"
        }else if (select.name === "to" && Currcode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);  //target here represent that where the change is appeared, where flag is changed
    })
}


const updateFlag = (element) => {
    let currCode = element.value;
    //console.log(currCode);
    let countryCode = countryList[currCode];
    let img_src = `https://flagsapi.com/${countryCode}/shiny/64.png`
    let img = element.parentElement.querySelector("img"); // parentElement leads to parent class of selector , if we see in html form then we get to know about that
    img.src = img_src;
}

btn.addEventListener("click", (evt) => {

    evt.preventDefault();  //this is is predefined function ,which tells that before this line when we clicked on btn then page is getting refresh now this line means whatever work this button is doing will get stop
    getExchangeRate();
})

const getExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
//    console.log(amtVal);
    if(amtVal == "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    result.innerText =  "Getting exchange rate....";
    
    const URL = `${BASE_URL}/${fromCurr.value}`;
     let response = await fetch(URL)
     let data = await response.json();
     //console.log(data);
     let exchangeRate = data.conversion_rates[toCurr.value];
     let totalExRate = (amtVal * exchangeRate).toFixed(2);//to Fixed means it comes upto 2 decimal places, with predecessor , successor 
     result.innerText = `${amtVal} ${fromCurr.value} = ${totalExRate} ${toCurr.value}`;
}

/*

do this question with promise also as practice
*/