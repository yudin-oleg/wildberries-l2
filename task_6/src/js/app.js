const numberRange = document.getElementById("number-range");
const playButton = document.getElementById("play-button");
const inputNumber = document.getElementById("input-number");
const showAttempts = document.getElementById("show-attempts");
const minNumber = document.getElementById("min-number");
const maxNumber = document.getElementById("max-number");
let randomNumber;
// let maxNumberValue = 100;

function startGame(){
    minNumber.addEventListener("blur", changeRange, false);
    maxNumber.addEventListener("blur", changeRange, false);
    randomNumber = generateRandomNumber();
    playButton.addEventListener("click", playGame, false);
    console.log("min: ", minNumber.value, "max: ", maxNumber.value);
    console.log("random number: ", randomNumber);
    console.log(randomNumber);
}

function changeRange(){
    if(parseInt(maxNumber.value) > parseInt(minNumber.value)){
        randomNumber = generateRandomNumber();
        console.log("min: ", minNumber.value, "max: ", maxNumber.value);
        console.log("random number: ", randomNumber);
    }else{
        console.log("min: ", minNumber.value, "max: ", maxNumber.value);
        alert("Мин число не может быть больше или равно максимальному");
    }
}

function generateRandomNumber(){
    return Math.floor(Math.random() * (parseInt(maxNumber.value) - parseInt(minNumber.value))) + parseInt(minNumber.value);
}

function playGame(){
    const inputNumberValue = parseInt(inputNumber.value);
    minNumber.setAttribute("disabled", true);
    maxNumber.setAttribute("disabled", true);
    if(inputNumberValue){
        if(inputNumberValue <= parseInt(maxNumber.value) && inputNumberValue >= parseInt(minNumber.value)){
            console.log("min: ", minNumber.value, "max: ", maxNumber.value);
            console.log("input number: ", inputNumberValue);
            if(inputNumberValue === randomNumber){
                showAttempts.value = parseInt(showAttempts.value) + 1;
                inputNumber.setAttribute("disabled", true);
                setTimeout(()=>{
                    alert("Вы победили");
                }, 200)
            }else if(inputNumberValue < randomNumber){
                showAttempts.value = parseInt(showAttempts.value) + 1;
                if(showAttempts.value % 3 === 0){
                    let answer = randomNumber % 2 === 0 ? "четное": "нечетное";
                    setTimeout(()=>{
                        alert(`Загаданное число больше и ${answer}`);
                    }, 200)
                    return;
                }
                setTimeout(()=>{
                    alert("Загаданное число больше");
                }, 200)
            }else if(inputNumberValue > randomNumber){
                showAttempts.value = parseInt(showAttempts.value) + 1;
                if(showAttempts.value % 3 === 0){
                    let answer = randomNumber % 2 === 0 ? "четное": "нечетное";
                    setTimeout(()=>{
                        alert(`Загаданное число меньше и ${answer}`);
                    }, 200)
                    return;
                }
                setTimeout(()=>{
                    alert("Загаданное число меньше");
                }, 200)
            }
        }else{
            alert("Введенное число должно быть в заданых рамках");
        }
    }else{
        alert("Вы должны ввести число");
    }
}

function reload(){
    window.location.reload();
}