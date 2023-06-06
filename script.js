listen();

function listen()
{
    let output = document.querySelector('#output_text');
    output.textContent = '';

    //Object to hold the calculators properties
    let Calculator = 
    {
        operatorActive: false,
        operand1: null,
        operand2: null,
        operator: null,

        addDigit(inputEvent)
        {
            //if the first number is a zero or if there is a letter in the number, reset it
            if (output.textContent[0] == 0 || isNaN(output.textContent))
            {
                output.textContent = '';
            }

            output.textContent += inputEvent.currentTarget.textContent;
        },

        Delete()
        {
            output.textContent = output.textContent.slice(0, -1);
        },

        Clear()
        {
            output.textContent = '';
        },

        ChangeSign()
        {
            output.textContent = -(+output.textContent);
        },

        AddDecimal()
        {
            if (!output.textContent.includes('.'))
            {
                output.textContent += ".";
            }
        },
    }

    //for every button that is a number, its number is concatenated with what is output
    let numButtons = document.querySelectorAll('#number');

    numButtons.forEach((numButton) => {
        numButton.addEventListener('click', Calculator.addDigit);
    });


    //when delete is pressed, the number is trimmed off the edge
    let deleteButton = document.querySelector('#delete');

    deleteButton.addEventListener('click', Calculator.Delete);


    //when clear is pressed, the output is turned into an empty string
    let clearButton = document.querySelector('#clear');

    clearButton.addEventListener('click', Calculator.Clear);


    //when sign is pressed, the output changes sign
    let signButton = document.querySelector('#sign');

    signButton.addEventListener('click', Calculator.ChangeSign);


    //when the decimal is pressed, a decimal is added if one isn't present
    let decimalButton = document.querySelector('#decimal');

    decimalButton.addEventListener('click', Calculator.AddDecimal);


    //when an operator is pressed, the first operand and operator are saved
    let operatorButtons = document.querySelectorAll('.operator');

    operatorButtons.forEach((operatorButton) =>
    {
        operatorButton.addEventListener('click', function UseOperator(e)
        {
            //only proceed if another operator isn't already active
            if (!this.operatorActive)
            {
                Calculator.operand1 = +(output.textContent);
                Calculator.operator = e.currentTarget.id;
                Calculator.operatorActive = Calculator;

                output.textContent = '';
            }
        });
    });


    //when the equal button is pressed, the second operator is saved and the result is calculated
    let equalButton = document.querySelector('#equal');

    equalButton.addEventListener('click', function GetResult()
    {
        //only proceed if an operator is active and the textContent isn't empty
        if (Calculator.operatorActive && output.textContent != '')
        {  
            Calculator.operand2 = +(output.textContent);
            output.textContent = Operate(Calculator.operand1, Calculator.operand2, Calculator.operator);
            Calculator.operatorActive = false;
        }
    });
}

function Operate(operand1, operand2, operator)
{
    switch(operator)
    {
        case 'multiply':
            return operand1 * operand2;
            break;
        case 'divide':
            if (operand2 == 0)
            {
                return 'Nice try Bub';
            }
            else
            {
                return operand1 / operand2;
            }
            break;
        case 'add':
            return operand1 + operand2;
            break;
        case 'subtract':
            return operand1 - operand2;
            break;
        case 'modulo':
            return operand1 % operand2;
            break;
    }
}