const addBtn = document.querySelector('#new-actor-btn')
const actorsFormContainer = document.querySelector('.container')
const actorsEditFormContainer = document.querySelector('.edit-container')
let addActor = false
let editActor = false
const actorsForm = document.querySelector(".add-actors-form")
const actorsEditForm = document.querySelector(".edit-actor-form")
const actorsContainer = document.getElementById("actors-collection")
// YOUR CODE HERE
let allActors = []

/////////// show add form on page/////////
addBtn.addEventListener('click', () => {
  addActor = !addActor
  if (addActor) {
    actorsFormContainer.style.display = 'block'
  } else {
    actorsFormContainer.style.display = 'none'
  }
})

////////add events listener submit to "add" and "edit" form /////
actorsForm.addEventListener('submit', postActor)
actorsEditForm.addEventListener("submit", editActorForm)


/////////add actor to the page /////////
function postActor() {

  event.preventDefault()
  let actorsName = event.target.querySelector("input[name='name']")
  let actorsImg = event.target.querySelector("input[name='image']")
  let actorsNat = event.target.querySelector("input[name='actor-nat']")

  fetch("http://localhost:3000/api/v1/actors", {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify ({
      name: actorsName.value,
      pic_url: actorsImg.value,
      nationality: actorsNat.value,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(actorsData => {
    allActors.push(actorsData)
    actorsContainer.innerHTML = ""
    addDivsToDom(allActors)
  })
  event.target.reset()

}
////////load all actors on page /////////
function loadActors() {
  fetch("http://localhost:3000/api/v1/actors")
  .then(resp => resp.json())
  .then(actorsData => {
    allActors = actorsData
    addDivsToDom(actorsData)
  })
}

function addActorDiv(actors) {
  let actorsDiv = document.createElement("div")
  actorsDiv.className = "card"
  actorsDiv = addActorDataToDiv(actors, actorsDiv)
  return actorsDiv
}

// /////
// function likeOrLikes(number){
//   return number !== 1 && number !== -1 ? `${number} Likes` : `${number} Like`
// }

////////append div for each actor to the dom////////
function addDivsToDom(array){
  array.forEach(actors => {
    newDiv = addActorDiv(actors)
    actorsContainer.appendChild(newDiv)
  })
}

////////// append and create div for each actor /////////
function addActorDataToDiv(actors, div){
  let name = document.createElement("h2")
  let img = document.createElement("img")
  let nationality = document.createElement("p")
  let editButton = document.createElement("button")
  name.innerHTML = actors.name
  img.src = actors.pic_url
  img.className = "actors-avatar"
  nationality.innerHTML = actors.nationality
  editButton.className="edit-btn"
  editButton.innerHTML = "Edit Actor"
  editButton.dataset.actorsId = actors.id

  editButton.addEventListener("click", () => {
  console.log(event.target);

////////show edit form on page //////////
  editActor = !editActor
  if (editActor) {
    actorsEditFormContainer.style.display = 'block'
  } else {
    actorsEditFormContainer.style.display = 'none'
  }
})

  div.dataset.actorsId = actors.id
  div.append(name, img, nationality, editButton)
  return div
}
//
function editActorForm(actors, event){
  let actorsId = actors.id
  let name = document.getElementById("edit-name").value
  let pic = document.getElementById("edit-img").value
  let nationality = document.getElementById("edit-nat").value

  // let likes = actors.likes
  fetch(`http://localhost:3000/api/v1/actors${actorsId}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      pic_url: pic,
      nationality: nationality
    }),
  })
  .then(res => res.json())

  .then(data => {
  debugger
    addActorDataToDiv(data)})


}
loadActors()
