// Lets TypeScript import the per-tab "data.js" files without red squiggly
// lines in the editor. Vite/esbuild bundles plain .js fine either way —
// this file only affects the editor + any future `tsc` type-check.
declare module "*/data.js" {
  export type Project = {
    image: string;
    name: string;
    description: string;
    link: string;
  };
  export const projects: Project[];
}
