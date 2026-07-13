/// <reference types="vite-plugin-svgr/client" />

declare module "*.css" {
  const content: any;
  export default content;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png";
declare module "*.jpg";