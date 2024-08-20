<template>
    <div :class="['print-page', options.orientation, `mode-${mode}`]">
        <div v-show="mode !== 'purity'" class="print-page_head noprint">
            <slot :slot-scope="{ ...options }" name="bar">
                <div class="print-page_head-row">
                    <slot name="fontSize">
                        <section>
                            <label>字体设置:</label>
                            <div>标题字体</div>
                            <select v-model="options.titleFontSize" class="select">
                                <option v-for="num in FontSizes" :key="num" :value="num">{{ num }}</option>
                            </select>
                            <div>内容行字体</div>
                            <select v-model="options.contentFontSize" class="select">
                                <option v-for="num in FontSizes" :key="num" :value="num">{{ num }}</option>
                            </select>
                            <div>签字字体</div>
                            <select v-model="options.signFontSize" class="select">
                                <option v-for="num in FontSizes" :key="num" :value="num">{{ num }}</option>
                            </select>
                        </section>
                    </slot>
                    <slot name="lineHeight">
                        <section>
                            <label>高度设置:</label>
                            <div>标题行高度</div>
                            <select v-model="options.titleLineHeight" class="select w55">
                                <option v-for="num in TitleLineHeigts" :key="num" :value="num">{{ num }}</option>
                            </select>
                            <div>单元格高度</div>
                            <select v-model="options.cellLineHeight" class="select w60">
                                <option v-for="num in CellLineHeigts" :key="num" :value="num">{{ num }}</option>
                            </select>
                        </section>
                    </slot>
                    <slot name="direction">
                        <section>
                            <label>纸张方向:</label>
                            <select v-model="options.orientation" class="select w60" @change="a4Size = null">
                                <option v-for="dir in Directions" :key="dir.value" :value="dir.value">{{ dir.label }}
                                </option>
                            </select>
                        </section>
                    </slot>
                </div>
            </slot>
            <div class="print-page_head-row">
                <slot name="signCheck">
                    <section>
                        <div class="checkbox">
                            <input type="checkbox" v-model="signOptions.otherSignShow" />
                            <span>显示其他人员签字</span>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" v-model="signOptions.managerSignShow" />
                            <span>显示项目负责人签字</span>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" v-model="signOptions.expertSignShow" />
                            <span>显示专家签字</span>
                        </div>
                        <!-- <checkbox v-model="signOptions.otherSignShow">显示其他人员签字</checkbox>
                        <checkbox v-model="signOptions.managerSignShow">显示项目负责人签字</checkbox>
                        <checkbox v-model="signOptions.expertSignShow">显示专家签字</checkbox> -->
                    </section>
                </slot>
                <slot name="operate">
                    <section>
                        <button class="button" @click="reset">重置</button>
                        <button class="button" @click="drawA4Paper">刷新</button>
                        <button class="button" @click="print">打印</button>
                        <button class="button" @click="generateExcel">导出excel</button>
                        <button class="button" @click="generatePdf">导出pdf</button>
                    </section>
                </slot>
            </div>
        </div>
        <div class="print-page_body">
            <div ref="origin" class="print-page_origin print-page_a4-wrap" :class="{ hideOrigin: !showOrigin }">
                <slot :slot-scope="{ ...options }">
                    <table border>
                        <thead>
                            <slot :slot-scope="{ ...options }" name="title">
                                <tr v-if="title">
                                    <th :colspan="columns?.length" style="font-size: 14pt">
                                        {{ title }}
                                    </th>
                                </tr>
                            </slot>
                            <slot :slot-scope="{ ...options }" name="subTitle">
                                <tr v-if="subTitle">
                                    <th :colspan="columns?.length" :style="{
                                        fontSize: options.titleFontSize! + options.unit, textAlign: 'left', lineHeight: 1 + Number(options.titleLineHeight)
                                    }">
                                        {{ subTitle }}
                                    </th>
                                </tr>
                            </slot>
                            <slot :slot-scope="{ ...options }" name="header">
                                <tr v-if="columns?.length">
                                    <th v-for="(col, i) in columns" :key="col.title + i"
                                        :class="(col as TableColumn).class" :style="{
                                            width: (col as TableColumn).width,
                                            fontSize: options.titleFontSize! + options.unit,
                                            lineHeight: 1 + Number(options.titleLineHeight)
                                        }">
                                        {{ col.title }}
                                    </th>
                                </tr>
                            </slot>
                        </thead>
                        <slot :slot-scope="{ ...options }" name="tbody">
                            <tbody>
                                <tr v-for="(row, rindex) in data || []" :key="rindex">
                                    <td v-for="(col, cindex) in columns" :key="col.title + cindex"
                                        :class="(col as TableColumn).class" :style="{
                                            width: (col as TableColumn).width,
                                            fontSize: options.contentFontSize! + options.unit,
                                            lineHeight: 1 + Number(options.cellLineHeight)
                                        }">
                                        <template v-if="(col as TableColumnIndex).type === 'index'">
                                            {{ rindex + 1 }}
                                        </template>
                                        <template v-else-if="(col as TableColumn).render">
                                            {{ (col as any).render(row, rindex, col) }}
                                        </template>
                                        <template v-else-if="(col as TableColumn).prop">
                                            {{ row[(col as TableColumn).prop] || '' }}
                                        </template>
                                    </td>
                                </tr>
                                <slot name="sign">
                                    <tr v-if="signOptions.managerSignShow">
                                        <td :style="{
                                            textAlign: 'left',
                                            fontSize: options.signFontSize! + options.unit,
                                            lineHeight: 3.5,
                                            borderRightWidth: 0
                                        }">
                                            项目负责人签字：
                                        </td>
                                        <td v-if="columns?.length" :colspan="columns.length - 1" :style="{
                                            textAlign: 'left',
                                            fontSize: options.signFontSize! + options.unit,
                                            lineHeight: 3.5,
                                        }">
                                            <img v-if="signOptions.managerSignImg" :src="signOptions.managerSignImg" />
                                        </td>
                                    </tr>
                                    <template v-if="signOptions.otherSignShow">
                                        <tr v-for="ri in signImgRows.otherSignRows?.length || 1" :key="ri">
                                            <td :style="{
                                                textAlign: 'left',
                                                fontSize: options.signFontSize! + options.unit,
                                                lineHeight: 3.5,
                                                borderRightWidth: 0,
                                                borderTopWidth: ri > 1 ? 0 : '1px'
                                            }">
                                                <div :style="{
                                                    display: 'inline',
                                                    color: ri > 1 ? 'transparent' : '',
                                                    opacity: ri > 1 ? '0' : '1'
                                                }">
                                                    其他人员签字：
                                                </div>
                                            </td>
                                            <template v-if="columns?.length">
                                                <td v-for="ci in columns.length - 1" :key="ci" :style="{
                                                    borderTopWidth: ri > 1 ? 0 : '1px',
                                                    borderRightWidth: ci < columns.length - 1 ? 0 : '1px'
                                                }">
                                                    <img v-if="signImgRows.otherSignRows?.[ri - 1]?.[ci - 1]"
                                                        :src="signImgRows.otherSignRows[ri - 1][ci - 1]" />
                                                </td>
                                            </template>
                                        </tr>
                                    </template>
                                    <template v-if="signOptions.expertSignShow">
                                        <tr v-for="ri in signImgRows.expertSignRows?.length || 1" :key="ri">
                                            <td :style="{
                                                textAlign: 'left',
                                                fontSize: options.signFontSize! + options.unit,
                                                lineHeight: 3.5,
                                                borderRightWidth: 0,
                                                borderTopWidth: ri > 1 ? 0 : '1px'
                                            }">
                                                <div :style="{
                                                    display: 'inline',
                                                    color: ri > 1 ? 'transparent' : '',
                                                    opacity: ri > 1 ? '0' : '1'
                                                }">
                                                    专家签字：
                                                </div>
                                            </td>
                                            <template v-if="columns?.length">
                                                <td v-for="ci in columns.length - 1" :key="ci" :style="{
                                                    borderRightWidth: ci < columns.length - 1 ? 0 : '1px',
                                                    borderTopWidth: ri > 1 ? 0 : '1px'
                                                }">
                                                    <img v-if="signImgRows.expertSignRows?.[ri - 1]?.[ci - 1]"
                                                        :src="signImgRows.expertSignRows[ri - 1][ci - 1]" />
                                                </td>
                                            </template>
                                        </tr>
                                    </template>
                                </slot>
                            </tbody>
                        </slot>
                    </table>
                </slot>
            </div>
            <div ref="preview" class="print-page_preview"></div>
        </div>
        <div ref="tool" class="print-page_tool print-page_a4-wrap noprint"></div>
    </div>
