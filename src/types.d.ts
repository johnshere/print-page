import { PageSetup } from "exceljs"
import { Plugin } from "vue"

export interface TableColumn<R = any> {
  title: string
  prop: string
  class?: string
  width?: string
  render?: (row: R, index: number, column: TableColumn<R>) => string | number
}
export interface TableColumnIndex {
  title: string
  type: 'index'
}
export type TableColumns<T = any> = (TableColumnIndex | TableColumn<T>)[]
export type Orientation = PageSetup['orientation']
export type Mode = 'normal' | 'purity'
/**
* 字体与行高是word中概念，与css有差别
*/
export interface Options {
  titleFontSize?: string
  contentFontSize?: string
  signFontSize?: string
  titleLineHeight?: string
  cellLineHeight?: string
  unit?: string
  /** orientation 纸张方向开发默认竖向，生产默认横向 */
  orientation?: Orientation
}
/**
* 图片必须是base64
* 由于处理不了excel中图片精确定位问题，所以包含图片的单元格个必须独占一行
*/
export interface SignOptions {
  managerSignShow?: boolean
  managerSignImg?: string
  otherSignShow?: boolean
  otherSignImgs?: string[]
  expertSignShow?: boolean
  expertSignImgs?: string[]
}
export interface ElementSize {
  width: number
  height: number
  wholeWidth: number
  wholeHeight: number
  contentWidth: number
  contentHeight: number
  paddingTop: number
  paddingRight: number
  paddingBottom: number
  paddingLeft: number
  borderTopWidth: number
  borderRightWidth: number
  borderBottomWidth: number
  borderLeftWidth: number
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
}
/**
* 打印报表编辑布局组件
* 打印区域（默认插槽）仅支持table、div、p三个元素，table做了定制化处理；div、p需要完全自定义
* 参照createPages函数
*/
export interface PrintProps {
  /** 导出文件名 */
  fileName: string
  /** 标题 */
  title?: string
  /** 副标题 */
  subTitle?: string
  /** 表格列配置 */
  columns?: TableColumns
  /** 表格数据 */
  data?: any[]
  /** 打印配置项 */
  modelValue?: Options
  /** 签字配置项 */
  sign?: SignOptions
  /** 是否显示原始页 */
  showOrigin?: boolean
  /** （可通过href传参）mode=purity模式下不显示head */
  mode?: Mode
  /** 自定义保存 */
  save?: (arrayBuffer: ArrayBuffer) => void
  /** （可通过href传参）方法名，优先级低于save，调用(window.opener||window.parent).postMessage({type:[openerSave], arrayBuffer, fileName}) */
  openerSave?: string
}
export interface PrintExposed {
  /**
   * 绘制a4纸
   * @returns 
   */
  drawA4Paper: () => any
  refresh: () => any
  /**
   * 生成excel文件
   * @returns 
   */
  generateExcel: () => Promise<void>
  /**
   * 生成pdf文件
   * @returns 
   */
  generatePdf: () => Promise<void>
}

export declare const PrintPage: Plugin & import("vue").DefineComponent<PrintProps, PrintExposed>
export default PrintPage;
