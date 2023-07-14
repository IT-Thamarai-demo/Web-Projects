let letters = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "backspace",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "capslock",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "enter",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "space",
];

function show() {
  for (i = 0; i < letters.length; i++) {
    let currentElement = currentElement;
    if (currentElement === "backspace") {
      $("#someid").append(
        `<button class="keyboard" onclick="backspace('${currentElement}')">${currentElement}</button><br> `
      );
    } else if (currentElement === "p") {
      $("#someid").append(
        `<button class="keyboard" onclick="printletter('${currentElement}')">${currentElement}</button><br>`
      );
    } else if (currentElement === "capslock") {
      $("#someid").append(
        `<button  class="keyboard  cap" onclick="oncapslock('${letterText}')">${currentElement}</button>`
      );
    } else if (currentElement === "enter") {
      letterText = currentElement === "enter" ? "\\n" : currentElement;
      $("#someid").append(
        `<button  class="keyboard" onclick="printletter('${letterText}')">${currentElement}</button><br>`
      );
    } else if (currentElement === "m") {
      $("#someid").append(
        `<button class="keyboard" onclick="printletter('${currentElement}')">${currentElement}</button><br>`
      );
    } else {
      letterText = currentElement === "space" ? " " : currentElement;
      $("#someid").append(
        `<button  class="keyboard" onclick="printletter('${letterText}')">${currentElement}</button>`
      );
    }

    $(".txt").css({
      "text-align": "center",
      width: "400px",
      margin: "100px",
      padding: "20px",
    });

    $("#key").css({ "text-align": "center", margin: "9px", padding: "20px" });
    $(".keyboard").css({
      "text-align": "center",
      padding: "10px",
      margin: "7px",
      "background-color": "black",
      color: "white",
      "justify-content": "center",
    });
  }
}

function printletter(letters) {
  a = $(".txt").val();
  g = capslock ? letters.toUpperCase() : letters.toLowerCase();

  b = a + g;
  $(".txt").val(b);
}

function backspace() {
  c = $(".txt").val();
  d = c.length;
  f = c.substring(0, d - 1);
  $(".txt").val(f);
}

let capslock = false;
function oncapslock() {
  if (capslock) {
    capslock = false;
    $(".cap").css({ "background-color": "white", color: "black" });
  } else {
    capslock = true;
    $(".cap").css({ "background-color": "green", color: "white" });
  }
}
