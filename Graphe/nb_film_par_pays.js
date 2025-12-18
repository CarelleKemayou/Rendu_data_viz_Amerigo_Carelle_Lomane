console.log("Données de distribution par pays chargées.");

const ctx_Netflix = document.getElementById("USA/autrs_Netflix");
if (ctx_Netflix) {
    new Chart(ctx_Netflix, {
        type: 'doughnut',
        data: {
            labels: index,
            datasets: [
                {
                    data: Netflixpercent,
                    backgroundColor: ['#E50914', '#720006ff']
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Netflix',
                    color: '#E0E0E0',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    labels: { color: '#ffffff' }
                }
            }
        }
    });
}

const ctx_Amazon = document.getElementById("USA/autrs_AmazonPrime");
if (ctx_Amazon) {
    new Chart(ctx_Amazon, {
        type: 'doughnut',
        data: {
            labels: index,
            datasets: [
                {
                    data: AmazonPrime_percent,
                    backgroundColor: ['#00A8E1', '#232F3E']
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Amazon Prime',
                    color: '#E0E0E0',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    labels: { color: '#ffffff' }
                }
            }
        }
    });
}

const ctx_Disney = document.getElementById("USA/autrs_Disney");
if (ctx_Disney) {
    new Chart(ctx_Disney, {
        type: 'doughnut',
        data: {
            labels: index,
            datasets: [
                {
                    data: Disney_plus_percent,
                    backgroundColor: ['#f7eab8ff', '#FFCC00']
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Disney+',
                    color: '#E0E0E0',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    labels: { color: '#ffffff' }
                }
            }
        }
    });
}

const ctx_Hulu = document.getElementById("USA/autrs_Hulu");
if (ctx_Hulu) {
    new Chart(ctx_Hulu, {
        type: 'doughnut',
        data: {
            labels: index,
            datasets: [
                {
                    data: Hulupercent,
                    backgroundColor: ['#3DBB3D', '#215c21ff']
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Hulu',
                    color: '#E0E0E0',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    labels: { color: '#ffffff' }
                }
            }
        }
    });
}