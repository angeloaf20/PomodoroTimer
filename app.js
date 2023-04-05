//Script  for pomodoro timer
let timeId = document.getElementById("clock-time")
let pauseButton = document.getElementById("pause")
let playButton = document.getElementById("play")
let skipButton = document.getElementById("skip")
let editButton = document.getElementById("edit")
let setNewTime = document.getElementById("edit-button")
let editTime = document.getElementById("edit-time")
let phaseText = document.getElementById("phase")
let count = 0
let pomodoroCount = -1
let running = false
let phase = "break"
let timerId
let newMinute = document.getElementById("new-minute").value

function countdown() {
  editTime.style = "display: none;"
  if (count === 0) {
    // switch phase
    if (phase === "work") {
      phase = "break"
      if(pomodoroCount < 4) {
        count = 5 * 60 // 5 minute break
        alert("Click to begin your break!")
        phaseText.innerText = "Break time!"
      }
      else {
        count = 30 * 60
        alert("Click to begin your 30 minute break!")
        phaseText.innerText = "30 minute break time!"
        pomodoroCount = 0
      }
    } else {
      phase = "work"
      if((newMinute !== undefined) && (newMinute > 0))
        {
          count = newMinute * 60
        }
      else {
       count = 25 * 60 // hardcoded 25 minute work session 
      }
      alert("Get to work!")
      phaseText.innerText = "Work time!"
      pomodoroCount++
    }
    phaseText.innerText = `Pomodoros: ${pomodoroCount}\n${phaseText.innerText}`
    timeFormat()
  } else {
    count--
    timeFormat()
  }
}

function timeFormat() {
  let minutes = Math.floor(count / 60)
  let seconds = count % 60
  timeId.innerText = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}

function stopCountdown() {
  if (running) {
    running = false;
    clearInterval(timerId);
  }
}

function startCountdown() {
  if (!running) {
    running = true;
    timerId = setInterval(countdown, 1000);
  }
}

pauseButton.addEventListener("click", function() {
  if (running === false) alert("Already paused!")
  stopCountdown()
})

playButton.addEventListener("click", function() {
  if (running === true) alert("Already counting down!")
  startCountdown()
})

editButton.addEventListener("click", function() {
  editTime.style = "display: flex; align-items: center; justify-content: center; text-align: center; margin-left: 5px;"
})

setNewTime.addEventListener("click", function() {
    if(running) alert('Cannot edit time while clock is running!')
    else {
        newMinute = document.getElementById("new-minute").value
        console.log(newMinute)
    }
})

skipButton.addEventListener("click", function() {
    count = 0
})

timeFormat()


//Script for todo list
let addTodoButton = document.getElementById("add-todo")
let todo = document.getElementById("todo")
let todosList = document.getElementById("todos")
let todos = []

function addTodo() {
  let newItem
  todos.push(todo.value)
  if(todos[todos.length-1] === "") alert("Item must not be empty!")
  else {
    newItem = todosList.appendChild(document.createElement("li"))
    newItem.innerText = todos[todos.length-1]
  }

  newItem.addEventListener("mouseover", function() {
    newTodoDeleteButton(newItem, todosList)
    newTodoCompletedButton(newItem)
  })
  newItem.addEventListener("mouseout", function () {
    while (newItem.lastElementChild) {
      newItem.removeChild(newItem.lastElementChild);
    }
  })
}

function newTodoDeleteButton(item, list) {
  let deleteItem = item.appendChild(document.createElement("button"))
  deleteItem.innerText = "Delete"
  deleteItem.style = "margin-left: 5px"
  deleteItem.addEventListener("click", function() {
    list.removeChild(item)
  })
}

function newTodoCompletedButton(item) {
  let completedItem = item.appendChild(document.createElement("button"))
  completedItem.innerText = "Completed"
  completedItem.style = "margin-left: 5px"
  completedItem.addEventListener("click", function() {
    item.style = "text-decoration: line-through;"
  })
  return completedItem
}

function removeButton(item, button) {
  item.removeChild(button)
}

addTodoButton.addEventListener("click", addTodo)
