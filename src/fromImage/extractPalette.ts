import { Rgb } from '../types'

///---------------------TYPES-------------------///
type Color = Array<number>
type Colors = Array<Color>
type K = number

interface Range {
  min: number,
  max: number
}

///--------------------HELPERS-----------------///
// Calculate eclidean distance
function euclideanDistance(a: Color, b: Color): number {
  let sum = 0
  
  for (let i = 0; i < a.length; i++) {
    const diff = b[i] - a[i]
    sum += diff ** 2
  }
  
  return Math.sqrt(sum)
}

// Check if two arrays are equal
function arraysEqual(array1: Colors[], array2: Colors[]): boolean {
  if (array1 === array2) {
    return true
  } else if (
    (array1 == null || array2 == null) ||
    (array1.length !== array2.length)
  ) {
    return false
  }

  for (let i = 0; i < array1.length; i++) {
    if (Array.isArray(array1[i]) && Array.isArray(array2[i])) {
      if (!arraysEqual(array1[i], array2[i])) {
        return false
      }
    } else if (array1[i] !== array2[i]) {
      return false
    }
  }

  return true
}

// Calculate mean point of an array of arrays
function calculateMeanPoint(data: Colors): Color {
  // Get the number of dimensions
  const numDimensions = data[0].length
  const mean: Color = new Array(numDimensions)
  
  for (let i = 0; i < numDimensions; i++) {
    const values = new Array(data.length)
    
    for (let j = 0; j < data.length; j++) {
      values[j] = data[j][i]
    }

    const sum = values.reduce((total, currentValue) => total + currentValue, 0)
    mean[i] = sum / values.length
  }

  return mean
}

// Calculate range of a one-dimensional data set
function oneDimensionRange(data: Color): Range {
  let min = data[0]
  let max = data[0]

  // Get Red, Green and Blue  max an min value
  for (let i = 0; i < data.length; i++) {
    const current = data[i]

    min = Math.min(min, current)
    max = Math.max(max, current)
  }

  return { min, max }
}

// Calculate range of an n-dimensional data set
function multiDimensionRange(data: Colors): Array<Range> {
  const numDimensions = data[0].length
  const ranges: Array<Range> = new Array(numDimensions)

  for (let i = 0; i < numDimensions; i++) {
    const values = new Array(data.length)

    for (let j = 0; j < data.length; j++) {
      values[j] = data[j][i]
    }

    ranges[i] = oneDimensionRange(values)
  }

  return ranges
}

// Generate random integer in a given closed interval
function randomBetween(a: number, b: number): number {
  return Math.floor(Math.random() * (b - a + 1)) + a
}

// Find the most similar array
function findClosest(arrayOfArrays: Colors, targetArray: Color) {
  let minDistance = Infinity
  let closest: Color = []
  
  for (const arr of arrayOfArrays) {
    const distance = Math.sqrt(
      arr.reduce((acc, val, index) => acc + Math.pow(val - targetArray[index], 2), 0)
    )

    if (distance < minDistance) {
      minDistance = distance
      closest = arr
    }
  }

  return closest
}

///-------------------CORE------------------///
// Initialice random centroids
function initializeCentroids(data: Colors, k: K): Colors {
  const ranges = multiDimensionRange(data)
  const centroids: Colors = []

  for (let i = 0; i < k; i++) {
    const centroid: Color = []

    for (const r in ranges) {
      centroid.push(randomBetween(ranges[r].min, ranges[r].max))
    }

    centroids.push(centroid)
  }

  return centroids
}

// Cluster data based on centroids
function clusterDataPoints(data: Colors, centroids: Colors): Array<Colors> {
  const numCentroids = centroids.length
  const numPoints = data.length
  const clusters: Array<Colors> = new Array(numCentroids).fill(0).map(() => [])
  const distances = new Array(numCentroids).fill(0).map(() => new Array(numPoints))

  // Calculate distances between each point and centroid
  for (let i = 0; i < numCentroids; i++) {
    const centroid = centroids[i]

    for (let j = 0; j < numPoints; j++) {
      distances[i][j] = euclideanDistance(data[j], centroid)
    }
  }

  // Assign each point to the nearest centroid and add it to the corresponding cluster
  for (let j = 0; j < numPoints; j++) {
    let nearestCentroid = centroids[0]
    let nearestDistance = distances[0][j]

    // Find the closest centroid
    for (let i = 1; i < numCentroids; i++) {
      const distance = distances[i][j]

      if (distance < nearestDistance) {
        nearestCentroid = centroids[i]
        nearestDistance = distance
      }
    }

    const nearestCentroidIndex = centroids.indexOf(nearestCentroid)
    clusters[nearestCentroidIndex].push(data[j]) 
  }

  return clusters
}

// Polish centroids
function getNewCentroids(clusters: Array<Colors>): Colors {
  const centroids: Colors = []

  clusters.forEach((cluster) => {
      centroids.push(calculateMeanPoint(cluster))
  })

  return centroids
}

///------------------EXTRACTOR------------------///
function kMeansColors(data: Colors, k: number): Array<Rgb> {
  let centroids = initializeCentroids(data, k)
  let clusters: Array<Colors> = []
  let oldClusters: Array<Colors>
  let converged = false
  const iterationLimit = 500
  let iterations = 0

  while (!converged) {
    iterations += 1
    oldClusters = clusters
    clusters = clusterDataPoints(data, centroids)

    // Re-start if ther is an empty cluster
    if (clusters.some(x => x.length === 0)) {
        return kMeansColors(data, k)
    }

    if (arraysEqual(clusters, oldClusters) || iterations >= iterationLimit) {
        converged = true
    }

    centroids = getNewCentroids(clusters)
  }

  const colorsMean = clusters.map(color => calculateMeanPoint(color))
  
  const colors = colorsMean.map((color, index) => {
    const closestColor = findClosest(clusters[index], color)

    return { r: closestColor[0], g: closestColor[1], b: closestColor[2] }
  })

  return colors
}

///------------------IMAGE READER------------------///
export function extractPalette(url: string, quantity: number): Promise<Rgb[]> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.crossOrigin = 'Anonymous'
    img.onload = function () {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d') as  CanvasRenderingContext2D
      const width = img.width
      const height = img.height
      canvas.width = width
      canvas.height = height
      context.drawImage(img, 0, 0, width, height)
      const imageData = context.getImageData(0, 0, width, height)
      const pixels = imageData.data

      const rgbData = []
      for (let i = 0; i < pixels.length; i += 4) {
        rgbData.push([pixels[i], pixels[i + 1], pixels[i + 2]])
      }

      const rgbColors = kMeansColors(rgbData, quantity)

      resolve(rgbColors)
    }

    img.onerror = function () {
      reject('Failed to load image')
    }
  })
}