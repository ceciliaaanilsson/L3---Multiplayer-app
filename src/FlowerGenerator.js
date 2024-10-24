export class FlowerGenerator {
  #flowersImages = ['../img/flower1_l3.png', '../img/flower2_l3.png']
  constructor(count) {
    this.count = count
    this.flowersData = {}
    this.generateFlowers()
  }

  createFlowerData() {
    const imageSource = this.getRandomFlowerImage()
    const defaultWidth = 800
    const defaultHeight = 600
    const x = Math.random() * (defaultWidth - 50)
    const z = Math.random() * (defaultHeight - 50)
    const size = Math.random() * 20 + 20

    return { imageSource, x, z, size }
  }

  generateFlowers() {
    for (let index = 0; index < this.count; index++) {
      const flowerId = 'flower' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)
      this.flowersData[flowerId] = this.createFlowerData()
    }
  }

  getRandomFlowerImage() {
    const randomIndex = Math.floor(Math.random() * this.#flowersImages.length)
    return this.#flowersImages[randomIndex]
  }

  getFlowerData() {
    return this.flowersData
  }
}