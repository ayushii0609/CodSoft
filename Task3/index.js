class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); // Initialize calculator
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0'; // If completely deleted, show 0
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return; // Prevent multiple decimals
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString(); // Replace initial 0
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '0' && this.previousOperand === '') return; // Don't allow operator if only 0 is present

        if (this.previousOperand !== '') {
            this.compute(); // If there's a previous operation, compute it first
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand + ' ' + this.operation;
        this.currentOperand = '0'; // Reset current operand for next number
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return; // Don't compute if not valid numbers

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null && this.previousOperand !== '') {
            this.previousOperandTextElement.innerText = this.previousOperand;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    triggerGlitch(buttonElement) {
        buttonElement.classList.add('glitch-active');
        setTimeout(() => {
            buttonElement.classList.remove('glitch-active');
        }, 300); 
    }
}

// Get DOM elements
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');
const numberButtons = document.querySelectorAll('[data-value]:not([data-action])');
const operationButtons = document.querySelectorAll('[data-action="operator"]');
const equalsButton = document.querySelector('[data-action="equals"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const clearButton = document.querySelector('[data-action="clear"]');

// Initialize calculator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.value);
        calculator.updateDisplay();
        calculator.triggerGlitch(button); // Trigger glitch on click
    });
});

// Operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.value);
        calculator.updateDisplay();
        calculator.triggerGlitch(button);
    });
});

// Equals button
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
    calculator.triggerGlitch(equalsButton);
});

// Clear button
clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
    calculator.triggerGlitch(clearButton);
});

// Delete button
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
    calculator.triggerGlitch(deleteButton);
});

// Keyboard Support 
document.addEventListener('keydown', e => {
    const key = e.key;
    if (key >= '0' && key <= '9' || key === '.') {
        calculator.appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        calculator.chooseOperation(key);
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault(); 
        calculator.compute();
    } else if (key === 'Backspace') {
        calculator.delete();
    } else if (key === 'Escape' || key === 'c' || key === 'C') { 
        calculator.clear();
    }
    calculator.updateDisplay();

    
    const buttonForKeyboard = document.querySelector(`button[data-value="${key}"], button[data-action="${key === 'Enter' ? 'equals' : ''}"], button[data-action="${key === 'Escape' ? 'clear' : ''}"]`);
    if (buttonForKeyboard) {
        calculator.triggerGlitch(buttonForKeyboard);
    }
});