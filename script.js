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

let translateStatus = "morse";
const input = document.getElementById('input');
const output = document.getElementById('output');

input.addEventListener('input', () => {
    switch (translateStatus) {
        case "morse":
            output.value = morseToText(input.value);
            break;
        case "text":
            output.value = textToMorse(input.value);
            break;
    }
});

function textToMorse(text) {
    return text.trim() // remove trailing white space
                .replace(/\s+/g, " ") // remove extra whitespace
                .toUpperCase()
                .split("") // to Array
                .map(char => { // create morse
                    for (let morse in morseCode) {
                        if (morseCode[morse] === char) return morse;
                    }
                    return char;
                })
                .join(' '); // join morse
}

function morseToText(morse) {
    return morse.trim() // remove trailing white space
                .replace(/\s+/g, " ") // remove extra whitespace
                .replace(/_/g, "-") // convert "_" to "-"
                .split(" ") // to Array
                .map(morse => { // create letter
                    return morseCode[morse] ? morseCode[morse] : '';
                })
                .join(""); // join letter
}


const clearBTN = document.getElementById('clear');
clearBTN.addEventListener('click', () => [input, output].forEach(input => input.value = ""));

const toggleBTN = document.getElementById('toggleTranslate');
toggleBTN.addEventListener('click', () => {
    translateStatus = (translateStatus === "morse") ? "text" : "morse";
    alterUI();
});

function alterUI() {
    const title = document.querySelector('.inputs.area > h1');
    const inputLabel = document.querySelector('.inputs.area > label:nth-child(2)');

    switch (translateStatus) {
        case "morse":
            toggleBTN.textContent = "Text to Morse";
            title.textContent = "Morse to Text";
            input.placeholder = "Insert Morse Here. Use '.' for dot, use '-' or '_' for dashes, use ' ' (spaces) for each letter, use '/' for each word";
            inputLabel.textContent = "Input Morse";
            break;
        case "text":
            toggleBTN.textContent = "Morse to Text";
            title.textContent = "Text to Morse";
            input.placeholder = "Insert Text Here";
            inputLabel.textContent = "Input Text";
            break;
    }
}