document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentNumber = '';
    let firstOperand = '';
    let operator = '';

    // Update display
    function updateDisplay() {
        display.value = currentNumber === '' ? '0' : currentNumber;
    }

    // Clear display and reset variables
    function clear() {
        currentNumber = '';
        firstOperand = '';
        operator = '';
        updateDisplay();
    }

    // Add event listeners to number buttons
    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentNumber += button.textContent;
            updateDisplay();
        });
    });

    // Add event listeners to operator buttons
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentNumber !== '') {
                if (firstOperand === '') {
                    firstOperand = currentNumber;
                    currentNumber += button.textContent;
                    operator = button.textContent;
                    updateDisplay();
                } else {
                    const result = operate(parseFloat(firstOperand), parseFloat(currentNumber.slice(firstOperand.length + 1)), operator);
                    firstOperand = result.toString();
                    currentNumber = firstOperand + button.textContent;
                    operator = button.textContent;
                    updateDisplay();
                }
            }
        });
    });

    // Add event listener to equal button
    const equalButton = document.getElementById('equal');
    equalButton.addEventListener('click', () => {
        if (currentNumber !== '' && firstOperand !== '') {
            const result = operate(parseFloat(firstOperand), parseFloat(currentNumber.slice(firstOperand.length + 1)), operator);
            currentNumber = result.toString();
            firstOperand = '';
            operator = '';
            updateDisplay();
        }
    });

    // Add event listener to clear button
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', clear);

    // Perform calculation based on operator
    function operate(num1, num2, op) {
        switch(op) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '×':
                return num1 * num2;
            case '÷':
                if (num2 === 0) {
                    return 'Error';
                } else {
                    return num1 / num2;
                }
            default:
                return 'Error';
        }
    }
});
