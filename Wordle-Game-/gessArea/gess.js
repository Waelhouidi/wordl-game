let gameName="Word Game";
document.title=gameName;
document.querySelector("h1").innerHTML=gameName;
document.querySelector("footer").innerHTML=(`${gameName} created by  wael Houidi And don't forget to buy for a coffee`);
let message=document.querySelector(".message");


//table of words for my game
let words=["React","Cloud","Linux","Virus","Webjs","Debug"];
let wordToGuess=words[Math.floor(Math.random()*words.length)].toLowerCase();
//for testing in validet exam
console.log(wordToGuess);
//Game area settings
let numbersOftry=5;
let numberOfinput=5;
let  tryCount=1;
let numberOfHints=2
//manage hints
document.querySelector('.help span').innerHTML=numberOfHints;
const getHintButton=document.querySelector('.help');
getHintButton.addEventListener("click",gethint);


 function generateInput(){
    const inputsContainer= document.querySelector(".inputs");

    for(let i=1;i<=numbersOftry;i++){
        const tryDiv=document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML=`<span>try ${i}</span>`;
        if(i!==1){
            tryDiv.classList.add("disabled-inputs")
        }
        for(let j=1;j<=numberOfinput;j++){
            const inputField =document.createElement('input');
            inputField.setAttribute("type","text");
            inputField.id = `guess${i}-lettre${j}`;
            inputField.setAttribute("maxlength","1");
            tryDiv.appendChild(inputField);
        }
      

       inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();
    
    //disabled all inputs expecte first one 
    const inputsInDisabledDIv=document.querySelectorAll(".disabled-inputs input");
    inputsInDisabledDIv.forEach((input, index)=>(input.disabled=true));
    const inputs=document.querySelectorAll(".inputs input");
    inputs.forEach((input,index)=>{
        //make input uppercase
        input.addEventListener("input",function(){
            this.value = this.value.toUpperCase();
            //next input
            const nextInput=inputs[index+1];
            if(nextInput) nextInput.focus();
        });
    });
     }

     const handlButton=document.querySelector(".check");
     handlButton.addEventListener("click",handelGeusses);
function handelGeusses(){
  let win=true;
  for(let i=1;i<=numberOfinput;i++){
    const inputCarent = document.querySelector(`#guess${tryCount}-lettre${i}`);
    const letter=inputCarent.value.toLowerCase();
    const actualLetter= wordToGuess[i-1];
    //cheking wordds now
    if(letter===actualLetter){
        inputCarent.classList.add("correct");
    }else if(wordToGuess.includes(letter)&&letter!==""){
        inputCarent.classList.add("false-place");
        win=false;
    }else{
        inputCarent.classList.add("wrong");
        win=false;
    }
  }
  if(win){
    message.innerHTML=`You win the word is ${wordToGuess}`;
    let allTrys = document.querySelectorAll('.inputs > div');
    allTrys.forEach(tryDiv => tryDiv.classList.add("disabled-inputs"));
    handlButton.disabled=true;
    handlButton.classList.add("disabled-button"); 

    
    
    
      }else{
        document.querySelector(`.try-${tryCount}`).classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(`.try-${tryCount} input`);
        currentTryInputs.forEach((input) => ( input.disabled = true ));
        
        tryCount++;

        const nextTryInputs = document.querySelectorAll(`.try-${tryCount} input`);
        nextTryInputs.forEach((input) => { input.disabled = false; });
        let el=document.querySelector(`.try-${tryCount} `);
        if(el){
           document.querySelector(`.try-${tryCount}`).classList.remove("disabled-inputs");
           el.children[1].focus();

        }else{
            handlButton.disabled=true;
            message.innerHTML='you lost';
            handlButton.classList.add("disabled-button"); 

        }


    }
    }
const voiceInputButton = document.getElementById('voiceInputButton');

voiceInputButton.addEventListener('click', () => {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition(); // Initialize speech recognition
    recognition.lang = 'en-US'; // Set recognition language

    recognition.onresult = function(event) {
        const spokenText = event.results[0][0].transcript.toLowerCase(); // Get recognized text
        fillInputWithSpokenText(spokenText); // Call function to fill input with spoken text
    };

    recognition.start(); // Start speech recognition
});

function fillInputWithSpokenText(spokenText) {
    const inputs = document.querySelectorAll('.inputs input');
    const letters = spokenText.split('');
    
    // Fill input fields with recognized letters
    letters.forEach((letter, index) => {
        if (inputs[index]) {
            inputs[index].value = letter.toUpperCase();
        }
    });
}
//get hint
function gethint(){
    if(numberOfHints>0){
        numberOfHints--;
        document.querySelector('.help span').innerHTML=numberOfHints;
    }else if(numberOfHints===0){
        getHintButton.disabled=true;
    }
}
 
window.onload=function(){
    generateInput();
 }


 