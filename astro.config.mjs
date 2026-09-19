// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [icon()],

  vite: {
    plugins: [tailwindcss()],

    // dev サーバー初回アクセス時、Vite が three を「新規依存」として検出すると
    // 依存の再バンドルが走り、読み込み中のチャンクが 504 (Outdated Optimize Dep)
    // になったうえでページが強制リロードされる。three-background の初期化が
    // これに巻き込まれると背景 canvas が空のままになるため、起動時に
    // 事前バンドルさせておく。
    optimizeDeps: {
      include: [
        "three",
        "three/addons/loaders/GLTFLoader.js",
        "three/addons/libs/meshopt_decoder.module.js",
        "astro/virtual-modules/transitions-router.js",
        "astro/virtual-modules/transitions-types.js",
        "astro/virtual-modules/transitions-events.js",
        "astro/virtual-modules/transitions-swap-functions.js",
      ],
    },
  },

  image: {
    domains: [
      "content.elekibear.com",
      "raw.githubusercontent.com",
      "user-images.githubusercontent.com",
      "play.google.com",
      "apps.apple.com",
    ],
  },
});
