const button = document.getElementById("savebtn");
const tasksPerDay = new Map();
let currentDate = new Date(); // variabilă pentru data curentă

document.addEventListener("DOMContentLoaded", () => {
  displayDate();

  const backButton = document.getElementById("backButton");
  const nextButton = document.getElementById("nextButton");

  console.log(backButton, nextButton);

  // Eveniment pentru butonul "Back"
  document.getElementById("backButton").addEventListener("click", () => {
    changeDate(-1); // Mergi înapoi cu o zi
  });

  // Eveniment pentru butonul "Next"
  document.getElementById("nextButton").addEventListener("click", () => {
    changeDate(1); // Mergi înainte cu o zi
  });

  document.getElementById("currentButton").addEventListener("click", () => {
    changeDate(0);
  });

  button.addEventListener("click", () => {
    const taskInput = document.getElementById("task");
    const task = taskInput.value;

    if (!tasksPerDay.has(formatDate(currentDate))) {
      tasksPerDay.set(formatDate(currentDate), []);
    }

    tasksPerDay.get(formatDate(currentDate)).push(task);
    taskInput.value = "";

    const list = document.getElementsByTagName("ol")[0];
    const listItem = document.createElement("li");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.style.margin = "10px";

    listItem.textContent = task;
    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);

    console.log(tasksPerDay);

    deleteBtn.addEventListener("click", () => {
      const taskText = listItem.textContent.replace("Delete", "").trim();
      const tasksArray = tasksPerDay.get(formatDate(currentDate));
      const updatedTasksArray = tasksArray.filter((t) => t !== taskText);
      tasksPerDay.set(formatDate(currentDate), updatedTasksArray);
      listItem.remove();
      console.log(tasksPerDay);
    });
  });
});

// Funcție pentru a formata data curentă într-un șir de caractere
function formatDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

// Funcție pentru a afișa data curentă în elementul h2.date
function displayDate() {
  document.querySelector(".date").textContent = formatDate(currentDate);
}

// Funcție pentru a schimba data cu un anumit număr de zile
function changeDate(days) {
  if (days == 0) {
    currentDate = new Date(); // Setează la data de azi
    displayDate(); // Afișează data actualizată
    loadTasksForDate();
  } else {
    currentDate.setDate(currentDate.getDate() + days);
    displayDate();
    loadTasksForDate(); // încarcă task-urile pentru noua dată
  }
}

// Funcție pentru a încărca task-urile din Map pentru data curentă
function loadTasksForDate() {
  const list = document.getElementsByTagName("ol")[0];
  list.innerHTML = ""; // curăță lista

  const tasksForDate = tasksPerDay.get(formatDate(currentDate)) || [];
  tasksForDate.forEach((task) => {
    const listItem = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.style.margin = "10px";

    listItem.textContent = task;
    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);

    deleteBtn.addEventListener("click", () => {
      const tasksArray = tasksPerDay.get(formatDate(currentDate));
      const updatedTasksArray = tasksArray.filter((t) => t !== task);
      tasksPerDay.set(formatDate(currentDate), updatedTasksArray);
      listItem.remove();
      console.log(tasksPerDay);
    });
  });
}
