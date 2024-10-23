export class FlowerSpawner {
  #flowersImages = ['../img/flower1_l3.png', '../img/flower2_l3.png']
  constructor() {
    this.container = document.getElementById('game')
    this.spawnFlowers(50)
  }

  spawnFlower() {
    const imgSrc = this.getRandomFlowerImage()
    const x = Math.random() * (window.innerWidth - 50)
    const y = Math.random() * (window.innerHeight - 50)
    const size = Math.random() * 50 + 20

    const imgElement = this.createFlowerElement(imgSrc, x, y, size)
    this.container.appendChild(imgElement)
  }

  getRandomFlowerImage() {
    const randomIndex = Math.floor(Math.random() * this.#flowersImages.length)
    return this.#flowersImages[randomIndex]
  }

  createFlowerElement(src, x, y, size) {
    const img = document.createElement('img')
    img.src = src
    img.style.position = 'absolute'
    img.style.left = `${x}px`
    img.style.top = `${y}px`
    img.style.width = `${size}px`
    img.style.height = `${size}px`
    img.style.zIndex = '10'
    return img
  }

  spawnFlowers(count) {
    for (let i = 0; i < count; i++) {
      this.spawnFlower()
    }
  }
}