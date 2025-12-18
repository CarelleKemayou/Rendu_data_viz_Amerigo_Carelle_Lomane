// On attend que le HTML soit chargé
document.addEventListener("DOMContentLoaded", function () {

    const canvas = document.getElementById("Nombre_de_films_sorties_par_annee");

    // Vérification que le canvas existe bien dans le HTML
    if (canvas) {
        const ctx_film = canvas.getContext('2d'); // AJOUT DU CONTEXTE '2d'

        // Fonction pour créer un dégradé de lueur sous la ligne
        function createGlow(color) {
            const g = ctx_film.createLinearGradient(0, 0, 0, 400);
            // Correction de la manipulation de couleur pour accepter l'Hexadécimal (#)
            let rgbaColor = color;
            if (color.startsWith('#')) {
                const r = parseInt(color.slice(1, 3), 16);
                const g_col = parseInt(color.slice(3, 5), 16);
                const b = parseInt(color.slice(5, 7), 16);
                rgbaColor = `rgba(${r}, ${g_col}, ${b}, 0.3)`;
            }
            g.addColorStop(0, rgbaColor);
            g.addColorStop(1, 'rgba(0, 0, 0, 0)');
            return g;
        }

        new Chart(ctx_film, {
            type: 'line',
            data: {
                labels: year_added,
                datasets: [{
                    label: 'Disney+',
                    data: Disney_Plus,
                    borderColor: '#FFCC00',
                    backgroundColor: createGlow('#FFCC00'),
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 0
                }, {
                    label: 'Hulu',
                    data: Hulu,
                    borderColor: '#3DBB3D',
                    backgroundColor: createGlow('#3DBB3D'),
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 0
                }, {
                    label: 'Netflix',
                    data: Netflix,
                    borderColor: '#E50914',
                    backgroundColor: createGlow('#E50914'),
                    fill: true,
                    tension: 0.4,
                    borderWidth: 4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "Nombre de films que les plateformes sortent au cours du temps",
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
                    legend: { labels: { color: '#E0E0E0', font: { size: 12 } } }
                },
                scales: {
                    x: {
                        ticks: { color: '#B0B0B0' },
                        grid: { display: false }
                    },
                    y: {
                        ticks: { color: '#B0B0B0' },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    }
                }
            }
        });
    } else {
        console.error("Canvas non trouvé : vérifiez l'ID dans votre HTML");
    }
});