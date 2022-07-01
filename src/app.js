const feedDisplay = document.querySelector('#feed')



fetch('http://localhost:8000/results')
    .then(response => response.json())
    .then(data => {
        data.forEach(drops => {
            const date = `<div><h3>` + drops.date + `</h3><p>` + drops.name + `</p></div>`
            feedDisplay.insertAdjacentHTML("beforeend", date)

        })
    })
    .catch(err => console.log(err))