// unocss.config.js
import presetChinese, { chineseTypography } from "unocss-preset-chinese";
import { defineConfig, presetUno } from "unocss";

export default defineConfig({
    presets: [
        presetUno(),
        chineseTypography(),
        presetChinese(),
        // ...custom presets
    ],
});