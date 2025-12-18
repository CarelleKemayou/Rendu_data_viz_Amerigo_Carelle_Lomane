console.log("Donées reçues depuis le HTML:", index)

const ctx_avis = document.getElementById("Avis_moyen_par_plateforme");

new Chart(ctx_avis, {
    type: 'bar',
    data: {
        labels: index,
        // Datasets doit être un tableau [] contenant des objets {}
        datasets: [
            {
                label: 'Moyenne des avis IMDb',
                data: IMDb_Mean,
                borderWidth: 1,
                backgroundColor: '#ffc107cc', // Jaune pour IMDb
                borderColor: '#fdca32ff',
                yAxisID: 'yLeft'
            },
            {
                label: "Moyenne des avis Rotten Tomatoes",
                data: Rotten_Tomatoes_Mean,
                borderWidth: 1,
                backgroundColor: '#ff5252cc', // Rouge pour Rotten Tomatoes
                borderColor: '#ff6262ff',
                yAxisID: 'yLeft'
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                ticks: { color: '#E0E0E0' }, // Couleur des noms des plateformes
                grid: { color: 'rgba(255, 255, 255, 0.1)' }, // Grille discrète
                title: {
                    display: true,
                    text: "Plateformes",
                    color: '#E0E0E0', // Couleur du titre X
                    font: { size: 16, weight: 'bold' }
                }
            },
            yLeft: {
                ticks: { color: '#E0E0E0' }, // Couleur des chiffres 
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                title: {
                    display: true,
                    text: 'Note Moyenne',
                    color: '#E0E0E0' // Couleur du titre Y
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Pourcentage des avis moyen sur la plateforme',
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
                labels: { color: '#E0E0E0' } // Couleur de la légende (IMDb / Rotten)
            }
        }
    }
});