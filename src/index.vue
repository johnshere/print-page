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
                <option v-for="num in FontSizes" :key="num" :value="num">
                  {{ num }}
                </option>
              </select>
              <div>内容行字体</div>
              <select v-model="options.contentFontSize" class="select">
                <option v-for="num in FontSizes" :key="num" :value="num">
                  {{ num }}
                </option>
              </select>
              <div>签字字体</div>
              <select v-model="options.signFontSize" class="select">
                <option v-for="num in FontSizes" :key="num" :value="num">
                  {{ num }}
                </option>
              </select>
            </section>
          </slot>
          <slot name="lineHeight">
            <section>
              <label>高度设置:</label>
              <div>标题行高度</div>
              <select v-model="options.titleLineHeight" class="select w55">
                <option v-for="num in TitleLineHeigts" :key="num" :value="num">
                  {{ num }}
                </option>
              </select>
              <div>单元格高度</div>
              <select v-model="options.cellLineHeight" class="select w60">
                <option v-for="num in CellLineHeigts" :key="num" :value="num">
                  {{ num }}
                </option>
              </select>
            </section>
          </slot>
          <slot name="direction">
            <section>
              <label>纸张方向:</label>
              <select
                v-model="options.orientation"
                class="select w60"
                @change="a4Size = null"
              >
                <option
                  v-for="dir in Directions"
                  :key="dir.value"
                  :value="dir.value"
                >
                  {{ dir.label }}
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
      <div
        ref="origin"
        class="print-page_origin print-page_a4-wrap"
        :class="{ hideOrigin: !showOrigin }"
      >
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
                  <th
                    :colspan="columns?.length"
                    :style="{ fontSize: options.titleFontSize! + options.unit, textAlign: 'left', lineHeight: 1 + Number(options.titleLineHeight) }"
                  >
                    {{ subTitle }}
                  </th>
                </tr>
              </slot>
              <slot :slot-scope="{ ...options }" name="header">
                <tr v-if="columns?.length">
                  <th
                    v-for="(col, i) in columns"
                    :key="col.title + i"
                    :class="(col as TableColumn).class"
                    :style="{
                    width: (col as TableColumn).width,
                    fontSize: options.titleFontSize! + options.unit,
                    lineHeight: 1 + Number(options.titleLineHeight)
                  }"
                  >
                    {{ col.title }}
                  </th>
                </tr>
              </slot>
            </thead>
            <slot :slot-scope="{ ...options }" name="tbody">
              <tbody>
                <tr v-for="(row, rindex) in data || []" :key="rindex">
                  <td
                    v-for="(col, cindex) in columns"
                    :key="col.title + cindex"
                    :class="(col as TableColumn).class"
                    :style="{
                      width: (col as TableColumn).width,
                      fontSize: options.contentFontSize! + options.unit,
                      lineHeight: 1 + Number(options.cellLineHeight)
                    }"
                  >
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
                  <template v-if="signOptions.managerSignShow">
                    <tr v-for="key in Object.keys(signOptions.managerSigns || {})" :key="key">
                      <td
                        v-if="columns?.length"
                        :colspan="columns.length"
                        :style="{
                          textAlign: 'left',
                          fontSize: options.signFontSize! + options.unit,
                          lineHeight: 3.5,
                        }"
                      >
                        <div style="display: inline-block; min-width: 11em">
                          {{key}}签字：
                        </div>
                        <img
                          v-for="(im, i) in signOptions.managerSigns?.[key] || []"
                          :key="i"
                          :src="im"
                        />
                      </td>
                    </tr>
                  </template>
                  <template v-if="signOptions.expertSignShow">
                    <tr v-for="key in Object.keys(signOptions.expertSigns || {})" :key="key">
                      <td
                        v-if="columns?.length"
                        :colspan="columns.length"
                        :style="{
                          textAlign: 'left',
                          fontSize: options.signFontSize! + options.unit,
                          lineHeight: 3.5,
                        }"
                      >
                        <div style="display: inline-block; min-width: 11em">
                          {{key}}签字：
                        </div>
                        <img
                          v-for="(im, i) in signOptions.expertSigns?.[key] || []"
                          :key="i"
                          :src="im"
                        />
                      </td>
                    </tr>
                  </template>
                  <template v-if="signOptions.otherSignShow">
                    <tr v-for="key in Object.keys(signOptions.otherSigns || {})" :key="key">
                      <td
                        v-if="columns?.length"
                        :colspan="columns.length"
                        :style="{
                          textAlign: 'left',
                          fontSize: options.signFontSize! + options.unit,
                          lineHeight: 3.5,
                        }"
                      >
                        <div style="display: inline-block; min-width: 11em">
                          {{key}}签字：
                        </div>
                        <img
                          v-for="(im, i) in signOptions.otherSigns?.[key] || []"
                          :key="i"
                          :src="im"
                        />
                      </td>
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
import * as ExcelJS from 'exceljs';
// @ts-ignore
import Anchor from 'exceljs/lib/doc/anchor';
import { type Border } from 'exceljs';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import {
  rgb2Hex,
  Directions,
  FontSizes,
  TitleLineHeigts,
  CellLineHeigts,
  calculateTableTdPosition,
} from './libs';
import type {
  ElementSize,
  Options,
  PrintProps,
  SignOptions,
  TableColumn,
  TableColumnIndex,
  PrintExposed,
  TableTdPosition,
  TableTdPositionItem,
} from './types';
import { watch, onUnmounted, reactive, computed, ref, onMounted } from 'vue';
import type { Mode } from './types';

