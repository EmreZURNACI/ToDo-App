var kontrol = true;
var gorevListesi = [
  { "id": 1, "gorevAdi": "Görev 1", "case": "pending" },
  { "id": 2, "gorevAdi": "Görev 2", "case": "pending" },
  { "id": 3, "gorevAdi": "Görev 3", "case": "pending" },
  { "id": 4, "gorevAdi": "Görev 4", "case": "pending" }
]
display();
function display() {
  if (gorevListesi.length == 0) {
    document.querySelector(".task ul").innerHTML = `<h3 class="p-3">Görev Kutunuz Boştur</h3>`
  }
  else {
    for (let i = 0; i < gorevListesi.length; i++) {
      let li = `
      <li id=${gorevListesi[i].id}">
        <div>
         <input onclick="pick_up(this)" type="checkbox" id="${gorevListesi[i].id}">
         <label for="${gorevListesi[i].id}">${gorevListesi[i].gorevAdi}</label>
        </div>
        <div>
           <button onclick='editTask(${gorevListesi[i].id}, "${gorevListesi[i].gorevAdi}")' type="button" class="foricons"><i class="fa-solid fa-pencil"></i></button>
           <button onclick="deleteTask(${gorevListesi[i].id})" type="button" class="foricons"><i class="fa-solid fa-trash"></i></button>
        </div>
      </li>

          `
      document.querySelector(".task ul").insertAdjacentHTML("beforeend", li);
    }
  }
}
document.getElementById("deleteAll").addEventListener("click", function () {
  gorevListesi.splice(0, gorevListesi.length);
  display();
  event.preventDefault();
})
document.querySelector("#addNewTask").addEventListener("click", function () {
  if (kontrol) {
    if (document.getElementById("textInput").value.length != 0) {
      let text = document.getElementById("textInput").value;
      gorevListesi.push({ id: gorevListesi.length + 1, gorevAdi: `${text}` });
      document.getElementById("textInput").value = "";
      document.querySelector(".task ul").innerHTML = "";
      display();
      event.preventDefault();
    }
    else {
      window.alert("Boş Görev Eklenemez!");
      event.preventDefault();
    }
  }
  else {
    for (let i = 0; i < gorevListesi.length; i++) {
      if (gorevListesi[i].id == editedTask) {
        gorevListesi[i].gorevAdi = document.getElementById("textInput").value;
      }
    }
    document.querySelector(".task ul").innerHTML = "";
    display();
    kontrol = true;
    event.preventDefault();

  }
  document.getElementById("textInput").value = "";
}
)
function deleteTask(id) {
  let deletedId;
  for (let i = 0; i < gorevListesi.length; i++) {
    if (id == gorevListesi[i].id) {
      deletedId = i;
    }
  }
  gorevListesi.splice(deletedId, 1);
  document.querySelector(".task ul").innerHTML = "";
  display();
}
var editedTask;
function editTask(id, görev) {
  editedTask = id;
  kontrol = false;
  document.getElementById("textInput").value = gorevListesi[editedTask - 1].gorevAdi;
  document.getElementById("textInput").focus();
  document.querySelector("#textInput").classList.add("active");
}
function pick_up(input) {
  let li = input.parentElement.parentElement;
  let mcase;
  if (input.checked) {
    li.classList.add("completed");
    for (let i = input.id; i < input.id + 1; i++) {
      gorevListesi[input.id - 1].case = "completed";
    }
  }
  else {
    li.classList.remove("completed");
    for (let i = input.id; i < input.id + 1; i++) {
      gorevListesi[input.id - 1].case = "pending";
    }
  }
}
function showCompleted() {
  document.querySelector(".dropdown-toggle").innerHTML="Completed";
  let nGorevListesi = [];
  for (let i = 0; i < gorevListesi.length; i++) {
    if (gorevListesi[i].case == "completed") {
      nGorevListesi.push({ "id": gorevListesi[i].id, "gorevAdi": gorevListesi[i].gorevAdi, "case": gorevListesi[i].case });
    }
  }
  document.querySelector(".task ul").innerHTML="";
  for (let i = 0; i < nGorevListesi.length; i++) {
    let li = `
      <li id=${nGorevListesi[i].id}" class="completed">
        <div>
         <input onclick="pick_up(this)" type="checkbox" id="${nGorevListesi[i].id}" checked>
         <label for="${nGorevListesi[i].id}">${nGorevListesi[i].gorevAdi}</label>
        </div>
        <div>
           <button onclick='editTask(${nGorevListesi[i].id}}, "${nGorevListesi[i].gorevAdi}")' type="button" class="foricons"><i class="fa-solid fa-pencil"></i></button>
           <button onclick="deleteTask(${nGorevListesi[i].id})" type="button" class="foricons"><i class="fa-solid fa-trash"></i></button>
        </div>
      </li>  `
    document.querySelector(".task ul").insertAdjacentHTML("beforeend", li);
    event.preventDefault();
  }
}
function showPending() {
  document.querySelector(".dropdown-toggle").innerHTML="Pending";
  let nGorevListesi = [];
  for (let i = 0; i < gorevListesi.length; i++) {
    if (gorevListesi[i].case != "completed") {
      nGorevListesi.push({ "id": gorevListesi[i].id, "gorevAdi": gorevListesi[i].gorevAdi, "case": gorevListesi[i].case });
    }
  }
  document.querySelector(".task ul").innerHTML="";
  for (let i = 0; i < nGorevListesi.length; i++) {
    let li = `
      <li id=${nGorevListesi[i].id}">
        <div>
         <input onclick="pick_up(this)" type="checkbox" id="${nGorevListesi[i].id}">
         <label for="${nGorevListesi[i].id}">${nGorevListesi[i].gorevAdi}</label>
        </div>
        <div>
           <button onclick='editTask(${nGorevListesi[i].id}}, "${nGorevListesi[i].gorevAdi}")' type="button" class="foricons"><i class="fa-solid fa-pencil"></i></button>
           <button onclick="deleteTask(${nGorevListesi[i].id})" type="button" class="foricons"><i class="fa-solid fa-trash"></i></button>
        </div>
      </li>  `
    document.querySelector(".task ul").insertAdjacentHTML("beforeend", li);
    event.preventDefault();
  }
}