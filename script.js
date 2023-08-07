import { fetchApi } from "./fetch.js";


let temperatures = [];
let stations = []

const rgbaBlueColor = 'rgba(54, 162, 235, 0.2)'
const rgbBlueColor = 'rgb(54, 162, 235)'

const rgbaOrangeColor = 'rgba(255, 159, 64, 0.2)';
const rgbOrangeColor = 'rgb(255, 159, 64)'


async function renderData() {

    const weathers = await fetchApi('https://api.gael.cloud/general/public/clima')

    temperatures = weathers.map(weather => weather.Temp)
    stations = weathers.map(weather => weather.Estacion)


    //console.log(temperatures)
    //console.log(stations)

    const backgroundColors = temperatures.map(temperature => temperature > 0 ? rgbaOrangeColor : rgbaBlueColor)
    const bordersColors = temperatures.map(temperature => temperature > 0 ? rgbOrangeColor : rgbBlueColor)

    console.log(backgroundColors)

    const ctx = document.getElementById('myChart');


    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stations,    // aqui debe ir Estacion (referencia geografica)
            datasets: [{
                label: 'Temperatura',
                data: temperatures,     // aqui debe ir Temperatura (magnitud)
                borderWidth: 1,
                backgroundColor: backgroundColors,   
                borderColor: bordersColors 
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                
                //title: {
                  //  display: true,
                  //  text: 'Temperatura Ciudades de Chile',
                  //  padding: {
                  //      top: 30,
                  //      bottom: 30
                   // }
               // },

                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + '°';
                            }
                            return label;
                        }
                    }
                }
            }


        }
    });


    

}
renderData()