const props = defineProps<PrintProps>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: Options): void;
  (e: 'update:sign', value: SignOptions): void;
}>();

const getParam = (param: string) => {
  const [s, r] =
    location.href.match(new RegExp(`[\\?&]${param}=([^&#]*)`)) || [];
  return r ? decodeURIComponent(r) : '';
};
const mode = ref<Mode>(props.mode || (getParam('mode') as any) || 'normal');
const defaultOptions: Options = {
  titleFontSize: '10',
  contentFontSize: '9',
  signFontSize: '9',
  titleLineHeight: '0.5',
  cellLineHeight: '0.5',
  unit: 'pt',
  orientation: 'landscape',
};
const options = reactive<Options>({ ...defaultOptions, ...props.modelValue });
let initOptions: Options | null = null;

const signOptions = reactive<SignOptions>({
  otherSignShow: true,
  managerSignShow: true,
  expertSignShow: true,
  ...props.sign,
});

const origin = ref<HTMLDivElement>();
const preview = ref<HTMLDivElement>();
const tool = ref<HTMLDivElement>();

function gainSize(dom: HTMLElement) {
  const style = getComputedStyle(dom);
  const size = {} as ElementSize;
  const pf = parseFloat;
  const dirs = ['Top', 'Right', 'Bottom', 'Left'] as [
    'Top',
    'Right',
    'Bottom',
    'Left'
  ];
  dirs.forEach((dir) => {
    size[`padding${dir}`] = pf(style[`padding${dir}`]);
    size[`margin${dir}`] = pf(style[`margin${dir}`]);
    size[`border${dir}Width`] = pf(style[`border${dir}Width`]);
  });
  let width = pf(style.width);
  let height = pf(style.height);
  const {
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
  } = size;
  const { paddingTop, paddingBottom, paddingLeft, paddingRight } = size;
  if (style.boxSizing === 'border-box') {
    const contentHeight =
      height - borderTopWidth - borderBottomWidth - paddingTop - paddingBottom;
    const contentWidth =
      width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight;
    Object.assign(size, { contentHeight, contentWidth, width, height });
  }
  if (style.boxSizing === 'content-box') {
    const contentWidth = width;
    const contentHeight = height;
    width =
      width + borderLeftWidth + borderRightWidth + paddingLeft + paddingRight;
    height =
      height + borderTopWidth + borderBottomWidth + paddingTop + paddingBottom;
    Object.assign(size, { contentHeight, contentWidth, width, height });
  }
  const wholeWidth = width + size.marginRight + size.marginLeft;
  const wholeHeight = height + size.marginBottom + size.marginTop;
  Object.assign(size, { wholeWidth, wholeHeight });
  return size;
}
let a4Size: ElementSize | null;
function calculateSize() {
  if (!tool.value) return;
  if (a4Size) return;
  a4Size = gainSize(tool.value);
}

