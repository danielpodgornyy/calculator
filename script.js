listen();

function listen()
{
    let output = document.querySelector('#output_text');
    let operatorActive = false;
    let hasDecimal = false;
    let operator;
    let operand1;
    let operand2;

    //for every button that is a number, its number is concatenated with what is output
    let numButtons = document.querySelectorAll('#number');

    numButtons.forEach((numButton) => {
        numButton.addEventListener('click', function addDigit(e)
        {
            output.textContent += e.currentTarget.textContent;
        });
    });

    //when delete is pressed, the number is trimmed off the edge
    let deleteButton = document.querySelector('#delete');

    deleteButton.addEventListener('click',function Delete()
    {
        if (output.textContent[output.textContent.length - 1] === '.')
        {
            hasDecimal = false;
        }
    
        output.textContent = output.textContent.slice(0, output.textContent.length - 1);
    });


    //when clear is pressed, the output is turned into an empty string
    let clearButton = document.querySelector('#clear');

    clearButton.addEventListener('click', function Clear()
    {
        output.textContent = '';
    });

    //when sign is pressed, the output changes sign
    let signButton = document.querySelector('#sign');

    signButton.addEventListener('click', function ChangeSign()
    {
        output.textContent = -(+output.textContent);
    });

    //when the decimal is pressed
    let decimalButton = document.querySelector('#decimal');

    decimalButton.addEventListener('click', function AddDecimal()
    {
        if (hasDecimal == false)
        {
            output.textContent += ".";
            hasDecimal = true;
        }
    });

    //when an operator is pressed, the first operand and operator are saved
    let operatorButtons = document.querySelectorAll('.operand');

    operatorButtons.forEach((operatorButton) =>
    {
        operatorButton.addEventListener('click', (e) =>
        {
            operand1 = +(output.textContent);
            operator = e.currentTarget.id;
            operatorActive = true;

            output.textContent = '';
        });
    });

    //when the equal button is pressed, the second operator is saved and the result is calculated
    let equalButton = document.querySelector('#equal');

    equalButton.addEventListener('click', () =>
    {
        if (operatorActive)
        {
            operand2 = +(output.textContent);
            output.textContent = operate(operand1, operand2, operator);

            operatorActive = false;
        }
    });
}

function operate(operand1, operand2, operator)
{
    switch(operator)
    {
        case 'multiply':
            return operand1 * operand2;
            break;
        case 'divide':
            return operand1 / operand2;
            break;
        case 'add':
            return operand1 + operand2;
            break;
        case 'subtract':
            return operand1 - operand2;
            break;
    }
}