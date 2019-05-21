const grab = (sel) => document.querySelector(sel)

document.addEventListener('DOMContentLoaded', () => {
  const dogForm = grab("#dog-form")
  const tableBody = grab("#table-body")
  const formTitle = grab("h4")

  // BEGIN POPULATE TABLE ////////////////////
  fetch("http://localhost:3000/dogs")
    .then(r => r.json())
    .then(dogsArr => {
      for (const dogObj of dogsArr) {
        tableBody.innerHTML += `
          <tr id="${dogObj.id}">
            <td>${dogObj.name}</td>
            <td>${dogObj.breed}</td>
            <td>${dogObj.sex}</td>
            <td style="display: none;">${dogObj.id}</td>
            <td>
              <a href="#top-of-form"><button class="edit-btn">Edit Dog</button></a>
            </td>
          </tr>
        `
      }
  })
  // END POPULATE TABLE ////////////////////


  // BEGIN NEW DOG ////////////////////
  dogForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = dogForm.querySelector('[name="name"]').value
    const breed = dogForm.querySelector('[name="breed"]').value
    const sex = dogForm.querySelector('[name="sex"]').value
    const id = dogForm.querySelector('[name="id"]').value

    // BEGIN IF ////////////////////////////////////////
    if (!id) { // IF DOG DOESN'T HAVE AN ID (i.e. NEW DOG) //////////
      fetch("http://localhost:3000/dogs", {
        method: "POST",
        body: JSON.stringify({name: name, breed: breed, sex: sex}),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then(r => r.json())
        .then(newDog => {
          tableBody.innerHTML += `
            <tr id="${newDog.id}">
              <td>${newDog.name}</td>
              <td>${newDog.breed}</td>
              <td>${newDog.sex}</td>
              <td style="display: none;">${newDog.id}</td>
              <td>
                <a href="#top-of-form"><button class="edit-btn">Edit Dog</button></a>
              </td>
            </tr>
          `
      })
    } else { // IF DOG HAS AN ID (i.e. EDIT DOG) //////////
      fetch(`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({name: name, breed: breed, sex: sex})
      })
        .then(r => r.json())
        .then(editDog => {
          const tableCopy = [...tableBody.children]

          editedRow = tableCopy.filter((tr) => {
          	return tr.id == editDog.id
          })[0]

          editedRow.children[0].innerText = editDog.name
          editedRow.children[1].innerText = editDog.breed
          editedRow.children[2].innerText = editDog.sex

          dogForm.querySelector('[name="id"]').value = ""
          formTitle.innerText = "Create New Dog"
      })
    }
    // END IF ////////////////////////////////////////

    dogForm.reset()
  })
  // END NEW DOG ////////////////////


  // BEGIN EDIT DOG ////////////////////
  tableBody.addEventListener("click", (e) => {
    formTitle.innerText = "Edit Existing Dog"

    if (e.target.className === "edit-btn") {
      const currRow = e.target.closest("tr")

      for (const i of [0,1,2,3]) {
        dogForm.children[i].value = currRow.children[i].innerText
      }
    }
  })
  // END EDIT DOG ////////////////////

})
