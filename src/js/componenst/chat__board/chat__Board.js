export default class Chat {
  constructor () {
    this.messageBoard = null
    this.textArea = null
    this.create()
  }

  // отрисовка части с чатом
  create () {
    const chat = document.createElement('div')
    chat.classList.add('chat__board')
    const chatText = document.createElement('div')
    chatText.classList.add('chat__text')
    const input = document.createElement('input')
    input.classList.add('chat__input')
    chat.append(chatText, input)

    this.messageBoard = chat
    this.textArea = chatText
  }

  // создание сообщения в чате
  newMessage (message, author, dateTime) {
    const chatMessage = document.createElement('div')
    chatMessage.classList.add('chat__message')

    const messageData = document.createElement('div')
    messageData.classList.add('message__data')
    const messageAuthor = document.createElement('span')
    messageAuthor.classList.add('message__author')
    messageAuthor.innerText = author + ' '
    const messageDateTime = document.createElement('span')
    messageDateTime.innerText = dateTime
    messageData.append(messageAuthor, messageDateTime)

    const messageText = document.createElement('span')
    messageText.innerText = message

    messageData.append(messageAuthor, messageDateTime)
    chatMessage.append(messageData, messageText)
    this.textArea.insertAdjacentElement('beforeend', chatMessage)
  }

  // обновление сообщений в чате
  updateChat (messages) {
    [...this.textArea.children].forEach(message => message.remove())
    messages.forEach(message => this.newMessage(message.message, message.name, new Date(message.time).toLocaleString()))
  }

  // получение сообщений из чата с сервера
  oldMessages () {
    const wsGetOldMassages = new WebSocket('wss://ahj-websocket-server-task1.onrender.com?history=history')
    wsGetOldMassages.addEventListener('message', (message) => {
      const history = JSON.parse(message.data).chat
      history.forEach(message => this.newMessage(message.message, message.name, new Date(message.time).toLocaleString()))
      wsGetOldMassages.close()
    })
  }
}
