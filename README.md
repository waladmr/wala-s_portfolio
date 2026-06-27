# Portfolio — Ingénieur Génie Mécanique

## Structure des fichiers

```
portfolio-genie-mecanique/
├── index.html      ← Structure du site (sections, textes)
├── style.css       ← Couleurs, polices, mise en page
├── script.js       ← Animations, canvas blueprint
├── photo.jpg       ← 🔴 À remplacer par votre photo
├── cv.pdf          ← 🔴 À remplacer par votre CV
└── README.md       ← Ce fichier
```

---

## Comment personnaliser dans VS Code

### 1. Remplacer les textes
Ouvrir `index.html` et faire **Ctrl+H** (Rechercher/Remplacer) :

| Chercher                  | Remplacer par              |
|---------------------------|----------------------------|
| `Ahmed Ben Ali`           | Votre vrai nom             |
| `ahmed.benali@email.com`  | Votre email                |
| `+216 00 000 000`         | Votre numéro               |
| `votre-profil`            | Votre profil LinkedIn/GitHub |

### 2. Ajouter votre photo
- Nommez votre photo `photo.jpg` (ou `.png`)
- Placez-la dans le dossier du portfolio
- Si vous utilisez un autre nom : cherchez `photo.jpg` dans `index.html` et remplacez

### 3. Ajouter votre CV
- Nommez votre CV `cv.pdf`
- Placez-le dans le dossier du portfolio

### 4. Modifier les couleurs (style.css, lignes 13–27)
```css
--blue-accent: #2D6BE4;   /* Couleur principale — changer ici */
```

### 5. Modifier les sections de texte
Chaque section est bien commentée dans `index.html` :
- `<!-- HERO -->` → Titre principal
- `<!-- ABOUT -->` → Présentation
- `<!-- FORMATION -->` → Diplômes
- `<!-- EXPERIENCE -->` → Stages
- `<!-- COMPETENCES -->` → Barres de compétences
- `<!-- PROJETS -->` → Vos projets
- `<!-- PUBLICATIONS -->` → Articles/mémoires
- `<!-- CONTACT -->` → Coordonnées

---

## Ouvrir dans le navigateur

Double-cliquez sur `index.html` pour l'ouvrir directement dans Chrome/Firefox.

Pour un vrai serveur local (recommandé) :
```bash
# Avec VS Code : installer l'extension "Live Server"
# puis clic droit sur index.html → "Open with Live Server"
```

---

## Déploiement gratuit

- **GitHub Pages** : Poussez le dossier sur GitHub → Settings → Pages
- **Netlify** : Glissez le dossier sur netlify.com/drop
- **Vercel** : `vercel deploy` dans le terminal
