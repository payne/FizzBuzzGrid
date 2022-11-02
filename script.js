// Color squares based on the Fizz Buzz exercise
// gray scale -- when it's just the number....
// Blue -- Multiple of 3
// Yellow -- Multiple of 5
// Green -- Multiple of both 3 & 5
let n = 1;
let [start, increment] = [30, 30];
const byg = {
  'Fizz': 'blue',
  'Buzz': 'yellow',
  'FizzBuzz': 'green'
};

const by = (d) => {
  return n => {
    return 0 === n % d;
  };
};
const by3 = by(3);
const by5 = by(5);
const by3and5 = n => { return by3(n) && by5(n); };

function* fizzBang() {
  while (true) {
    let result = n;
    if (by3(n)) result = 'Fizz';
    if (by5(n)) result = 'Buzz';
    if (by3and5(n)) result = 'FizzBuzz';
    const c = byg[result] ? byg[result] : result;
    console.log(`${n} color: ${c}`);
    n++;
    yield result;
  }
}

const it = fizzBang();

function fillSquare(x, y) {
  const v = it.next().value;
  fill(byg[v] ? byg[v] : v); // blue and yellow make green
  rect(x - increment, y - increment, increment, increment);
}

async function draw() { // Many thanks to Meiamsome for the help on 9/7/18
  for (let y = start; y < height; y += increment) {
    for (let x = start; x < width; x += increment) {
      fillSquare(x, y); 
      await sleep(100);
    }
  }
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  noLoop();
}

// https://zeit.co/blog/async-and-await
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