</template>
<script lang="ts" setup>
import * as ExcelJS from 'exceljs'
import { type Border } from 'exceljs'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { rgb2Hex, Directions, FontSizes, TitleLineHeigts, CellLineHeigts } from './libs'
import type { ElementSize, Options, PrintProps, SignOptions, TableColumn, TableColumnIndex, PrintExposed } from './types'
import { watch, onUnmounted, reactive, computed, ref, onMounted } from 'vue'
import { Mode } from './types'

const props = defineProps<PrintProps>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: Options): void
    (e: 'update:sign', value: SignOptions): void
}>()

const getParam = (param: string) => {
    const [s, r] = location.href.match(new RegExp(`${param}=([0-9A-Za-z]*)`)) || []
    return r as any
}
const mode = ref<Mode>(props.mode || getParam('mode') || 'normal')
const defaultOptions: Options = {
    titleFontSize: '9',
    contentFontSize: '8',
    signFontSize: '8',
    titleLineHeight: '0.5',
    cellLineHeight: '0.5',
    unit: 'pt',
    orientation: 'landscape'
}
const options = reactive<Options>({ ...defaultOptions, ...props.modelValue })
let initOptions: Options | null = null

const signOptions = reactive<SignOptions>({
    otherSignShow: true,
    managerSignShow: true,
    expertSignShow: true,
    ...props.sign
})
// 其他人员签名过多时 换行分组
const signImgRows = computed(() => {
    const chunkSize = (props.columns?.length ?? 0) - 1
    if (chunkSize <= 0) return { otherSignRows: [], expertSignRows: [] }
    const split = (arr?: string[]) =>
        arr?.reduce((acc, val, idx) => {
            if (idx % chunkSize === 0) acc.push([])
            acc[Math.floor(idx / chunkSize)].push(val)
            return acc
        }, [] as string[][])
    return { otherSignRows: split(signOptions.otherSignImgs), expertSignRows: split(signOptions.expertSignImgs) }
})