function generatePreview(content: HTMLElement, container?: HTMLElement) {
  if (!content) return;
  const paper = container || preview.value || document.createElement('div');
  paper.innerHTML = '';
  let sumHeight = 0;
  let pageDiv = document.createElement('div');
  function nextPage() {
    sumHeight = 0;
    pageDiv = document.createElement('div');
    pageDiv.classList.add('print-page_a4-wrap');
    paper.appendChild(pageDiv);
  }
  nextPage();
  const it = content.childNodes.values();

  let node: HTMLElement;
  while ((node = it.next().value)) {
    if (node.nodeName === '#comment' && node.textContent === BreakComment) {
      nextPage();
    }
    if (
      node instanceof HTMLDivElement ||
      node instanceof HTMLParagraphElement
    ) {
      const elHeight = gainSize(node).wholeHeight;
      if (sumHeight + elHeight > a4Size!.contentHeight) {
        nextPage();
      }
      sumHeight += elHeight;
      pageDiv.appendChild(node.cloneNode(true));
    }
    if (node instanceof HTMLTableElement) {
      let temp = node.cloneNode(true) as HTMLTableElement;

      let rows = Array.from(node.rows || []);
      const filter = (r: HTMLTableRowElement) =>
        r.parentElement?.tagName === 'TBODY';
      rows = rows.filter(filter);
      if (!rows?.length) {
        // 判断是否需要换页
        if (sumHeight + node.offsetHeight > a4Size!.contentHeight) {
          nextPage();
        }
        sumHeight += node.offsetHeight;
        pageDiv.appendChild(temp);
        break;
      }
      const getHeight = (endRowIdx: number) => {
        const heads = Array.from((node as HTMLTableElement).rows).filter(
          (f) => !filter(f)
        );
        const bodys = rows.slice(startRowIdx, endRowIdx);
        return heads.concat(bodys).reduce((s, c) => s + c.offsetHeight, 0);
      };
      const setWidth = (td: HTMLTableCellElement, i: number, j: number) => {
        const origin = rows[i].cells.item(j);
        td.style.width = origin.getBoundingClientRect().width + 'px';
      };
      let startRowIdx = 0;
      // 不包含endRowIdx
      const add = (endRowIdx: number) => {
        Array.from(temp.rows)
          .filter(filter)
          .forEach((row, i) => {
            Array.from(row.cells).forEach((td, j) => {
              const isTarget = startRowIdx <= i && i < endRowIdx;
              const y = i + td.rowSpan - 1;
              const isMerged = startRowIdx <= y && y < endRowIdx;
              if (isTarget || isMerged) {
                setWidth(td, i, j);
              } else {
                td.style.display = 'none';
              }
            });
          });
        pageDiv.appendChild(temp);
        temp = node.cloneNode(true) as HTMLTableElement;
      };
      rows.forEach((row, i) => {
        // 判断是否需要换页
        if (i && sumHeight + getHeight(i + 1) > a4Size!.contentHeight) {
          add(i);
          nextPage();
          startRowIdx = i;
        }
      });
      // 循环最后剩余的元素
      add(rows.length);
      sumHeight += getHeight(rows.length);
    }
  }
  console.log('generatePreview executed');
}

let timer: any;
function drawA4Paper() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    calculateSize();
    if (!origin.value) return;
    generatePreview(origin.value);
  }, 100);
  return timer;
}

watch(
  () => props.modelValue,
  (v) => {
    console.log('options model change');
    Object.assign(options, v);
    if (!initOptions) initOptions = { ...options };
  },
  { deep: true, immediate: true }
);
const paperStyle = document.createElement('style');
paperStyle.setAttribute('type', 'text/css');
document.head.appendChild(paperStyle);
watch(
  () => options,
  (v) => {
    console.log('options change');
    drawA4Paper();
    emit('update:modelValue', v);
    paperStyle.innerHTML = `@page {size: A4 ${options.orientation};margin: 0;}`;
  },
  { deep: true, immediate: true }
);
watch(
  () => props.sign,
  (v) => {
    console.log('sign model change');
    v && Object.assign(signOptions, v);
  },
  { deep: true, immediate: true }
);
watch(
  () => signOptions,
  (v) => {
    console.log('signOptions change');
    drawA4Paper();
    emit('update:sign', v);
  },
  { deep: true, immediate: true }
);
watch(() => props.data, drawA4Paper);

onMounted(() => {
  drawA4Paper();
  emit('update:modelValue', options);
  emit('update:sign', signOptions);
});
onUnmounted(() => paperStyle.remove());

const reset = () => Object.assign(options, initOptions || defaultOptions);

const print = () => window.print();

// 获取设备的像素比
const pixelRatio = window.devicePixelRatio || 1;
// px转英寸
const px2In = (px: number) => px / (96 * pixelRatio);
const px2Pt = (px: number) => px2In(px) * 72;

