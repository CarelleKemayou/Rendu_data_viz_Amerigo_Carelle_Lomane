document.addEventListener("DOMContentLoaded", function () {
    const canvasPrix = document.getElementById("prix_service_par_mois");

    if (canvasPrix) {
        const ctx_prix = canvasPrix.getContext('2d');

        new Chart(ctx_prix, {
            type: 'line',
            data: {
                labels: date,
                datasets: [{
                    label: 'Netflix',
                    data: Netflix_prix,
                    borderColor: '#E50914',
                    fill: false, // On désactive le remplissage
                    tension: 0.4,
                    borderWidth: 4,
                    pointRadius: 0
                }, {
                    label: 'Hulu',
                    data: Hulu_prix,
                    borderColor: '#3DBB3D',
                    fill: false,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 0
                }, {
                    label: 'Disney+',
                    data: Disneyplus_prix,
                    borderColor: '#FFCC00',
                    fill: false,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 0
                }, {
                    label: 'Amazon Prime',
                    data: Amazon_Prime_prix,
                    borderColor: '#00A8E1',
                    fill: false,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
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
        document.addEventListener("DOMContentLoaded", function () {
            const canvasPrix = document.getElementById("prix_service_par_mois");

            if (canvasPrix) {
                const ctx_prix = canvasPrix.getContext('2d');

                new Chart(ctx_prix, {
                    type: 'line',
                    data: {
                        labels: date,
                        datasets: [{
                            label: 'Netflix',
                            data: Netflix_prix,
                            borderColor: '#E50914',
                            fill: false, // On désactive le remplissage
                            tension: 0.4,
                            borderWidth: 4,
                            pointRadius: 0
                        }, {
                            label: 'Hulu',
                            data: Hulu_prix,
                            borderColor: '#3DBB3D',
                            fill: false,
                            tension: 0.4,
                            borderWidth: 3,
                            pointRadius: 0
                        }, {
                            label: 'Disney+',
                            data: Disneyplus_prix,
                            borderColor: '#FFCC00',
                            fill: false,
                            tension: 0.4,
                            borderWidth: 3,
                            pointRadius: 0
                        }, {
                            label: 'Amazon Prime',
                            data: Amazon_Prime_prix,
                            borderColor: '#00A8E1',
                            fill: false,
                            tension: 0.4,
                            borderWidth: 3,
                            pointRadius: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: "évolution du prix du services des plateformes par mois au cours du temps",
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
            }
        })
    }
})
