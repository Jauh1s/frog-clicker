let coins = 0;
let coinsPerClick = 1;
let coinsPerSecond = 0;

let flyCost = 25;
let pondCost = 100;
let armyCost = 500;

const coinsDisplay = document.getElementById("coins");
const perClickDisplay = document.getElementById("per-click");
const perSecondDisplay = document.getElementById("per-second");

const frog = document.getElementById("frog");

const flyButton = document.getElementById("buy-fly");
const pondButton = document.getElementById("buy-pond");
const armyButton = document.getElementById("buy-army");

function updateGame() {
    coinsDisplay.textContent = Math.floor(coins).toLocaleString();
    perClickDisplay.textContent = coinsPerClick;
    perSecondDisplay.textContent = coinsPerSecond;

    flyButton.textContent = `🪰 ${flyCost} coins`;
    pondButton.textContent = `🪷 ${pondCost} coins`;
    armyButton.textContent = `🐸 ${armyCost} coins`;

    flyButton.disabled = coins < flyCost;
    pondButton.disabled = coins < pondCost;
    armyButton.disabled = coins < armyCost;
}

frog.addEventListener("click", function(event) {
    coins += coinsPerClick;

    createCoinPopup(
        `+${coinsPerClick}`,
        event.clientX,
        event.clientY
    );

    updateGame();
});

flyButton.addEventListener("click", function() {
    if (coins >= flyCost) {
        coins -= flyCost;
        coinsPerClick += 1;

        flyCost = Math.floor(flyCost * 1.5);

        updateGame();
    }
});

pondButton.addEventListener("click", function() {
    if (coins >= pondCost) {
        coins -= pondCost;
        coinsPerSecond += 5;

        pondCost = Math.floor(pondCost * 1.7);

        updateGame();
    }
});

armyButton.addEventListener("click", function() {
    if (coins >= armyCost) {
        coins -= armyCost;
        coinsPerSecond += 25;

        armyCost = Math.floor(armyCost * 2);

        updateGame();
    }
});

function createCoinPopup(text, x, y) {
    const popup = document.createElement("div");

    popup.className = "coin-popup";
    popup.textContent = `🪙 ${text}`;

    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 800);
}

/* Automatic coins */

setInterval(function() {
    coins += coinsPerSecond;
    updateGame();
}, 1000);

/* Save game */

setInterval(function() {
    localStorage.setItem(
        "frogClickerSave",
        JSON.stringify({
            coins,
            coinsPerClick,
            coinsPerSecond,
            flyCost,
            pondCost,
            armyCost
        })
    );
}, 5000);

/* Load game */

const savedGame = localStorage.getItem("frogClickerSave");

if (savedGame) {
    const data = JSON.parse(savedGame);

    coins = data.coins || 0;
    coinsPerClick = data.coinsPerClick || 1;
    coinsPerSecond = data.coinsPerSecond || 0;

    flyCost = data.flyCost || 25;
    pondCost = data.pondCost || 100;
    armyCost = data.armyCost || 500;
}

updateGame();