const origin = ref<HTMLDivElement>()
const preview = ref<HTMLDivElement>()
const tool = ref<HTMLDivElement>()

function gainSize(dom: HTMLElement) {
    const style = getComputedStyle(dom)
    const size = {} as ElementSize
    const pf = parseFloat
    const dirs = ['Top', 'Right', 'Bottom', 'Left'] as ['Top', 'Right', 'Bottom', 'Left']
    dirs.forEach(dir => {
        size[`padding${dir}`] = pf(style[`padding${dir}`])
        size[`margin${dir}`] = pf(style[`margin${dir}`])
        size[`border${dir}Width`] = pf(style[`border${dir}Width`])
    })
    let width = pf(style.width)
    let height = pf(style.height)
    const { borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth } = size
    const { paddingTop, paddingBottom, paddingLeft, paddingRight } = size
    if (style.boxSizing === 'border-box') {
        const contentHeight = height - borderTopWidth - borderBottomWidth - paddingTop - paddingBottom
        const contentWidth = width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight
        Object.assign(size, { contentHeight, contentWidth, width, height })
    }
    if (style.boxSizing === 'content-box') {
        const contentWidth = width
        const contentHeight = height
        width = width + borderLeftWidth + borderRightWidth + paddingLeft + paddingRight
        height = height + borderTopWidth + borderBottomWidth + paddingTop + paddingBottom
        Object.assign(size, { contentHeight, contentWidth, width, height })
    }
    const wholeWidth = width + size.marginRight + size.marginLeft
    const wholeHeight = height + size.marginBottom + size.marginTop
    Object.assign(size, { wholeWidth, wholeHeight })
    return size
}
let a4Size: ElementSize | null
function calculateSize() {
    if (!tool.value) return
    if (a4Size) return
    a4Size = gainSize(tool.value)
}

