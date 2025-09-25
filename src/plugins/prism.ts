// /src/plugins/prism.ts
import type { App } from 'vue'
import Prism from 'prismjs'

// 主題
import 'prismjs/themes/prism-tomorrow.css'

// 常用語言
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-stylus'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-git'
import 'prismjs/components/prism-diff'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-powershell'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php'

// 行號
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers'

// Copy to Clipboard
import 'prismjs/plugins/toolbar/prism-toolbar.css'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

// Normalize-Whitespace
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'

// 設定 Normalize-Whitespace 預設值
;(Prism as any)?.plugins?.NormalizeWhitespace?.setDefaults({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true,
})

export function setupPrism(app: App) {
  app.directive('prism', {
    mounted(el, binding) {
      if (binding?.value != null) el.textContent = String(binding.value)
      Prism.highlightElement(el as HTMLElement)
    },
    updated(el, binding) {
      if (binding?.value !== binding?.oldValue) {
        el.textContent = String(binding.value ?? '')
        Prism.highlightElement(el as HTMLElement)
      }
    },
  })
}
