const Words = [
    "leech",
    "close",
    "tenth",
    "pecan",
    "droit",
    "grail",
    "clone",
    "guise",
    "ralph",
    "tango",
    "biddy",
    "smith",
    "mower",
    "payee",
    "serif",
    "drape",
    "fifth",
    "spank",
    "glaze",
    "allot",
    "truck",
    "kayak",
    "virus",
    "testy",
    "tepee",
    "fully",
    "zonal",
    "metro",
    "curry",
    "grand",
    "banjo",
    "axion",
    "bezel",
    "occur",
    "chain",
    "nasal",
    "gooey",
    "filer",
    "brace",
    "allay",
    "pubic",
    "raven",
    "plead",
    "gnash",
    "flaky",
    "munch",
    "dully",
    "eking",
    "thing",
    "slink",
    "hurry",
    "theft",
    "shorn",
    "pygmy",
    "ranch",
    "wring",
    "lemon",
    "shore",
    "mamma",
    "froze",
    "newer",
    "style",
    "moose",
    "antic",
    "drown",
    "vegan",
    "chess",
    "guppy",
    "union",
    "lever",
    "lorry",
    "image",
    "cabby",
    "druid",
    "exact",
    "truth",
    "dopey",
    "spear",
    "cried",
    "chime",
    "crony",
    "stunk",
    "timid",
    "batch",
    "gauge",
    "rotor",
    "crack",
    "curve",
    "latte",
    "witch",
    "bunch",
    "repel",
    "anvil",
    "soapy",
    "meter",
    "broth",
    "madly",
    "dried",
    "scene",
    "known",
    "magma",
    "roost",
    "woman",
    "thong",
    "punch",
    "pasty",
    "downy",
    "knead",
    "whirl",
    "rapid",
    "clang",
    "anger",
    "drive",
    "goofy",
    "email",
    "music",
    "stuff",
    "bleep",
    "rider",
    "mecca",
    "folio",
    "setup",
    "verso",
    "quash",
    "fauna",
    "gummy",
    "happy",
    "newly",
    "fussy",
    "relic",
    "guava",
    "ratty",
    "fudge",
    "femur",
    "chirp",
    "forte",
    "alibi",
    "whine",
    "petty",
    "golly",
    "plait",
    "fleck",
    "felon",
    "gourd",
    "brown",
    "thrum",
    "ficus",
    "stash",
    "decry",
    "wiser",
    "junta",
    "visor",
    "daunt",
    "scree",
    "impel",
    "await",
    "press",
    "whose",
    "turbo",
    "stoop",
    "speak",
    "mangy",
    "eying",
    "inlet",
    "crone",
    "pulse",
    "mossy",
    "staid",
    "hence",
    "pinch",
    "teddy",
    "sully",
    "snore",
    "ripen",
    "snowy",
    "attic",
    "going",
    "leach",
    "mouth",
    "hound",
    "clump",
    "tonal",
    "bigot",
    "peril",
    "piece",
    "blame",
    "haute",
    "spied",
    "undid",
    "intro",
    "basal",
    "shine",
    "gecko",
    "rodeo",
    "guard",
    "steer",
    "loamy",
    "scamp",
    "scram",
    "manly",
    "hello",
    "vaunt",
    "organ",
    "feral",
    "knock",
    "extra",
    "condo",
    "adapt",
    "willy",
    "polka",
    "rayon",
    "skirt",
    "faith",
    "torso",
    "match",
    "mercy",
    "tepid",
    "sleek",
    "riser",
    "twixt",
    "peace",
    "flush",
    "catty",
    "login",
    "eject",
    "roger",
    "rival",
    "untie",
    "refit",
    "aorta",
    "adult",
    "judge",
    "rower",
    "artsy",
    "rural",
    "shave"
];
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
let Word = Words[Math.floor(Math.random() * Words.length)].toUpperCase();
let WordArray = Word.split("");
console.log(`I hope you feel bad for cheating!\nAnyway your word is "${Word}"`);

let score = 0;
let currentRow = 0;
let maxRows = 0;

const guessWord = async () => {
    const row = document.getElementById(`${currentRow}`);
    const guessedWord = Array.from(row.children)
        .map((element) => element.textContent)
        .join("");
    const guessedWordArray = guessedWord.split("");
    const keyboardButtons = document.querySelectorAll("button[data-key]");

    if (guessedWordArray.length === 0) return;
    if (guessedWord.length < maxRows) {
        for (let i = 0; i < row.children.length; i++)
            row.children[i].textContent = "";
        sendMessage("error", "Word must be 5 letters long");
        return;
    } else {
        for (let i = 0; i < guessedWordArray.length; i++) {
            row.getElementsByClassName(`${i}`)[0].textContent =
                guessedWordArray[i];
            if (!WordArray.includes(guessedWordArray[i])) {
                row.getElementsByClassName(
                    `${i}`
                )[0].className = `${i} element flipped wrong`;
                keyboardButtons.forEach((button) =>
                    button.dataset.key === guessedWordArray[i]
                        ? (button.className = "key wrong")
                        : "key"
                );
            }

            if (WordArray.includes(guessedWordArray[i])) {
                row.getElementsByClassName(
                    `${i}`
                )[0].className = `${i} element flipped invalid`;
                keyboardButtons.forEach((button) =>
                    button.dataset.key === guessedWordArray[i]
                        ? (button.className = "key invalid")
                        : "key"
                );
            }

            if (guessedWordArray[i] === WordArray[i]) {
                row.getElementsByClassName(
                    `${i}`
                )[0].className = `${i} element flipped correct`;
                keyboardButtons.forEach((button) =>
                    button.dataset.key === guessedWordArray[i]
                        ? (button.className = "key correct")
                        : "key"
                );
            }
            await delay(100);
        }
        currentRow++;
    }

    if (guessedWord === Word) {
        score += Number((1000 / +currentRow).toFixed(0));
        document.getElementById("score").textContent = `Score: ${score}`;
        sendMessage("success", "Congratulations! You guessed the word!");
        await delay(5000);
        resetGame();
    }

    if (currentRow === maxRows + 1) {
        sendMessage("error", "You lost! The word was " + Word);
        await delay(5000);
        resetGame();
    }
};

