const dogsUrl = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
  const dogsTable = document.querySelector("#table-body")


  fetch(dogsUrl, {
      method: "GET"
    })
    .then(function(response){
      return response.json()
    })
    .then(function(dogsObj){

      dogsObj.forEach(function(dog) {
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
    }) //END of dogsURL fetch

  dogsTable.addEventListener("click", function(e) {

    let clickedDog = e.target //helper for dogId/dogValues
    let dogId = parseInt(clickedDog.id) //dogId-currently editing values, stays the same

    //event parent notation found in devtools
    let dogValues = clickedDog.parentElement.parentElement.children
    let dogName = dogValues[0].innerText
    let dogBreed = dogValues[1].innerText
    let dogSex = dogValues[2].innerText

    //grab form, put current values into respective input.value slots
    const editForm = document.querySelector('.form-container')
    editForm.innerHTML = `
                          <form id='dog-form' class="padding margin border-round border-grey">
                            <input type="name" name="name" placeholder="name" value="${dogName}">
                            <input type="breed" name="breed" placeholder="breed" value="${dogBreed}">
                            <input type="sex" name="sex" placeholder="sex" value="${dogSex}">
                            <input type="submit"value="Submit">
                          </form>
                          `
    editForm.addEventListener("submit", function(event) {
      // EVENT TARGET the submit for updated text values
      let newName = event.target.name
      let newBreed = event.target.breed
      let newSex = event.target.sex
      fetch(`http://localhost:3000/dogs/${dogId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            //Update to latest Values
            "name": newName.value,
            "breed": newBreed.value,
            "sex": newSex.value
          })
        })
        .then(function(editedDogs) {})//rerenders editedObject
    })
  })


}) //END of DOMContentLoaded
