// script.js
function submitForm() {
    const radios = document.querySelectorAll('input[type="radio"]');
    let totalScore = 0;
    let group1Score = 0; // For questions 1, 4, 15
    let group2Score = 0; // For questions 2, 3, 12, 14
    let group3Score = 0; // For questions 5, 9, 10, 11
    let group4Score = 0; // For questions 6, 7, 8, 13

    const group1Questions = [1, 4, 15];
    const group2Questions = [2, 3, 12, 14];
    const group3Questions = [5, 9, 10, 11];
    const group4Questions = [6, 7, 8, 13];

    const numQuestions = radios.length / 5;

    for (let i = 0; i < numQuestions; i++) {
        let questionScore = 0;
        const radioName = `question${i + 1}`;
        const selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`);
        if (selectedRadio) {
            questionScore = parseInt(selectedRadio.value);
            totalScore += questionScore;
            if (group1Questions.includes(i + 1)) {
                group1Score += questionScore;
            } else if (group2Questions.includes(i + 1)) {
                group2Score += questionScore;
            } else if (group3Questions.includes(i + 1)) {
                group3Score += questionScore;
            } else if (group4Questions.includes(i + 1)) {
                group4Score += questionScore;
            }
        }
    }

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `Your total score is: ${totalScore} <br>`;

    let comment = "";
    if (totalScore <= 34) {
        comment = "Oh dear! The good news is that you've got a great opportunity to improve the way you motivate others, and your and your team's long term success! However, to do this, you've got to fundamentally improve your motivation skills.";
    } else if (totalScore <= 52) {
        comment = "You're good at some aspects of motivating others, but there's room for improvement elsewhere. Focus on the serious issues below, and you'll most likely find that your team's performance will increase.";
    } else if (totalScore <= 75) {
        comment = "You're probably motivating your team very effectively! Still, check the advice below to see if there's anything more you can be doing to keep your team motivation levels high.";
    } else {
        comment = "Thank you! We are thrilled that you loved our product.";
    }

    resultsDiv.innerHTML += `<strong>${comment}</strong> <br><br>`;

    resultsDiv.innerHTML += "To motivate people you have to know people<br><br>";

    resultsDiv.innerHTML += `Providing Productive and Challenging Work: ${group1Score} <br>`;
    resultsDiv.innerHTML += `Setting Effective Goals: ${group2Score} <br>`;
    resultsDiv.innerHTML += `Understanding Individual Differences in Motivation: ${group3Score} <br>`;
    resultsDiv.innerHTML += `Providing Rewards and Recognition: ${group4Score} <br>`;
    resultsDiv.innerHTML += `Total Group Score: ${group1Score + group2Score + group3Score + group4Score} <br><br>`;

    const scores = [group1Score, group2Score, group3Score, group4Score];
    const minScore = Math.min(...scores);
    const sortedScores = [...scores].sort((a, b) => a - b);
    const colors = scores.map(score => {
        if (score === minScore) return "red";
        if (score === sortedScores[1]) return "blue";
        return "grey";
    });

    let barChartHTML = "<div style='display: flex;'>";
    for (let i = 0; i < scores.length; i++) {
        barChartHTML += `<div class="bar ${colors[i]}" style="height: ${scores[i] * 10}px;">${scores[i]}</div>`;
    }
    barChartHTML += "</div>";

    resultsDiv.innerHTML += barChartHTML;

    resultsDiv.innerHTML += "<button onclick='window.print()'>Print</button>";
}

