let optionsCont = document.querySelector(".options-container");
let toolsCont = document.querySelector(".tools-container");
let pencilToolCont = document.querySelector(".pencil-tool-container");
let eraserToolCont = document.querySelector(".eraser-tool-container");

let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");

let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");



// **********************Date and Time Code**************
function display_ct7() {
  var x = new Date();
  var ampm = x.getHours() >= 12 ? " PM" : " AM";
  hours = x.getHours() % 12;
  hours = hours ? hours : 12;
  hours = hours.toString().length == 1 ? 0 + hours.toString() : hours;

  var minutes = x.getMinutes().toString();
  minutes = minutes.length == 1 ? 0 + minutes : minutes;

  var seconds = x.getSeconds().toString();
  seconds = seconds.length == 1 ? 0 + seconds : seconds;

  var month = (x.getMonth() + 1).toString();
  month = month.length == 1 ? 0 + month : month;

  var dt = x.getDate().toString();
  dt = dt.length == 1 ? 0 + dt : dt;

  var date =  dt +  "/" + month + "/" + x.getFullYear();
  time = hours + ":" + minutes + ":" + seconds + " " + ampm;
  document.querySelector(".Date").innerHTML = date;
  document.querySelector(".Time").innerHTML = time;
  display_c7();
}
function display_c7() {
  var refresh = 1000; // Refresh rate in milli seconds
  mytime = setTimeout("display_ct7()", refresh);
}
display_c7();

// ******************************************************





//**********Code to change working mode*************** */
let mode = document.querySelector(".night-mode");
mode.addEventListener("click", (e) => {
  let bgColor = window
    .getComputedStyle(document.body, null)
    .getPropertyValue("background-color");

  console.log(bgColor);
  if (bgColor === "rgb(34, 34, 34)") {
    document.body.style.backgroundColor = "rgba(233, 233, 233, 0.884)";
    mode.innerHTML = "Day-Mode";
  } else {
    document.body.style.backgroundColor = "rgb(34, 34, 34)";
    mode.innerHTML = "Night-Mode";
  }
});


//*********Code to toggle hambuger ****************** */

//true --> Show tools , false --> Hide tools
let optionsFlag = false;
optionsCont.addEventListener("click", (e) => {
  optionsFlag = !optionsFlag;
  if (optionsFlag) openTools();
  else closeTools();
});

function openTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-times");
  toolsCont.style.display = "flex";
  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}

function closeTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-times");
  iconElem.classList.add("fa-bars");
  toolsCont.style.display = "none";
  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}


//**********Code to toggle pencil and eraser tool ******/

let pencilFlag = false;
let eraserFlag = false;

pencil.addEventListener("click", (e) => {
  pencilFlag = !pencilFlag;
  eraserFlag = false;
  if (pencilFlag) pencilToolCont.style.display = "block";
  else pencilToolCont.style.display = "none";
});

eraser.addEventListener("click", (e) => {
  eraserFlag = !eraserFlag;
  pencilFlag =false;
  if (eraserFlag) eraserToolCont.style.display = "flex";
  else eraserToolCont.style.display = "none";
});


//**********Code to create sticky notes *********** */

let i = 1;
sticky.addEventListener("click", (e) => {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-container");

  stickyCont.innerHTML = `
    <div class="sticky-container-header">
        <div class="sticky-container-header-id">${i}</div>
        <div class="sticky-container-header-feature">
            <div class="minimize">⛔</div>
            <div class="remove">❎</div>
        </div>
    </div>
    <div class="sticky-container-body">
        <textarea spellcheck="false" placeholder="write your notes here"></textarea>
    </div>`;

  document.body.appendChild(stickyCont);

  let notesBar = document.querySelector(".sticky-notes-bar");
  let note = document.createElement("div");
  note.innerHTML = `<div class="note-bar" id="Note${i} ">Note-${i}</div>`;
  notesBar.appendChild(note);
  i++;

  let minimize = stickyCont.querySelector(".minimize");
  let remove = stickyCont.querySelector(".remove");
  let bar = note.querySelector(".note-bar");
  noteActions(minimize, remove, bar, stickyCont, note);

  stickyCont.onmousedown = function (e) {
    dragAndDrop(stickyCont, e);
  };

  stickyCont.ondragstart = function () {
    return false;
  };
});

function noteActions(minimize, remove, bar, stickyCont, note) {
  remove.addEventListener("click", (e) => {
    stickyCont.remove();
    note.remove();
    // i--;
  });
  minimize.addEventListener("click", (e) => {
    stickyCont.style.display = "none";
  });

  bar.addEventListener("click", (e) => {
    let display = getComputedStyle(stickyCont).getPropertyValue("display");
    if (display === "none") {
      stickyCont.style.display = "block";
    } else {
      stickyCont.style.display = "none";
    }
  });
}

function dragAndDrop(ball, event) {
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  ball.style.position = "absolute";
  ball.style.zIndex = 1000;
  //   document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + "px";
    ball.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the ball, remove unneeded handlers
  ball.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    ball.onmouseup = null;
  };
}


//********** Code to upload image ******************* */
upload.addEventListener("click", (e) => {
  //open file explorer
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);

    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-container");

    stickyCont.innerHTML = `
      <div class="sticky-container-header">
          <div class="sticky-container-header-id">${i}</div>
          <div class="sticky-container-header-feature">
              <div class="minimize">⛔</div>
              <div class="remove">❎</div>
          </div>
      </div>
      <div class="sticky-container-body">
          <img src="${url}"/>
      </div>`;

    document.body.appendChild(stickyCont);

    let notesBar = document.querySelector(".sticky-notes-bar");
    let note = document.createElement("div");
    note.innerHTML = `<div class="note-bar" id="Note${i} ">Note-${i}</div>`;
    notesBar.appendChild(note);
    i++;

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    let bar = note.querySelector(".note-bar");
    noteActions(minimize, remove, bar, stickyCont, note);

    stickyCont.onmousedown = function (e) {
      dragAndDrop(stickyCont, e);
    };

    stickyCont.ondragstart = function () {
      return false;
    };
  });
});
