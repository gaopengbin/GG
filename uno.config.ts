// unocss.config.js
import presetChinese, { chineseTypography } from "unocss-preset-chinese";
import { defineConfig, presetUno } from "unocss";
import presetWebFonts from "@unocss/preset-web-fonts";

export default defineConfig({
    presets: [
        presetUno(),
        chineseTypography(),
        presetChinese(),
        presetWebFonts({
            provider: 'google', // default provider
            fonts: {
                chinese:'ZCOOL KuaiLe',
                // these will extend the default theme
                sans: 'Roboto',
                mono: ['Fira Code', 'Fira Mono:400,700'],
                // custom ones
                lobster: 'Lobster',
                lato: [
                    {
                        name: 'Lato',
                        weights: ['400', '700'],
                        italic: true,
                    },
                    {
                        name: 'sans-serif',
                        provider: 'none',
                    },
                ],
            },
        })
        // ...custom presets
    ],
});