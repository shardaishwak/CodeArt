import './style.css'
import P5 from 'p5';

// Introduction to the concept


// EXAMPLE 1
// Given 2 points P1 P2, only one line passes between that points L(P1, P2). Now suppose you are given a point Q lying
// on the line R you just found and that I moves from P1 to P2 in time T.
// This is called linear bezier curve
// The derivative function is of I degree


// EXAMPLE 2
// Now suppose that you are given 3 points P1 P2 P3. Take line R1(P1, P2) and R2(P2, P3). Take two points Q1 and 
// Q2 on the line R1 and R2. Those line cover the whole distance in time T, regardless of the variation is distance
// Now take the line passing for Q1 Q2: R3 (Q1, Q2) and a last point on this line in time T.

// What you are given is a quadratic curve, that is, an curve rappresented by an equation of II degree.

// CONCLUSION
// After some considerations of various points, we can figure out that for N points given, the curve is defined
// by a curve with an equation of N-1 degree. 

// For futher understanding, watch Primitive Code Below (After Sketch function)

// FURTHER CONSIDERATIONS
// Moreover, to find the equation of this curve, we can subsitute the various variables and simplity the equation

// To find the coordinates of a point in relationship to time. We know that in time T, the point has to move 
// from a coordinate x to x'
// Therefore, in time t = 0, we have ran 0. In time = 1/2 max_time, we have ran half the distance
// (x-xo) = distance between given coordinates and xo is initial coorinate
// P(x, y, t) = (x-xo)*t + xo where 0 <= t <= 1
// Infact the time is like the percentafe, where t = 0.2 = 20% of total distance
const P = (p1: number, p2: number, t: number) => {
  return (p2 - p1)*t + p1;
}


// Given 4 points P1 P2 P3 P4

// BEGIN

// Design the lines for the these points (3 in total)
// Denote Q1 Q2 Q3 points on the lines in respect to time

// Design lines for these points (2 in total)
// Denote R1 R2 points lying on these lines in respect to time

// Design line that passes for these points (1 in total)
// Denote S1 point lying on the line in respect to time

// END

const Draw = (p5: P5, points: Array<Array<number>>, time: number) => {
  // Stop when there is only one point, that is the last derivative point
  if (points.length === 1) {
    // Add point to array for creating the curve
    curvePoints.push(points[0]);
    // Draw points
    p5.ellipse(points[0][0], points[0][1], 10, 10);
    return;
  }
  else {
    let derivative_points: Array<Array<number>> = [];
    
    for (let p = 1; p < points.length; p++) {
      // For each point, find the derivative point
      const x = P(points[p-1][0], points[p][0], time);
      const y = P(points[p-1][1], points[p][1], time);
      // Add the derivative point to array for next call
      derivative_points.push([x, y]);

      // Draw normal line for given points
      p5.line(points[p-1][0], points[p-1][1], points[p][0], points[p][1]);
      // Draw circle of the current derivative
      p5.ellipse(x, y, 10, 10);
    }
    // Proceed and repeat;
    Draw(p5, derivative_points, time);
  }
}


// Global time
let time = 0;

// Initial coordinates
let points: Array<Array<number>> = [];
// Points for creating the final curve;
let curvePoints: Array<Array<number>> = [];

const reset = () => {
  curvePoints = [];
  time = 0;
}

const App = (p5: P5) => {
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight * 0.75);
    p5.textFont('sans-serif', 10);
  }
  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight * 0.75);
  }
  p5.mouseClicked = () => {
    points.push([p5.mouseX, p5.mouseY]);
    reset();
  }
  p5.draw = () => {
    
    p5.background(0, 0, 0)
    p5.stroke(255, 255, 255);

    // Stop recursion when on timeout
    if (points.length > 1 && time < 1) Draw(p5, points, time);

    // Increase the time in rispect to the frames
    if (time < 1) {
      time+=5e-3;
    } else {
      points = [];
    }

    // Draw the derived curve
    for (let i = 1; i < curvePoints.length; i++) {
      p5.line(curvePoints[i-1][0], curvePoints[i-1][1], curvePoints[i][0], curvePoints[i][1]);
    }
  }
}

// @ts-ignore
new P5(App, 'app');


// Primitive logic
// Plain code 

// Screen center coordinates
const cx = window.innerWidth / 2-200;
const cy = window.innerHeight / 2 + 300;

// Length of the line
const length = 300;

// 4 albitrarly taken points
let p1x = cx, p1y = cy;
let p2x = cx, p2y = cy-length;
let p3x = cx+length, p3y = p2y;
let p4x = cx+length, p4y = p3y-length;

// @ts-ignore
const draw = (p5: P5) => {
  p5.background(255, 255, 255)
  p5.stroke(0, 0, 0);

  // Line 1: from p1 to p2
  p5.line(p1x, p1y, p2x, p2y);

  // Line 2: from p2 to p3
  p5.line(p2x, p2y, p3x, p3y);

  // Line 3: from p3 to p4
  p5.line(p3x, p3y, p4x, p4y);

  
  // Point laying on line p1 - p2
  let q1x = P(p1x, p2x, time);
  let q1y = P(p1y, p2y, time);
  p5.ellipse(q1x, q1y, 10, 10);

  // Point laying on line p2 - p3
  let q2x = P(p2x, p3x, time);
  let q2y = P(p2y, p3y, time)
  p5.ellipse(q2x, q2y, 10, 10);

  // Point laying on line p3 - p4
  let q3x = P(p3x, p4x, time);
  let q3y = P(p3y, p4y, time);
  p5.ellipse(q3x, q3y, 10, 10);


  // Line 4: from q1 to q2
  p5.line(q1x, q1y, q2x, q2y);

  // Line 5: from q2 to q3
  p5.line(q2x, q2y, q3x, q3y);


  // Point laying on line q1 - q2
  let q4x = P(q1x, q2x, time);
  let q4y = P(q1y, q2y, time);
  p5.ellipse(q4x, q4y, 10, 10);

  // Point laying on line q2- q3
  let q5x = P(q2x, q3x, time);
  let q5y = P(q2y, q3y, time);
  p5.ellipse(q5x, q5y, 10, 10);


  // Line 6: from q4 to q5
  p5.line(q4x, q4y, q5x, q5y);

  // Point laying on line q4 - q5
  let q6x = P(q4x, q5x, time);
  let q6y = P(q4y, q5y, time);
  p5.ellipse(q6x, q6y, 10, 10);


  
  if (time < 1) {
    time+=0.005;
  }

  points.push([q6x, q6y]);

  for (let i = 1; i < points.length; i++) {
    p5.line(points[i-1][0], points[i-1][1], points[i][0], points[i][1]);
  }
}
