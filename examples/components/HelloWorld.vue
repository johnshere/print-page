<template>
    <PrintPage ref="printRef" :model-value="options" fileName="测试"
        :sign="{ managerSignShow: false, otherSignShow: false, expertSignShow: false }" :columns :data>
        <template #title>
            <tr>
                <th colspan="3" style="font-size: 14pt">
                    标题
                </th>
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
    </PrintPage>
</template>
<script lang="ts" setup>
import '@/style.scss'
import PrintPage from '@/index.vue'
import type { TableColumns, Options } from '@/types.d.ts'

const printRef = ref<InstanceType<typeof PrintPage>>()

const options = reactive<Options>({})
const data = ref<any[]>([])
const columns: TableColumns<any> = [
    {
        title: '序号',
        type: 'index'
    },
    {
        title: '编号',
        prop: 'number'
    },
    {
        title: '名称',
        prop: 'name'
    }
]
// ;(window as any).test = (data) =>{
//     console.log(data)
// }
// window.addEventListener('message', function(data){
//     console.log(data)
// })
onMounted(async () => {
    await nextTick()
    printRef.value?.drawA4Paper()
    setTimeout(() => {
        if (location.href.includes('excelImmediate')) {
            printRef.value?.generateExcel()
            window.close()
        }
        if (location.href.includes('pdfImmediate')) {
            printRef.value?.generatePdf()
            window.close()
        }
    }, 300)
})
</script>
