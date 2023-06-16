---
layout: ../layouts/Page.astro
title: "Astro for Docs"
---

Colors-kit is a zero-dependency module that can help you with a variety of color related tasks, such as:

- Converting colors between different formats.
- Creating color palettes.
- Rating the contrast of two colors based on WCAG (Web Content Accessibility Guidelines).
- Generating random colors.
- Simulating different types of color blindness.
- Extracting color palettes from an image.

## Installation

```
npm install colors-kit
```

## Usage

The following examples will give you a glance of what you can achieve with this library.
To know more about the usage of the library check the documentation.

### Validate

The Validate API helps validate colors. It ensures that colors have the correct value within the range of their current format. If a value is not within the correct range, the method will throw an error.

```js
validateCmyk({ c: 69, m: 0, y: 42, k: 17 }) // Valid

validateCmyk({ c: 69, m: 0, y: 20 })
// Expected output: "Error: Expected property key (k) to be of type number, but got undefined."

validateHex("#45AA0F") // Valid

validateHex("45AAF4")
// Expected output: "Error: A hash symbol (#) must be present at the begining of the color."
```

### Convert

The Convert API can handle five input color formats and convert them to seven output color formats.

```js
hslToRgb({ h: 143, s: 62, l: 54 })
// Expected output: { r: 66, g: 211, b: 122 }

rgbToHex({ r: 66, g: 211, b: 122 })
// Expected output: '#42D37A'
```

### Random

The Random API can create a random color in any of the seven formats the library handles.

```js
getRandomLab()
// Expected output: { l: 45, a: -81, b: 67 }

getRandomHsv()
// Expected output: { h: 284, s: 100, v: 13 }
```

### Color Blind

The Color Blind API can simulate different types of color blindness.

```js
toDeuteranomaly('#42D37A')
// Expected output: '#5fad86'

toTritanopia('#f4fa53')
// Expected output: '#f49bb2'

toProtanopia({ r: 45, g: 75, b: 200 })
// Expected output: { r: 57, g: 58, b: 170 }
```

### Palette

The Palette API can generate a color palettes of many different types.

```js
makeAnalogousPalette('#3e7a72', 5)
// Expected output: ['#3e7a72', '#3e647a', '#3d457a', '#543e7a', '#723e7a']

makeMonochromaticPalette({ r: 2, g: 69, b: 0 }, 2)
// Expected output: [
//  { r: 2, g: 69, b: 0 },
//  { r: 22, g: 89, b: 12 }
// ]
```

### From Image

The fromImage API work with the colors present on an image.

```js
const imageUrl = 'https://e1.pxfuel.com/desktop-wallpaper/763/1015/desktop-wallpaper-6-blue-and-pink-landscape-nature-landscape-thumbnail.jpg'

async function extract() {
  const colors = await extractPalette(imageUrl, 5)

  return colors
}

extract()
// Expected output: ["#8c84ea', '#e7a6f9', '#3b7ee4', '#080419', '#3d2585']
```

### Rate

The rate API rates colors based on certain properties and features. Like the Web Content Accessibility Guidelines (WCAG) criteria for contrast rate.

```js
rateContrast(['#002719', '#c49c1a'])
// Expected output: {
//   contrastValue: 6.2,
//   AA: {
//     smallText: true,
//     largeText: true,
//     uiComponent: true
//   },
//   AAA: {
//     smallText: false,
//     largeText: true,
//     uiComponent: true
//   }
// }
```

## Typescript 

This library is build with vanilla typescript, so you will find the types you need to work on the `types.d.ts` file. See the documentation to know more about the interfaces and types used.