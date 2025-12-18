console.log("Données reçues depuis le HTML:", Platform)

const ctx_note = document.getElementById("Nb_film_bien_note");

new Chart(ctx_note, {
    type: 'bar',
    data: {
        labels: Platform,
        datasets: [
            {
                label: 'IMDb',
                data: IMDb_Count,
                borderWidth: 1,
                backgroundColor: '#ffc107cc',
                borderColor: '#fdca32ff',
                yAxisID: 'yLeft'
            },
            {
                label: "Rotten Tomatoes",
                data: Rotten_Tomatoes_Count,
                borderWidth: 1,
                backgroundColor: '#ff5252cc',
                borderColor: '#ff6262ff',
                yAxisID: 'yLeft'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                ticks: { color: '#E0E0E0' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                title: {
                    display: true,
                    text: "Plateformes",
                    color: '#E0E0E0',
                    font: { size: 16, weight: 'bold' }
                }
            },
            yLeft: {
                stacked: true,
                ticks: { color: '#E0E0E0' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                title: {
                    display: true,
                    text: 'Nombre de note supérieur a 7/10',
                    color: '#E0E0E0'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Nombre de films bien noté par plateforme',
                color: '#E0E0E0',
                font: {
                    size: 20,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            legend: {
                labels: { color: '#E0E0E0' }
            }
        }
    }
});