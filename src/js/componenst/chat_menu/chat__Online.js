export default class Online {
  constructor () {
    this.board = null
    this.users = []
    this.usersPlace = null
    this.create()
  }

  // создание списка пользователей в чате
  create () {
    const online = document.createElement('div')
    online.classList.add('chat__online')
    const loqOut = document.createElement('button')
    loqOut.classList.add('chat__loq-out')
    loqOut.textContent = 'Покинуть чат'
    loqOut.addEventListener('click', () => location.reload())
    online.appendChild(loqOut)
    const chatMenu = document.createElement('div')
    chatMenu.classList.add('chat__menu')
    chatMenu.appendChild(online)
    this.board = chatMenu
    this.usersPlace = online
  }

  // новый пользователь в чате
  newUser (name) {
    const user = document.createElement('span')
    user.classList.add('chat__user')
    user.innerText = name
    this.users.push(user)
    this.usersPlace.insertAdjacentElement('afterbegin', user)
  }

  // обновление списка пользователей в чате
  updateOnline (usersName) {
    this.users.forEach(user => user.remove())
    this.users = []
    usersName.forEach(name => this.newUser(name))
  }

  // удаление пользователя в чате
  remove (user) {
    const removeUser = this.users.find(el => el.textContent === user)
    removeUser.remove()
    this.users = this.users.filter(user => user !== removeUser)
  }
}
