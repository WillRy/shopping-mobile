export const environment = {
    production: false,
    api: {
      protocol: 'http',
      host: '192.168.15.4:8000',
      get url() {
        return `${this.protocol}://${this.host}/api`;
      }
    },
    baseFileUrl:'http://192.168.15.4:8000/storage',
    showFirebaseUI: !document.URL.startsWith('file:')
  };
