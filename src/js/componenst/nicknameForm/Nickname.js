export default class Nickname {
  constructor (setName = null, webSocket = null) {
    this.name = null
    this.form = null
    this.input = null
    this.setName = setName
    this.webSocket = webSocket
    this.existNames = []
    this.preInit()
    // this.init()
  }

  // получение занятых имен пользователей в чате
  preInit () {
    const getWsData = new WebSocket('wss://ahj-websocket-server-task1.onrender.com?online=online')
    getWsData.addEventListener('message', (message) => {
      this.existNames = JSON.parse(message.data)
      this.existNames.forEach(name => this.setName(name))
      getWsData.close()
      this.init()
    })
  }

  // создание формы 'Введите псевдоним'
  init () {
    const form = document.createElement('form')
    form.classList.add('chat__nickname')

    const tittle = document.createElement('h2')
    tittle.textContent = 'Введите псевдоним'
    const nicknameInput = document.createElement('input')
    nicknameInput.type = 'text'
    nicknameInput.placeholder = 'Enter nickname'
    nicknameInput.classList.add('chat__nickname-input')
    const submit = document.createElement('button')
    submit.textContent = 'Продолжить'
    submit.classList.add('chat__nickname-submit')

    form.append(tittle, nicknameInput, submit)
    document.body.appendChild(form)
    this.input = nicknameInput
    this.form = form
    submit.addEventListener('click', this.onNickname)
  }

  // валидация и сохранение имени пользователя в чате
  onNickname = (event) => {
    event.preventDefault()

    if (this.existNames.includes(this.input.value.trim().toLowerCase())) {
      const nameError = document.createElement('span')
      nameError.classList.add('chat__nickname-error')
      nameError.textContent = 'Name already exist'
      this.input.insertAdjacentElement('afterend', nameError)

      setTimeout(() => nameError.remove(), 3000)
      return
    }

    this.name = this.input.value
    this.form.remove()
    this.setName(this.name)
    this.webSocket()
  }
}
