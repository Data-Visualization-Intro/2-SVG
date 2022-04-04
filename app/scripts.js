const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 20;
const eyeOffsetX = 90;
const eyeOffsetY = 70;
const eyeRadius = 30;

const mouthArc = d3
  .arc()
  .innerRadius(120)
  .outerRadius(150)
  .startAngle(Math.PI / 2)
  .endAngle((Math.PI * 3) / 2);

const mySVG = `<svg width=${width} height=${height}>

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
          <text x="0" y="0" class="small">0,0</text>
          <text x="200" y="-200" class="small">x:200, y:-200</text>
          <text x="200" y="200" class="small">x:200, y:200</text>
          <text x="-200" y="200" class="small">x:-200, y:200</text>
          <text x="0" y="120" class="small">foo</text>
          <line x1=${-centerX} x2=${centerX} y1="0" y2="0" stroke="black" stroke-width="2" />
          <line x1="0" x2="" y1=${-centerY} y2=${centerY} stroke="black" stroke-width="2" />
        </g>
        </svg>`;

const rootElement = document.getElementById("root");
rootElement.innerHTML = mySVG;
