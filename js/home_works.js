
const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp = /^[a-z0-9.]{5,30}@gmail\.com$/;

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'VALID';
        gmailResult.style.color = 'green';
        gmailInput.style.border = '2px solid green';
    } else {
        gmailResult.innerHTML = 'INVALID';
        gmailResult.style.color = 'red';
        gmailInput.style.border = '2px solid red';
    }
};

const childBlock = document.querySelector('.child_block')
const parentBlock = document.querySelector('.parent_block')
let positionChild = 0
let positionY = 0

    const toRight = parentBlock.offsetWidth - childBlock.offsetWidth;
    const toBottom = parentBlock.offsetHeight - childBlock.offsetHeight
    const moveBlock = () => {

        if (positionChild < toRight && positionY === 0){
            positionChild += 2;
            childBlock.style.left = `${positionChild}px`;
        }
            else if(positionChild >= toRight && positionY < toBottom){
            positionY +=2;
            childBlock.style.top = `${positionY}px`;

        } else if (positionY >= toBottom && positionChild > 0){
                positionChild -=2;
                childBlock.style.left = `${positionChild}px`;
        }
            else if (positionChild <= 0 && positionY > 0){
                positionY -= 2;
                childBlock.style.top = `${positionY}px`;
        }
        requestAnimationFrame(moveBlock)

    }
    moveBlock()

// Секундомер:

const secondsElement = document.querySelector('#seconds')
const startBtn = document.querySelector('#start')
const stopBtn = document.querySelector('#stop')
const resetBtn = document.querySelector('#reset')

let count = 0;
    let timerId = null;

    const runTimer = () => {
    count++;
    secondsElement.innerHTML = count;
    timerId = setTimeout(runTimer, 1000);
}

    startBtn.onclick = () => {
        if (!timerId){
            runTimer()
        }
    }

        stopBtn.onclick = () => {
        clearTimeout(timerId);
            timerId = null;
        }

        resetBtn.onclick = () => {
        clearTimeout(timerId);
        timerId = null;
        count = 0
            secondsElement.innerHTML = count;
        }


        // Characters:
const charactersList = document.querySelector('.characters-list');

fetch('characters.json')
    .then(response => response.json())
    .then(data => {

        data.forEach(character => {

            // Создаем обертку карточки
            const card = document.createElement('div');
            card.classList.add('character-card');

            // Наполняем карточку структурой, которая подходит под твой CSS
            card.innerHTML = `
                <div class="character-photo">
                    <img src="${character.person_photo}" alt="${character.name}">
                </div>
                <h2 style="color: var(--orange);">${character.name}</h2>
                <p style="color: white;">Возраст: ${character.age}</p>
            `;

            // 3. Добавляем готовую карточку в список на странице
            charactersList.append(card);
        });
    })
    .catch(error => {
        console.error('Ошибка при загрузке JSON:', error);
    });
