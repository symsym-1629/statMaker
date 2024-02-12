var img = document.getElementById("stats");
var img2 = document.getElementById("coin");
var img3 = document.getElementById("stats_noring");

/*		  			S			A			B		C		D			E		NONE
            Power: 		149,70 | 149,82 | 149,97 | 149,110 | 149,124 | 149,138 | 149,149
            Speed:		220,111| 209,117| 197,124| 186,131 | 173,138 | 161,145 | 149,149
            Range:		220,191| 209,187| 197,179| 186,172 | 173,166 | 161,159 | 149,149
            Durability:	149,232 | 149,220 | 149,192 | 149,179 | 149,138 | 149,166 | 149,149
            Precision:	 79,191 |  89,187 | 100,179 | 114,172 | 126,166 | 137,159 | 149,149
            Potential:	 79,111 |  89,117 | 100,124 | 114,131 | 126,138 | 137,145 | 149,149
        */

var PowerX = [149, 149, 149, 149, 149, 149, 149];
var PowerY = [149, 138, 124, 110, 95, 82, 70];

var SpeedX = [149, 161, 173, 186, 197, 209, 220];
var SpeedY = [149, 145, 138, 131, 124, 117, 111];

var RangeX = [149, 161, 173, 186, 197, 209, 220];
var RangeY = [149, 159, 166, 172, 179, 187, 191];

var DurabilityX = [149, 149, 149, 149, 149, 149, 149];
var DurabilityY = [149, 166, 179, 192, 207, 220, 232];

var PrecisionX = [149, 137, 126, 114, 100, 89, 79];
var PrecisionY = [149, 159, 166, 172, 179, 187, 191];

var PotentialX = [149, 137, 126, 114, 100, 89, 79];
var PotentialY = [149, 145, 138, 131, 124, 117, 111];

var ranks = ["NONE", "E", "D", "C", "B", "A", "∞"];

var PowerTextPos = [140, 60];
var SpeedTextPos = [224, 105];
var RangeTextPos = [224, 210];
var DurabilityTextPos = [140, 255];
var PrecisionTextPos = [57, 210];
var PotentialTextPos = [57, 105];

var NONE_MODIFIERS = [-5, -8, -10, -10, -10, -10];
var modifier = 0;

window.onload = function () {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");

  drawStats();
};

function redrawGraph(ctx, canvas) {
  ctx.globalAlpha = 1.0;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  /* if (document.getElementById("part5_coin").checked)
            {
                ctx.drawImage(img3,0,0, canvas.width, canvas.height);
            }
            else
            {
            } */
}

function drawCoin(ctx, canvas) {	
    ctx.globalAlpha = 1.0
    ctx.drawImage(img2,0,3, canvas.width, canvas.height);
}

function drawPolygon(
  ctx,
  power,
  speed,
  range,
  durability,
  precision,
  potential
) {
  ctx.globalAlpha = 0.5
  ctx.fillStyle = document.getElementById("colour_radar").value;
  ctx.beginPath();
  ctx.moveTo(PowerX[power], PowerY[power]);
  ctx.lineTo(SpeedX[speed], SpeedY[speed]);
  ctx.lineTo(RangeX[range], RangeY[range]);
  ctx.lineTo(DurabilityX[durability], DurabilityY[durability]);
  ctx.lineTo(PrecisionX[precision], PrecisionY[precision]);
  ctx.lineTo(PotentialX[potential], PotentialY[potential]);
  ctx.closePath();
  ctx.fill();
}

function getSText() {
  if (document.getElementById("sToQuestionmark").checked) {
    return "?";
  } else {
    return "S";
  }
}

function writeText(ctx, power, speed, range, durability, precision, potential) {
  ctx.globalAlpha = 1.0;
  ctx.font = "bold 24px Arial";
  ctx.fillStyle = "#000";

  var powerText = ranks[power];
  var speedText = ranks[speed];
  var rangeText = ranks[range];
  var durabilityText = ranks[durability];
  var precisionText = ranks[precision];
  var potentialText = ranks[potential];

  if (document.getElementById("s_power").checked) {
    powerText = getSText();
  }
  if (document.getElementById("s_speed").checked) {
    speedText = getSText();
  }
  if (document.getElementById("s_range").checked) {
    rangeText = getSText();
  }
  if (document.getElementById("s_durability").checked) {
    durabilityText = getSText();
  }
  if (document.getElementById("s_precision").checked) {
    precisionText = getSText();
  }
  if (document.getElementById("s_potential").checked) {
    potentialText = getSText();
  }

  regenerateModifier(
    power == 0 && !document.getElementById("s_power").checked,
    0
  );
  ctx.fillText(powerText, PowerTextPos[0] + modifier, PowerTextPos[1]);

  regenerateModifier(
    speed == 0 && !document.getElementById("s_speed").checked,
    1
  );
  ctx.fillText(speedText, SpeedTextPos[0] + modifier, SpeedTextPos[1]);

  regenerateModifier(
    range == 0 && !document.getElementById("s_range").checked,
    2
  );
  ctx.fillText(rangeText, RangeTextPos[0] + modifier, RangeTextPos[1]);

  regenerateModifier(
    durability == 0 && !document.getElementById("s_durability").checked,
    3
  );
  ctx.fillText(
    durabilityText,
    DurabilityTextPos[0] + modifier,
    DurabilityTextPos[1]
  );

  regenerateModifier(
    precision == 0 && !document.getElementById("s_precision").checked,
    4
  );
  ctx.fillText(
    precisionText,
    PrecisionTextPos[0] + modifier,
    PrecisionTextPos[1]
  );

  regenerateModifier(
    potential == 0 && !document.getElementById("s_potential").checked,
    5
  );
  ctx.fillText(
    potentialText,
    PotentialTextPos[0] + modifier,
    PotentialTextPos[1]
  );
}

