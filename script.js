document.addEventListener("DOMContentLoaded", function () {
    const qa = fetch('qa.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const len = data.length;
            const question = document.querySelector('.question');
            const answer = document.querySelector('.answer');
            const questionNumber = document.querySelector('.question-number');
            const questionPercent = document.querySelector(".QP");
            const innerBox = document.querySelector(".innerBox");
            const Qnum = document.querySelector(".Qnum");
            const next = document.querySelector(".next");
            const prev = document.querySelector(".prev");
            const showHide = document.querySelector(".show-hide");
            const width = 500;
            let cnt = 1;


            function UpdateUI(cnt) {
                question.textContent = data[cnt - 1].question;
                answer.textContent = data[cnt - 1].answer;

                questionNumber.textContent = `${cnt}/${len}`;

                const percent = Math.floor((cnt / len) * 100);
                questionPercent.textContent = `${percent}%`;
                const progressBar = (width * percent) / 100;
                innerBox.style.width = progressBar + "px";
                Qnum.textContent = `Question ${cnt}`;

                // Reset flip state and button text
                document.querySelector('.flip-card-inner').classList.remove('flipped');
                showHide.textContent = "Show Answer";
            }
            UpdateUI(cnt);



            next.addEventListener("click", function () {
                if (cnt < len) {
                    cnt++;
                    UpdateUI(cnt);
                }
            })
            prev.addEventListener("click", function () {
                if (cnt > 1) {
                    cnt--;
                    UpdateUI(cnt);
                }
            })

            showHide.addEventListener("click", function () {
                const flipCardInner = document.querySelector('.flip-card-inner');

                if (showHide.textContent === "Show Answer") {
                    showHide.textContent = "Hide Answer";
                    flipCardInner.classList.add("flipped");
                } else {
                    showHide.textContent = "Show Answer";
                    flipCardInner.classList.remove("flipped");
                }
            });
        })
})


