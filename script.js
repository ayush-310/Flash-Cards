document.addEventListener("DOMContentLoaded", function () {
    fetch('qa.json')
        .then(res => res.json())
        .then(data => {
            const len = data.length;
            const question = document.querySelector('.question');
            const answer = document.querySelector('.answer');
            const questionNumber = document.querySelector('.question-number');
            const questionPercent = document.querySelector(".QP");
            const innerBox = document.querySelector(".innerBox");
            const Qnum = document.querySelector(".Qnum");
            const next = document.querySelector(".next");
            const prev = document.querySelector(".prev");
            const showHideButtons = document.querySelectorAll(".show-hide"); // get both buttons
            const flipCardInner = document.querySelector('.flip-card-inner');
            const width = 500;
            let cnt = 1;

            function UpdateUI(cnt) {
                question.textContent = data[cnt - 1].question;
                answer.textContent = data[cnt - 1].answer;
                questionNumber.textContent = `${cnt}/${len}`;
                const percent = Math.floor((cnt / len) * 100);
                questionPercent.textContent = `(${percent}%)`;
                const progressBar = (width * percent) / 100;
                innerBox.style.width = progressBar + "px";
                Qnum.textContent = `Question ${cnt}`;

                // Reset flip state and button text
                flipCardInner.classList.remove('flipped');
                showHideButtons.forEach(btn => btn.textContent = "Show Answer");
            }

            UpdateUI(cnt);

            next.addEventListener("click", function () {
                if (cnt < len) {
                    cnt++;
                    UpdateUI(cnt);
                }
            });

            prev.addEventListener("click", function () {
                if (cnt > 1) {
                    cnt--;
                    UpdateUI(cnt);
                }
            });

            showHideButtons.forEach(btn => {
                btn.addEventListener("click", function () {
                    const isFlipped = flipCardInner.classList.contains('flipped');

                    if (!isFlipped) {
                        flipCardInner.classList.add("flipped");
                        Qnum.textContent = `Answer ${cnt}`;
                        showHideButtons.forEach(b => b.textContent = "Hide Answer");
                    } else {
                        flipCardInner.classList.remove("flipped");
                        Qnum.textContent = `Question ${cnt}`;
                        showHideButtons.forEach(b => b.textContent = "Show Answer");
                    }
                });
            });
        });
});
