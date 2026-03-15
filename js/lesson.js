

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
    if (event.target.tagName.toLowerCase() == 'button'){
        tabBtns.forEach((btn, index) => {
            if (event.target == btn){
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
    if (event.target.tagName.toLowerCase() == 'button'){
        tabBtns.forEach((btn, index) => {
            if (event.target == btn){
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
const errorMessage  = document.querySelector('#error')

const converter = (targetElement, otherElement1, otherElement2) => {
    targetElement.addEventListener('input', () => {
        const request = new XMLHttpRequest()
        request.open('GET', '../data/converter.json')
        request.setRequestHeader('Content-type', 'application/json')
        request.send()

        request.onload = () => {
            if (request.status === 404){
                errorMessage.style.color = 'red'
                errorMessage.innerHTML = 'Произошла ошибка'
                return;
            }
            const response = JSON.parse(request.response)
            const usd = response?.usd
            const eur = response?.eur
                if (targetElement.value === ''){
                    somInput.value = ''
                    usdInput.value = ''
                    eurInput.value = ''
                    return
                }
            if (targetElement.id === 'som') {
                usdInput.value = (targetElement.value / usd).toFixed(2)
                eurInput.value = (targetElement.value / eur).toFixed(2)
            }else if (targetElement.id === 'usd'){
                const resultSom = targetElement.value * usd
                somInput.value = resultSom.toFixed(2)
                eurInput.value = (resultSom / eur).toFixed(2)
            }else if (targetElement.id === 'eur'){
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