export class FlowerSpawner {
  constructor() {
    this.container = document.getElementById('game')
  }

  createFlowerElement(src, x, z, size) {
    const img = document.createElement('img')
    img.src = src
    img.style.position = 'absolute'
    img.style.left = `${x}px`
    img.style.top = `${z}px`
    img.style.width = `${size}px`
    img.style.height = `${size}px`
    
    return img
  }

  placeFlower(data, flowerId) {
    console.log(flowerId)
    const flower = this.createFlowerElement(data.imageSource, data.x, data.z, data.size)
    flower.setAttribute('id', flowerId)
    this.container.appendChild(flower)
  }

  placeAllFlowers(flowerData) {
    for (const flowerId in flowerData) {
      const flowerInfo = flowerData[flowerId]
      this.placeFlower(flowerInfo, flowerId)
    }
  }
}