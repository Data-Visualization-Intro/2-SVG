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

const svg = document.createElement("svg");
svg.setAttribute("width", width);
svg.setAttribute("height", height);

const mySVG = `
<svg width=${width} height=${height}>
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
    </svg>
  `;
svg.innerHTML = mySVG;
document.getElementById("root").append(svg);

// const rootElement = document.getElementById("root");
// rootElement.innerHTML = mySVG;
