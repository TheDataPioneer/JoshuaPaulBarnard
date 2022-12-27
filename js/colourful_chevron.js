/*
  Johan Karlsson, 2020
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View

  Inspired by:
  http://thepatternlibrary.com/#leather-nunchuck
  by https://twitter.com/claudioguglieri
*/
let draw_pattern;
let pattern_contents;
let pattern_width;
let pattern_height;
let colours;

function setup()
{
  draw_pattern = document.querySelector("#canvas");
  pattern_contents = draw_pattern.getContext("2d");
  reset();
  window.addEventListener("resize", () => {
    reset();
    draw();
  });
  setupColours();
}

function reset()
{
  pattern_width = draw_pattern.width = window.innerWidth;
  pattern_height = draw_pattern.height = window.innerHeight;
  pattern_contents.shadowColor = "black";
  pattern_contents.shadowBlur = 30;
  pattern_contents.shadowOffsetX = 3;
  pattern_contents.shadowOffsetY = 5;
}

function setupColours()
{
  // colours from:
  // https://coolors.co/26547c-ef476f-ffd166-06d6a0-fcfcfc
  colours = [
  "#26547c",
  "#ef476f",
  "#ffd166",
  "#06d6a0",
  "#fcfcfc"];

}

function draw()
{
  pattern_contents.fillRect(0, 0, pattern_width, pattern_height);
  pattern_contents.lineWidth = 40;
  let xStep = 120;
  let nrOfSteps = Math.ceil(pattern_width / xStep) + 2;
  let yStep = 50;
  let nrOfStepsY = Math.ceil(pattern_height / yStep) + 1;
  for (let y = nrOfStepsY + 5; y > -5; y -= 1) {
    pattern_contents.beginPath();
    pattern_contents.strokeStyle = colours[Math.abs(y) % 5];
    for (let x = -1; x < nrOfSteps; x += 1) {
      let y1 = Math.abs(x) % 2 * xStep;
      pattern_contents.lineTo(x * xStep, y * yStep + y1);
    }
    pattern_contents.stroke();
  }
  let counter = 0;
  for (let x = 0; x < pattern_width; x += xStep / 4) {
    let image = pattern_contents.getImageData(x, 0, xStep / 4, pattern_height);
    let a = counter % 8;
    let b = 7 - counter % 8;
    let yOffset = (-Math.min(a, b) - 1) * yStep;
    pattern_contents.putImageData(image, x, yOffset);
    counter++;
  }
  let image = pattern_contents.getImageData(0, 0, pattern_width, yStep * 10);
  pattern_contents.putImageData(image, 0, yStep * 5);
}

setup();
draw();
