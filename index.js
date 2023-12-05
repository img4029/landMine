'use strict';

const div = document.querySelector("ul");
let count = 15;
let divCt = new Array(count * count);
const number = Array(count * count).fill().map((item, index) => index + 1);
const random = [];
while (number.length > 0) {
    const num = Math.floor(Math.random() * number.length);
    const newArr = number.splice(num, 1);
    const value = newArr[0];
    random.push(value - 1);
    if (random.length > (count * 2) - 1) break;
}

console.log(random);
function landMine(i) {
    for (let k = 0; k < random.length; k++) {
        if (i == random[k]) {
            console.log("끝");
            divCt[i].style.backgroundColor = "red";
            div.style.background = `url("./KakaoTalk_20231205_150157740.png") no-repeat center/ 70%`;
            div.innerText = "";
            div.className = "end";
            div.style.display = "block";
        }
    }
}
function findCount(i) {
    let count = 0
    for (let find = 0; find < random.length; find++) {
        if (random[find] == i) count++;
    }
    return count;
}
function findMine(i) {
    let countMine = 0
    if (i == 0) { // 왼쪽 위
        countMine += findCount(i + 1);
        countMine += findCount(i + (count));
        countMine += findCount(i + (count + 1));
    } else if (i == count - 1) { // 오른쪽 위
        countMine += findCount(i - 1);
        countMine += findCount(i + (count));
        countMine += findCount(i + (count - 1));
    } else if (i == count * count - count) { // 왼쪽 아래
        countMine += findCount(i + 1);
        countMine += findCount(i - (count));
        countMine += findCount(i - (count - 1));
    } else if (i == count * count - 1) { // 오른쪽 아래
        countMine += findCount(i - 1);
        countMine += findCount(i - (count));
        countMine += findCount(i - (count + 1));
    } else if (i < count - 1) {
        countMine += findCount(i - 1);
        countMine += findCount(i + 1);
        countMine += findCount(i + (count - 1));
        countMine += findCount(i + (count));
        countMine += findCount(i + (count + 1));
    } else if (i % count == 0) {
        countMine += findCount(i - (count));
        countMine += findCount(i - (count - 1));
        countMine += findCount(i + 1);
        countMine += findCount(i + (count));
        countMine += findCount(i + (count + 1));
    } else if ((i + 1) % count == 0) {
        countMine += findCount(i - (count));
        countMine += findCount(i - (count + 1));
        countMine += findCount(i - 1);
        countMine += findCount(i + (count));
        countMine += findCount(i + (count - 1));
    } else if (i > count * count - count) {
        countMine += findCount(i - (count));
        countMine += findCount(i - (count + 1));
        countMine += findCount(i - (count - 1));
        countMine += findCount(i - 1);
        countMine += findCount(i + 1);
    } else {
        countMine += findCount(i - (count));
        countMine += findCount(i - (count + 1));
        countMine += findCount(i - (count - 1));
        countMine += findCount(i - 1);
        countMine += findCount(i + 1);
        countMine += findCount(i + (count));
        countMine += findCount(i + (count + 1));
        countMine += findCount(i + (count - 1));
    }
    if (countMine !== 0) {
        divCt[i].innerText = countMine;

    } else {
        zeroFind(i);
    }
    divCt[i].style.backgroundColor = "gray";
}
function limit(i) {
    if (divCt[i].style.backgroundColor !== "gray") {
        divCt[i].style.backgroundColor = "gray";
        divCt[i].style.backgroundImage = "none";
        divCt[i].style.pointerEvents = "none";
        findMine(i);
    }
}
function zeroFind(i) {
    if (i == 0) { // 왼쪽 위
        limit(i + 1);
        limit(i + (count));
        limit(i + (count + 1));
    } else if (i == count - 1) { // 오른쪽 위
        limit(i - 1);
        limit(i + (count));
        limit(i + (count - 1));
    } else if (i == count * count - count) { // 왼쪽 아
        limit(i + 1);
        limit(i - (count));
        limit(i - (count - 1));
    } else if (i == count * count - 1) { // 오른쪽 아래
        limit(i - 1);
        limit(i - (count));
        limit(i - (count + 1));
    } else if (i < count - 1) {
        limit(i - 1);
        limit(i + 1);
        limit(i + (count - 1));
        limit(i + (count));
        limit(i + (count + 1));
    } else if (i % count == 0) {
        limit(i - (count));
        limit(i - (count - 1));
        limit(i + 1);
        limit(i + (count));
        limit(i + (count + 1));
    } else if ((i + 1) % count == 0) {
        limit(i - (count));
        limit(i - (count + 1));
        limit(i - 1);
        limit(i + (count));
        limit(i + (count - 1));
    } else if (i > count * count - count) {
        limit(i - (count));
        limit(i - (count + 1));
        limit(i - (count - 1));
        limit(i - 1);
        limit(i + 1);
    } else {
        limit(i - (count));
        limit(i - (count + 1));
        limit(i - (count - 1));
        limit(i - 1);
        limit(i + 1);
        limit(i + (count));
        limit(i + (count + 1));
        limit(i + (count - 1));
    }
}
function win() {
    let winCount = 0;
    for (let i = 0; i < divCt.length; i++) {
        if (divCt[i].style.backgroundColor === "gray") winCount++;
    }
    if ((divCt.length - random.length) === winCount) alert("승리")
}
let bgCount = new Array(divCt.length);
var stopFunc = function (e) { e.preventDefault(); e.stopPropagation(); return false; };
for (let i = 0; i < bgCount.length; i++) {
    bgCount[i] = 0;
}

for (let i = 0; i < divCt.length; i++) {
    divCt[i] = document.createElement("li")
    div.appendChild(divCt[i]);
    divCt[i].value = i + 1;
    divCt[i].addEventListener('click', (e) => {
        findMine(i);
        landMine(i);
        divCt[i].style.pointerEvents = "none";
        divCt[i].addEventListener('click', stopFunc, true);
        win();
    })
    divCt[i].addEventListener('mousedown', function (e) {
        if ((e.button == 2) || (e.which == 3)) {
            const liColor = e.target.style.backgroundColor;
            if (bgCount[i] == 0) {
                // e.target.style.background = `url("./free-icon-flag-5778770.png") no-repeat center / calc(90vh / 15) ${liColor}`;
                e.target.style.background = `url("./KakaoTalk_20231205_150512263.png") no-repeat center / calc(90vh / 15) ${liColor}`;
                divCt[i].addEventListener('click', stopFunc, true);
                bgCount[i] = 1;
            } else if (bgCount[i] == 1) {
                e.target.style.backgroundImage = "none";
                divCt[i].removeEventListener('click', stopFunc, true);;
                bgCount[i] = 0;
            }
        }
    });
}

div.style.display = "grid";
div.style.gridTemplate = `repeat(${count}, calc(90vh / ${count})) / repeat(${count}, calc(90vh / ${count}))`;
for (let i = 0; i < div.children.length; i++) {
    div.children[i].style.backgroundColor = "black"
}
window.oncontextmenu = function () {
    return false;
};