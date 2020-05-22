let pais = '';
let confirmados =[];
let muertes = [];
let dias = [];
let promedioConfirmados = [];
let promedioMuertes = [];
let promedioMuertes7 = 0;
let recuperados = [];
let porcentajeMuertes = [];
let confirmadosDia = [];
let recuperadosDia = [];
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
        confirmados.push(data[i].Cases)
    }
    let urlFinal = 'https://covid19.mathdro.id/api/countries/' + pais;
    let resFinal = await fetch(urlFinal);
    let dataFinal = await resFinal.json();
    if(confirmados[confirmados.length - 1] !== dataFinal.confirmed.value) {
        confirmados.push(dataFinal.confirmed.value)
    }
    if(pais === 'Argentina') {
        confirmados[28] = 968;
        confirmados[32] = 1353;
        confirmados[19] = 225;
        confirmados[20] = 265;
        confirmados[21] = 301;
        
        
    }
}

async function cantidadRecuperados() {
    const url = 'https://api.covid19api.com/total/dayone/country/' + pais + '/status/recovered';
    let response = await fetch(url);
    let data = await response.json();
    for(i = 0; i < data.length; i++) {
        recuperados.push(data[i].Cases)
    }
    let urlFinal = 'https://covid19.mathdro.id/api/countries/' + pais;
    let resFinal = await fetch(urlFinal);
    let dataFinal = await resFinal.json();
    recuperados.push(dataFinal.recovered.value)
    
}

async function cantidadMuertos() {
    const url = 'https://api.covid19api.com/total/dayone/country/' + pais + '/status/deaths';
    let response = await fetch(url);
    let data = await response.json();
    for(i = 0; i < data.length; i++) {
        muertes.push(data[i].Cases)
    }
    let urlFinal = 'https://covid19.mathdro.id/api/countries/' + pais;
    let resFinal = await fetch(urlFinal);
    let dataFinal = await resFinal.json();
    muertes.push(dataFinal.deaths.value)
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
        porcentajeMuertes.push(parseInt((muertes[i] / confirmados [i]) * 1000) / 1000);
        
    };
}

function pordia() { 
    confirmadosDia.push(confirmados[0]); 
    muertesDia.push(muertes[0]);
    recuperadosDia.push(recuperados[0]);
    for(i = 1; i < confirmados.length; i ++) { 
        confirmadosDia.push(confirmados[i] - confirmados[i - 1]);
        muertesDia.push(muertes[i] - muertes[i - 1]);
        recuperadosDia.push(recuperados[i] - recuperados[i - 1]);
    }
}

function promedioMuertesSiete() {
    let diainicial = muertes.length - 8
    let muertestotal = 0
    for(i = 0; i < 7; i++) {
        muertestotal = muertestotal + muertesDia[diainicial + i]
    }
    promedioMuertes7 = muertestotal / 7
    console.log(promedioMuertes7)
}

async function card() {
    let tituloPais = document.querySelector('.card-title');
    tituloPais.innerHTML = '<p>' + pais + '<p>';
    let urlFinal = 'https://covid19.mathdro.id/api/countries/' + pais;
    let resFinal = await fetch(urlFinal);
    let dataFinal = await resFinal.json();
    console.log(dataFinal);
    let subtitulos = document.querySelectorAll('.card-subtitle');
    subtitulos[0].innerHTML = 'Infectados: ' + new Intl.NumberFormat("de-DE").format(dataFinal.confirmed.value);
    subtitulos[1].innerHTML = 'Muertes: ' + new Intl.NumberFormat("de-DE").format(dataFinal.deaths.value);
    subtitulos[2].innerHTML = 'Recuperados: ' + new Intl.NumberFormat("de-DE").format(dataFinal.recovered.value);
    subtitulos[3].innerHTML = 'Promedio Muertes x Día (últimos 7 días): ' + Math.round(promedioMuertes7 * 100) / 100;
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
            label: "Recuperados x Día",
            data: recuperadosDia,
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
    await this.carga();
    await this.pordia();
    await this.grafico();
    await this.traerpaises();
    await this.promedioMuertesSiete();
    await this.card();
    
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