const getFont = (style: CSSStyleDeclaration, isBold?: boolean) => {
  const bold = isBold || Number(style.fontWeight) > 400;
  const name = style.fontFamily.replace(/"/g, '');
  const color = { argb: rgb2Hex(style.color) };
  return { name, color, bold, size: px2Pt(parseFloat(style.fontSize)) };
};

const table2ExcelSheet = async (
  workbook: ExcelJS.Workbook,
  el: Element,
  sheetName: string
) => {
  if (el.tagName !== 'TABLE') return;
  const table = el as HTMLTableElement;
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
        footer: 0,
      },
    },
    properties: { defaultColWidth: 14, defaultRowHeight: 14 },
    views: [{ showGridLines: false }],
  });
  worksheet.state = 'visible';

  const cellPostion = calculateTableTdPosition(table);

  let widths: number[] = [];
  const imgRows = {} as Record<number, any>;
  for (let ridx = 0; ridx < table.rows.length; ridx++) {
    const row = table.rows.item(ridx);
    if (!row) continue;
    const isHead = row.parentElement?.tagName === 'THEAD';
    const _widths: number[] = [];
    let maxHeight = 0;
    const imgs = [] as any;
    for (let ci = 0; ci < row.cells.length; ci++) {
      const tableCell = row.cells.item(ci);
      if (!tableCell) continue;
      const cidx = cellPostion[ridx][ci].position.x;
      const size = gainSize(tableCell);
      _widths.push(size.wholeWidth);
      maxHeight = Math.max(maxHeight, size.wholeHeight);
      const cell = worksheet.getCell(ridx + 1, cidx + 1);
      const style = getComputedStyle(tableCell);

      let bgClr = rgb2Hex(style.backgroundColor, false);
      bgClr = bgClr === '000000' ? 'ffffff' : bgClr;
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: bgClr },
      };
      cell.alignment = {
        wrapText: true,
        horizontal: style.textAlign as any,
        vertical: 'middle',
      };
      const getBorder = (w: string, color: string) => {
        const res = {} as Partial<Border>;
        if (parseFloat(w)) res.style = 'thin';
        if (color?.startsWith('rgba(0')) res.color = { argb: bgClr };
        return res;
      };
      cell.border = {
        top: getBorder(style.borderTopWidth, style.borderTopColor),
        right: getBorder(style.borderRightWidth, style.borderRightColor),
        bottom: getBorder(style.borderBottomWidth, style.borderBottomColor),
        left: getBorder(style.borderLeftWidth, style.borderLeftColor),
      };
      const { rowSpan, colSpan } = tableCell;
      if (rowSpan > 1 || colSpan > 1) {
        worksheet.mergeCells(
          ridx + 1,
          cidx + 1,
          ridx + rowSpan,
          cidx + colSpan
        );
      }

      const font = getFont(style, isHead);
      const richText = [] as ExcelJS.RichText[];
      const isBlock = (n: ChildNode) =>
        n instanceof HTMLDivElement || n instanceof HTMLParagraphElement;
      const childs = Array.from(tableCell.childNodes);
      childs.forEach((node, i) => {
        if (node instanceof Text && node.textContent)
          return richText.push({ text: node.textContent || '', font });
        if (node instanceof HTMLBRElement) return richText.push({ text: '\n' });
        if (node instanceof HTMLImageElement) {
          const [m, type] = /image\/([a-z]+);/.exec(node.src) || [];
          if (!type) return;
          const imageId = workbook.addImage({
            base64: node.src,
            extension: type as any,
          });
          imgs.push({ imageId, ridx, cidx, node });
          return;
        }
        if (node instanceof HTMLElement) {
          const f = getFont(getComputedStyle(node));
          if (f.color.argb.startsWith('00')) f.color.argb = bgClr;
          const isBlk = isBlock(node);
          if (isBlk && i && !(node instanceof HTMLBRElement))
            richText.push({ text: '\n' });
          if (!isBlk && isBlock(childs[i - 1])) richText.push({ text: '\n' });
          richText.push({ text: node.innerText, font: f });
          return;
        }
      });
      cell.value = { richText };
    }
    imgs.length && (imgRows[ridx] = imgs);
    widths = _widths.length > widths.length ? _widths : widths;
    worksheet.getRow(ridx + 1).height = maxHeight * 0.8
  }
  // 设置每列宽度
  widths.forEach((w, ci) => (worksheet.getColumn(ci + 1).width = w * 0.135));
  const wrapWidth = widths.reduce((a, b) => a + b, 0);

  Object.keys(imgRows).forEach((r) => {
    const imgs = imgRows[Number(r)];
    const nodes = table.rows.item(Number(r))!.cells.item(0)!.children;
    const initX = Array.from(nodes)[0].getBoundingClientRect().width;
    let rowOffset = initX;
    let tdOffset = rowOffset;
    let offsetY = 2;
    let cidx = 0;
    let i = -1;
    const each = () => {
      i++;
      if (i >= imgs.length) return;
      const { imageId, ridx, node } = imgs[i];
      const { width, height } = gainSize(node);
      const tdWidth = widths[cidx];
      if (tdOffset + width > tdWidth) {
        cidx++;
        i--;
        if (cidx >= widths.length || rowOffset + width > wrapWidth) {
          cidx = 0;
          offsetY += height + 1;
          tdOffset = rowOffset = initX;
          return each();
        }
        tdOffset = tdOffset - tdWidth;
        return each();
      }
      const an = new Anchor();
      an.worksheet = worksheet;
      an.col = cidx;
      an.row = ridx;
      an.nativeColOff = Math.floor(tdOffset * 10000);
      an.nativeRowOff = Math.floor(offsetY * 10000);
      worksheet.addImage(imageId, {
        tl: an,
        ext: { width, height },
        editAs: 'oneCell',
      });
      tdOffset += width * 1.08;
      rowOffset += width * 1.08;
      each();
    };
    each();
  });
};
const saveFile = (data: ArrayBuffer, fileName: string) => {
  console.log(`${fileName} byteLength: ${data.byteLength}`);
  if (props.save) {
    return props.save(data);
  }
  const opener = window.opener || window.parent;
  const type = getParam('save');
  if (type) {
    opener?.postMessage({ type, data, fileName }, '*');
  } else {
    const blob = new Blob([data], { type: '' });
    saveAs(blob, fileName);
    setTimeout(() => {
      if (props.saved) {
        return props.saved(fileName);
      }
      const type = getParam('saved');
      if (type) {
        opener?.postMessage({ type, fileName }, '*');
      }
    }, 300);
  }
};
const generateExcel = async () => {
  const childs = origin.value?.children || [];
  if (!childs?.length) throw new Error('未发现表格元素');
  const els = Array.from(childs).filter((e) => e.tagName === 'TABLE');
  if (!els?.length) throw new Error('未发现表格元素');
  calculateSize();
  const workbook = new ExcelJS.Workbook();
  workbook.created = workbook.modified = workbook.lastPrinted = new Date();
  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 0,
      visibility: 'visible',
    },
  ];

  for (let i = 0; i < els.length; i++) {
    await table2ExcelSheet(workbook, els[i], els[i].id || 'Sheet' + (i + 1));
  }
  const data = await workbook.xlsx.writeBuffer();
  saveFile(data, props.fileName + '.xlsx');
  console.log('generateExcel complete');
};

