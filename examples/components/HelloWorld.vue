<template>
  <PrintPage
    ref="printRef"
    :model-value="options"
    fileName="测试"
    :sign="{
      managerSignShow: false,
      otherSignShow: false,
      expertSignShow: false,
    }"
    :columns
    :data
  >
    <template #title>
      <tr>
        <th colspan="5" style="font-size: 14pt">标题</th>
      </tr>
    </template>
    <template #subTitle>
      <tr>
        <th
          colspan="5"
          :style="{
                    fontSize: options.titleFontSize! + options.unit, textAlign: 'left', lineHeight: 1 + Number(options.titleLineHeight)
                }"
        >
          副标题
        </th>
      </tr>
    </template>
    <template #header>
      <tr>
        <th>序号</th>
        <th>编号</th>
        <th>名称</th>
        <th>电费</th>
        <th>电饭锅</th>
      </tr>
    </template>
    <template #tbody>
      <tbody>
        <tr>
          <td>1-1</td>
          <td colspan="3">1-2</td>
          <td>1-3</td>
        </tr>
        <tr>
          <td>2-1</td>
          <td colspan="2">2-2</td>
          <td>2-3</td>
          <td rowspan="2">2-4</td>
        </tr>
        <tr>
          <td>3-1</td>
          <td>3-2</td>
          <td>3-3</td>
          <td>3-4</td>
        </tr>
      </tbody>
    </template>
  </PrintPage>
</template>
<script lang="ts" setup>
import '@/style.scss';
import PrintPage from '@/index.vue';
import type { TableColumns, Options } from '@/types.d.ts';

const printRef = ref<InstanceType<typeof PrintPage>>();

const options = reactive<Options>({});
const data = ref<any[]>([]);
const columns: TableColumns<any> = [
  {
    title: '序号',
    type: 'index',
  },
  {
    title: '编号',
    prop: 'number',
  },
  {
    title: '名称',
    prop: 'name',
  },
  {
    title: '电费',
    prop: 'fee',
  },
  {
    title: '电饭锅',
    prop: 'r',
  },
];

window.addEventListener('message', function (data) {
  console.log(data);
});
onMounted(async () => {
  await nextTick();
  printRef.value?.drawA4Paper();
  setTimeout(() => {
    if (location.href.includes('excelImmediate')) {
      printRef.value?.generateExcel();
    }
    if (location.href.includes('pdfImmediate')) {
      printRef.value?.generatePdf();
    }
  }, 300);
});
// if (window.top === window) {
//   setTimeout(() => {
//     const iframe = document.createElement('iframe');
//     iframe.src = location.href + '?excelImmediate=1&saved=tttt';
//     iframe.style.position = 'absolute';
//     iframe.style.width = '400mm';
//     iframe.style.left = '-500mm';
//     document.body.appendChild(iframe);
//   }, 4000);
// }
const complete = () => {
  console.log('完成');
};
</script>
