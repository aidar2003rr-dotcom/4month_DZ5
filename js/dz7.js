const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'
const wrapper = document.querySelector('.wrapper2')

const getPosts = async () => {
    wrapper.innerHTML = ''  // очищаем перед рендером

    try {
        const response = await fetch(BASE_URL)

        if (!response.ok) {
            throw new Error("Ошибка сервера")
        }

        const data = await response.json()
        const limited = data.slice(0, 10)

        limited.forEach(post => {
            const card = document.createElement('div')
            card.classList.add('card')

            card.innerHTML = `
                <img src="https://picsum.photos/300/200" alt="img">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `

            wrapper.append(card)
        })

    } catch (error) {
        wrapper.innerHTML = "Произошла ошибка при получении данных"
        console.error('Ошибка:', error)
    }
}

getPosts()