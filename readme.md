# SVG and D3

## SVG

Scalable Vector Graphics (SVG) is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation.

[Wikipedia](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics)

SVG is widely used in web development as an image format.

Create a new `index.html` file in the `app` folder and add:

```html
<style>
  img {
    width: 100px;
  }
</style>
<img src="../samples/illustrations/exports/SVG/pizza.svg" alt="" />
<img src="../samples/illustrations/exports/SVG/rat.svg" alt="" />
<img src="../samples/illustrations/exports/SVG/trashcan.svg" alt="" />
```

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
<svg>
  <circle r="100" fill="green" />
</svg>
```

Note the default size of the SVG element in the HTML document - 300px x 150px - and the center of the circle (0,0) is at the top left hand corner.

To create a 200px x 200px image we need to define a radius of 100. The center point of the circle is located at the upper left hand corner of the `svg` element. Anything falling outside the SVG container is clipped.

`<svg>` is an HTML tag however the contents of the SVG is [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG). See the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/SVG) SVG documentation.

To match the size and position of the CSS circle we need to provide both a radius and define the x and y axis (as well as increase the overall size of the svg canvas):

```svg
<svg width="640" height="480" style="border: 1px solid">
    <circle cx="100" cy="100" r="100" fill="green" />
</svg>
```

## Stacking

Unlike HTML elements such as our circles, SVG elements do not follow any default layout flow. The order of the SVG elements in the code will determine the stacking order of the ultimate display.

```svg
<svg width="640" height="480" style="border: 1px solid">
    <circle cx="100" cy="100" r="100" fill="green" />
    <circle cx="100" cy="100" r="70" fill="red" />
</svg>
```

In order to match the layout of the HTML/CSS we need to explicitly define positioning:

```svg
<svg width="640" height="480" style="border: 1px solid">
    <circle cx="100" cy="100" r="100" fill="green" />
    <circle cx="270" cy="100" r="70" fill="green" />
</svg>
```

## SVG Coordinate Space

```svg
<rect
  x="0"
  y="0"
  width="200"
  height="200"
  stroke="black"
  fill="green"
  stroke-width="5"
/>
```

Note the the top left corner is the 0,0 point for the rectangle.

The top left corner of the document is the point (0,0), or point of origin. Positions are measured in pixels from the top left corner, with the positive x direction being to the right, and the positive y direction towards the bottom.

![grid](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Positions/canvas_default_grid.png)

This is different than the way you're taught to graph in math class (y axis is flipped).

![Cartesian grid](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Cartesian-coordinate-system.svg/500px-Cartesian-coordinate-system.svg.png)

It is common to surround the SVG with a `<g>` - an SVG group tag - and then move all the artwork to the center using CSS's transform property.

```svg
<svg style="border: 1px solid">
  <g style="transform: translate(50%, 50%)">
    <circle cx="0" cy="0" r="50"  />
  </g>
</svg>
```

We can now use `cx="0"` to center the circle. The positioning system becomes more intuitive and easier to work with.

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
    cx="0"
    cy="0"
    r="50"
    stroke="black"
    stroke-width="6"
    fill="green"
    ></circle>
</g>
</svg>
```

## All SVG Elements

Some additional SVG shapes:

```svg
<rect
  x="60"
  y="10"
  rx="10"
  ry="10"
  width="30"
  height="30"
  stroke="black"
  fill="transparent"
  stroke-width="5"
/>

<ellipse
  cx="75"
  cy="75"
  rx="20"
  ry="5"
  stroke="red"
  fill="transparent"
  stroke-width="5"
/>

<line
  x1="10"
  x2="50"
  y1="110"
  y2="150"
  stroke="orange"
  stroke-width="5"
/>
<polyline
  points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145"
  stroke="orange"
  fill="transparent"
  stroke-width="5"
/>

<polygon
  points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"
  stroke="green"
  fill="transparent"
  stroke-width="5"
/>

<path
  d="M20,230 Q40,205 50,230 T90,230"
  fill="none"
  stroke="blue"
  stroke-width="5"
/>
```

## Paths

A `<path>` is the most general and commonly used shape in SVG. With a path element you can draw rectangles (with or without rounded corners), circles, ellipses, polylines, and polygons. Basically any of the other types of shapes, bezier curves, quadratic curves, and many more.

While creating complex paths using a text editor is not recommended, understanding how they work is impotant and will allow you to identify and repair display issues in SVGs.

The shape of a `<path>` element is defined by one parameter: `d`.

- The "Move to" command is called with the letter M: `M 10 10` - an uppercase letter specifies absolute coordinates on the page, and a lowercase letter specifies relative coordinates
- "Line To" - L takes two parameters—x and y coordinates—and draws a line from the current position to a new position
- H draws a horizontal line, and V draws a vertical line:

```svg
<svg width="640" height="480">
  <path d="M 10 10 H 90 V 90 H 10 L 10 10" />
</svg>
```

- "Close Path" is called with Z and draws a straight line from the current position back to the first point of the path.

```svg
<path d="M 10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black"/>
```

Here's the same shape drawn using relative paths:

```svg
<path d="M 10 10 h 80 v 80 h -80 Z" fill="transparent" stroke="black"/>
```

## Curves

### Bézier Curves

Bézier Curves take in two control points for each point

![Beziers](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths/cubic_bézier_curves_with_grid.png)

```svg
  <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/>
  <path d="M 70 10 C 70 20, 110 20, 110 10" stroke="black" fill="transparent"/>
  <path d="M 130 10 C 120 20, 180 20, 170 10" stroke="black" fill="transparent"/>
  <path d="M 10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent"/>
  <path d="M 70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent"/>
  <path d="M 130 60 C 120 80, 180 80, 170 60" stroke="black" fill="transparent"/>
  <path d="M 10 110 C 20 140, 40 140, 50 110" stroke="black" fill="transparent"/>
  <path d="M 70 110 C 70 140, 110 140, 110 110" stroke="black" fill="transparent"/>
  <path d="M 130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent"/>
```

