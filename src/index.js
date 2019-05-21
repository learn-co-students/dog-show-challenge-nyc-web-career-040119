document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/dogs')
  .then(response => response.json())
  .then(dogs => {
    const table = document.querySelector('.blue')
    const dogForm = document.querySelector('#dog-form')
    dogs.forEach(dog => {
      table.innerHTML += `
      <tr id="${dog.id}">
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td><button>Edit</button></td>
      </tr>
      `
    })
    table.addEventListener('click', function(e) {
      nameInput = dogForm.querySelector('input[type=name]')
      breedInput = dogForm.querySelector('input[type=breed]')
      sexInput = dogForm.querySelector('input[type=sex]')
      if (e.target.type === 'submit') {
        clickedDog = dogs.find(dog => dog.id === parseInt(e.target.parentNode.parentNode.id))
        nameInput.value = clickedDog.name
        breedInput.value = clickedDog.breed
        sexInput.value = clickedDog.sex
      }
      dogForm.addEventListener('submit', function(e) {
        e.preventDefault()
        dogTableRow = document.getElementById(clickedDog.id)
        let nameCell = dogTableRow.children[0].innerText
        let breedCell = dogTableRow.children[1].innerText
        let sexCell = dogTableRow.children[2].innerText
        if (nameInput.value !== nameCell) {dogTableRow.children[0].innerText = nameInput.value}
        if (breedInput.value !== breedCell) {dogTableRow.children[1].innerText = breedInput.value}
        if (sexInput.value !== sexCell) {dogTableRow.children[2].innerText = sexInput.value}
        fetch(`http://localhost:3000/dogs/${clickedDog.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "name": nameInput.value,
            "breed": breedInput.value,
            "sex": sexInput.value
            })
        })
        .then(resp => resp.json())
        .then(obj => dogForm.reset())
      })
    })
  })
})
