export default class DomControl {
  constructor(){
    this.dom = document.createElement('div')
    this.dom.className = 'dom-control'
    this.dom.innerHTML = `
      <div class="dom-control-btn">
        <div class="dom-control-btn-left"></div>
        <div class="dom-control-btn-right"></div>
      </div>
    `
    document.body.appendChild(this.dom)
  }
}