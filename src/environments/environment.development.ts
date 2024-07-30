export const environment = {
  production: false,
  backend: {
    baseUrl: 'http://localhost:8080',
    routes: {
      municipios: {
        base: '/municipios',
        busqueda: '/busqueda',
      }
    }
  }
};
