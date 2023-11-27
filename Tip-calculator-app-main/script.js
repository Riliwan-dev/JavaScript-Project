const billInput = document.querySelector('.bill-input')
const peopleInput = document.querySelector('.people-input')
const tipAmount = document.getElementById('tip-amount')
const totalAmount = document.getElementById('total-amount')
const tips = document.querySelectorAll(".tips");
const tipcustom = document.querySelector('.tip-custom')
const resetbtn = document.querySelector(".reset")
const error = document.querySelector(".error")

billInput.addEventListener("input", billInputFun);
peopleInput.addEventListener("input", peopleInputFun);
tips.forEach(function(val){
    val.addEventListener('click', handleClick)
})
tipcustom.addEventListener('input', tipInputFun);
resetbtn.addEventListener('click', reset)

billInput.value = "0.0";
peopleInput.value = "1";
tipAmount.innerHTML = "$" + (0.0).toFixed(2);
totalAmount.innerHTML = "$" + (0.0).toFixed(2);

let billvalue = 0.0;
let peoplevalue = 1;
let tipvalue = 0.15;

function billInputFun(){
    billvalue = parseFloat(billInput.value)
    calculatetip()
}
function peopleInputFun(){
    peoplevalue = parseFloat(peopleInput.value)
    calculatetip();

    if(peoplevalue <1){
        error.style.display = "flex"
        peopleInput.style.border = "2px solid red"
    }else{
        error.style.display = "none"
        peopleInput.style.border = "none"
    }
}

function tipInputFun(){
    tipvalue=parseFloat(tipcustom.value) / 100

    tips.forEach(function(val){
        val.classList.remove("active-tip")
    })
    calculatetip()
}

function handleClick(event){
    tips.forEach(function(val){
        val.classList.remove("active-tip")
        if(event.target.innerHTML == val.innerHTML){
            val.classList.add("active-tip")
            tipvalue = parseFloat(val.innerHTML)/100;
        }
    });
    calculatetip()
}

function calculatetip(){
    if(peoplevalue >= 1){
        let tip = (billvalue * tipvalue) / peoplevalue
        let total = (billvalue * tip) / peoplevalue
        tipAmount.innerHTML = "$" + tip.toFixed(2);
        totalAmount.innerHTML = "$" + total.toFixed(2);
    }
}

function reset(){
    billInput.value = "0.0";
    billInputFun()
    peopleInput.value = "1";
    peopleInputFun()
    tipcustom.value = ""
}