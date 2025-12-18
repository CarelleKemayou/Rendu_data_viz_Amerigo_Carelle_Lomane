// 1. Dictionnaire de couleurs
const couleurParGenre = {
    'International Movies': '#767676',
    'Dramas': '#E50914', 'Drama': '#E50914',
    'Documentaries': '#3DBB3D', 'Documentary': '#3DBB3D', 'Animals & Nature': '#3DBB3D',
    'Comedies': '#FFCC00', 'Comedy': '#FFCC00',
    'Action': '#e17800', 'Action-Adventure': '#e17800',
    'Animation': '#ec75a7',
    'Family': '#146EB4',
    'Suspense': '#6e1c91',
    'Kids': '#00bcd4',
    'International TV Shows': '#9e9e9e',
    'TV Dramas': '#d32f2f',
    'Independent Movies': '#7b1fa2',
    'Children & Family Movies': '#1976d2',
    'Romantic Movies': '#c2185b'
};

// 2. Fonction de création de tableau
function createTable(containerId, platformName, labels, data) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error("Container non trouvé :", containerId);
        return;
    }

    if (!labels || !data) {
        console.error("Données manquantes pour :", platformName);
        return;
    }

    let html = `
        <div class="table-wrapper">
            <h3 class="table-title" style="color:white; text-align:center; margin-top:20px;">${platformName}</h3>
            <table class="category-table" style="width:100%; color:white; border-collapse: collapse;">
                <thead>
                    <tr style="background:#222; border-bottom: 2px solid #444;">
                        <th style="padding:10px; text-align:center;">#</th>
                        <th style="padding:10px; text-align:left;">Genre</th>
                        <th style="padding:10px; text-align:center;">%</th>
                    </tr>
                </thead>
                <tbody>`;

    // Top 5 uniquement
    const limit = Math.min(labels.length, 5);
    for (let i = 0; i < limit; i++) {
        const label = labels[i];
        const percent = data[i] ? data[i].toFixed(1) : "0.0";
        const color = couleurParGenre[label] || '#F5F5F1';
        html += `
            <tr style="border-bottom: 1px solid #333; background: rgba(255,255,255,0.02);">
                <td style="padding:10px; text-align:center; font-weight:bold;">${i + 1}</td>
                <td style="padding:10px; color: ${color}; font-weight: bold;">${label}</td>
                <td style="padding:10px; text-align:center;">${percent}%</td>
            </tr>`;
    }

    html += `</tbody></table></div>`;
    container.innerHTML = html;
}

// 3. Création des tableaux directement
console.log("Création des tableaux...");

if (typeof category_Netflix !== 'undefined' && typeof Netflix_percent !== 'undefined') {
    createTable('Netflix', '🎬 NETFLIX - Top 5 Genres', category_Netflix, Netflix_percent);
    createTable('Amazon', '🎥 AMAZON PRIME - Top 5 Genres', category_Amazon_Prime, Amazon_Prime_percent);
    createTable('Disney', '✨ DISNEY+ - Top 5 Genres', category_Disneyplus, Disneyplus_percent);
    createTable('Hulu', '📺 HULU - Top 5 Genres', category_Hulu, Hulu_percent);
    console.log("✅ Tableaux créés avec succès");
} else {
    console.error("❌ Variables manquantes. Vérifiez l'ordre des scripts");
}