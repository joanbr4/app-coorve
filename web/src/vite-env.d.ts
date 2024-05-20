/// <reference types="vite/client" />

// declare global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       VITE_PORT: number;
//     }
//   }
// }
// export {};

interface ImportMetaEnv {
  readonly VITE_PORT: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
