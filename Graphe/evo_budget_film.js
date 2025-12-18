console.log("Données de budget chargées :", Average_Budget);

const canvas_budget = document.getElementById('evo_budget');
if (canvas_budget) {
    const ctx_budget = canvas_budget.getContext('2d');

    // Création du dégradé (on le laisse tel quel)
    const revenueGradient = ctx_budget.createLinearGradient(0, 0, 0, 400);
    revenueGradient.addColorStop(0, 'rgba(75, 192, 192, 0.4)');
    revenueGradient.addColorStop(1, 'rgba(75, 192, 192, 0)');

    // On définit l'index de départ
    const start = 22;

    new Chart(ctx_budget, {
        type: 'line',
        data: {
            // CORRECTION : .slice() au lieu de .slide()
            labels: year_release.slice(start),
            datasets: [{
                label: 'Budget Moyen',
                data: Average_Budget.slice(start),
                borderColor: '#FFD700',
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 2
            }, {
                label: 'Revenu Moyen',
                // CORRECTION : on ajoute .slice() ici aussi pour l'alignement
                data: Average_Revenue.slice(start),
                borderColor: 'rgb(75, 192, 192)',
                // CORRECTION : on retire le .slice() sur le gradient
                backgroundColor: revenueGradient,
                fill: true,
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "évolution du revenu et du budget de production d'un film au cours du temps",
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
                legend: { labels: { color: '#E0E0E0' } }
            },
            scales: {
                x: {
                    ticks: { color: '#B0B0B0' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: '#B0B0B0' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                }
            }
        }
    });
} else {
    console.error("Canvas 'evo_budget' non trouvé !");
}