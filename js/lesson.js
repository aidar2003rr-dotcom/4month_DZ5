

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
