const btnNext = document.querySelector(".btn-next");
const btnStop = document.querySelector(".btn-stop");
const numberContainer = document.querySelector(".number-container");
const numbers = document.querySelectorAll(".number");
const modalBtn = document.querySelector(".modal-btn");
const numberLineEdit = document.querySelector(".pos-count");

let numberMove;

modalBtn.addEventListener("click", () => {
    let num = parseInt(numberLineEdit.value);

    if (!(num >= 1 && num <= 9)) return;

    for (let x = 0; x < num; x++) {
        const div = document.createElement("div");
        div.classList.add("number-move");
        div.innerHTML = `<div class="number">0</div>
        <div class="number">1</div>
        <div class="number">2</div>
        <div class="number">3</div>
        <div class="number">4</div>
        <div class="number">5</div>
        <div class="number">6</div>
        <div class="number">7</div>
        <div class="number">8</div>
        <div class="number">9</div>
        <div class="last-number">0</div>`;
        numberContainer.appendChild(div);
    }
    modalBtn.parentElement.parentElement.style.display = "none";
    main();
});

const main = () => {
    numberMove = [...document.querySelectorAll(".number-move")];
    const numberHeight = parseInt(getComputedStyle(document.querySelector(".number")).height);
    // console.log("Eeee", parseInt(numberHeight));

    let counters = new Array(numberMove.length),
        tam = numberMove.length;
    counters.fill(0);

    numberContainer.style.width = `${tam * 4}rem`;

    const move = (idx) => {
        if (idx == -1) idx++;
        if (counters[idx] >= numberMove[idx].childElementCount - 1) {
            return;
        }
        let xValue = idx * 4,
            yValue = -numberHeight * (counters[idx] + 1);
        numberMove[idx].style.transform = `translate(${xValue}rem,${yValue}px)`;
        numberMove[idx].style.transition = "all 0.6s ease";

        counters[idx]++;
    };

    const check = (num, idx) => {
        let xValue = idx * 4;

        if (counters[idx] == num.childElementCount - 1) {
            counters[idx] = 0;
            move(idx - 1);
            num.style.transition = "none";
            num.style.transform = `translate(${xValue}rem,0)`;
        }
    };
    numberMove.forEach((num, idx) => {
        let xValue = idx * 4;
        num.style.transform = `translate(${xValue}rem,0)`;

        num.addEventListener("transitionend", () => {
            let cn = numberMove.findIndex((el) => {
                return el == num;
            });

            check(num, cn);
        });
    });

    btnNext.addEventListener("click", () => {
        move(tam - 1);
    });

    let anim = setInterval(() => {
        btnNext.click();
    }, 10);
    btnStop.addEventListener("click", () => {
        if (btnStop.dataset.play == "true") {
            btnStop.dataset.play = "false";
            btnStop.innerText = "play!";
            clearInterval(anim);
        } else {
            btnStop.dataset.play = "true";
            btnStop.innerText = "stop";
            anim = setInterval(() => {
                btnNext.click();
            }, 10);
        }
    });
};
