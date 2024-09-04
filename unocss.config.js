import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  cli: {
    entry: {
      patterns: [
        'src/**/*.html',
      ],
      outFile: 'src/uno.css'
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
  ],
})