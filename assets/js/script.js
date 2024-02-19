
const ammount = document.getElementById('clp')
const convertir = document.getElementById('convert');
const currencyOptions = document.getElementById('xCurrency')
const total = document.getElementById('total')


const renderHTML = (data) => {
    
    const serieArray = data.serie.slice(0, 10)
    const datesArray = serieArray.map((d)=> d.fecha.slice(0, 10))
    const valuesArray = serieArray.map((d)=> d.valor)
    
    let calculo = parseFloat(ammount.value) / parseFloat(data.serie[0].valor);

    total.innerHTML = `Resultado: ${ calculo.toFixed(3) }`


    new Chart("myChart", {
        type: "line",
        data: {
          labels: datesArray.reverse(),
          datasets: [{
            fill: true,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: valuesArray.reverse()
          }]
        },
        options: {
          legend: {display: false}
        }
    })
    
}


async function getData() {
    try {
        if(ammount.value){
            const currName = currencyOptions.value
            const url = `https://mindicador.cl/api/${currName}`
            const response = await fetch(`${url}`)
            const data = await response.json()
            renderHTML(data)   
        } else {
            alert("Debes ingresar un monto el Pesos")
        }
    } catch (error) {
        alert(error.message)
    }
}

convertir.addEventListener("click", getData);