function generatePreview(content: HTMLElement, container?: HTMLElement) {
    if (!content) return
    const paper = container || preview.value || document.createElement('div')
    paper.innerHTML = ''
    let sumHeight = 0
    let pageDiv = document.createElement('div')
    function nextPage() {
        sumHeight = 0
        pageDiv = document.createElement('div')
        pageDiv.classList.add('print-page_a4-wrap')
        paper.appendChild(pageDiv)
    }
    nextPage()
    const it = content.childNodes.values()

    let node: HTMLElement
    while ((node = it.next().value)) {
        if (node instanceof HTMLDivElement || node instanceof HTMLParagraphElement) {
            const elHeight = gainSize(node).wholeHeight
            if (sumHeight + elHeight > a4Size!.contentHeight) {
                nextPage()
            }
            sumHeight += elHeight
            pageDiv.appendChild(node.cloneNode(true))
        }
        if (node instanceof HTMLTableElement) {
            const temp = node.cloneNode(true) as HTMLTableElement
            temp.tBodies[0].innerHTML = ''
            tool.value!.appendChild(temp)

            const emptyHeight = temp.offsetHeight
            let rows = Array.from(node.rows) || []
            rows = rows.filter(r => r.parentElement?.tagName === 'TBODY')
            if (!rows?.length) {
                // 判断是否需要换页
                if (sumHeight + emptyHeight > a4Size!.contentHeight) {
                    nextPage()
                }
                sumHeight += emptyHeight
                pageDiv.appendChild(temp.cloneNode(true))
                break
            }
            rows.forEach((row, i) => {
                const rowHeight = row.offsetHeight
                // 判断是否需要换页
                if (sumHeight + temp.offsetHeight + rowHeight > a4Size!.contentHeight) {
                    if (temp.offsetHeight > emptyHeight) pageDiv.appendChild(temp.cloneNode(true))
                    nextPage()
                    temp.tBodies[0].innerHTML = ''
                }
                temp.tBodies[0].appendChild(row.cloneNode(true))
            })
            // 循环最后剩余的元素
            if (temp.offsetHeight > emptyHeight) {
                pageDiv.appendChild(temp.cloneNode(true))
                sumHeight += temp.offsetHeight
            }
            tool.value!.removeChild(temp)
        }
    }
    console.log('generatePreview executed')
}

let timer: any
function drawA4Paper() {
    clearTimeout(timer)
    timer = setTimeout(() => {
        calculateSize()
        if (!origin.value) return
        generatePreview(origin.value)
    }, 100)
    return timer
}

watch(
    () => props.modelValue,
    v => {
        console.log('options model change')
        Object.assign(options, v)
        if (!initOptions) initOptions = { ...options }
    },
    { deep: true, immediate: true }
)
const paperStyle = document.createElement('style')
paperStyle.setAttribute('type', 'text/css')
document.head.appendChild(paperStyle)
watch(
    () => options,
    v => {
        console.log('options change')
        drawA4Paper()
        emit('update:modelValue', v)
        paperStyle.innerHTML = `@page {size: A4 ${options.orientation};margin: 0;}`
    },
    { deep: true, immediate: true }
)
watch(
    () => props.sign,
    v => {
        console.log('sign model change')
        v && Object.assign(signOptions, v)
    },
    { deep: true, immediate: true }
)
watch(
    () => signOptions,
    v => {
        console.log('signOptions change')
        drawA4Paper()
        emit('update:sign', v)
    },
    { deep: true, immediate: true }
)
watch(() => props.data, drawA4Paper)