The other type of Bézier curve uses Q:

```svg
<path d="M 10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent"/>
```

### Arcs

Arcs are sections of circles or ellipses and use an `A`. They create pieces of circles or ellipses in drawings. For instance, a pie chart would require a different arc for each piece.

![arcs](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths/svgarcs_xaxisrotation_with_grid.png)

```svg
<path d="M 10 315
         L 110 215
         A 30 50 0 0 1 162.55 162.45
         L 172.55 152.45
         A 30 50 -45 0 1 215.1 109.9
         L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>
```

## Stroke

There are a few other attributes available to control the way a stroke is drawn on a line.

### Linecaps

```svg
<line x1="40" x2="120" y1="20" y2="20" stroke="black" stroke-width="20" stroke-linecap="butt"/>
<line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="20" stroke-linecap="square"/>
<line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="20" stroke-linecap="round"/>
```

### Dashes

```svg
<path d="M 10 75 Q 50 10 100 75 T 190 75" stroke="black"
  stroke-linecap="round" stroke-dasharray="5,10,5" fill="none"/>
<path d="M 10 75 L 190 75" stroke="red"
  stroke-linecap="round" stroke-width="1" stroke-dasharray="5,5" fill="none"/>
```

### Gradients and Animation

See the gradient animation file in the samples folder.

## Smile

The SVG equivalent of writing a "Hello World" application is making a smiley face emoticon.

[Figma](https://www.figma.com) is an application commonly used in web design. Create a free account and will start our face with it.

- create 960 x 500 frame (featureless)
- create face and eye shapes
- export as SVG
- place in an HTML document and correct the values:

```
<svg width="960" height="500">
  <circle
    cx="209"
    cy="209"
    r="200"
    fill="#FFE600"
    stroke="black"
    stroke-width="18"
  />
  <circle cx="136" cy="136" r="32" fill="#black" />
  <circle cx="264" cy="136" r="32" fill="#black" />
</svg>
```

Formulas?

```html
<div id="root"></div>
```

```css
body {
  margin: 0;
}
svg {
  border: 2px solid gray;
}
```

```js
const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const mySVG = `<svg width=${width} height=${height}>
  <g transform=${`translate(${centerX},${centerY})`}>
    <circle cx="0" cy="0" r="4" />
    <line x1="-480" x2="480" y1="0" y2="0" stroke="black" stroke-width="2" />
    <line x1="0" x2="" y1="-250" y2="250" stroke="black" stroke-width="2" />
  </g>
</svg>`;

const rootElement = document.getElementById("root");
rootElement.innerHTML = mySVG;
```

Change the SVG size and retrofit the values for the lines to make them dynamic:

```js
const width = 1000;
const height = 800;
const centerX = width / 2;
const centerY = height / 2;

const mySVG = `<svg width=${width} height=${height}>
  <g transform=${`translate(${centerX},${centerY})`}>
    <circle cx="0" cy="0" r="4" />
    <line x1=${-centerX} x2=${centerX} y1="0" y2="0" stroke="black" stroke-width="2" />
    <line x1="0" x2="" y1=${-centerY} y2=${centerY} stroke="black" stroke-width="2" />
  </g>
</svg>`;

const rootElement = document.getElementById("root");
rootElement.innerHTML = mySVG;
```

Reset the width and height values and add the face in a new group

<!-- https://www.youtube.com/watch?v=QT5ef8dUyoo -->

```js
const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 20;
const eyeOffsetX = 90;
const eyeOffsetY = 70;
const eyeRadius = 30;

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
    </g>

    <g transform=${`translate(${centerX},${centerY})`} stroke="black" stoke-width="2">
      <circle cx="0" cy="0" r="4" />
      <line x1=${-centerX} x2=${centerX} y1="0" y2="0" />
      <line x1="0" x2="0" y1=${-centerY} y2=${centerY} />
    </g>

  </svg>`;

const rootElement = document.getElementById("root");
rootElement.innerHTML = mySVG;
```

## D3

Create a smile shape in Figma, export it as SVG and add it to the face. e.g.:

`<path d="M6 2C10 23 35 66 103 66C171 66 192 23 194 2" stroke="black" stroke-width="12" fill="none" />`

This will not work. The coordinates are wrong. We need this instead:

`<path d="M 117,23 A 120, 120, 0, 0, 1, -117, 23 L -98, 19 A100, 100, 0, 0, 0, 98, 19 Z"></path>`

But the above is extremely difficult to write.

Enter [D3]()

<!-- https://datavis.tech/datavis-2020-episode-7-lets-make-a-face-part-iii-with-react-d3/ -->

Import the D3 global object:

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

https://github.com/d3/d3/blob/main/API.md

An [article](https://medium.com/@mbostock/introducing-d3-shape-73f8367e6d12) from 2015 introducing d3 shape.

https://github.com/d3/d3-shape/blob/v3.1.0/README.md#arc

https://en.wikipedia.org/wiki/Pi
pi - ratio of a circle's circumference to its diameter.

The circumference of a circle is slightly more than three times as long as its diameter. The exact ratio is called π.

![pi](https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Pi_eq_C_over_d.svg/440px-Pi_eq_C_over_d.svg.png)

```js
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

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", width);
svg.setAttribute("height", height);

const mySVG = `
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
  `;
svg.innerHTML = mySVG;
document.body.appendChild(svg);
```

SVG is a domain specific language so we use `document.createElementNS` instead of `document.createElement` JavaScript.

## Notes

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

https://www.youtube.com/watch?v=-RQWC4I2I1s
