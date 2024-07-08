//Base URL for currency conversion API
const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies/";

const container=document.querySelector("#container");
const dropdowns=document.querySelectorAll("#dropdown select");
let amount=document.querySelector("#amountDiv input");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector("#result-msg");
const submitBtn=document.querySelector("#submit-btn");

//Dropdown menu- adding options & setting initial conversion to USD -> INR
for (let i of dropdowns){
    // console.log(i);     //each dropdown element: <select name="from">...</select>
    for (currCode in countryList){      //countryList from country-codes.js file
        // console.log(currCode);   //all currency codes get logged
        let countryOptions=document.createElement("option");   //creates n no. of <options> to populate the dropdown menu with currency codes of countries
        countryOptions.innerText=currCode;
        countryOptions.value=currCode;    //value attribute of the <option> element
        i.append(countryOptions);   //adds the curent currency code option to the dropdown menu

        //initally conversion
        if(i.name==="from" && currCode==="USD"){
            countryOptions.selected="selected";
        }
        else if(i.name==="to" && currCode==="INR"){
            countryOptions.selected="selected";
        }
    }

    i.addEventListener("change",(event)=>{  //event-> event obj
        updateFlag(event.target);
    });
}


//Updating flags according to currency code chosen from dropdown menu
const updateFlag=(element)=>{   //element-> <select>
    // console.log(element);
    let currencyCode=element.value;
    console.log(currencyCode);  //USD, INR, etc

    let countryCode=countryList[currencyCode];
    console.log(countryCode);   //US, IN, etc

    let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let flag=element.parentElement.querySelector("img");    //parentElement-> <div class="select-country"> which contains <img> & <select>
    flag.src=newSrc;
};


//'Get Exchange Rate' button
submitBtn.addEventListener("click", async(evt)=>{
    evt.preventDefault();   //prevent the default form submission to server behaviour, allowing custom handling of form data via js
    // console.log(amount);    //<input>
    let amountValue=amount.value;
    console.log(amountValue);  //1 by default
    if (amountValue==="" || amountValue<1){
        amountValue=1;
        amount.value="1";
    }
    console.log(fromCurr.value.toLowerCase(),toCurr.value.toLowerCase());   //usd inr

    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response=await fetch(URL);    //response from API
    console.log(response);

    let data=await response.json();    //data received from API
    console.log(data);

    //exchange rate for 1 unit:
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);

    console.log(amountValue);
    let finalRate=amountValue*rate;  //final amount

    //display result
    msg.innerText=`${amountValue} ${fromCurr.value} = ${finalRate} ${toCurr.value}`;
    msg.style.display="block";
    container.style.height="25rem";
});
