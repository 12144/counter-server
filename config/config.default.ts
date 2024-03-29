import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { ErrorHandler } from '../app/error';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {
    security: {
      csrf: {
        enable: false,
      },
    },
    onerror: {
      json: ErrorHandler,
    },
  };

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1614501390918_5512';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
