const { exec } = require('child_process');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3040;

app.use(bodyParser.json());

// Fonction pour reconstruire le site 11ty
function buildSite() {
  console.log("🔄 Mise à jour du site 11ty...");
  exec('npx @11ty/eleventy', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors du build: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

// Webhook pour gérer les notifications de Strapi
app.post('/webhook/strapi', (req, res) => {
  const { event } = req.body;

  console.log(`Événement reçu: ${event}`);

  // Vous pouvez ajouter ici des conditions basées sur l'événement Strapi
  if (event === 'entry.create' || event === 'entry.update' || event === 'entry.publish') {
    console.log('🔔 Webhook reçu. Mise à jour du site 11ty...');
    
    // Lance la mise à jour du site 11ty
    buildSite();

    res.status(200).send('Site mis à jour.');
  } else {
    res.status(200).send('Aucun changement à traiter.');
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
