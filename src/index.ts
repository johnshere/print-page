import './style.scss'
import PrintPage, { PrintPageBreak } from './index.vue'

PrintPage.install = function(v: any) {
  v.component(PrintPage.name, PrintPage)
}

export * from './libs'
export { PrintPage, PrintPage as default, PrintPageBreak }
