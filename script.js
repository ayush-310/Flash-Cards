document.addEventListener("DOMContentLoaded", function () {
    fetch('qa.json')
        .then(res => res.json())
        .then(data => {
            const len = data.length;
            const question = document.querySelector('.question');
            const answer = document.querySelector('.answer');
            const questionNumber = document.querySelectorAll('.question-number');
            const questionPercent = document.querySelector(".QP");
            const innerBox = document.querySelector(".innerBox");
            const Qnum = document.querySelectorAll(".Qnum");
            const next = document.querySelector(".next");
            const prev = document.querySelector(".prev");
            const showHideButtons = document.querySelectorAll(".show-hide"); // get both buttons
            const flipCardInner = document.querySelector('.flip-card-inner');
            const num = document.querySelectorAll(".num");
            const width = 400;
            let cnt = 1;

            function UpdateUI(cnt) {
                question.textContent = data[cnt - 1].question;
                answer.textContent = data[cnt - 1].answer;
                questionNumber.forEach(QN => QN.textContent = `${cnt}/${len}`);
                const percent = Math.floor((cnt / len) * 100);
                questionPercent.textContent = `(${percent}%)`;
                const progressBar = (width * percent) / 100;
                innerBox.style.width = progressBar + "px";
                // Qnum.forEach(el => el.textContent = `Question ${cnt}`);
                num.forEach(el => el.textContent = `${cnt}`);

                flipCardInner.classList.remove('flipped');
                showHideButtons.forEach(btn => btn.textContent = "Show Answer");

                // Button state setup
                prev.disabled = (cnt === 1);
                next.disabled = (cnt === len);
                prev.style.backgroundColor = prev.disabled ? "gray" : "";
                next.style.backgroundColor = next.disabled ? "gray" : "";
            }


            UpdateUI(cnt);

            next.addEventListener("click", function () {
                if (cnt < len) {
                    cnt++;
                    UpdateUI(cnt);
                }

                // Enable/disable buttons based on current position
                prev.disabled = false;
                prev.style.backgroundColor = ""; // Reset style

                if (cnt === len) {
                    next.disabled = true;
                    next.style.backgroundColor = "gray";
                } else {
                    next.disabled = false;
                    next.style.backgroundColor = "";
                }
            });

            prev.addEventListener("click", function () {
                if (cnt > 1) {
                    cnt--;
                    UpdateUI(cnt);
                }

                // Enable/disable buttons based on current position
                next.disabled = false;
                next.style.backgroundColor = ""; // Reset style

                if (cnt === 1) {
                    prev.disabled = true;
                    prev.style.backgroundColor = "gray";
                } else {
                    prev.disabled = false;
                    prev.style.backgroundColor = "";
                }
            });



            showHideButtons.forEach(btn => {
                btn.addEventListener("click", function () {
                    const isFlipped = flipCardInner.classList.contains('flipped');

                    if (!isFlipped) {
                        flipCardInner.classList.add("flipped");
                        // Qnum.forEach(el => el.textContent = `Answer ${cnt}`);
                        showHideButtons.forEach(b => b.textContent = "Hide Answer");
                    } else {
                        flipCardInner.classList.remove("flipped");
                        // Qnum.forEach(el => el.textContent = `Question ${cnt}`);
                        showHideButtons.forEach(b => b.textContent = "Show Answer");
                    }
                });
            }, 800);
        });
});
