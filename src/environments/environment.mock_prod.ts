export const environment = {
    production: true,
    api: {
      protocol: 'http',
      host: '192.168.25.7:8000',
      get url() {
        return `${this.protocol}://${this.host}/api`;
      }
    },
    baseFileUrl:'http://192.168.25.7:8000/storage'
};
