document.addEventListener('DOMContentLoaded', () => {

  const dgIds = []
  let oddDogs;
  let odds;

  const dogTable = document.getElementById("table-body")
  const form = document.querySelector('#dog-form')

  function frmVal(field){
    return form.childNodes[field].value
  }

  function editFrmVal(field, input){
    //fields 1 = name, 3 = breed, 5 = sex
    return form.childNodes[field].value = input
  }

  fetch('http://localhost:3000/dogs')
  .then(function(resp){
    return resp.json()
  })
  .then(function(dogList){

    // for(i in dogList){
    //   dgIds.push(dogList[i].id)
    //   oddDogs = dgIds.filter(num => num % 2 === 1)
    //
    //  tried to make a way to loop through the trs, probably would've worked with for(dog in dogList), instead of for of
    // }

    for(dog of dogList){
      console.log()

      let tr = document.createElement('tr')
      tr.id = dog.id

      tr.innerHTML += `
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      `

      let td = document.createElement('td')
      let btn = document.createElement('button')

      btn.id = dog.id
      btn.innerText = 'Edit'

      td.append(btn)

      tr.appendChild(td)

      dogTable.appendChild(tr)


      btn.addEventListener('click', function(event){
        let trFind = document.getElementById(event.target.id)
        let tdFind = trFind.querySelectorAll('td')

        coo = event.target.id

        editFrmVal(1, tdFind[0].innerText)
        editFrmVal(3, tdFind[1].innerText)
        editFrmVal(5, tdFind[2].innerText)

        form.addEventListener('submit', function(e){
          e.preventDefault()

          fetch(`http://localhost:3000/dogs/${event.target.id}`, {
            method: 'PATCH',
            headers:
            {
              "content-type": "application/json",
              Accept: "application/json"
            },
              body: JSON.stringify({
                "name": frmVal(1),
                "breed": frmVal(3),
                "sex": frmVal(5)
            })

          })
          fetch(`http://localhost:3000/dogs`)
            .then(function(resp){
              resp.json()
            })
            .then(function(doggys){
              tdFind[0].innerText = frmVal(1)
              tdFind[1].innerText = frmVal(3)
              tdFind[2].innerText = frmVal(5)
          })
        })
      })


    }
  })
})
///can only edit one per submit, need to take submit button out of click eventListener
