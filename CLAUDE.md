# Website — CLAUDE.md

Site vitrine statique bilingue (EN/FR) de Noranda Royalties.
Voir le CLAUDE.md racine pour le contexte entreprise.

---

## Stack

- **Pur statique** : HTML + CSS + JS vanilla. Zéro framework, zéro build step, zéro npm.
- Déploiement : fichiers servis directement (pas de serveur backend).
- Tout le contenu est codé en dur dans les HTML.

---

## Structure des fichiers

```
Website/
├── index.html          ← Accueil (hero, stats, intro)
├── projects.html       ← Projets miniers
├── track-record.html   ← Historique des transactions
├── about.html          ← À propos / équipe
├── contact.html        ← Formulaire de contact (mailto)
├── style.css           ← CSS monolithique (tout ici)
├── script.js           ← JS principal (tout ici)
└── assets/
    ├── logo.svg
    └── favicon.svg
```

---

## Système bilingue (CRITIQUE)

Chaque élément de texte visible utilise des attributs `data-en` / `data-fr`.
`script.js::setLanguage()` lit ces attributs et injecte via `innerHTML`.

**Règles absolues :**
1. Tout texte visible doit avoir BOTH `data-en` et `data-fr` — jamais l'un sans l'autre.
2. Le contenu HTML par défaut reflète la version anglaise (fallback).
3. Les placeholders de formulaire utilisent `data-en-ph` / `data-fr-ph` (pas `data-en`).
4. Le titre de page utilise `data-title-en` / `data-title-fr` sur la balise `<title>`.
5. La langue est persistée via `localStorage` clé `noranda-lang`.

**Pattern standard :**
```html
<p data-en="English text" data-fr="Texte français">English text</p>
<input data-en-ph="Your name" data-fr-ph="Votre nom" placeholder="Your name">
<title data-title-en="Page — Noranda Royalties" data-title-fr="Page — Redevances Noranda">
  Page — Noranda Royalties
</title>
```

---

## Conventions CSS

- Variables CSS dans `:root` pour couleurs, typographie, espacements.
- Palette : or `#A86318`, fond sombre `#0A0A0A`, texte `#E8E2D9`.
- Classes utilitaires : `.container`, `.fade-in`, `.delay-1/2/3`, `.visible`.
- Animations scroll via `IntersectionObserver` + classe `.visible` ajoutée dynamiquement.
- Responsive : mobile-first, breakpoints dans style.css.

---

## Structure de page — squelette obligatoire

```html
<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title data-title-en="..." data-title-fr="...">...</title>
  <meta name="description" content="...">
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- NAVBAR (copier depuis index.html — identique sur toutes les pages) -->
  <!-- MOBILE MENU (idem) -->
  <main>
    <!-- contenu spécifique à la page -->
  </main>
  <!-- FOOTER (copier depuis index.html — identique sur toutes les pages) -->
  <script src="script.js"></script>
</body>
</html>
```

La navbar, le mobile menu et le footer sont **identiques** sur toutes les pages — copier-coller exact.

---

## Skills disponibles

- `/new-page` — Scaffolde une nouvelle page HTML avec toute la structure (nav, footer, bilingue).
- `/bilingual-check` — Audite toutes les pages pour détecter les attributs EN/FR manquants.
