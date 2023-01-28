const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app/index.ts"),
      "@components": path.resolve(__dirname, "./src/Components/index.ts"),
      "@config": path.resolve(__dirname, "./src/config/index.ts"),
      "@utils": path.resolve(__dirname, "./src/utils/index.ts"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks/index.ts"),
      "@animations": path.resolve(__dirname, "./src/animations/index.ts"),
    },
  },
};
