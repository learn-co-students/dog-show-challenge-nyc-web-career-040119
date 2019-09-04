document.addEventListener('DOMContentLoaded', () => {

  let dogTable = document.querySelector("#table-body");
  const dogEditForm = document.querySelector("#dog-form");

  fetch('http://localhost:3000/dogs')
    .then(function(res){
      return res.json();
    })
    .then(function(dogs){
      console.log(dogs);


      // RENDERING REGISTERED DOGS
      for(dog of dogs){
        dogTable.innerHTML += `
          <tr>
            <td class='padding center'>${dog.name}</td>
            <td class='padding center'>${dog.breed}</td>
            <td class='padding center'>${dog.sex}</td>
            <td class='padding center'>
              <button id=${dog.id}>Edit</button>
            </td>
          </tr>
        `
      }; // ENDING ITERATION


      // EDIT BUTTON
      dogTable.addEventListener('click', function(e){

        const editBtn = e.target;
        const dogId = editBtn.id;
        const name = dogEditForm.name;
        const breed = dogEditForm.breed;
        const sex = dogEditForm.sex;
        const dogName = editBtn.parentNode.parentNode.firstElementChild;

        name.value += `${dogName.innerText}`;
        breed.value += `${dogName.nextElementSibling.innerText}`;
        sex.value += `${dogName.nextElementSibling.nextElementSibling.innerText}`;


        // SUBMIT AND UPDATE DOG
        dogEditForm.addEventListener("submit", function(){

          fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: "PATCH",
            headers:{
              'Content-Type': 'application/json',
              Accept: "application/json" },
              body: JSON.stringify({
                "name": name.value,
                "breed": breed.value,
                "sex": sex.value
              })
            })
            .then(function(res){
              return res.json();
            })
            .then(function(update){
              console.log(update)

              dogTable.innerHTML += `
                <tr>
                  <td class='padding center'>${update.name}</td>
                  <td class='padding center'>${update.breed}</td>
                  <td class='padding center'>${update.sex}</td>
                  <td class='padding center'>
                    <button id=${update.id}>Edit</button>
                  </td>
                </tr>
              `
            }); // ENDING PATCH FETCH

          dogEditForm.reset();
        }); // ENDING SUBMIT EVENT LISTENER

      }); // ENDING EDIT BUTTON

    }); // ENDING GET FETCH

}) // ENDING DOM DOMContentLoaded
