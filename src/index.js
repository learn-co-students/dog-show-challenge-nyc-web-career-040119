document.addEventListener('DOMContentLoaded', () => {

  const dogTable = document.querySelector('#table-body')
  const dogForm = document.querySelector('#dog-form')
  const dogName = document.querySelector('#name')
  const dogBreed = document.querySelector('#breed')
  const dogSex = document.querySelector('#sex')

  // Populate All Dogs in Table
  fetch("http://localhost:3000/dogs")
    .then(r=>r.json())
    .then(dogs=>{
      dogs.forEach(dog=>{
        dogTable.innerHTML +=`
        <tr id="dog${dog.id}">
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button id="${dog.id}">Edit</button></td>
        </tr>
        `
      })
    })

  // Event Listener For All Edit Buttons
  dogTable.addEventListener('click',e=>{
    let dogID = e.target.id
    fetch(`http://localhost:3000/dogs/${e.target.id}`)
      .then(r=>r.json())
      .then(dog=>{
        dogName.value = dog.name
        dogBreed.value = dog.breed
        dogSex.value = dog.sex
      })

      // Event Listener For Submit Button
      .then(dogForm.addEventListener('submit',e=>{
        e.preventDefault()
        fetch(`http://localhost:3000/dogs/${dogID}`,{
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            'name': dogName.value,
            'breed': dogBreed.value,
            'sex': dogSex.value
          })
        })

        // Update Dogs Info After Submit
        .then(r=>r.json())
        .then(dog=>{
          dogRow = document.getElementById(`dog${dog.id}`)
          dogRow.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button id="${dog.id}">Edit</button></td>
          `
          dogForm.reset()
        })
      }))
  })









})