function drawStats() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Get all the values
  var powerSlider = document.getElementById("slider_power");
  var power = powerSlider.value;

  var speedSlider = document.getElementById("slider_speed");
  var speed = speedSlider.value;

  var rangeSlider = document.getElementById("slider_range");
  var range = rangeSlider.value;

  var durabilitySlider = document.getElementById("slider_durability");
  var durability = durabilitySlider.value;

  var precisionSlider = document.getElementById("slider_precision");
  var precision = precisionSlider.value;

  var potentialSlider = document.getElementById("slider_potential");
  var potential = potentialSlider.value;

  drawCoin(ctx,canvas);
  drawPolygon(ctx, power, speed, range, durability, precision, potential);
  redrawGraph(ctx, canvas);
  writeText(ctx, power, speed, range, durability, precision, potential);
  /* 
            if (document.getElementById("transparent_colour").checked)
            {
                drawCoin(ctx,canvas);
                redrawGraph(ctx,canvas);
                drawPolygon(ctx,power,speed,range,durability,precision,potential);
                writeText(ctx,power,speed,range,durability,precision,potential);
            }
            else
            {
                drawCoin(ctx,canvas);
                drawPolygon(ctx,power,speed,range,durability,precision,potential);
                redrawGraph(ctx,canvas);
                writeText(ctx,power,speed,range,durability,precision,potential);
            } */
}

function randomize(randomizeFully) {
  var min = 0;
  var max = 7;

  if (randomizeFully == 0) {
    min++;
    max -= 2;
  }

  document.getElementById("s_power").checked = false;
  document.getElementById("s_speed").checked = false;
  document.getElementById("s_range").checked = false;
  document.getElementById("s_durability").checked = false;
  document.getElementById("s_precision").checked = false;
  document.getElementById("s_potential").checked = false;

  if (randomizeFully == 1) {
    if (Math.floor(Math.random() * 2) == 0) {
      document.getElementById("s_power").checked = true;
    }
    if (Math.floor(Math.random() * 2) == 0) {
      document.getElementById("s_speed").checked = true;
    }
    if (Math.floor(Math.random() * 2) == 0) {
      document.getElementById("s_range").checked = true;
    }
    if (Math.floor(Math.random() * 2) == 0) {
      document.getElementById("s_durability").checked = true;
    }
    if (Math.floor(Math.random() * 2) == 0) {
      document.getElementById("s_precision").checked = true;
    }
    if (Math.floor(Math.random() * 2) == 0) {
      document.getElementById("s_potential").checked = true;
    }
  }

  var powerSlider = document.getElementById("slider_power");
  powerSlider.value = Math.floor(Math.random() * max + min);

  var speedSlider = document.getElementById("slider_speed");
  speedSlider.value = Math.floor(Math.random() * max + min);

  var rangeSlider = document.getElementById("slider_range");
  rangeSlider.value = Math.floor(Math.random() * max + min);

  var durabilitySlider = document.getElementById("slider_durability");
  durabilitySlider.value = Math.floor(Math.random() * max + min);

  var precisionSlider = document.getElementById("slider_precision");
  precisionSlider.value = Math.floor(Math.random() * max + min);

  var potentialSlider = document.getElementById("slider_potential");
  potentialSlider.value = Math.floor(Math.random() * max + min);

  drawStats();
}

function regenerateModifier(smallText, index) {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  modifier = 0;
  ctx.font = "bold 24px Arial";
  if (smallText) {
    ctx.font = "bold 12px Arial";
    modifier = NONE_MODIFIERS[index];
  }
}

function downloadCanvas(canvasId, filename) {
  var canvas = document.getElementById(canvasId);
  var tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  var tempCtx = tempCanvas.getContext("2d");
  tempCtx.fillStyle = "#fff";
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
  tempCtx.drawImage(canvas, 0, 0);
  var image = tempCanvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  var link = document.createElement("a");
  link.download = filename;
  link.href = image;
  link.click();
}

var totalPoints = 14;

function updatePoints() {
  var sliders = document.querySelectorAll('.stat-sliders input[type="range"]');
  var totalUsedPoints = 0;
  var button = document.getElementById("imgDownloader");

  sliders.forEach(function (slider) {
    totalUsedPoints += parseInt(slider.value);
  });

  var remainingPoints = totalPoints - totalUsedPoints + 6;
  document.getElementById("pointsDisplay").innerHTML =
    "<h2>Points à attribuer: " + remainingPoints + "</h2>";

  drawStats();

  if (remainingPoints < 0) {
    button.disabled = true;
    console.log("The button should be blocked");
  } else {
    button.disabled = false;
  }
}

function changeMode(mode) {
	switch (mode) {
    	case "Stand normal":
			totalPoints = 14;
			break;
    	case "Act 1":
			totalPoints = 9;
			break;
    	case "Act 2":
			totalPoints = 12;
			break;
    	case "Act 3":
			totalPoints = 16;
			break;
    	case "Act 4":
    	case "Requiem":
    	case "Over Heaven":
			totalPoints = 22;
			break;
    	default:
			console.error("Invalid mode:", mode);
			return;
	}	
	updatePoints();
}
