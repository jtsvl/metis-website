// tina/config.ts — placeholder, will be replaced with full collection config
import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  schema: {
    collections: [],
  },
});
