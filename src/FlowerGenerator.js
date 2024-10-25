export class FlowerGenerator {
  #flowersImages = ['../img/flower1_l3.png', '../img/flower2_l3.png', '../img/flower3_l3.png', '../img/flower4_l3.png']
  constructor(count) {
    this.count = count
    this.flowersData = {}
    this.#generateFlowers()
  }

  /**
   * Creates flowers specifikation.
   * 
   * @returns {object} - Flowers elements specifikation.
   */
  #createFlowerData() {
    const imageSource = this.#getRandomFlowerImage()
    const defaultWidth = 1425
    const defaultHeight = 770
    const x = Math.random() * (defaultWidth - 50)
    const z = Math.random() * (defaultHeight - 50)
    const size = Math.random() * 10 + 20

    return { imageSource, x, z, size }
  }

  #generateFlowers() {
    for (let index = 0; index < this.count; index++) {
      const flowerId = 'flower' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)
      this.flowersData[flowerId] = this.#createFlowerData()
    }
  }

  #getRandomFlowerImage() {
    const randomIndex = Math.floor(Math.random() * this.#flowersImages.length)
    return this.#flowersImages[randomIndex]
  }

  getFlowerData() {
    return this.flowersData
  }
}
