# SVG and D3

Today we will be building two pages with SVG:

- a [smiley face emoji](https://dataviz-exercises.netlify.app/emoji/index.html)
- a [hexadecimal color browser](https://dataviz-exercises.netlify.app/css-colors/index.html)

We will continue to work with JavaScript - adding some additional methods to our toolbelt (querySelectorAll, data attributes, spread operators) - and will have a brief introduction to a [D3](https://d3js.org) method.

## SVG

Scalable Vector Graphics (SVG) is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation. - [Wikipedia](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics).

SVG is to images what illustration is to photography.

For all but the simplest illustrations you typically do not code SVG by hand. However it is very important to understand the format as it is central to data visualization.

SVG is widely used in web development as an image format.

For an exhaustive set of articles about using SVG in development see [CSS Tricks](https://css-tricks.com/tag/svg/).

See the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/SVG) for full SVG documentation.

1. as the `src` for an image tag

Scaffold a new `index.html` HTML file with Emmet in the `app` folder and add the following to the body:

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

The icons here were created and exported from Adobe Illustrator. (The file, `icons.ai`, is available in the `samples/illustrations` directory. The exported icons are in `samples/illustrations/exports/SVG`.)

2. in CSS

```html
<style>
  .icn {
    width: 72px;
    height: 72px;
    background-repeat: no-repeat;
    margin: 1rem;
  }
  .pizza {
    background-image: url("../samples/illustrations/exports/SVG/pizza.svg");
  }
  .rat {
    background-image: url("../samples/illustrations/exports/SVG/rat.svg");
  }
  .trashcan {
    background-image: url("../samples/illustrations/exports/SVG/trashcan.svg");
  }
</style>

<div class="icn pizza"></div>
<div class="icn rat"></div>
<div class="icn trashcan"></div>
```

3. You can even use them as favicons

```html
<link
  rel="icon"
  href="../samples/illustrations/exports/SVG/pizza.svg"
  type="image/svg+xml"
/>
```

4. or [loaders](https://loaders.holasvg.com) with [animation](https://www.svgator.com).

## SVG Shapes

We discussed HTML and CSS for data visualization.

```html
<style>
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
</style>

<div style="display: flex; align-items: center">
  <div class="circle circleOne"></div>
  <div class="circle circleTwo"></div>
</div>
```

We will duplicate the above with SVG.

We've already looked at one simple SVG element.

```svg
<svg>
  <circle r="100" fill="green" />
</svg>
```

Note the default size of the SVG element in the HTML document - 300px x 150px.

The center point of the circle is located at the upper left hand corner of the `svg` element. Anything falling outside the SVG container is clipped.

To create a 200px x 200px circle we define a radius of 100.

`<svg>` is an HTML tag however the contents of the SVG tag is [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) - a domain specific language.

To match the size and position of the first CSS circle we need to provide both a radius and define the x and y axis (as well as increase the overall size of the svg canvas):

```svg
<svg width="640" height="480" style="border: 1px solid">
    <circle cx="100" cy="100" r="100" fill="green" />
</svg>
```

## Stacking

Unlike HTML elements such as our circles, SVG elements do not follow any default layout flow. The order of the SVG elements in the code determines the stacking order of the ultimate display.

```svg
<svg width="640" height="220" style="border: 1px solid">
    <circle cx="100" cy="100" r="100" fill="green" />
    <circle cx="100" cy="100" r="70" fill="red" />
</svg>
```

In order to match the layout of the HTML/CSS circles we need to explicitly define x and y positioning for each circle:

```svg
<svg width="640" height="220" style="border: 1px solid">
    <circle cx="100" cy="100" r="100" fill="green" />
    <circle cx="270" cy="100" r="70" fill="green" />
</svg>
```

## SVG Coordinate Space

Add a new shape:

```svg
<rect
  x="0"
  y="0"
  width="200"
  height="200"
  stroke="black"
  fill="green"
  stroke-width="12"
/>
```

Again, the the top left corner is the 0,0 point.

Note how the 12px stroke is partially cut off on the top left.

Positions are measured in pixels from the top left corner, with the positive x direction being to the right, and the positive y direction towards the bottom.

![grid](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Positions/canvas_default_grid.png)

This is different than the way you're taught to graph in math class (in SVG the y axis is flipped).

<img style="background-color: white; width: 220px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Cartesian-coordinate-system.svg/500px-Cartesian-coordinate-system.svg.png" />

It is common to surround the SVG with a `<g>` - an SVG group tag - and then move all the artwork to the center using CSS's transform property.

Remove the CSS shapes and add:

```svg
<svg style="border: 1px solid">
  <g style="transform: translate(50%, 50%)">
    <circle cx="0" cy="0" r="50"  />
  </g>
</svg>
```

We can now use `cx="0"` to center the circle. The positioning system becomes more intuitive and easier to work with.

<!-- For example:

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
     <rect x="0" y="0" width="200" height="150" fill="steelblue" />
     <ellipse
       cx="0"
       cy="0"
       rx="120"
       ry="85"
       stroke="steelblue"
       fill="aliceblue"
       stroke-width="5"
     />
   </g>
</svg>
``` -->

The CSS [transform property](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) is important as it is animatable and allows us to work in 3D, rotate elements and much more.

<!-- Try:

`transform: translate(50%, 50%) rotate(60deg) skew(30deg, 20deg);` -->

## Additional SVG Elements and Properties

Some additional SVG shapes:

```svg
    <svg width="640" height="480">
      <rect
        x="60"
        y="10"
        rx="10"
        ry="10"
        width="200"
        height="300"
        stroke="black"
        fill="steelblue"
        stroke-width="3"
      />
    </svg>

    <svg width="640" height="480">
      <ellipse
        cx="150"
        cy="150"
        rx="120"
        ry="85"
        stroke="black"
        fill="steelblue"
        stroke-width="12"
      />
    </svg>

    <svg width="640" height="480">
      <line
        x1="10"
        x2="250"
        y1="110"
        y2="350"
        stroke="orange"
        stroke-width="5"
      />
    </svg>

    <svg width="640" height="480">
      <polyline
        points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145"
        stroke="orange"
        fill="transparent"
        stroke-width="3"
      />
    </svg>

    <svg width="640" height="480">
      <polygon
        points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"
        stroke="green"
        fill="transparent"
        stroke-width="3"
      />
    </svg>

    <svg width="640" height="480">
      <path
        d="M20,230 Q40,205 50,230 T90,230"
        fill="none"
        stroke="blue"
        stroke-width="5"
      />
    </svg>
```

## Paths

A `<path>` is the most general and most commonly used shape in SVG.

Path elements can draw rectangles, round corners, circles, ellipses, polylines, and polygons - any of the other shapes. For that reason people who implement and work with SVG tend to focus on them.

While creating complex paths using a text editor is definitely not recommended, understanding how they work is important and will allow you to identify and repair display issues in SVGs.

The shape of a `<path>` element is defined by one parameter: `d` along with multiple "commands."

```svg
<svg width="640" height="480">
  <path d="M 10 10 H 90 V 90 H 10 L 10 10" />
</svg>
```

- The "Move to" command is called with the letter M: `M 10 10`
- "Line To" - `L` - takes two parameters — x and y coordinates — and draws a line from the current position to a new position
- `H` draws a horizontal line, and `V` draws a vertical line:
- "Close Path" is called with `Z` and draws a straight line from the current position back to the first point of the path

```svg
<path d="M 10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black"/>
```

An uppercase letter specifies absolute coordinates and a lowercase letter specifies relative coordinates.

Here's the same shape drawn using relative paths, note the numeric differences:

```svg
<path d="M 10 10 h 80 v 80 h -80 Z" fill="transparent" stroke="black"/>
```

## Curves

### Bézier Curves

Bézier Curves have two control - `C` - points for each point

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

The other type of Bézier curve uses `Q`:

```svg
<path d="M 10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent"/>
```

### Arcs

Arcs are sections of circles or ellipses and use an `A`. They create pieces of circles or ellipses in drawings. For instance, a pie chart requires a different arc for each piece.

![arcs](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths/svgarcs_xaxisrotation_with_grid.png)

```svg
<path d="M 10 315
         L 110 215
         A 30 50 0 0 1 162.55 162.45
         L 172.55 152.45
         A 30 50 -45 0 1 215.1 109.9
         L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>
```

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

Examine the gradient-animation directory in the samples folder.

## Smile

The SVG equivalent of writing a "Hello World" application is making a smiley face emoticon.

[Figma](https://www.figma.com) is an application commonly used in web design. Create a free account and we will start our face with it.

- create 960 x 500 frame (featureless)
- create face and eye shapes and position them
- export the frame as SVG
- place in an HTML document:

```svg
<svg
  width="960"
  height="500"
  viewBox="0 0 960 500"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle
    cx="480"
    cy="250"
    r="240"
    fill="#FAFF06"
    stroke="black"
    stroke-width="20"
  />
  <circle cx="405" cy="176" r="30" fill="black" />
  <circle cx="562" cy="176" r="30" fill="black" />
</svg>
```

Comment the above out but leave it in the HTML for reference.

## A Simple Grid

Ideally we would like to use variables for the widths and heights to facilitate the creation of the artwork.

Let's set up a simple grid first.

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

const rootElement = document.querySelector("#root");
rootElement.innerHTML = mySVG;
```

Change the SVG size to 1000 x 800 and retrofit the values for the lines to make them dynamic:

```js
const width = 1000;
const height = 800;
const centerX = width / 2;
const centerY = height / 2;

const mySVG = `<svg width=${width} height=${height}>
  <g transform=${`translate(${centerX},${centerY})`}>
    <circle cx="0" cy="0" r="4" />
    <line x1=${-centerX} x2=${centerX} y1="0" y2="0" stroke="black" stroke-width="2" />
    <line x1="0" x2="0" y1=${-centerY} y2=${centerY} stroke="black" stroke-width="2" />
    <text x="0" y="0"> 0,0 point</text>
  </g>
</svg>`;

const rootElement = document.getElementById("root");
rootElement.innerHTML = mySVG;
```

Add a text object and element to the grid:

```js
const text = {
  x: 200,
  y: 200,
};
```

```svg
<text x=${text.x} y=${text.y}> .${text.x},${text.y} point</text>
```

Reset the width and height values and add the face in a new group:

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

Enter [D3](https://d3js.org).

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

And use the browser's console to log out the D3 object.

D3 is a huge collection of functionality that we will use to _efficiently_ create data visualizations.

One place to access documentation is on the project's [Github page](https://github.com/d3/d3/blob/main/API.md).

See `samples/d3/index.html` for a glimpse of D3 in action.

In our case we will to create a portion of a circle in order to create the smile. Since handcoding an arc is diffiult, let's use D3's [arc method](https://github.com/d3/d3-shape/blob/v3.1.0/README.md#arc)

<!-- (Here's an [article](https://medium.com/@mbostock/introducing-d3-shape-73f8367e6d12) from 2015 introducing d3 shape.) -->

Note that D3 arc uses [pi](https://en.wikipedia.org/wiki/Pi) - the ratio of a circle's circumference to its diameter.

The circumference of a circle with the radius r is `2πr`.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Pi_eq_C_over_d.svg/440px-Pi_eq_C_over_d.svg.png" style="background-color: white; width: 220px;" />

To create an arc we use the D3 method and call it for the path's `d` parameter.

```js
const mouthArc = d3
  .arc()
  .innerRadius(100)
  .outerRadius(120)
  .startAngle(Math.PI / 2)
  .endAngle((Math.PI * 3) / 2);

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
```

Use formulae to calculate the radius.

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

## Creating SVG Elements

SVG is a domain specific language so we use `document.createElementNS` instead of `document.createElement` JavaScript.

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
document.querySelector("#root").appendChild(svg);
```

## Exercise 2: Color Wheel

### 1. Data Aquisition and Cleaning

Extract the color names and hexidecimal codes from [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color_keywords).

```js
var keywords = document.querySelectorAll('[style="text-align: center"] code');
keywords[0];
keywords[0].innerText;
let keyArr = Array.from(keywords);
// let keyArr = [...keywords];
```

Now that we have an Array we use `Array.map()` to create a new Array with the variable name `colors` containing all the color names:

`let colors = keyArr.map((key) => key.innerText);`

Right click and copy and paste the array into a new blank VS Code document.

Do something similar for the hex codes:

```js
var hexi = document.querySelectorAll('[style="text-align: center"] + td code');
hexi[0];
let hexArr = [...hexi];
let hexes = hexArr.map((key) => key.innerText);
```

Note that the colors array is 2 entries longer than the hex array.

Examine the web page for clues and remove the duplicates in the colors array.

Create `data.js` with `colorNames` and `hexCodes` arrays (see for example `/samples/color-codes/data.js`).

Note: an alternative format for saving this data might be [CSV](https://gist.github.com/DannyBoyNYC/87b5bf8d1fbfe33347b38133578ee4f2) (comma separated values).

### 2. Formatting the Data

Create an new HTML file in `app` called `colors.html` with the following HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hex Color Wheel</title>
    <style></style>
  </head>
  <body>
    <div id="root"></div>

    <div class="info">
      <h3>Select a color</h3>
    </div>

    <script src="https://unpkg.com/d3@7.3.0/dist/d3.min.js"></script>
    <script src="../samples/color-codes/data.js"></script>
    <script></script>
  </body>
</html>
```

Add CSS:

```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
g {
  transform: translate(50%, 50%);
}
.info {
  position: absolute;
  top: 16px;
  left: 16px;
  min-width: 200px;
  min-height: 150px;
  border: 1px solid #333;
}
.colorChip {
  width: 80px;
  height: 60px;
  border: 1px solid #333;
}
```

Begin the script block with:

```js
let colorApp = "";

for (let i = 0; i < colorNames.length; i++) {
  colorApp += `<div style="background-color: ${hexCodes[i]}">${colorNames[i]}</div>`;
}
console.log(colorApp);
document.getElementById("root").innerHTML = colorApp;
```

### 3. Scripting the UI

Let's turn this into a pie chart using D3 arcs.

```js
const width = 960;
const height = 960;

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", width);
svg.setAttribute("height", height);

const pieArc = d3
  .arc()
  .innerRadius(0)
  .outerRadius(360)
  .startAngle(Math.PI / 2)
  .endAngle((Math.PI * 3) / 2);

let colorApp = "";

for (let i = 0; i < colorNames.length; i++) {
  colorApp += `<path fill=${hexCodes[i]} d=${pieArc()} />`;
}

svg.innerHTML = colorApp;
console.log(svg);

document.getElementById("root").innerHTML = colorApp;
```

Add a group (`<g>`) to center the paths:

```js
const width = 960;
const height = 960;

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", width);
svg.setAttribute("height", height);

// New
const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
svg.appendChild(group);

const pieArc = d3.arc().innerRadius(0).outerRadius(360);

let colorApp = "";

for (let i = 0; i < colorNames.length; i++) {
  colorApp += `<path fill=${hexCodes[i]} d=${pieArc({
    startAngle: i / colorNames.length,
    endAngle: Math.PI / 2,
  })} />`;
}

// New
group.innerHTML = colorApp;

document.getElementById("root").append(svg);
```

Set the start angle and end angle in the for loop (see d3 [arc method](https://github.com/d3/d3-shape/blob/v3.1.0/README.md#arc) ):

```js
for (let i = 0; i < colorNames.length; i++) {
  colorApp += `<path fill=${hexCodes[i]} d=${pieArc({
    startAngle: (i / colorNames.length) * 2 * Math.PI,
    endAngle: ((i + 1) / colorNames.length) * 2 * Math.PI,
  })} />`;
}
```

### 4. Add an Event Listener

Add a data attribute to the paths:

```js
for (let i = 0; i < colorNames.length; i++) {
  colorApp += `<path data-idx=${i} fill=${hexCodes[i]} d=${pieArc({
    startAngle: (i / colorNames.length) * 2 * Math.PI,
    endAngle: ((i + 1) / colorNames.length) * 2 * Math.PI,
  })} />`;
}
```

Add the event listener and the callback function:

```js
document.addEventListener("click", showColor);

function showColor(event) {
  if (!event.target.dataset.idx) return;
  let colorId = event.target.dataset.idx;
  let infoContent = `
    <h3>Color name: ${colorNames[colorId]}<h3>
    <h3>Color hex code: ${hexCodes[colorId]}<h3>
    <div class="colorChip" style="background-color: ${hexCodes[colorId]}"></div>`;
  document.querySelector(".info").innerHTML = infoContent;
}
```

## Homework

1. Customize your emoji to give it personality
2. Use Figma to sketch out a better visualization for the color wheel