const generatePdf = async () => {
  if (!preview.value?.childNodes?.length) return;
  calculateSize();
  const pdf = new JsPDF(options.orientation, 'mm', 'a4'); // 创建一个新的PDF文档，默认A4纸大小，以毫米为单位
  const nodes = Array.from(preview.value?.childNodes).filter(
    (el) => el instanceof HTMLElement
  ) as HTMLElement[];
  for (let i = 0; i < nodes.length; i++) {
    const el = nodes[i];
    const boxShadow = el.style.boxShadow;
    el.style.boxShadow = 'none';
    const canvas = await html2canvas(el, { scale: 2, useCORS: true });
    el.style.boxShadow = boxShadow;
    const dataURL = canvas.toDataURL('image/png');

    const imgProps = pdf.getImageProperties(dataURL);
    const width = pdf.internal.pageSize.getWidth();
    const height = (imgProps.height * width) / imgProps.width;
    pdf.addImage(dataURL, 'PNG', 0, 0, width, height);
    if (i !== nodes.length - 1) pdf.addPage();
  }
  const data = pdf.output('arraybuffer');
  // pdf.save(props.fileName + '.pdf') // 下载PDF文件
  saveFile(data, props.fileName + '.pdf');
  console.log('generatePdf complete');
};

defineExpose<PrintExposed>({
  drawA4Paper,
  refresh: drawA4Paper,
  generateExcel,
  generatePdf
});
</script>
<script lang="ts">
import { defineComponent, h, Comment } from 'vue';
// 随机生成字符内容
const id = Math.random().toString(36).substring(2);
const BreakComment = `PAGE-BREAK-${id} (random id)`;
export const PrintPageBreak = defineComponent({
  render: () => h(Comment, BreakComment),
});
export default {
  name: 'print-page',
};
</script>
