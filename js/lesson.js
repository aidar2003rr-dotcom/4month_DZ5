const tabs = document.querySelectorAll('.tab_content_block')
const tabBtns = document.querySelectorAll('.tab_content_item')
const tabBtnsParent = document.querySelector('.tab_content_items')

const hideTabs = () => {
    tabs.forEach((tab) => {
        tab.style.display = 'none'
    })
    tabBtns.forEach((btn) => {
        btn.classList.remove('tab_content_item_active')
    })
}
hideTabs()

const showActiveTab = (index = 0) => {
    tabs[index].style.display = 'block'
    tabBtns[index].classList.add('tab_content_item_active')
}
showActiveTab()
tabBtnsParent.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() == 'button') {
        tabBtns.forEach((btn, index) => {
            if (event.target == btn) {
                hideTabs()
                showActiveTab(index)
            }
        })
    }
})
let currentIndex = 0

const autoSlider = () => {
    setInterval(() => {
        currentIndex++;

        if (currentIndex >= tabs.length) {
            currentIndex = 0
        }

        hideTabs();
        showActiveTab(currentIndex)
    }, 5000)
}

autoSlider()

tabBtnsParent.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() == 'button') {
        tabBtns.forEach((btn, index) => {
            if (event.target == btn) {
                currentIndex = index
                hideTabs()
                showActiveTab(index)
            }
        })
    }
})

const usdInput = document.querySelector('#usd')
const somInput = document.querySelector('#som')
const eurInput = document.querySelector('#eur')
const errorMessage = document.querySelector('#error')

// Конвертер валют
const converter = (targetElement, otherElement1, otherElement2) => {
    targetElement.addEventListener('input', () => {
        const request = new XMLHttpRequest()
        request.open('GET', '../data/converter.json')
        request.setRequestHeader('Content-type', 'application/json')
        request.send()

        request.onload = () => {
            if (request.status === 404) {
                errorMessage.style.color = 'red'
                errorMessage.innerHTML = 'Произошла ошибка'
                return;
            }
            const response = JSON.parse(request.response)
            const usd = response?.usd
            const eur = response?.eur
            if (targetElement.value === '') {
                somInput.value = ''
                usdInput.value = ''
                eurInput.value = ''
                return
            }
            if (targetElement.id === 'som') {
                usdInput.value = (targetElement.value / usd).toFixed(2)
                eurInput.value = (targetElement.value / eur).toFixed(2)
            } else if (targetElement.id === 'usd') {
                const resultSom = targetElement.value * usd
                somInput.value = resultSom.toFixed(2)
                eurInput.value = (resultSom / eur).toFixed(2)
            } else if (targetElement.id === 'eur') {
                const resultSom = targetElement.value * eur
                somInput.value = resultSom.toFixed(2)
                usdInput.value = (resultSom / usd).toFixed(2)
            }
        }
    })
}
converter(usdInput, somInput, eurInput)
converter(somInput, usdInput, eurInput)
converter(eurInput, somInput, usdInput)

// Switch card
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')
const card = document.querySelector('.card')
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/'

let cardID = 199

const fetchTodos = (id) => {
    fetch(BASE_URL + id)
        .then(response => response.json())
        .then(data => {
            const {id, title, completed} = data
            const color = completed ? 'green' : 'red'

            card.style.borderColor = color
            card.innerHTML = `
                <p>ID -> ${id}</p>
                <p>${title}</p>
                <p style="color:${color}">${completed ? 'Completed' : 'Not Completed'}</p>
            `
        })
        .catch(err => {
            console.error(err)
            card.innerHTML = '<p style="color:red">Ошибка в коде или сети</p>'
        })
}

fetchTodos(cardID)

btnNext.onclick = () => {
    cardID = (cardID >= 200) ? 1 : cardID + 1
    fetchTodos(cardID)
}

btnPrev.onclick = () => {
    cardID = (cardID <= 1) ? 200 : cardID - 1
    fetchTodos(cardID)
}

const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums'

const fetchAlbums = () => {
    fetch(ALBUMS_URL)
        .then(response => {
            if (!response.ok) throw new Error('Ошибка при загрузке альбомов')
            return response.json()
        })
        .then(data => {
            console.log('Список альбомов:')
            console.log(data)
        })
        .catch(error => console.error('Ошибка в fetchAlbums:', error))
}

fetchAlbums()


const searchBtn = document.querySelector('#search')
const searchInput = document.querySelector('.cityName')
const cityName = document.querySelector('.city')
const temperature = document.querySelector('.temp')

const BASE_API = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '83b3ebd39b878f8be8acd104821aa61a'

// searchBtn.addEventListener('click', () => {
//     if (searchInput.value == '') {
//         cityName.innerHTML = "Укажите город"
//         temperature.innerHTML = ''
//         return
//     }
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=83b3ebd39b878f8be8acd104821aa61a`)
//         .then(response => {
//             if (!response.ok) {
//                 cityName.innerHTML = "Укажите корректный город"
//                 temperature.innerHTML = ''
//                 return
//             }
//             return response.json()
//         })
//         .then(data => {
//             const {name, main: {temp}} = data
//
//             cityName.innerHTML = name
//             temperature.innerHTML = temp + 'c'
//         })
//     searchInput.value = ''
// })


searchBtn.addEventListener('click', async() => {
    if (searchInput.value == ''){
        cityName.innerHTML = 'Укажите город'
        temperature.innerHTML = ''
        return
    }
    try{
        const response = await fetch(`${BASE_API}?q=${searchInput.value}&lang=ru&units=metric&appid=${API_KEY}`)
        const data = await response.json()
        const {name, main:{temp}} = data
        cityName.innerHTML = name
        temperature.innerHTML = temp + 'C'
    }catch (error){
        cityName.innerHTML = 'Укажите корректный город'
        temperature.innerHTML = ''
    }
    searchInput.value = ''
} )
