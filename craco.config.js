const CracoLessPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@font-family": "'Nunito Sans'" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
