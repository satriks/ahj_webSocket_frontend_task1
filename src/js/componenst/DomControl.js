import Online from './chat_menu/chat__Online'
import Chat from './chat__board/chat__Board'
import Nickname from './nicknameForm/Nickname'

export default class DomControl {
  constructor () {
    this.chat = document.querySelector('.chat')
    this.online = new Online()
    this.chatBoard = new Chat()
    this.ws = null
    this.nickname = new Nickname(this.online.newUser.bind(this.online), this.onWebSocket.bind(this))
  }

  // отрисовка дом
  init () {
    const chatWrapper = document.createElement('div')
    chatWrapper.classList.add('chat__wrapper')
    chatWrapper.appendChild(this.online.board)
    chatWrapper.appendChild(this.chatBoard.messageBoard)
    this.chat.appendChild(chatWrapper)
    document.querySelector('.chat__input').addEventListener('keydown', this.newMessage)
  }

  // создании нового сообщения в чат
  newMessage = (event) => {
    if (event.key === 'Enter' && event.target.value.trim()) {
      const time = new Date(Date.now())
      this.chatBoard.newMessage(event.target.value, this.nickname.name, time.toLocaleString())
      const message = JSON.stringify({ name: this.nickname.name, message: event.target.value, time })
      this.ws.send(JSON.stringify({ chat: message }))
      event.target.value = ''
    }
  }

  // Веб сокет взаимодействие
  onWebSocket () {
    this.chatBoard.oldMessages()
    this.ws = new WebSocket('ws://localhost:7070/ws?name=' + this.nickname.name)

    this.ws.addEventListener('message', (message) => {
      console.log(message.data, 'data')

      const { online, chat } = JSON.parse(message.data)

      if (online) {
        this.online.updateOnline(online)
      }
      if (chat) {
        console.log(chat, 'chat')
        this.chatBoard.updateChat(chat)
      }
      this.marks()
    })
    this.ws.addEventListener('open', (message) => {
      this.ws.send(JSON.stringify({ author: this.nickname.name }))
    })
  }

  // подсветка ника и центровка сообщений
  marks () {
    console.log(this.online.users, 'users')
    this.online.users.forEach(user => {
      if (user.innerText === this.nickname.name) {
        user.classList.add('chat__user-active')
      }
    })
    this.chatBoard.textArea.querySelectorAll('.chat__message').forEach(message => {
      const author = message.querySelector('.message__author')

      if (author.innerText.trim() === this.nickname.name.trim()) {
        console.log('tyta')
        console.log(author.closest('.chat__message'), 'author form mark')
        author.closest('.chat__message').classList.add('chat__message-active')
      }
    })
  }
}
