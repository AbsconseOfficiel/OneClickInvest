export default ({ env }) => ({
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET', 'defaultRandomSecret'),
      },
      'url-image': {
        enabled: true,
        resolve: './src/plugins/url-image'
      },
    },
  });
  