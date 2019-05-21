document.addEventListener('DOMContentLoaded', () => {
  const DOG_URL = 'http://localhost:3000/dogs'
  const dogContainer = document.querySelector("#table-body")
  const dogEditForm = document.querySelector("#dog-form")
  const dogNameEdit = dogEditForm.querySelector("#name-edit")
  const dogBreedEdit = dogEditForm.querySelector("#breed-edit")
  const dogSexEdit = dogEditForm.querySelector("#sex-edit")

  // READ

  fetch(DOG_URL)
  .then(response => response.json())
  .then(dogs => {
    for (const dog of dogs){
      dogContainer.innerHTML += `
      <tr id="dog-${dog.id}" data-id="${dog.id}" data-name="${dog.name}" data-breed="${dog.breed}" data-sex="${dog.sex}">
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td>
          <button id="${dog.id}">Edit</button>
        </td>
      </tr>
      `
    }
  })
  // end fetch

  // UPDATE
  document.addEventListener("click", event => {
    event.preventDefault()
    let dogId = event.target.id
    const selectDogObj = event.target.parentElement.parentElement
    const dogObj = selectDogObj.dataset
    // debugger
    if (event.target.nodeName === "BUTTON"){
      console.log("click button ", dogObj.id)
      // set the form id
      dogEditForm.dataset.id = dogObj.id

      // populate the edit field
      dogNameEdit.value = dogObj.name
      dogBreedEdit.value = dogObj.breed
      dogSexEdit.value = dogObj.sex
    } // end if

    if (event.target.value === "Submit"){

      const theDogObj = document.querySelector(`#dog-${dogEditForm.dataset.id}`)

      const dogNameSave = theDogObj.firstElementChild
      const dogBreedSave = dogNameSave.nextElementSibling
      const dogSexSave = dogBreedSave.nextElementSibling

      dogNameSave.innerText = dogNameEdit.value
      dogBreedSave.innerText = dogBreedEdit.value
      dogSexSave.innerText = dogSexEdit.value

      // patch request
      fetch(DOG_URL + `/${dogEditForm.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: dogNameEdit.value,
          breed: dogBreedEdit.value,
          sex: dogSexEdit.value
        })
      }) // end patch

      dogEditForm.reset()
    }
  }) // end event listener
})
