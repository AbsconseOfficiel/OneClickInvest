module.exports = {
  content: [
    "./src/**/*.{html,njk,js}",   // Fichiers sources pertinents
    "./_site/**/*.{html,njk}", // Templates Nunjucks
    "./*.html"                    // Fichiers HTML racine
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
    }, // Personnalise encore plus ton thème ici
  },
  plugins: [],
};
