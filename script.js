const Words = [
    "covid",
    "mundo",
    "ritmo",
    "punto",
    "anual",
    "forma",
    "mitad",
    "media",
    "bajos",
    "ciclo",
    "salud",
    "vidas",
    "plazo",
    "corto",
    "mayor",
    "menor",
    "local",
    "marco",
    "dolar",
    "metas",
    "pagar",
    "pagos",
    "caida",
    "todos",
    "niños",
    "niñas",

];
const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

open.addEventListener('click', () => {
  modal_container.classList.add('show');  
});

close.addEventListener('click', () => {
  modal_container.classList.remove('show');
});

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let Word = Words[Math.floor(Math.random() * Words.length)].toUpperCase();
    let WordArray = Word.split("");
    console.log(`Tenes que entender que hacer trampa esta mal\nDe igual manera tu palabra es "${Word}"`);

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
            sendMessage("Error", "La palabra debe ser de 5 letras");
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
            sendMessage("success", "Felicitaciones! Adivinaste la palabra!");
            await delay(5000);
            resetGame();
        }
    
        if (currentRow === maxRows + 1) {
            sendMessage("error", "Perdiste! La palabra era " + Word);
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
                <button class="key" data-key="Ñ">Ñ</button>
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
            `¡Espero que te sientas mal por hacer trampa!\nDe todos modos, tu palabra es"${Word}"`
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