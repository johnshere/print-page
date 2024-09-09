<template>
  <PrintPage ref="printRef" v-model="options" fileName="测试" :sign="{
    managerSignShow: false,
    otherSignShow: false,
    expertSignShow: false,
  }" :columns :data class="test" showOrigin>
    <table>
      <thead>
        <tr>
          <th colspan="11" style="font-size: 14pt;">ZB202409040906584499126/001 测试多标段项目 标段（包）001 <br> 技术打分</th>
        </tr>
        <tr>
          <th colspan="11" style="font-size: 9pt; text-align: left; line-height: 1.5;"> 项目编号：ZB202409040906584499126/001
            文件开启时间：2024-09-04 11:30</th>
        </tr>
        <tr>
          <th colspan="2" :style="{
            fontSize: options.titleFontSize! + options.unit,
            lineHeight: 1 + Number(options.titleLineHeight)
          }"> 评审项 </th>
          <th :style="{
            fontSize: options.titleFontSize! + options.unit,
            lineHeight: 1 + Number(options.titleLineHeight)
          }">评分范围</th>
          <th :style="{
            fontSize: options.titleFontSize! + options.unit,
            lineHeight: 1 + Number(options.titleLineHeight)
          }">优质采李志豪测试账号7</th>
          <th :style="{
            fontSize: options.titleFontSize! + options.unit,
            lineHeight: 1 + Number(options.titleLineHeight)
          }">优质采李志豪测试投标人账号8测试</th>
          <th :style="{
            fontSize: options.titleFontSize! + options.unit,
            lineHeight: 1 + Number(options.titleLineHeight)
          }">招标二部测试投标人-测试lyl</th>
          <th :style="{
            fontSize: options.titleFontSize! + options.unit,
            lineHeight: 1 + Number(options.titleLineHeight)
          }">优质采李志豪投标人测试账号51</th>
          <th :style="{
            fontSize: options.titleFontSize! + options.unit,
            lineHeight: 1 + Number(options.titleLineHeight)
          }">优质采李志豪投标人测试账号2变变</th>
          <th :style="{
            fontSize: options.titleFontSize! + options.unit,
            lineHeight: 1 + Number(options.titleLineHeight)
          }">优质采丁波1测试投标人</th>
          <th :style="{
            fontSize: options.titleFontSize! + options.unit,
            lineHeight: 1 + Number(options.titleLineHeight)
          }">优质采李志豪投标人测试账号6</th>
          <th :style="{
            fontSize: options.titleFontSize! + options.unit,
            lineHeight: 1 + Number(options.titleLineHeight)
          }">优质采李志豪投标人测试账号3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="1" rowspan="3"  :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">1.3 招标范围、计划工期、质量要求
          </td>
          <td colspan="1" rowspan="1"  :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">1.3.1
            本次招标范围：见投标人须知前附表。</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">0-5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">4</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">3</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">3</td>
        </tr>
        <tr>
          <td colspan="1" rowspan="1"  :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">1.3.2
            本标段的计划工期：见投标人须知前附表。</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">0-5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">3</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">2</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">3</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">4</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">4</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
        </tr>
        <tr><!--v-if-->
          <td colspan="1" rowspan="1"  :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">1.3.3
            本标段的质量要求：见投标人须知前附表。</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">0-5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">4</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">3</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">3</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">4</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">3</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
        </tr>
        <tr>
          <td colspan="1" rowspan="2"  :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">1.4 投标人资格要求</td>
          <td colspan="1" rowspan="1"  :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">1.4.1
            投标人应具备承担本标段施工的资质条件、能力和信誉。</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">0-7</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">7</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">6</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">2</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">3</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">2</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">1</td>
        </tr>
        <tr><!--v-if-->
          <td colspan="1" rowspan="1"  :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">1.4.2
            投标人须知前附表规定接受联合体投标的，联合体除应符合本章第1.4.1项和投标人须知前附表的要求外，还应遵守以下规定：
            （1）联合体各方应按招标文件提供的格式签订联合体协议书，明确联合体牵头人和各方权利义务，并承诺就中标项目向招标人承担连带责任；
            （2）由同一专业的单位组成的联合体，按照资质等级较低的单位确定资质等级；
            （3）联合体各方不得再以自己名义单独或参加其他联合体在同一标段中投标。
            （4）联合体各方应分别按照本招标文件的要求，填写投标文件中的相应表格，并由联合体牵头人负责对联合体各成员的资料进行统一汇总后一并提交给招标人；联合体牵头人所提交的投标文件应被认为已代表了联合体各成员的真实情况；
            （5）尽管委任了联合体牵头人，但联合体各成员在投标、签约与履行合同过程中，仍负有连带的和各自的法律责任。</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">0-8</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">3</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">5</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">1</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">1</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">4</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">1</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">2</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">7</td>
        </tr>
        <tr>
          <td colspan="2"  :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">评审结果</td><!--v-if-->
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }"></td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">22.00</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">22.00</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">17.00</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">20.00</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">18.00</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">18.00</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">15.00</td>
          <td :style="{
            fontSize: options.contentFontSize! + options.unit,
            lineHeight: 1 + Number(options.cellLineHeight)
          }">21.00</td>
        </tr>
        <tr>
          <td colspan="11" :style="{
            textAlign: 'left',
            fontSize: options.signFontSize! + options.unit,
            lineHeight: 3.5,
          }">
            <div style="display: inline-block;">评标委员（专家三）：</div>
          </td>
        </tr>
      </tbody>
    </table>
  </PrintPage>
</template>
<script lang="ts" setup>
import '@/style.scss';
import PrintPage from '@/index.vue';
import type { TableColumns, Options } from '@/types.d.ts';

const printRef = ref<InstanceType<typeof PrintPage>>();

const options = ref<Options>({ orientation: 'portrait' });
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
</script>