import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const BASE = "/"; 

export default defineConfig({
  base: BASE, 

  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      devOptions: {
        enabled: true
      },

      manifest: {
        name: "Cognitive Functions Atlas",
        short_name: "Cognition Atlas",
        description: "Understand cognitive functions and personality processing.",
        theme_color: "#132238",
        background_color: "#f3efe8",
        display: "standalone",

        start_url: BASE,
        scope: BASE,

        icons: [
          {
            src: "app-icon.svg",
            sizes: "any",
            type: "image/svg+xml"
          },
          {
            src: "app-icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable"
          }
        ]
      },

      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: { cacheName: "html-cache" }
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: { cacheName: "image-cache" }
          },
          {
            urlPattern: ({ request }) => request.destination === "font",
            handler: "CacheFirst",
            options: { cacheName: "font-cache" }
          },
          {
            urlPattern: /\/data\/.*\.json$/,
            handler: "CacheFirst",
            options: { cacheName: "json-cache-v1" }
          }
        ]
      }
    })
  ]
});