onMounted(() => {
    drawA4Paper()
    emit('update:modelValue', options)
    emit('update:sign', signOptions)
})
onUnmounted(() => paperStyle.remove())

const reset = () => Object.assign(options, initOptions || defaultOptions)

const print = () => window.print()

// 获取设备的像素比
const pixelRatio = window.devicePixelRatio || 1
// px转英寸
const px2In = (px: number) => px / (96 * pixelRatio)

const getFont = (style: CSSStyleDeclaration, isBold?: boolean) => {
    const bold = isBold || Number(style.fontWeight) > 400
    const name = style.fontFamily.replace(/"/g, '')
    const color = { argb: rgb2Hex(style.color) }
    return { name, color, bold, size: parseInt(style.fontSize) }
}
const table2ExcelSheet = async (workbook: ExcelJS.Workbook, el: Element, sheetName: string) => {
    if (el.tagName !== 'TABLE') return
    const table = el as HTMLTableElement
    const worksheet = workbook.addWorksheet(sheetName, {
        pageSetup: {
            paperSize: 9,
            orientation: options.orientation,
            margins: {
                top: px2In(a4Size!.paddingTop),
                right: px2In(a4Size!.paddingRight),
                bottom: px2In(a4Size!.paddingBottom),
                left: px2In(a4Size!.paddingLeft),
                header: 0,
                footer: 0
            },
            fitToPage: true, // 自动调整以适应页面
            fitToWidth: 1, // 可选：尝试调整至指定宽度的页数，默认为1
            fitToHeight: 4 // 可选：尝试调整至指定高度的页数，默认为0表示不限制
        },
        properties: { defaultColWidth: 15, defaultRowHeight: 10 },
        views: [{ showGridLines: false }]
    })
    worksheet.state = 'visible'

    let widths: number[] = []
    Array.from(table.rows).forEach((row, rindex) => {
        const isHead = row.parentElement?.tagName === 'THEAD'
        const _widths: number[] = []
        let maxHeight = 0
        Array.from(row.cells).forEach((tableCell, cindex) => {
            const size = gainSize(tableCell)
            _widths.push(size.wholeWidth)
            maxHeight = Math.max(maxHeight, size.wholeHeight)
            const cell = worksheet.getCell(rindex + 1, cindex + 1)
            const style = getComputedStyle(tableCell)

            let bgClr = rgb2Hex(style.backgroundColor, false)
            bgClr = bgClr === '000000' ? 'ffffff' : bgClr
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgClr } }
            cell.alignment = { wrapText: true, horizontal: style.textAlign as any, vertical: 'middle' }
            const getBorder = (w: string, color: string) => {
                const res = {} as Partial<Border>
                if (parseFloat(w)) res.style = 'thin'
                if (color?.startsWith('rgba(0')) res.color = { argb: bgClr }
                return res
            }
            cell.border = {
                top: getBorder(style.borderTopWidth, style.borderTopColor),
                right: getBorder(style.borderRightWidth, style.borderRightColor),
                bottom: getBorder(style.borderBottomWidth, style.borderBottomColor),
                left: getBorder(style.borderLeftWidth, style.borderLeftColor)
            }
            const { rowSpan, colSpan } = tableCell
            worksheet.mergeCells(rindex + 1, cindex + 1, rindex + rowSpan, cindex + colSpan)

            const font = getFont(style, isHead)
            const richText = [] as ExcelJS.RichText[]
            const isBlock = (n: ChildNode) => n instanceof HTMLDivElement || n instanceof HTMLParagraphElement
            const childs = Array.from(tableCell.childNodes)
            childs.forEach((node, i) => {
                if (node instanceof Text && node.textContent)
                    return richText.push({ text: node.textContent || '', font })
                if (node instanceof HTMLBRElement) return richText.push({ text: '\n' })
                if (node instanceof HTMLImageElement) {
                    const [m, type] = /image\/([a-z]+);/.exec(node.src) || []
                    if (!type) return
                    const imageId = workbook.addImage({ base64: node.src, extension: type as any })
                    const { width, height } = gainSize(node)
                    worksheet.addImage(imageId, { tl: { col: cindex, row: rindex }, ext: { width, height } })
                    return
                }
                if (node instanceof HTMLElement) {
                    const f = getFont(getComputedStyle(node))
                    if (f.color.argb.startsWith('00')) f.color.argb = bgClr
                    const isBlk = isBlock(node)
                    if (isBlk && i && !(node instanceof HTMLBRElement)) richText.push({ text: '\n' })
                    if (!isBlk && isBlock(childs[i - 1])) richText.push({ text: '\n' })
                    richText.push({ text: node.innerText, font: f })
                    return
                }
            })
            cell.value = { richText }
        })
        widths = _widths.length > widths.length ? _widths : widths
        worksheet.getRow(rindex + 1).height = maxHeight
    })
    // 转化为表格宽度时的系数
    const ratio = 0.15
    // 设置每列宽度
    widths.forEach((w, ci) => (worksheet.getColumn(ci + 1).width = w * ratio))
}
const saveFile = (data: ArrayBuffer, fileName: string) => {
    console.log(`${fileName} byteLength: ${data.byteLength}`)
    if (props.save) {
        return props.save(data)
    }
    const opener = window.opener || window.parent
    const type = getParam('save')
    if (type) {
        opener?.postMessage({ type, data, fileName }, '*')
    } else {
        const blob = new Blob([data], { type: '' })
        saveAs(blob, fileName)
        setTimeout(() => {
            if (props.saved) {
                return props.saved(fileName)
            }
            const type = getParam('saved')
            if (type) {
                opener?.postMessage({ type, fileName }, '*')
            }
        }, 300);
    }
}
const generateExcel = async () => {
    const els = Array.from(origin.value?.children || []).filter(el => el.tagName === 'TABLE')
    if (!els?.length) throw new Error('未发现表格元素')
    calculateSize()
    const workbook = new ExcelJS.Workbook()
    workbook.created = workbook.modified = workbook.lastPrinted = new Date()
    workbook.views = [
        {
            x: 0,
            y: 0,
            width: 10000,
            height: 20000,
            firstSheet: 0,
            activeTab: 1,
            visibility: 'visible'
        }
    ]

    for (let i = 0; i < els.length; i++) {
        await table2ExcelSheet(workbook, els[i], els[i].id || 'Sheet' + (i + 1))
    }
    const data = await workbook.xlsx.writeBuffer()
    saveFile(data, props.fileName + '.xlsx')
    console.log('generateExcel complete')
}

