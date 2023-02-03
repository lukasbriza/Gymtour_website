const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app/_index.ts"),
      "@components": path.resolve(__dirname, "./src/components/_index.ts"),
      "@config": path.resolve(__dirname, "./src/config/_index.ts"),
      "@utils": path.resolve(__dirname, "./src/utils/_index.ts"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks/_index.ts"),
      "@animations": path.resolve(__dirname, "./src/animations/_index.ts"),
      "@svg": path.resolve(__dirname, "./src/components/SVG/_index.ts"),
      "@validations": path.resolve(__dirname, "./src/validations/_index.ts"),
    },
  },
};
