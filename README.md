
# Projet dataviz:
## Creation d'une plateforme visiualisation de données

Le but de ce projet est de concevoir une plateforme de visualisation de données permettant de répondre à la problématique suivante :

**Pourquoi faut-il installer Netflix plutôt que les autres plateformes de streaming ?**                 

## Sources de données

La recherche de jeux de données capables de répondre à cette problématique a été effectuée sur **Kaggle**. Les sources suivantes ont été sélectionnées :

### Jeux de données Kaggle
Les datasets suivants sont téléchargés automatiquement via l’API Kaggle :
- Netflix — films et séries (https://www.kaggle.com/datasets/shivamb/netflix-shows/data)
- Hulu — films et séries (https://www.kaggle.com/datasets/shivamb/hulu-movies-and-tv-shows)
- Disney+ — films et séries (https://www.kaggle.com/datasets/shivamb/disney-movies-and-tv-shows)
- Amazon Prime Video — films et séries (https://www.kaggle.com/datasets/shivamb/amazon-prime-movies-and-tv-shows)
- Dataset global de films (budget, revenus) (https://www.kaggle.com/datasets/utkarshx27/movies-dataset)
- Dataset comparatif TV shows multi-plateformes avec notes IMDb et Rotten Tomatoes (https://www.kaggle.com/datasets/ruchi798/tv-shows-on-netflix-prime-video-hulu-and-disney)
- Prix des services de streaming (https://www.kaggle.com/datasets/webdevbadger/streaming-service-prices)

---

## Prérequis techniques

### Librairies Python utilisées
- `pandas`
- `numpy`
- `matplotlib`
- `json`
- `os`
- `kaggle`
- Navigateur moderne (Chrome, Firefox, Safari, Edge)
- Pas de serveur nécessaire (fichiers statiques)

### Clé API Kaggle
Le notebook attend un fichier local nommé (existe déjà dans le repo) :

```text
kaggle_api_key.txt
```
Contenu attendu :

* Ligne 1 : nom d’utilisateur Kaggle
* Ligne 2 : clé API Kaggle

Ces informations sont chargées dynamiquement comme variables d’environnement.

---

## Structure du projet (une fois que les notebooks ont été exécutés)

```text
project/
│── extract_transform_export.ipynb
│── README.md
│── data/
│── exports/
│── kaggle_api_key.txt
|── Exploration.ipynb
|── Variable/
├── index.html / Netflix.html / Genre.html / Social.html / Budget.html
├── Style.css
├── Graphe/
│   ├── nb_film_par_pays.js
│   ├── pie_category.js
│   ├── Mean_avis.js
│   ├── note_sup_7.js
│   ├── evo_budget_film.js
│   └── Nb_film_an.js
├── Variable/
└── Image/
---
```
## Comment exécuter le projet

1. Installer les dépendances Python
2. Créer ou utiliser le fichier `kaggle_api_key.txt`
3. Exécuter le notebook `extract_transform_export.ipynb`
4. Exécuter le notebook `Exploration.ipynb`
5. Ouvrir `Netflix.html` dans le navigateur
---

### Vérification
- Ouvrir Console (F12) pour vérifier l'absence d'erreurs
- Vérifier que tous les graphiques s'affichent
- Tester la responsivité (F12 → Responsive Mode)

## Rôle – Amerigo

### Étapes du pipeline

#### 1. Extraction des données

* Téléchargement automatique des datasets Kaggle avec l'api Kaggle
* Stockage local dans le dossier `data/` (créé automatiquement s'il n'existe pas)
* Chargement des fichiers CSV dans des DataFrames Pandas

#### 2. Mettre au Propre les données...

Principales opérations réalisées :

* Conversion des dates (`date_added`)
* Extraction de l’année d’ajout (`year_added`)
* Suppression de colonnes textuelles non pertinentes
* Créer les notes sous format numérique
* Conversion des montants financiers (budget, revenue)
* correction des valeurs aberrantes


#### 3. ...Transformations des données pour analyses
* Normalisation des valeurs manquantes
* Explosion des colonnes multi-valeurs (genres, pays)
* Calculs de volumes et pourcentages par plateforme
* Agrégations par pays, genre, année
* Filtrages spécifiques (ex. TV shows avec note > seuil)
* Pivotements de tables pour visualisations

#### 4. Analyses réalisées

* Répartition des genres par plateforme
* Comparaison de la diversité géographique (pays)
* Comparaison États-Unis vs reste du monde
* Analyse budget / revenus des films par année
* Analyse des séries TV par notes IMDb / Rotten Tomatoes
* Prix des abonnements par plateforme (sous conditions choisies)
* Nombre de films et séries ajoutés par année pour chaque plateforme

Visualisations exploratoires (graphiques)

---

### Export des résultats

Le notebook inclut une fonction utilitaire générique `export_to_json` permettant :

* de sélectionner ou non des colonnes,
* de renommer ou non des colonnes,
* d’inclure ou non les index,
* de convertir les dates en chaînes,
* de remplacer les valeurs manquantes en `null`,
* d’exporter les résultats dans un format JSON compatible web.

Tous les fichiers générés sont sauvegardés dans le dossier :

```text
exports/
```

Exemples de fichiers produits :

* `category_distribution_per_platform.json`
* `count_and_percentage_tv_shows_above_threshold_per_platform.json`

---

### Format des fichiers JSON

Les exports sont structurés de manière **colonne → liste**, par exemple :

```json
{
  "Category": [ ... ],
  "Netflix_count": [ ... ],
  "Netflix_percent": [ ... ],
  "Amazon Prime_count": [ ... ]
}
```

---


## Rôle – Carelle

- Développement de scripts Python pour convertir les fichiers JSON en fichiers JavaScript
- Formatage et nettoyage des données
- Recherche documentaire

---

### Convertisseur JSON vers JavaScript pour la visualisation de données

#### Description

Il garantit l’intégrité des données grâce à :
- la validation automatique des pourcentages,
- le formatage des dates,
- la gestion des valeurs nulles.

---

### Fonctionnalités

- **Traitement par lots** : conversion automatique de tous les fichiers JSON d’un répertoire
- **Correction des pourcentages** : validation et correction des colonnes de pourcentages pour qu’elles totalisent 100 %
- **Formatage des dates** : suppression des timestamps et des composants inutiles
- **Gestion des valeurs nulles** : conversion des valeurs Python `NaN` / `None` en `null` JavaScript
- **Ajout automatique de catégorie** : ajout de la catégorie `"Autres"` pour les données catégorielles
- **Normalisation des noms** : conversion des noms de colonnes en noms de variables JavaScript valides

---

### Fonctions principales

#### `get_100(liste)`

Valide et corrige une liste de pourcentages afin qu’elle totalise exactement **100 %**.

#### Fonctionnement

- Conversion de toutes les valeurs en `float`
- Calcul de la somme totale
- Si la somme est différente de 100, ajout automatique de la différence
- Retour de la liste corrigée

#### Paramètre

- `liste` (*list*) : liste de valeurs en pourcentage (chaînes ou nombres)

#### Retour

- `list` : liste corrigée totalisant 100 %

#### Exemple

```python
pourcentages = ['45.5', '30.2', '20.1']
corrige = get_100(pourcentages)
```

Résultat :

```python
[45.5, 30.2, 20.1, 4.2]
```

---

#### `export_all_columns(file_path, output_folder)`

Convertit un fichier JSON unique en déclarations de variables JavaScript.

#### Processus

- Lecture du fichier JSON dans un `DataFrame` pandas
- Extraction du nom du fichier pour le nommage de sortie
- Création du répertoire de sortie si nécessaire
- Pour chaque colonne :
  - conversion en liste,
  - gestion des valeurs nulles,
  - application d’un formatage spécifique selon le type de colonne,
  - écriture dans un fichier JavaScript.

#### Traitement spécial des colonnes

- Colonnes de pourcentage (`"percent"`) : correction pour totaliser 100 %
- Colonnes de catégorie (`"category"`) : ajout de la catégorie `Autres`
- Colonnes de date (`"date"`) : suppression des timestamps  
  *Exemple* : `Timestamp('2021-01-01 00:00:00')` → `2021-01-01`

#### Paramètres

- `file_path` (*str*) : chemin vers le fichier JSON d’entrée
- `output_folder` (*str*) : dossier de sortie pour les fichiers JavaScript

#### Format de sortie

```javascript
const nom_colonne = [valeur1, valeur2, valeur3, null, ...];
```

#### Transformations des noms

- Espaces → underscores : `"Nom Colonne"` → `Nom_Colonne`
- Signe `+` → `plus` : `"Disney+"` → `Disneyplus`

---

### `convert(folder_path, output_folder)`

Traite automatiquement tous les fichiers JSON présents dans un répertoire.

#### Fonctionnement

- Parcours de tous les fichiers du dossier source
- Filtrage des fichiers valides (exclusion des dossiers)
- Appel de `export_all_columns()` pour chaque fichier JSON
- Affichage de messages de progression dans la console

#### Paramètres

- `folder_path` (*str*) : dossier source contenant les fichiers JSON
- `output_folder` (*str*) : dossier de destination des fichiers JavaScript

#### Exemple d’utilisation

```python
convert('variables_json', 'variables_converties')
```

---

### Exemple de sortie console

```text
Traitement du fichier : category_distribution_per_platform.json
Colonne 'category_Netflix' corrigée.
Colonne 'category_Netflix' exportée.
Colonne 'Netflix_percent' corrigée.
Colonne 'Netflix_percent' exportée.
```

---

### Exemples d’utilisation

#### Conversion basique

```python
convert('dossier_entree', 'dossier_sortie')
```

#### Conversion d’un seul fichier

```python
export_all_columns('data/mes_donnees.json', 'sortie_js')
```

#### Correction de pourcentages uniquement

```python
donnees = ['25.5', '30.0', '40.0']
corrige = get_100(donnees)
print(corrige)
```

Résultat :

```python
[25.5, 30.0, 40.0, 4.5]
```

---

### Exemple entrée / sortie

#### JSON d’entrée (`distribution_categories.json`)

```json
{
  "category": ["Drame", "Comédie", "Action"],
  "count": [150, 120, 80],
  "percent": [45.5, 36.4, 24.2],
  "date_added": ["Timestamp('2021-01-01 00:00:00')", "Timestamp('2021-02-01 00:00:00')"]
}
```

#### JavaScript de sortie (`variables_distribution_categories.js`)

```javascript
const category = ["Drame", "Comédie", "Action", "Autres"];
const count = [150, 120, 80];
const percent = [45.5, 36.4, 24.2, -6.1]; // Ajusté pour totaliser 100 %
const date_added = ["2021-01-01", "2021-02-01"];
```

---

### Transformations de données

| Type d’entrée | Transformation | Exemple |
|--------------|----------------|---------|
| `NaN` / `None` | → `null` | `pd.NA` → `null` |
| Espaces dans les noms | → underscores | `Netflix Count` → `Netflix_Count` |
| `+` dans les noms | → `plus` | `Disney+` → `Disneyplus` |
| Timestamps | Nettoyage | `Timestamp('2021-01-01 00:00:00')` → `2021-01-01` |
| Pourcentages | Ajustés à 100 % | `[50, 30]` → `[50, 30, 20]` |
| Catégories | Ajout de `Autres` | `["A", "B"]` → `["A", "B", "Autres"]` |

---



## Rôle – Taraire Lomane

Développement complet de l'interface web et de la visualisation des données pour la plateforme de dashboard interactif.

## Pages Principales

### 1. **Netflix.html** - Page d'accueil
- Présentation générale de la problématique
- Statistiques clés sur Netflix vs concurrents
- Navigation vers les analyses détaillées

### 2. **Social.html** - Satisfaction & Avis
**Visualisations :**
- **Graphiques à barres superposées** : Moyenne des avis IMDb vs Rotten Tomatoes
- **Graphiques à barres** : Nombre de films bien notés (> 7/10) par plateforme

**Données affichées :**
- Notes moyennes par plateforme
- Comparaison IMDb et Rotten Tomatoes
- Volume de contenu bien noté

### 3. **Genre.html** - Analyse du Contenu
**Visualisations :**
- **Pie Charts (Doughnut)** : Répartition USA vs Rest of World pour chaque plateforme
- **Tableaux HTML Dynamiques** : Top 5 des genres par plateforme avec code couleur

**Données affichées :**
- Distribution géographique (États-Unis vs monde)
- Répartition des genres de contenu
- Pourcentages et volumes par catégorie


### 4. **Budget.html** - Analyse Financière
**Visualisations :**
- **Graphique linéaire multi-plateforme** : évolution du prix des services des plateformes 
- **Graphique linéaire** : Évolution du budget et revenu moyen par année
- **Graphique linéaire multi-plateforme** : Nombre de films/séries ajoutés par année

**Données affichées :**
- Tendance budgétaire des productions
- Croissance du catalogue par plateforme
- Comparaison Netflix vs Amazon vs Disney+ vs Hulu

---

## Système de Visualisation avec Chart.js

### Types de graphes utilisés

| Type | Utilisation | Exemple |
|------|-------------|---------|
| `bar` | Comparaisons simples | Notes IMDb/Rotten Tomatoes |
| `line` | Évolution dans le temps | Budget et revenus par année |
| `doughnut` | Distribution en pourcentage | USA vs Rest of World |
| `pie` | Représentation proportionnelle | Genres par plateforme |

### Palette de Couleurs

Chaque plateforme possède une identité visuelle propre :

```javascript
Netflix    : #E50914 (Rouge vif)
Amazon     : #00A8E1 (Bleu)
Disney+    : #FFCC00 (Or/Jaune)
Hulu       : #3DBB3D (Vert)
```

---

## Fonctionnalités Principales

### 1. Tableaux Dynamiques (Genre.html)

**Fonction `createTable()`**

Génère automatiquement des tableaux HTML à partir des données JavaScript :

- **Paramètres :**
  - `containerId` : ID du conteneur DOM
  - `platformName` : Nom de la plateforme
  - `labels` : Array des catégories/genres
  - `data` : Array des pourcentages

- **Fonctionnalités :**
  - Affichage du Top 5 uniquement
  - Code couleur par genre

**Exemple de sortie :**
```
┌─────────────────────────────────┐
│   🎬 NETFLIX - Top 5 Genres    │
├───┬──────────────┬──────────────┤
│ # │ Genre        │ %            │
├───┼──────────────┼──────────────┤
│ 1 │ Dramas       │ 14.2%        │
│ 2 │ Comedies     │ 12.6%        │
│ 3 │ Documentaries│ 8.7%         │
└───┴──────────────┴──────────────┘
```

### 2. Graphiques Interactifs

**Caractéristiques communes :**
- Hover effects pour afficher les valeurs exactes
- Légende interactive (click pour masquer/afficher)
- Responsive design (s'adapte à la taille de l'écran)
- Dark theme cohérent

**Graphiques linéaires (Budget.html)**
- Dégradé dynamique sous les courbes (effet de lueur)
- Points masqués pour une meilleure lisibilité
- Interpolation lissée (tension: 0.4)

**Graphiques en barres superposées (Social.html)**
- Stacked: true pour empiler IMDb + Rotten Tomatoes
- Comparaison directe par plateforme

---

## Gestion des Données

### Format des fichiers JavaScript

Les données sont organisées par colonne :

```javascript
const category_Netflix = ['International Movies', 'Dramas', 'Comedies', ...];
const Netflix_count = [2752, 2427, 1674, ...];
const Netflix_percent = [14.24, 12.56, 8.66, ...];
```

### Chargement des données

Ordre d'exécution dans le HTML :
```html
1. Chart.js (CDN)
2. Variables (data/*.js)
3. Scripts de graphiques (Graphe/*.js)
```

**Important :** L'ordre est critique pour éviter les erreurs `undefined`.

---

## Techniques JavaScript Utilisées

### Manipulation du DOM
```javascript
document.getElementById()
container.innerHTML = html
```

### Gestion des graphiques
```javascript
new Chart(ctx, {
    type: 'bar/line/doughnut/pie',
    data: { labels, datasets },
    options: { responsive, scales, plugins }
})
```

### Formatage des données
```javascript
.toFixed(1)  // 1 décimale
.slice(0, 5) // Top 5
Math.min()   // Limiter à valeur max
```


---


## Limites et remarques Générales

* Les données dépendent de la qualité des sources Kaggle
* Les montants financiers ne sont pas corrigés de l’inflation
* Les données sont statiques (pas de mise à jour en temps réel)
* Le traitement large volume de données côté client peut être lent
* Les navigateurs très anciens ne supportent pas ES6+
* Les fichiers JavaScript doivent être chargés dans le bon ordre

