cards = document.getElementsByClassName("card");
gameResult = document.querySelector(".game-result");
triesNumber = document.getElementById("mistakes-number");

numberOfMistakes = Math.floor(cards.length / 2);
leftChances = numberOfMistakes;
previousCard = null;
click = 0;

shuffleCards();
updateMistakesNumber();

for (const card of cards) {
    card.addEventListener("click", flip);
}

function flip() {
    click = click + 1;
    this.classList.toggle("flip");
    togglePicture(this);

    if (click % 2 == 1) {
        previousCard = this;
        return;
    }

    if (this != previousCard && isMatch(this, previousCard)) {
        this.removeEventListener("click", flip);
        previousCard.removeEventListener("click", flip);

        if (checkIfWon()) {
            displayWinningResult();
        }
        return;
    }

    reduceLeftChances();
    updateMistakesNumber();

    if (leftChances == 0) {
        displayLoosingResult();
        disableAllCards();
        askIfUserWantsToTryAgain();
    }

    unflipCards(this, previousCard);
}

function displayWinningResult() {
    winningMessage = "You won!";
    gameResult.innerText = winningMessage;
    gameResult.classList.add("won");
    displayAlert(winningMessage);
}

function displayLoosingResult() {
    loosingMessage = "You lost :(";
    gameResult.innerText = loosingMessage;
    triesNumber.style.color = "red";
    gameResult.classList.add("lost");
    displayAlert(loosingMessage);
}

function askIfUserWantsToTryAgain() {
    let isAnotherGame;
    setTimeout(() => {
        isAnotherGame = confirm("Do you want to try again?");
        if (isAnotherGame) {
            location.reload();
        }
        },
        3000);
}

function checkIfWon() {
    countGood = 0;
    for (let card of cards) {
        cardBack = card.querySelector(".back");
        if (cardBack.classList.contains("show")) {
            countGood = countGood + 1;
        }
    }
    return countGood == cards.length;
}

function updateMistakesNumber()
{
    triesNumber.innerText = leftChances;
}

function reduceLeftChances() {
    leftChances = leftChances - 1;
}

function togglePicture(card) {
    card.querySelector(".front").classList.toggle("hide");
    card.querySelector(".back").classList.toggle("show");
}

function isMatch(firstCard, secondCard) {
    firstCardBack = firstCard.querySelector(".back");
    secondCardBack = secondCard.querySelector(".back");

    return firstCardBack.src == secondCardBack.src;
}

function unflipCards(firstCard, secondCard) {
    setTimeout(() => {
            // remove class flip
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

            // togglePicture
            togglePicture(firstCard);
            togglePicture(secondCard);

        },
        1000
    );
}

function disableAllCards() {

    for (let card of cards) {
        card.removeEventListener("click", flip);
    }
}


function displayAlert(message) {
    setTimeout(() => {
        alert(message);
        },
        1000);
}

function shuffleCards() {
    cardsContainer = document.querySelector(".cards");

    for (let card of cards) {
        index = Math.floor(Math.random() * cards.length);
        card.style.order = index;
    }

}