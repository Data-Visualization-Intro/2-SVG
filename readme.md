# SVG and D3

## SVG

Scalable Vector Graphics (SVG) is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation.

[Wikipedia](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics)

[Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/SVG)

## HTML and CSS

We discussed HTML and CSS for data visualization.

```html
<div style="display: flex; align-items: center">
  <div class="circle circleOne"></div>
  <div class="circle circleTwo"></div>
</div>
```

```css
.circle {
  background: blue;
  border-radius: 50%;
}
.circleOne {
  width: 200px;
  height: 200px;
}
.circleTwo {
  width: 140px;
  height: 140px;
}
```

We looked at one simple SVG element.

```svg
<svg width="300" height="200">
   <circle cx="150" cy="100" r="80" fill="green" />
</svg>
```

```
<svg style="border: 1px solid">
  <circle cx="10" cy="10" r="10"  />
</svg>
```

See additional SVG shapes [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes)

## Coordinate Space

The top left corner of the document is the point (0,0), or point of origin. Positions are measured in pixels from the top left corner, with the positive x direction being to the right, and the positive y direction being to the bottom.

![grid](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Positions/canvas_default_grid.png)

Note: this is slightly different than the way you're taught to graph as a kid (y axis is flipped).

Note: the default size of the SVG element in the HTML document - 300px x 150px.

Note: the default location of the circle (0,0) - the top left hand corner.

In order to ease the process of working with SVG it is common to surround the SVG with a `<g>` SVG group and then move all the artwork to the center using CSS's transform property.

```svg
<svg style="border: 1px solid">
  <g style="transform: translate(50%, 50%)">
    <circle cx="0" cy="0" r="50"  />
  </g>
</svg>
```

Note: we can now use `cx="0"` to center the circle. The positioning system becomes more intuitive and easier to work with.

For example:

```css
<style>
  svg {
    border: 1px solid gray
  }
  g {
    transform: translate(50%, 50%)
  }
</style>
```

```svg
<svg width="640" height="480">
  <g>
    <rect x="0" y="0" width="200" height="150" fill="red" />
    <circle
    cx="60"
    cy="60"
    r="50"
    stroke="black"
    stroke-width="6"
    fill="green"
    ></circle>
</g>
</svg>
```

## Stacking

The order of the SVG elements in the code will determine the stacking order of the ultimate display.

## Smile

```html
<!DOCTYPE html>
<html>
  <head>
    <title>emoji</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
      }
    </style>
    <script src="https://unpkg.com/d3@7.3.0/dist/d3.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script src="scripts.js"></script>
  </body>
</html>
```

```js
const dim = {
  width: 960,
  height: 500,
};
const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 20;
const eyeOffsetX = 90;
const eyeOffsetY = 70;
const eyeRadius = 30;
const mouthWidth = 100;
const mouthRadius = 20;

const mouthArc = d3
  .arc()
  .innerRadius(mouthWidth)
  .outerRadius(mouthWidth + mouthRadius)
  .startAngle(Math.PI / 2 + 0.2)
  .endAngle((Math.PI * 3) / 2 - 0.2);

const mySVG = `<svg width=${width} height=${height}>
    <g transform=${`translate(${centerX},${centerY})`}>
      <circle
        r=${centerY - strokeWidth / 2}
        fill="yellow"
        stroke="black"
        stroke-width=${strokeWidth}
      />
      <circle cx=${-eyeOffsetX} cy=${-eyeOffsetY} r=${eyeRadius} />
      <circle cx=${eyeOffsetX} cy=${-eyeOffsetY} r=${eyeRadius} />

      <path d=${mouthArc()} />
    </g>
  </svg>`;

const rootElement = document.getElementById("root");
rootElement.innerHTML = mySVG;
```

## Dynamic SVG

We often need to dynamically calculate dimensions if, for example, we want to center the `rect` programmatically.

```js
const width = window.innerWidth;
const height = window.innerHeight;
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", width);
svg.setAttribute("height", height);
document.body.appendChild(svg);

const n = 4;

for (let i = 0; i < n; i++) {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", i * 100);
  circle.setAttribute("cy", Math.random() * 100 + 300);
  circle.setAttribute("r", Math.random() * 100);
  circle.setAttribute("fill", "red");
  svg.appendChild(circle);
}
```

SVG is a domain specific language so we use `createElementNS` in JavaScript.

```js
const width = window.innerWidth;
const height = window.innerHeight;
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", width);
svg.setAttribute("height", height);
document.body.appendChild(svg);

const n = 60;

for (let i = 0; i < n; i++) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", i * 20);
  rect.setAttribute("width", 20);
  rect.setAttribute("height", height);
  rect.setAttribute("fill", "#ddd");
  svg.appendChild(rect);
}
```

```js
const width = window.innerWidth;
const height = window.innerHeight;
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", width);
svg.setAttribute("height", height);
document.body.appendChild(svg);

const n = 30;

const values = [4, 7, 1, 9, 5, 6, 2, 3, 8];

function rando() {
  return values[Math.floor(Math.random() * values.length)];
}

for (let i = 0; i < n; i++) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", i * 36);
  rect.setAttribute("width", 20);
  rect.setAttribute("height", rando() * 40);
  rect.setAttribute("fill", "#dddddd");
  svg.appendChild(rect);
}
```
