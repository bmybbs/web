/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'bmy-new-web',
    environment: environment,
    baseURL: '/',
    locationType: 'none',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    appkey: 'newweb',
    bmysecstrs: [
      { id: '0', name: "本站系统" },
      { id: '1', name: "交通大学" },
      { id: '2', name: "开发技术" },
      { id: '3', name: "电脑应用" },
      { id: '4', name: "学术科学" },
      { id: '5', name: "社会科学" },
      { id: '6', name: "文学艺术" },
      { id: '7', name: "知性感性" },
      { id: '8', name: "体育运动" },
      { id: '9', name: "休闲音乐" },
      { id: 'G', name: "游戏天地" },
      { id: 'N', name: "新闻信息" },
      { id: 'H', name: "乡音乡情" },
      { id: 'A', name: "校务信息" },
      { id: 'C', name: "俱乐部区" }
    ],
    endpoint: ''
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' http://newtest.bmybbs.com:443 https://www.bmybbs.com",
    'font-src': "'self'",
    'connect-src': "'self' http://newtest.bmybbs.com:443 https://www.bmybbs.com",
    'img-src': "'self' http://newtest.bmybbs.com:443 https://www.bmybbs.com",
    'style-src': "'self'",
    'media-src': "'self'"
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.endpoint = 'http://newtest.bmybbs.com:443/'
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.endpoint = 'https://www.bmybbs.com/'
  }

  return ENV;
};