const gameSetup = (dimentions) => {
    maxRows = dimentions;
    const HTMLcontainer = document.getElementById("grid");

    for (let i = 0; i < maxRows + 1; i++) {
        const row = document.createElement("div");
        row.id = i;
        row.className = "row";

        for (let j = 0; j < maxRows; j++) {
            const element = document.createElement("div");
            element.className = `${j} element`;
            row.appendChild(element);
        }

        HTMLcontainer.appendChild(row);
    }
};
const appendKeyboard = () => {
    const HTMLcontainer = document.getElementById("game");

    const keyboard = document.createElement("div");
    keyboard.id = "keyboard";

    const template = `
        <div class="keyboard-row">
            <button class="key" data-key="Q">Q</button>
            <button class="key" data-key="W">W</button>
            <button class="key" data-key="E">E</button>
            <button class="key" data-key="R">R</button>
            <button class="key" data-key="T">T</button>
            <button class="key" data-key="Y">Y</button>
            <button class="key" data-key="U">U</button>
            <button class="key" data-key="I">I</button>
            <button class="key" data-key="O">O</button>
            <button class="key" data-key="P">P</button>
        </div>

        <div class="keyboard-row">
            <div class="spacer half"></div>
            <button class="key" data-key="A">A</button>
            <button class="key" data-key="S">S</button>
            <button class="key" data-key="D">D</button>
            <button class="key" data-key="F">F</button>
            <button class="key" data-key="G">G</button>
            <button class="key" data-key="H">H</button>
            <button class="key" data-key="J">J</button>
            <button class="key" data-key="K">K</button>
            <button class="key" data-key="L">L</button>
        </div>

        <div class="keyboard-row">
            <button class="key enter" data-key="ENTER">ENTER</button>
            <button class="key" data-key="Z">Z</button>
            <button class="key" data-key="X">X</button>
            <button class="key" data-key="C">C</button>
            <button class="key" data-key="V">V</button>
            <button class="key" data-key="B">B</button>
            <button class="key" data-key="N">N</button>
            <button class="key" data-key="M">M</button>
            <button class="key del" data-key="DEL">DEL</button>
        </div>
    `;

    keyboard.innerHTML = template;
    HTMLcontainer.appendChild(keyboard);
};
const resetGame = () => {
    currentRow = 0;
    index = 0;
    maxRows = 0;

    Word = Words[Math.floor(Math.random() * Words.length)].toUpperCase();
    WordArray = Word.split("");
    console.log(
        `I hope you feel bad for cheating!\nAnyway your word is "${Word}"`
    );

    sendMessage("success", "&nbsp;");

    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    gameSetup(5);

    const keyboard = document.getElementById("keyboard");
    keyboard.remove();
    appendKeyboard();
};
const sendMessage = (type, message) => {
    const messageContainer = document.getElementById("message");
    messageContainer.textContent = message;
    messageContainer.className = `message ${type}`;

    if (message === "&nbsp;") messageContainer.innerHTML = "&nbsp;";
};
const showHide = () => {
    document.getElementById("load-container").style = "display: none";
    document.getElementById("game-container").style = "display: block";
};
setTimeout(() => {
    gameSetup(5);
    appendKeyboard();
}, 100);

let index = 0;
document.addEventListener("keydown", (event) => {
    if (event.keyCode > 64 && event.keyCode < 91) {
        if (index < maxRows) {
            const row = document.getElementById(`${currentRow}`);
            row.getElementsByClassName(
                `${index}`
            )[0].textContent = event.key.toUpperCase();
            row.getElementsByClassName(
                `${index}`
            )[0].className = `${index} element typed`;
            index++;
        }
    }

    if (event.keyCode === 8) {
        if (index > 0) {
            const row = document.getElementById(`${currentRow}`);
            row.getElementsByClassName(`${index - 1}`)[0].textContent = "";
            row.getElementsByClassName(`${index - 1}`)[0].className = `${
                index - 1
            } element`;
            index--;
        }
    }

    if (event.keyCode === 13) {
        guessWord();
        index = 0;
    }
});
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("key")) {
        if (
            !event.target.classList.contains("del") &&
            !event.target.classList.contains("enter")
        ) {
            if (index < maxRows) {
                const row = document.getElementById(`${currentRow}`);
                row.getElementsByClassName(`${index}`)[0].textContent =
                    event.target.textContent;
                row.getElementsByClassName(
                    `${index}`
                )[0].className = `${index} element typed`;
                index++;
            }
        }

        if (
            event.target.classList.contains("key") &&
            event.target.classList.contains("del")
        ) {
            if (index > 0) {
                const row = document.getElementById(`${currentRow}`);
                row.getElementsByClassName(`${index - 1}`)[0].textContent = "";
                row.getElementsByClassName(`${index - 1}`)[0].className = `${
                    index - 1
                } element`;
                index--;
            }
        }

        if (
            event.target.classList.contains("key") &&
            event.target.classList.contains("enter")
        ) {
            guessWord();
            index = 0;
        }
    }
});