const generatePdf = async () => {
    if (!preview.value?.childNodes?.length) return
    calculateSize()
    const pdf = new JsPDF(options.orientation, 'mm', 'a4') // 创建一个新的PDF文档，默认A4纸大小，以毫米为单位
    const nodes = Array.from(preview.value?.childNodes).filter(el => el instanceof HTMLElement) as HTMLElement[]
    for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i]
        const boxShadow = el.style.boxShadow
        el.style.boxShadow = 'none'
        const canvas = await html2canvas(el, { scale: 2, useCORS: true })
        el.style.boxShadow = boxShadow
        const dataURL = canvas.toDataURL('image/png')

        const imgProps = pdf.getImageProperties(dataURL)
        const width = pdf.internal.pageSize.getWidth()
        const height = (imgProps.height * width) / imgProps.width
        pdf.addImage(dataURL, 'PNG', 0, 0, width, height)
        if (i !== nodes.length - 1) pdf.addPage()
    }
    const data = pdf.output("arraybuffer")
    // pdf.save(props.fileName + '.pdf') // 下载PDF文件
    saveFile(data, props.fileName + '.pdf')
    console.log('generatePdf complete')
}

defineExpose<PrintExposed>({ drawA4Paper, refresh: drawA4Paper, generateExcel, generatePdf })
</script>
<script lang="ts">
export default {
    name: "print-page"
}
</script>
