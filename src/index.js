const dogsUrl = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
  const dogsTable = document.querySelector("#table-body")


fetch(dogsUrl, {method: "GET"})
.then(function(response){
  return response.json();
})
.then(function(dogsObj){

  dogsObj.forEach(function(dog){
    dogsTable.innerHTML += `<tr>
                              <td class="name">${dog.name}</td>
                              <td class="breed">${dog.breed}</td>
                              <td class="sex">${dog.sex}</td>
                              <td>
                                <button id="${dog.id}">Edit</button>
                              </td>
                            </tr>
                            `

  })

  //   let clickedDog = e.target
  //   let dogValues = clickedDog.parentElement.parentElement.children
  //   let dogName = dogValues[0].innerText
  //   let dogBreed = dogValues[1].innerText
  //   let dogSex = dogValues[2].innerText
  //
  //
  //   const editDogForm = document.querySelector('#dog-form')
  //   let name = editDogForm.children.name.input.value
  //   name = dogName;
  //
  //   let breed = editDogForm.children.breed.input.value
  //   breed = dogBreed;
  //
  //   let sex = editDogForm.children.sex.input.value
  //   sex = dogSex;
  //
  //     editDogForm.addEventListener("submit", function(e){
  //       e.preventDefault()
  //       debugger
  //
  //     })

  // })

})//Dogs Listed

  dogsTable.addEventListener("click", function(e) {

      let clickedDog = e.target
      let dogId = parseInt(clickedDog.id)
      let dogValues = clickedDog.parentElement.parentElement.children
      let dogName = dogValues[0].innerText
      let dogBreed = dogValues[1].innerText
      let dogSex = dogValues[2].innerText
      const editForm = document.querySelector('.form-container')
      editForm.innerHTML = `
                          <form id='dog-form' class="padding margin border-round border-grey">
                            <input type="name" name="name" placeholder="name" value="${dogName}">
                            <input type="breed" name="breed" placeholder="breed" value="${dogBreed}">
                            <input type="sex" name="sex" placeholder="sex" value="${dogSex}">
                            <input type="submit"value="Submit">
                          </form>
                          `
      editForm.addEventListener("submit", function(event){
        let newName = event.target.name
        let newBreed = event.target.breed
        let newSex = event.target.sex


      fetch(`http://localhost:3000/dogs/${dogId}`, {
        method:"PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
          {
            "name": newName.value,
            "breed": newBreed.value,
            "sex": newSex.value
          }
        )
      })
      .then(response => response.json())
      .then(function(editDog){
        // let editedDog = document.querySelector(`#dog-${clickDog.id}`).innerHTML
        // console.log(editedDog)
      })
  })
})


})//END of DOMContentLoaded

//
//
// const editBtn = document.querySelector('#edit-dog-btn')
// const editForm = document.querySelector('.form-container')
// let editDog = false
//
// editBtn.addEventListener('click', () => {
// // hide & seek with the form
// editDog = !editDog
// if (editDog) {
//   let edit = editForm.style.display
//
//   // submit listener here
//   editForm.addEventListener("submit", function(e){
//     e.preventDefault(e);
//     console.log("hi")
//
//   })
// } else {
//   editForm.style.display
//
// }
// })
