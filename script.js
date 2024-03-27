const morseCode = { 
    '.-':     'A', '-...':   'B',
    '-.-.':   'C', '-..':    'D',
    '.':      'E', '..-.':   'F',
    '--.':    'G', '....':   'H',
    '..':     'I', '.---':   'J',
    '-.-':    'K', '.-..':   'L',
    '--':     'M', '-.':     'N',
    '---':    'O', '.--.':   'P',
    '--.-':   'Q', '.-.':    'R',
    '...':    'S', '-':      'T',
    '..-':    'U', '...-':   'V',
    '.--':    'W', '-..-':   'X',
    '-.--':   'Y', '--..':   'Z',
    '.----':  '1', '..---':  '2',
    '...--':  '3', '....-':  '4',
    '.....':  '5', '-....':  '6',
    '--...':  '7', '---..':  '8',
    '----.':  '9', '-----':  '0',
    '/':      ' '
};


const morseInput = document.getElementById('morseInput');
const textInput = document.getElementById('textInput');
morseInput.addEventListener('input', inputMorse);
textInput.addEventListener('input', inputText);


const spanElement = document.querySelector('.inputs.area span');

function morseToText(morse) {
    const morseArr = morse.split(" "); // to Array

    // Add Error Warning
    const isValid = morseArr.every(morse => morseCode[morse] || morse === "");
    spanElement.classList.toggle('valid', isValid);
    morseInput.classList.toggle("inputWarn", !isValid);

    return morseArr.map(morse => { // create morse
        return morseCode[morse] ? morseCode[morse] : '';
    }).join("");
}

function textToMorse(text) {
    return text.split("") // to Array
               .map(char => { // create morse
                   for (let morse in morseCode) {
                       if (morseCode[morse] === char) return morse;
                   }
                   return char;
                 }).join(' '); // join morse
}


function inputMorse() {
    const morseStr = morseInput.value
                               .trim() // Remove Trailing Whitespace
                               .replace(/\s+/g, " ") // Remove Extra whitespaces
                               .replace(/_/g, "-"); // convert "_" to "-"
    textInput.value = morseToText(morseStr);
}

function inputText() {
    const textStr = textInput.value // Get Value
                             .trim() // Remove Trailing Whitespace
                             .replace(/\s+/g, " ") // Remove Extra whitespaces
                             .toUpperCase(); // Uppercase str
    morseInput.value = textToMorse(textStr);
}


const clearBTN = document.getElementById('clear');
clearBTN.addEventListener('click', () => {
    textInput.value = "";
    morseInput.value = "";
});


const dotSound = new Audio('./Audio/dot.mp3');
const dashSound = new Audio('./Audio/dash.mp3');
const playMorseBTN = document.getElementById('playSound');
playMorseBTN.addEventListener('click', () => {
    playMorseSound(morseInput.value);
});

let timeout;
function playMorseSound(morse) {
    clearInterval(timeout);

    const playSymbol = (symbol) => {
        switch (symbol) {
            case '.':
                dotSound.play();
                break;
            case '-':
            case '_':
                dashSound.play();
                break;
            case '/':
                setTimeout(() => {}, 1000);
                break;
            default:
                // spaces
                break;
        }
    };

    let index = 0;
    timeout = setInterval(() => {
        if (index < morse.length) {
            playSymbol(morse[index]);
            index++;
        }
    }, 450)
}
