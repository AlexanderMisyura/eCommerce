/// <reference types="vite-plugin-svg-sprite/typings/react" />
/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_CTP_PROJECT_KEY: string;
  readonly VITE_CTP_CLIENT_SECRET: string;
  readonly VITE_CTP_CLIENT_ID: string;
  readonly VITE_CTP_AUTH_URL: string;
  readonly VITE_CTP_API_URL: string;
  readonly VITE_CTP_SCOPES: string;
  readonly VITE_CTP_CATEGORY_STAR_WARS_ID: string;
  readonly VITE_CTP_CATEGORY_LOTR_ID: string;
  readonly VITE_CTP_CATEGORY_TECHNIC_ID: string;
  readonly VITE_CTP_CATEGORY_BATMAN_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
