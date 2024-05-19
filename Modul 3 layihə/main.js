let inputs = document.querySelectorAll("input");
let leftSideButtons = document.querySelectorAll(".lbtn");
let rightSideButtons = document.querySelectorAll(".rbtn");
let btns1 = document.querySelectorAll('.left-side-btns button');
let btns2 = document.querySelectorAll('.right-side-btns button');


function cycle() {


    btns1.forEach(function (button) {
        button.addEventListener('click', function () {
            btns1.forEach(function (btn) {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
    });

    btns2.forEach(function (button) {
        button.addEventListener('click', function () {
            btns2.forEach(function (btn) {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
    });
}

function getExchange(from, to, amount, input) {
    fetch(`https://v6.exchangerate-api.com/v6/a4a5661764e25182a524d47d/latest/${from}`)
        .then(response => response.json())
        .then(data => {
            let exchange = data.conversion_rates[to];
            let enteredValue = parseFloat(amount);
            if (!isNaN(enteredValue)) {
                let convertedValue = (enteredValue * exchange).toFixed(4);
                input.value = convertedValue;
                document.getElementById('left-span').innerText = `1 ${from} = ${exchange.toFixed(4)} ${to}`;
                document.getElementById('right-span').innerText = `1 ${to} = ${(1 / exchange).toFixed(4)} ${from}`;
            } else {
            }
        })
}


let fromCurrency = "RUB";
let toCurrency = "USD";
function updateCurrency(event) {
    if (event.target.classList.contains("lbtn")) {
        fromCurrency = event.target.innerText;
        handleButton(event.target, 'left-side-btns');
    } else if (event.target.classList.contains("rbtn")) {
        toCurrency = event.target.innerText;
        handleButton(event.target, 'right-side-btns');
    }
    getExchange(fromCurrency, toCurrency, inputs[0].value, inputs[1]);
}
leftSideButtons.forEach(button => {
    button.addEventListener("click", updateCurrency);
});
rightSideButtons.forEach(button => {
    button.addEventListener("click", updateCurrency);
});
inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        if (index === 0) {
            getExchange(fromCurrency, toCurrency, input.value, inputs[1]);
        } else {
            getExchange(toCurrency, fromCurrency, input.value, inputs[0]);
        }
    });
});
btns1.forEach(butnl1 => {
    butnl1.addEventListener('click', function () {
        handleButton(butnl1, 'left-side-btns');
        updateCurrency({ target: butnl1 });
    });
});
btns2.forEach(butnr2 => {
    butnr2.addEventListener('click', function () {
        handleButton(butnr2, 'right-side-btns');
        updateCurrency({ target: butnr2 });
    });
});


function handleButton(item, aClass) {
    let activeButtons = document.querySelectorAll(`.${aClass} .active`);
    if (!item.classList.contains('active')) {
        if (activeButtons.length > 0) {
            activeButtons[0].classList.remove('active');
        }
        item.classList.add('active');
        item.style.display = 'inline-block';
    }
    document.querySelectorAll(`.${aClass} button`).forEach(button => {
        if (button !== item && !button.classList.contains('active')) {
            button.style.display = 'inline-block';
        }
    });
    if (aClass === 'left-side-btns') {
        fromCurrency = item.innerText;
    } else if (aClass === 'right-side-btns') {
        toCurrency = item.innerText;
    }
}


function validateInput(inptValue) {
    let value = inptValue.value;
    let synchronizedİnput = value.replace(/[^0-9.]/g, '');

    if (synchronizedİnput === '' || parseFloat(synchronizedİnput) < 0) {
        inptValue.value = '';
    } else {
        inptValue.value = synchronizedİnput;
    }
}

inputs.forEach(input => {
    input.addEventListener('input', function () {
        validateInput(input);
    });
});