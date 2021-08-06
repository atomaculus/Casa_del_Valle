// funcion para guardar en local storage
function saveLocalStorage(key, item) {
    let stringifiedItem = JSON.stringify(item);
    localStorage.setItem(key, stringifiedItem);
}

// funcion para traer el elemento del local storage
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// function getLocalStorageString(key) {
//     return JSON.stringify(localStorage.getItem(key));
// }

let selectorPersonas = document.querySelector('#selectorPersonas')
let amPm = document.querySelectorAll('.amPm')
let horarioEspecificoAm = document.querySelectorAll('.horarioEspecificoAm')
let horarioEspecificoPm = document.querySelectorAll('.horarioEspecificoPm')
let btnArmador = document.querySelector('#btnArmador')
let comensales = document.querySelector('#comensales')
let btnCantidadBurgas = document.querySelector('#btnCantidadBurgas')
let seccionIngredientes = document.querySelectorAll('.seccionIngredientes')
let aclaraciones = document.querySelector('textarea')
let btnSubmit = document.querySelector('#btnSubmit')
let btnReset = document.querySelector('#btnReset')
let seccionPrueba = document.querySelector('sectionPrueba')
let arrayIngr = []
let arrayHamburgesas = []



selectorPersonas.addEventListener('change', () => saveLocalStorage("cantidad", selectorPersonas.value))

// //Aca llevo el valor al LS
// amPm.forEach(amPm => amPm.addEventListener('change', () => saveLocalStorage("momento", amPm.value)))
// //Aca me lo traigo para el if
// amPm = getLocalStorage("momento")

amPm.forEach(element => {
    element.addEventListener("click", function () {
        console.log(element)
        if (element.value === "mediodia") {
            horarioEspecificoPm.forEach(horario => {
                horario.classList.add("claseDisable")
            })
            horarioEspecificoAm.forEach(horario => {
                horario.classList.remove("claseDisable")
            })
        } else if (element.value === "noche") {
            horarioEspecificoAm.forEach(horario => {
                horario.classList.add("claseDisable")
            })
            horarioEspecificoPm.forEach(horario => {
                horario.classList.remove("claseDisable")
            })
        }
    })
})

$("#btnArmador").click(function (evento) {
    console.log("hola btn anda bien")

    $("#seccionArmadora").toggleClass("claseDisable")
});


// btnArmador.addEventListener("click", () => {

//     seccionArmadora.classList.remove("claseDisable")
//     seccionIngredientes.forEach(ingrediente => {
//         ingrediente.checked = false
//     })
// })



//comensales.innerHTML = `${selectorPersonas.value} hamburguesas` //VER ESTO

comensales.innerHTML = `${getLocalStorage("cantidad")} hamburguesas` //VER ESTO

btnCantidadBurgas.addEventListener("click", () => saveLocalStorage("cantidad brgr", btnCantidadBurgas.value))
let amntBrgrEnNum = Number(getLocalStorage("cantidad brgr"))
console.log(amntBrgrEnNum)

//events listeners de la seleccion de ingredientes 




seccionIngredientes.forEach(element => {
    element.addEventListener("change", function () {
        console.log(element)
        if (element.checked == true) {

            arrayIngr.push(element.value)


        }
    })
})
if (getLocalStorage("hambur") != null) {
    arrayHamburgesas = getLocalStorage("hambur");
}



$("#btnSubmit").click(function (event) {
    console.log("jquery anda bien")
    event.preventDefault();
    let contenedor = document.createElement("div")
    contenedor.innerHTML = `<div class="row bg-success">
    <h4 class="ml-5"> los ingredientes elegidos son ${arrayIngr}</h4>
</div>`
    document.body.appendChild(contenedor);

    arrayHamburgesas.push(new hamburgesasAlVapor(arrayIngr));

    saveLocalStorage("hambur", arrayHamburgesas);
})

// btnSubmit.addEventListener("click", function (event) {
//     event.preventDefault();
//     let contenedor = document.createElement("div")
//     contenedor.innerHTML = `<h4> los ingredientes elegidos son ${arrayIngr}</h4>`
//     document.body.appendChild(contenedor);

//     arrayHamburgesas.push(new hamburgesasAlVapor(arrayIngr));

//     saveLocalStorage("hambur", arrayHamburgesas);



// })

btnReset.addEventListener("click", function (event) {
    arrayIngr = [];
})



class hamburgesasAlVapor {
    constructor(ingredientes) {

        this.ingredientes = [...ingredientes]


    }
}


//AJAx y API 


// $.ajax({
//     method: 'GET',
//     url: 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/{1-4337_1_AL}',
//     // headers: {
//     //     'Access-Control-Allow-Origin': 'origin'
//     // }
// }).done((datos) => {
//     console.log(datos)
// }).fail((error) => {
//     console.log(error)
// }).always(() => {
//     console.log("completado bebote")
// })

const key = 4337;
const baseurl = "http://dataservice.accuweather.com";
const apikey = "yj4YSPmk73PG2GUnldHcXrl3JRsEHpAJ";

$.getJSON(`${baseurl}/locations/v1/cities/search`, {
        apikey: apikey,
        q: "San%20salvador%20de%20jujuy",
    })
    .then(function () {
        return $.getJSON(`${baseurl}/forecasts/v1/daily/5day/${key}`, {
            apikey: apikey,
            language: "es",
            metric: "true"
        });
    })
    .then(function (tempData) {
        const data = tempData;
        console.log(data);
        // console.log(data.DailyForecasts[0].Day.IconPhrase)
        crearCards(data)
    });




// $.ajax({
//     method: 'GET',
//     url: 'http://hp-api.herokuapp.com/api/characters/students',

// }).done((datos) => {
//     console.log(datos)
//     crearCards(datos)
// }).fail((error) => {
//     console.log(error)
// }).always(() => {
//     console.log("completado bebote")
// })

function crearCards(data) {
    $(data.DailyForecasts).each(function (element) {
        $("#contenedor2").append(`
        <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${data.DailyForecasts[element].Date}</h5>
                
                
                <p class="card-text">${data.DailyForecasts[element].Day.IconPhrase}, ${data.DailyForecasts[element].Temperature.Maximum.Value} <span>${data.DailyForecasts[element].Temperature.Maximum.Unit}</span></p>
            </div>
        </div>
        `);
    })
}

// function crearCards(data) {
//     console.log(data);

//     let contenedor2 = document.querySelector("#contenedor2")
//     $(data.DailyForecasts).each(function (index, tiempo) {
//         contenedor2.innerHTML = `
//         <div class="card" style="width: 18rem;">

//             <div class="card-body">
//                 <h5 class="card-title">${DailyForecasts[0].temperature}</h5>
//                 <p class="card-text"></p>
//             </div>
//         </div>
//         `
//         document.body.appendChild(contenedor2);
//     })
// }



fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: 'Hola',
            body: 'Rube como estas?',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));