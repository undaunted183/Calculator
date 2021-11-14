function add(a, b) {
  let x = parseFloat(a) + parseFloat(b);
  return x.toFixed(2);
}

function subtract(a, b) {
  let x = parseFloat(a) - parseFloat(b);
  return x.toFixed(2);
}

function multiply(a, b) {
  let x = parseFloat(a) * parseFloat(b);
  return x.toFixed(2);
}

function divide(a, b) {
  let x = parseFloat(a) / parseFloat(b);

  if (isNaN(x)) {
    return "Error!! Press CE to start";
  } else return x.toFixed(2);
}

function operate(a, b, o) {
  if (o === "+") {
    return add(a, b);
  } else if (o === "-") {
    return subtract(a, b);
  } else if (o === "*") {
    return multiply(a, b);
  } else if (o === "/") {
    return divide(a, b);
  } else {
    return "Invalid operator";
  }
}

const display = document.querySelector(".display");
const number = document.querySelectorAll(".number");
const cancel = document.querySelector(".ce");
const equalto = document.querySelector(".equal");
const back = document.querySelector(".back");
const sign = document.querySelectorAll(".sign");

//arr is used to store present value of two operand and operator which is then used to call
// above operator() function
const arr = new Array(4);
arr[0] = arr[1] = arr[2] = "";

//flg is used to disable operator sign after pressing it. this will be enabled on pressing number keys or other keys
let flg = 1;
let x = display.innerText;
//clearing arr on clicking cancel key
function clear() {
  cancel.addEventListener("click", () => {
    display.innerText = "";
    arr[0] = arr[1] = arr[2] = "";
    flg = 1;
  });
}
clear();

//on clicking numbers on calculator
number.forEach((item) => {
  item.addEventListener("click", () => {
    display.innerText += item.innerText;
    flg = 1;
  });
});

//on clicking math operator sign on calculator
sign.forEach((item) => {
  item.addEventListener("click", () => {
    if (flg === 1) {
      if (arr[0] === "" || arr[1] === "") {
        arr[0] = display.innerText;
        display.innerText += item.innerText;
        arr[1] = item.innerText;
        flg = 0;
      } else {
        //regex here will split displayed string. Split starts after math operator sign expect for sign at first position
        console.log(display.innerText);
        let tempArr = display.innerText.split(/.[\+\*\/\-]/);
        arr[2] = tempArr[1];
        console.log(arr[2]);
        arr[0] = operate(arr[0], arr[2], arr[1]);

        arr[1] = item.innerText;
        arr[2] = "";
        display.innerText = arr[0] + arr[1];
        flg = 0;
      }
    }
  });
});

equalto.addEventListener("click", () => {
  let tempArr = display.innerText.split(/.[\+\*\/\-]/);
  arr[2] = tempArr[1];
  arr[0] = operate(arr[0], arr[2], arr[1]);
  display.innerText = arr[0];
  arr[1] = "";
  arr[2] = "";
  arr[0] = "";
});

//back space function implementation

back.addEventListener("click", () => {
  let str = display.innerText;

  if (arr[0] === "") {
    console.log(str);
    display.innerText = str.substring(0, str.length - 1);
  } else if (str[str.length - 1] === str[str.search(/[\+|\*|\/|\-]/)]) {
    console.log(str);
    display.innerText = str.substring(0, str.length - 1);
    arr[1] = "";
    flg = 1;
  } else if (display.innerText !== arr[0] + arr[1]) {
    display.innerText = str.substring(0, str.length - 1);
  }
});

/*
console.log(x[x.length - 1]);
if (x[x.length - 1] === x[x.search(/[\+|\*|\/|\-]/)]) {
  console.log(x[x.length - 1]);
}

console.log(x.search(/[\+|\*|\/|\-]/));
*/
