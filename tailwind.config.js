module.exports = {
  content: [
    "./src/**/*.{html,njk,js}",   // Fichiers sources pertinents
    "./_site/**/*.{html,njk}", // Templates Nunjucks
    "./*.html",                    // Fichiers HTML racine
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0000DF', // Exemple de couleur personnalisée
      },
      fontFamily: {
        'display': ['Halyard Display', 'sans-serif'],
        'text': ['Host Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    // Ajoute des classes ici qui sont dynamiquement générées ou utilisées de manière conditionnelle
    'bg-custom-blue',
    'text-custom-blue',
    'font-display',
    'font-text',
    // Ajoute ici toutes les classes tailwind que tu utilises dynamiquement
  ],
};
