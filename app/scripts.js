const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 20;
const eyeRadius = 30;
const eyeOffsetX = 90;
const eyeOffsetY = 70;
const mouthWidth = 100;
const mouthRadius = 20;

const text = {
  x: -200,
  y: 200,
};

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
          cx="0"
          cy="0"
          r=${centerY - strokeWidth / 2}
          fill="#FFE600"
          stroke="black"
          stroke-width=${strokeWidth}
          />
          <circle cx=${-eyeOffsetX} cy=${-eyeOffsetY} r=${eyeRadius} />
          <circle cx=${eyeOffsetX} cy=${-eyeOffsetY} r=${eyeRadius} />
          <path d=${mouthArc()} />
      </g>

      <g transform=${`translate(${centerX},${centerY})`}>
          <circle cx="0" cy="0" r="4" />
          <line x1=${-centerX} x2=${centerX} y1="0" y2="0" stroke="black" stroke-width="2" />
          <line x1="0" x2="0" y1=${-centerY} y2=${centerY} stroke="black" stroke-width="2" />
          <text x=${text.x} y=${text.y}> .${text.x},${text.y} point</text>
      </g>

`;

svg.innerHTML = mySVG;
document.getElementById("root").appendChild(svg);
