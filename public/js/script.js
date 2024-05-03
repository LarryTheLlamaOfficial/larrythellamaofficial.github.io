let response = " ";
let q_types = ["2D+2D", "3D+3D", "4D+4D"];
let q_type = 0;
let question = [];
let answer = "";
let reverse = false;

console.log("---- INSTRUCTIONS ----");
console.log("Press 'Enter' to submit answer");
console.log("Press 'Backspace' to delete last digit");
console.log("Press 'ArrowRight' to change question type");
console.log("Press 'ArrowLeft' to change question type");
console.log("Press 'r' to toggle reverse input");
console.log("Press any digit to input answer");

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (response === answer) {
            response = " ";
            generateQuestion(q_types[q_type]);
            update();
        }
    } else if (event.key === "Backspace") {
        if (reverse) {
            response = response.slice(1);
        } else {
            response = response.slice(0, -1);
        }
        if (response == "") {
            response = " ";
        }
        update();
    } else if (event.key === "ArrowRight") {
        q_type = (q_type + 1) % q_types.length;
        generateQuestion(q_types[q_type]);
        update();
    } else if (event.key === "ArrowLeft") {
        q_type = (q_type - 1 + q_types.length) % q_types.length;
        generateQuestion(q_types[q_type]);
        update();
    } else if (event.key === "r" || event.key === "R") {
        reverse = !reverse;
    } else if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key.toString())) {
        if (response.length < answer.length) {
            if (response == " ") {
                response = event.key;
            } else {
                if (reverse) {
                    response = event.key + response;
                } else {
                    response += event.key;
                }
            }
        }
        update();
    }
});

window.onload = () => {
    generateQuestion(q_types[q_type]);
    update();
};

const generateQuestion = (questionType = "2D+2D") => {
    let data;
    switch (questionType) {
        case "2D+2D":
            data = generateAddition2D2D();
            break;
        case "3D+3D":
            data = generateAddition3D3D();
            break;
        case "4D+4D":
            data = generateAddition4D4D();
            break;
        default:
            data = generateAddition2D2D();
            break;
    }
    question = data.question;
    answer = data.answer;
};

const generateAddition2D2D = () => {
    const operand = [generateNumber(2), generateNumber(2)];
    answer = operand[0] + operand[1];
    return {
        question: [operand[0].toString(), "+" + operand[1].toString()],
        answer: answer.toString(),
    };
};

const generateAddition3D3D = () => {
    const operand = [generateNumber(3), generateNumber(3)];
    answer = operand[0] + operand[1];
    return {
        question: [operand[0].toString(), "+" + operand[1].toString()],
        answer: answer.toString(),
    };
};

const generateAddition4D4D = () => {
    const operand = [generateNumber(4), generateNumber(4)];
    answer = operand[0] + operand[1];
    return {
        question: [operand[0].toString(), "+" + operand[1].toString()],
        answer: answer.toString(),
    };
};

const generateNumber = (digits) => {
    let number = Math.floor(Math.random() * 9) + 1;
    for (let i = 1; i < digits; i++) {
        number = number * 10 + Math.floor(Math.random() * 10);
    }
    return number;
};

const update = () => {
    questionElement = document.getElementById("question");
    answerElement = document.getElementById("answer");
    updateQuestion(question, questionElement);
    updateAnswer(response, answerElement);
};

const updateQuestion = (question, questionElement) => {
    questionElement.innerHTML = "";
    question.forEach((part, index) => {
        const row = document.createElement("div");
        row.classList.add("row");
        const operandChars = Array.from(part);
        operandChars.forEach((char, index) => {
            const charElement = document.createElement("div");
            charElement.classList.add("digit");
            charElement.innerText = char;
            row.appendChild(charElement);
        });
        questionElement.appendChild(row);
    });
};

const updateAnswer = (answer, answerElement) => {
    const answerChars = Array.from(answer);
    answerElement.innerHTML = "";
    const row = document.createElement("div");
    row.classList.add("row");
    answerChars.forEach((char, index) => {
        const charElement = document.createElement("div");
        charElement.classList.add("digit");
        charElement.innerText = char;
        row.appendChild(charElement);
    });
    answerElement.appendChild(row);
};
