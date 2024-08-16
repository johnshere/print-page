import './style.scss'
import PrintPage from './index.vue'

PrintPage.install = function(v: any) {
  v.component(PrintPage.name, PrintPage)
}

export * from './libs.ts'
export { PrintPage, PrintPage as default }
