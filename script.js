let pais = 'Italy';
        let confirmados =[];
        let muertes = [];
        let dias = [];
        let promedioConfirmados = [];
        let promedioMuertes = [];
        let recuperados = [];
        let porcentajeMuertes = [];
        let confirmadosDia =[];

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





        window.onload = async function() {
            await cantidadConfirmados();
            await cantidadMuertos();
            await cantidadRecuperados();
            for(i = 0; i < confirmados.length; i++) {
                dias.push(i + 1)
                promedioConfirmados.push(parseInt((confirmados[i] / dias [i]) * 100) / 100);
                promedioMuertes.push(parseInt((muertes[i] / dias [i]) * 100) / 100);
                porcentajeMuertes.push(parseInt((muertes[i] / confirmados [i]) * 1000) / 1000)
                if(i = 0) {
                    confirmadosDia.push = confirmados[i];
                } else {
                    confirmadosDia.push = confirmados[i] - confirmados[i - 1];
                }
            };
            var ctxL = document.getElementById("lineChart").getContext('2d');
            var myLineChart = new Chart(ctxL, {
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
                borderWidth: 2
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
                    borderWidth: 2
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
                borderWidth: 2
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
                borderWidth: 2
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
                borderWidth: 2
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
                borderWidth: 2
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
                borderWidth: 2
                }
                ]
                },
                options: {
                responsive: true
                }
            });

        }