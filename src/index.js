document.addEventListener('DOMContentLoaded', () => {
  const registeredDogs = document.querySelector("#table-body")
  // console.log(registeredDogs)
  const dogName = document.querySelector("#dog-name")
  const dogBreed = document.querySelector("#dog-breed")
  const dogSex = document.querySelector("#dog-sex")
  const form = document.querySelector("#dog-form")

  const show = function(dog){
    registeredDogs.innerHTML += `
    <tr id=${dog.id}>
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex[0].toUpperCase()}</td>
      <td><button id=${dog.id}>  Edit Dog </button></td>
    </tr>`
  }

  fetch("http://localhost:3000/dogs",{method:"GET"})
  .then(res => res.json())
  .then(function(dogs){
    registeredDogs.innerHTML = ""
    dogs.forEach(show)


    registeredDogs.addEventListener('click',function(e){
      // e.target.id returns the id of the dog that we clicked
      const editDog = parseInt(e.target.id)
      const thisDog = dogs.find(function(dog){
        return dog.id === editDog
      })
      dogName.value = thisDog.name
      dogBreed.value = thisDog.breed
      dogSex.value = thisDog.sex

      form.addEventListener("submit",function(e){
        e.preventDefault()
        console.log("sumbbited")
        fetch(`http://localhost:3000/dogs/${thisDog.id}`,{
          method:"PATCH",
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
          },
          body: JSON.stringify({name: dogName.value, breed:dogBreed.value, sex: dogSex.value}),
          })
          .then(function(res){
            fetch("http://localhost:3000/dogs",{method:"GET"})
            .then(res => res.json())
            .then(function(newDogs){
              registeredDogs.innerHTML = ""
              newDogs.forEach(show)
            })
          })
        })
    })

  })//end of fetch
})//DOMContentLoaded
