let primerQuestion = document.querySelector('.primer-question') //блок с примером
let primerAnswers = document.querySelector('.primer-answers') //блок с ответами
let operations = document.querySelectorAll('.operations li'); //все операции
operations[0].classList.add('check-border');//устанавливаем первую операцию по дефолту
let count = 0 //счетчик правильных отвтеов
let rigtAnswers = document.querySelector('.rigtAnswers')

let operation = document.querySelectorAll('.operations li')[0].innerHTML //считываем первую операцию
createPrimer(operation) //вызываем создание примера с первой операцией
setClass()

function setClass() {
    operations.forEach(element => {
        element.addEventListener('click', function (e) {
            operations.forEach(element => {
                element.classList.remove('check-border');
            })
            e.target.classList.add('check-border');
            operation = document.querySelector('.check-border').innerHTML
            createPrimer(operation)
        })
    })
}

function createPrimer(operation) {
    let num1 = createNumber()
    let num2 = createNumber()

    const operationsObj = {
        ADD: "+",
        SUBSTRACT: '-',
        MYLTIPLY: '*',
        DIVIDE: '/'
    }

    let keyArrays = Object.keys(operationsObj)

    keyArrays.forEach(element => {
        if (operation == element) {
            let itogPrimer = `<p>${num1}</p>
                            <p>${operationsObj[element]}</p>
                            <p>${num2}</p>
                            <p>=</p>
                            <p>?</p>`
            primerQuestion.innerHTML = itogPrimer

            setAnswers()

            function setAnswers() {
                let setIndex = Math.floor(Math.random() * (3 - 0) + 0)
                let setValues = eval(num1 + operationsObj[element] + num2)
                let answersArray = [createNumber(), createNumber()]
                !Number.isInteger(setValues) ? setValues = setValues.toFixed(1) : setValues = setValues
                answersArray.splice(setIndex, 0, setValues)
                let itogOtvety = `<li>${answersArray[0]}</li>
                                <li>${answersArray[1]}</li>
                                <li>${answersArray[2]}</li>`
                primerAnswers.innerHTML = itogOtvety
                switchPrimer(setValues)
            }
        }
    })
}

function createNumber(max = 10, min = 0) {
    return Math.floor(Math.random() * (max - min) + min)
}

function switchPrimer(setValues) {
    const answers = document.querySelectorAll('.primer-answers li');
    answers.forEach(element => {
        element.addEventListener('click', function () {
            if (element.innerHTML == setValues) {
                count++
                createPrimer(operation)
            }
        })
    })
    rigtAnswers.innerHTML = `Правильных ответов: ${count}`
}

