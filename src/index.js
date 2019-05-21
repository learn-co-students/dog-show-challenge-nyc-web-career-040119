const dogsUrl = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
  const dogsTable = document.querySelector("#table-body")


fetch(dogsUrl, {method: "GET"})
.then(function(response){
  return response.json();
})
.then(function(dogsObj){

  dogsObj.forEach(function(dog){
    dogsTable.innerHTML += `<tr id="dog-${dog.id}">
                              <td class="name">${dog.name}</td>
                              <td class="breed">${dog.breed}</td>
                              <td class="sex">${dog.sex}</td>
                              <td>
                                <button id="edit-dog-btn">Edit</button>
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
      let dogValues = clickedDog.parentElement.parentElement.children
      let dogName = dogValues[0].innerText
      let dogBreed = dogValues[1].innerText
      let dogSex = dogValues[2].innerText

      fetch('http://localhost:3000/dogs/1', {
        method:"PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
          {
            "name": dogName,
            "breed": dogBreed,
            "sex": dogSex
          }
        )
      })
      .then(response => response.json())
      .then(function(editDog){
        console.log(editDog)
        const editForm = document.querySelector('.form-container')
        editForm.innerHTML = `
                            <form id='dog-form' class="padding margin border-round border-grey">
                              <input type="name" name="name" placeholder="name" value="${editDog.name}">
                              <input type="breed" name="breed" placeholder="breed" value="${editDog.breed}">
                              <input type="sex" name="sex" placeholder="sex" value="${editDog.sex}">
                              <input type="submit"value="Submit">
                            </form>
                            `
        editForm.addEventListener("submit", function(e){
          let newDogValues = e.target.children
          let newName = newDogValues[0]
          let newBreed = newDogValues[1]
          let newSex = newDogValues[2]

          console.log("submitted!");
        })
        const editDogObj = document.querySelector(`#dog-${editDog.id}`)
        editDogObj.innerHTML = ``

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
