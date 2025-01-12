const getPreviewPathname = (uid, { status }) => {
  switch (uid) {
    case "api::page.page":
      // Retourne simplement le chemin basé sur le statut
      return `preview/${status}`;
    default:
      return null;
  }
};

export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env("CLIENT_URL")],
      async handler(uid, { documentId, locale, status }) {
        try {
          // Récupère le document en fonction de l'ID
          const document = await strapi.documents(uid).findOne({ documentId });
          if (!document) {
            console.error(`Document non trouvé pour l'UID : ${uid} et ID : ${documentId}`);
            return null;
          }

          // Génère l'URL de prévisualisation basée uniquement sur le statut
          const pathname = getPreviewPathname(uid, { status });

          if (!pathname) return null;

          // Ajoute les paramètres nécessaires à l'URL pour identifier le document dynamiquement
          const searchParams = new URLSearchParams({
            preview: 'true',
            locale: locale || 'en',
            status,
            documentId: documentId.toString(),
          });

          return `${env("CLIENT_URL")}${pathname}?${searchParams.toString()}`;
        } catch (error) {
          console.error("Erreur dans le handler de preview :", error);
          return null;
        }
      },
    },
  },
});
