let valutaList = [
    {name: "AZN",tesvir:"Azerbaycan manati",flag:"Source/Flag_of_Azerbaijan.png",exchange:1},
    {name: "USD",tesvir:"ABS dollari",flag:"Source/Flag_of_the_United_States.png",exchange:1.7},
    {name: "TRY",tesvir:"Turk lirasi",flag:"Source/turk-bayragi-logo-png.png",exchange:0.047},
    {name: "RUB",tesvir:"Rus rublu",flag:"Source/Flag_of_Russia.svg.png",exchange:0.0186},
    {name: "EUR",tesvir:"Euro",flag:"Source/Flag_of_Europe.svg.webp",exchange:1.7844},
    {name: "GEL",tesvir:"Georgian Lari",flag:"Source/Flag_of_Georgia.svg.webp",exchange:0.6},
    {name: "IRR",tesvir:"Iranian Rial",flag:"Source/Flag_of_Iran.svg.png",exchange:2.55},
    {name: "JPY",tesvir:"Japanese Yen",flag:"Source/Flag_of_Japan.svg.png",exchange:0.0112},
    {name: "SAR",tesvir:"Saudi Rial",flag:"Source/Flag_of_Saudi_Arabia.svg.png",exchange:0.4533},
    {name: "KRW",tesvir:"South Korean Won",flag:"Source/Flag_of_South_Korea.png",exchange:0.001181}
];
let valuta = document.querySelector(".valuta");
let secim = document.querySelector(".secim");
let currency_list = document.querySelector(".currency_list");
let viewValyuta = [];

valutaList.forEach(element => {
    let currency = document.createElement("div");
    currency.className = "currency_info"
    currency.innerHTML =
        `<div class="flag">
            <img src="${element.flag}" alt="flag">
        </div>
        <div class="currency_name">
            <span>${element.name}</span>
            <span>${element.tesvir}</span>
        </div>
        <i class="add_btn fa-solid fa-plus ${element.name}" onclick="addCurrency('${element.name}')"></i>`
    currency_list.appendChild(currency);
});
secim.onclick = () => {currency_list.classList.toggle("active")};

function addCurrency(currencyName){
    let item = valutaList.find(element => element.name==currencyName)
    if(item){
        let varValuta = viewValyuta.find(item1 => item1.name==currencyName)
        if(!varValuta){
            viewValyuta.push(item);
        }
    }
    showValutaView();
}
function showValutaView(){
    valuta.innerHTML = ""
    viewValyuta.forEach(item => {
        let currencyDiv = document.createElement("div");
        currencyDiv.className = `${item.name} valyuta_name`
        currencyDiv.innerHTML =
            `<div class="currency_info">
                <div class="flag">
                    <img src="${item.flag}" alt="flag">
                </div>
                <div class="currency_name">
                    <span>${item.name}</span>
                    <span>${item.tesvir}</span>
                </div>
                <i onclick="delValuta('${item.name}')" class="fa-solid fa-xmark ${item.name}"></i>
            </div>
            <div class="display">
                <input type="number" class="${item.name}_value" 
                    oninput="updateValues('${item.name}',this.value)"
                    value="0" 
                    onfocus="this.value=''" 
                    onblur="if(this.value=='') this.value='0'">
            </div>`
        valuta.appendChild(currencyDiv);
    });
}
function delValuta(currency_name){
    let index = viewValyuta.findIndex(element => currency_name==element.name)
    viewValyuta.splice(index, 1)
    showValutaView()
}

function updateValues(changedCurrency, value) { // Misal: changedCurrency=USD, value=100
    let changedItem = viewValyuta.find(element => element.name === changedCurrency);// viewVluta-dan USD-ni tapirirq
    let aznValue = parseFloat(value) * changedItem.exchange; // Tapdigimiz USD-ni(value) AZN-ə çeviririk
    viewValyuta.forEach(item => {
        let inputField = document.querySelector(`.${item.name}_value`); // dovr ederek her valutanin inputunu secirik
        if (inputField && item.name !== changedCurrency) { // USD-den basqa olanlarin inputlari gotururuk
            inputField.value = (aznValue / item.exchange).toFixed(4); // ve hemin inputlarin value-sini oz exchange-ine gore deyisirik
        }
    });
}
