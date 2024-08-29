<template>
  <PrintPage ref="printRef" :model-value="options" fileName="测试" :sign="{
    managerSignShow: false,
    otherSignShow: false,
    expertSignShow: false,
  }" :columns :data>
    <template #title>
      <tr>
        <th colspan="3" style="font-size: 14pt">标题</th>
      </tr>
    </template>
    <template #subTitle>
      <tr>
        <th colspan="3" :style="{
          fontSize: options.titleFontSize! + options.unit, textAlign: 'left', lineHeight: 1 + Number(options.titleLineHeight)
        }">
          副标题
        </th>
      </tr>
    </template>
    <template #header>
      <tr>
        <th>序号</th>
        <th>编号</th>
        <th>名称</th>
        <!-- <th>电费</th>
        <th>电饭锅</th> -->
      </tr>
    </template>
    <template #tbody>
      <tbody>
        <tr>
          <td style="font-size: 8pt; line-height: 1.5;">1</td>
          <td style="font-size: 8pt; line-height: 1.5;">2</td>
          <td style="font-size: 9pt; line-height: 1.5;">符合</td>
        </tr>
        <tr>
          <td style="font-size: 8pt; line-height: 1.5;">3.无其他废标情形</td>
          <td style="font-size: 8pt; line-height: 1.5;">无其他废标情形。</td>
          <td style="font-size: 9pt; line-height: 1.5;">符合</td>
        </tr>
        <tr>
          <td style="font-size: 8pt; line-height: 1.5;">2.投标保证金</td>
          <td style="font-size: 8pt; line-height: 1.5;">
            投标保证金按照招标文件要求缴纳（以投标保证金回执单为准）。</td>
          <td style="font-size: 9pt; line-height: 1.5;">符合</td>
        </tr>
        <tr>
          <td rowspan="6" style="font-size: 8pt; line-height: 1.5;">1.投标人资格要求</td>
          <td style="font-size: 8pt; line-height: 1.5;">
            具有独立法人资格、有效的营业执照（或事业单位法人证书）及安全生产许可证。</td>
          <td style="font-size: 9pt; line-height: 1.5;">符合</td>
        </tr>
        <tr>
          <td style="font-size: 8pt; line-height: 1.5;">具有施工类似工程的业绩。</td>
          <td style="font-size: 9pt; line-height: 1.5;">符合</td>
        </tr>
        <tr>
          <td style="font-size: 8pt; line-height: 1.5;">
            没有被责令停产停业、投标资格被取消或存在其他丧失履约能力的情形（投标人自行承诺）。</td>
          <td style="font-size: 9pt; line-height: 1.5;">符合</td>
        </tr>
        <tr>
          <td style="font-size: 8pt; line-height: 1.5;">
            投标当期投标人不得在“国家企业信用信息公示系统”“信用中国”上被列入经营异常目录或严重违法失信企业名单或失信被执行人名单或重大税收违法案件当事人名单（投标人自行承诺）。</td>
          <td style="font-size: 9pt; line-height: 1.5;">符合</td>
        </tr>
        <tr>
          <td style="font-size: 8pt; line-height: 1.5;">
            2021年1月1日以来没有骗取中标、严重违约及发生重大质量事故（投标人自行承诺）。</td>
          <td style="font-size: 9pt; line-height: 1.5;">符合</td>
        </tr>
        <tr>
          <td style="font-size: 8pt; line-height: 1.5;">本次招标不接受联合体投标。</td>
          <td style="font-size: 9pt; line-height: 1.5;">符合</td>
        </tr>
        <tr>
          <td colspan="2" style="font-size: 8pt; line-height: 1.5;">汇总</td>
          <td style="font-size: 9pt; line-height: 1.5;">符合</td>
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
