document.addEventListener('DOMContentLoaded', ( ) => {
  const dogURL = 'http://localhost:3000/dogs'
  const editDogForm = document.querySelector('#dog-form')
  const dogContainer = document.querySelector('#table-body')
  const dogName = document.querySelector('#dog-name')
  const dogBreed = document.querySelector('#dog-breed')
  const dogSex = document.querySelector('#dog-sex')


  fetch(dogURL, {method: "GET"})
  .then( respond => {return respond.json()})
  .then( dogs => {
    dogs.forEach(dog => {
    let newDog = document.createElement('tr')
    newDog.id = dog.id
    newDog.innerHTML += `<td> ${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td>`
    dogContainer.appendChild(newDog)
    const editButton = document.createElement('button')
    editButton.innerText = 'Edit'
    editButton.id = dog.id
    newDog.appendChild(editButton)

    //adding event button
    editButton.addEventListener('click', event => {
      let targetId = event.target.id
      editDogForm.dataset.id = editButton.id

      let findDog = dogs.find((dog) => {
        return dog.id === parseInt(editButton.id)
      })
      dogName.value = findDog.name
      dogBreed.value = findDog.breed
      dogSex.value = findDog.sex
    })
  })
})

//showing dogs
  // function dogList (dog) {
  // }


  editDogForm.addEventListener('submit', e => {
    e.preventDefault()
    //setting up the dog id form id and the button id to the same
    let fetchDogId = editDogForm.dataset.id
    // console.log(fetchDogId)
    // console.log(dogName.value)
    // console.log(dogBreed.value)
    // console.log(dogSex.value)
    fetch(`http://localhost:3000/dogs/${fetchDogId}`, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
          "name": dogName.value,
          "breed": dogBreed.value,
          'sex': dogSex.value
        })
      })
    .then (resp => {return resp.json()})
    .then(function(dogs) {
      dogs.forEach ( dog => {
        dogContainer.innerHTML = `
        <tr id=${dog.id}>
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex[0].toUpperCase()}</td>
        <td><button id=${dog.id}>  Edit Dog </button></td>
        </tr>`
      })
      
      // let foundDog = document.getElementById(`${dogs.id}`)
      // let genderTag = foundDog.querySelector('#sex')
      // let breedTag = foundDog.querySelector('#breed')
      // let nameTag = foundDog.querySelector('#name')
      // // console.log(genderTag);
      // genderTag.innerText = dogSex.value
      // breedTag.innerText = dogBreed.value
      // nameTag.innerText = dogName.value

    })
    })
})
