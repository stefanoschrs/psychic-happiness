class Flight extends HTMLElement {
  container

  constructor() {
    super()

    const shadow = this.attachShadow({
      mode: 'open'
    })

    this.container = document.createElement('div')
    this.container.setAttribute('class', 'flight')
    this.container.innerHTML = `<style>@import "flight.component.css";</style>`

    shadow.appendChild(this.container)
  }

  connectedCallback () {
    const location = document.createElement('div')
    location.setAttribute('class', 'location')
    location.textContent = this.getAttribute('location')

    const dates = document.createElement('div')
    dates.setAttribute('class', 'dates')
    dates.textContent = this.getAttribute('dates')

    const price = document.createElement('div')
    price.setAttribute('class', 'price')
    price.textContent = this.getAttribute('price')

    this.container.appendChild(location)
    this.container.appendChild(dates)
    this.container.appendChild(price)
  }
}

customElements.define('ph-flight', Flight)
