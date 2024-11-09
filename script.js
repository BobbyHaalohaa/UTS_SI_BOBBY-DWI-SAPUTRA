let currentInput = '';
let operation = '';
let previousInput = '';
let history = [];

function appendNumber(number) {
    currentInput += number;
    document.getElementById('display').value = currentInput;
}

function setOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (isNaN(num1) || isNaN(num2)) return;

    if (operation === '/' && num2 === 0) {
        alert('Pembagian dengan nol tidak diperbolehkan');
        clearDisplay();
        return;
    }

    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            return;
    }

    history.push(`${previousInput} ${operation} ${currentInput} = ${result}`);
    if (history.length > 5) history.shift(); // Simpan hanya 5 histori terakhir

    document.getElementById('display').value = result;
    showHistory();
    currentInput = '';
    previousInput = '';
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = '';
    document.getElementById('display').value = '';
}

function showHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Hapus list lama
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}