let pais = '';
let confirmados =[];
let muertes = [];
let dias = [];
let promedioConfirmados = [];
let promedioMuertes = [];
let recuperados = [];
let porcentajeMuertes = [];
let confirmadosDia = [];
let muertesDia = [];
let paises = [];

if(localStorage.pais) {
    pais = localStorage.pais;
} else {
    pais = 'Argentina'
}


async function cantidadConfirmados() {
    const url = 'https://api.covid19api.com/total/dayone/country/' + pais + '/status/confirmed';
    let response = await fetch(url);
    let data = await response.json();
    for(i = 0; i < data.length; i++) {
        if(i === data.length - 1) {
            let urlFinal = 'https://covid19.mathdro.id/api/countries/' + pais;
            let resFinal = await fetch(urlFinal);
            let dataFinal = await resFinal.json();
            confirmados.push(dataFinal.confirmed.value)
        } else {
            confirmados.push(data[i].Cases)
        }
    }
    if(pais === 'Argentina') {
        confirmados[28] = 968;
        
    }
}

async function cantidadRecuperados() {
    const url = 'https://api.covid19api.com/total/dayone/country/' + pais + '/status/recovered';
    let response = await fetch(url);
    let data = await response.json();
    for(i = 0; i < data.length; i++) {
        if(i === data.length - 1) {
            let urlFinal = 'https://covid19.mathdro.id/api/countries/' + pais;
            let resFinal = await fetch(urlFinal);
            let dataFinal = await resFinal.json();
            recuperados.push(dataFinal.recovered.value)
        } else {
            recuperados.push(data[i].Cases)
        }
        
    }
}

async function cantidadMuertos() {
    const url = 'https://api.covid19api.com/total/dayone/country/' + pais + '/status/deaths';
    let response = await fetch(url);
    let data = await response.json();
    for(i = 0; i < data.length; i++) {
        if(i === data.length - 1) {
            let urlFinal = 'https://covid19.mathdro.id/api/countries/' + pais;
            let resFinal = await fetch(urlFinal);
            let dataFinal = await resFinal.json();
            muertes.push(dataFinal.deaths.value)
        } else {
            muertes.push(data[i].Cases)
        }
        
    }
}

async function traerpaises() {
    let url = 'https://covid19.mathdro.id/api/countries';
    let response = await fetch(url);
    let data = await response.json();
    for(i = 0; i < data.countries.length; i ++) {
        paises.push(await data.countries[i].name);
    }
}

async function carga() {
    await cantidadConfirmados();
    await cantidadMuertos();
    await cantidadRecuperados();
    for(i = 0; i < confirmados.length; i++) {
        dias.push(i + 1)
        promedioConfirmados.push(parseInt((confirmados[i] / dias [i]) * 100) / 100);
        promedioMuertes.push(parseInt((muertes[i] / dias [i]) * 100) / 100);
        porcentajeMuertes.push(parseInt((muertes[i] / confirmados [i]) * 1000) / 1000)
        
    };
}

function pordia() { 
    confirmadosDia.push(confirmados[0]); 
    muertesDia.push(muertes[0]);
    for(i = 1; i < confirmados.length; i ++) { 
        confirmadosDia.push(confirmados[i] - confirmados[i - 1]);
        muertesDia.push(muertes[i] - muertes [i - 1]);
    }
}

async function card() {
    let tituloPais = document.querySelector('.card-title');
    tituloPais.innerHTML = '<p>' + pais + '<p>';
    let urlFinal = 'https://covid19.mathdro.id/api/countries/' + pais;
    let resFinal = await fetch(urlFinal);
    let dataFinal = await resFinal.json();
    console.log(dataFinal);
    let subtitulos = document.querySelectorAll('.card-subtitle');
    subtitulos[0].innerHTML = 'Infectados: ' + await new Intl.NumberFormat("de-DE").format(dataFinal.confirmed.value);
    subtitulos[1].innerHTML = 'Muertes: ' + await new Intl.NumberFormat("de-DE").format(dataFinal.deaths.value);
    subtitulos[2].innerHTML = 'Recuperados: ' + await new Intl.NumberFormat("de-DE").format(dataFinal.recovered.value);
}

async function grafico() {
    var ctxL =  await document.getElementById("lineChart").getContext('2d');
    var myLineChart = await new Chart(ctxL, {
        type: 'line',
        data: {
        labels: dias,
        datasets: [{
        label: "Total Infectados",
        data: confirmados,
        backgroundColor: [
        'rgba(0, 0, 255, .2)',
        ],
        borderColor: [
        'rgba(0, 0, 255, .7)',
        ],
        borderWidth: 1
        },
        {
        label: "Infectados x Día",
        data: confirmadosDia,
        backgroundColor: [
        'rgba(0, 0, 255, .2)',
        ],
        borderColor: [
        'rgba(0, 0, 255, .7)',
        ],
        borderWidth: 1
        },
        {
        label: "Total Muertes",
        data: muertes,
        backgroundColor: [
        'rgba(255, 0, 0, .2)',
        ],
        borderColor: [
        'rgba(255, 0, 0, .7)',
        ],
        borderWidth: 1
        },
        {
        label: "Muertes x Día",
        data: muertesDia,
        backgroundColor: [
        'rgba(255, 0, 0, .2)',
        ],
        borderColor: [
        'rgba(255, 0, 0, .7)',
        ],
        borderWidth: 1
        },
        {
        label: "Recuperados",
        data: recuperados,
        backgroundColor: [
        'rgba(0, 255, 0, .2)',
        ],
        borderColor: [
        'rgba(0, 255, 0, .7)',
        ],
        borderWidth: 1
        },
        {
        label: "Promedio Infectados por Día",
        data: promedioConfirmados,
        backgroundColor: [
        'rgba(0, 0, 255, .5)',
        ],
        borderColor: [
        'rgba(0, 0, 255, 1)',
        ],
        borderWidth: 1
        },
        {
        label: "Promedio Muertes por Día",
        data: promedioMuertes,
        backgroundColor: [
        'rgba(255, 0, 0, .5)',
        ],
        borderColor: [
        'rgba(255, 0, 0, 1)',
        ],
        borderWidth: 1
        },
        {
        label: "Porcentaje Muertes / Infectados",
        data: porcentajeMuertes,
        backgroundColor: [
        'rgba(0, 0, 0, .5)',
        ],
        borderColor: [
        'rgba(0, 0, 0, 1)',
        ],
        borderWidth: 1
        }
        ]
        },
        options: {
        responsive: true
        }
    });
}   

window.onload = async function() {
    await this.card();
    await this.carga();
    await this.pordia();
    await this.grafico();
    await this.traerpaises();
    
    let lista = await document.getElementById('paises');
    lista.innerHTML = '<option value="' + pais + '">' + pais + '</option>';
    for (i = 0; i < paises.length; i++) {
        lista.innerHTML = lista.innerHTML + '<option value="' + paises[i] + '">' + paises[i] + '</option>';
    }
    lista.addEventListener('change', (e) => {
        pais = e.target.value;
        this.localStorage.setItem('pais', pais);
        this.location.reload();
    })
}