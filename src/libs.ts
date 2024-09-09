import { TableTdPosition, TableTdPositionItem } from "./types"

/**
* 纸张方向
*/
export const Directions = [
    { label: '纵向', value: 'portrait' },
    { label: '横向', value: 'landscape' }
]
/**
* 字体，word字体 pt
*/
export const FontSizes = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(String)
/**
* 标题行高，word行高概念
*/
export const TitleLineHeigts = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, '1.0', 1.1, 1.2].map(String)
/**
* 单元格行高，word行高概念
*/
export const CellLineHeigts = Array.from({ length: 14 }, (_, i) => String((i * 5 + 35) / 100))
/**
 * 256的rgba或rgb颜色转换为16进制颜色
 * @param rgb rgba(255, 127, 0, 0.5)、rgb(255, 127, 0)
 * @param isAlpha
 * @param type
 * @returns FF00FF00、FFFFFF
 */
export function rgb2Hex(rgb: string, isAlpha = true, type: 'argb' | 'rgba' = 'argb') {
    let parts
    let alpha
    // 处理RGBA格式，如: rgba(255, 127, 0, 0.5)
    if (rgb.startsWith('rgba')) {
        parts = rgb.slice(5, -1).split(',').map(Number)
        alpha = Math.round((parts.pop() ?? 0) * 255) // 将透明度从0-1转换为0-255，并四舍五入
    }
    // 处理RGB格式，如: rgb(255, 127, 0)
    else if (rgb.startsWith('rgb')) {
        parts = rgb.slice(4, -1).split(',').map(Number)
        alpha = 255
    }
    // 如果输入格式不正确，返回空字符串或其他错误处理
    else {
        console.error('Invalid color format')
        return ''
    }
    let str = `${parts.map(v => v.toString(16).padStart(2, '0')).join('')}`
    if (isAlpha) {
        if (type === 'argb') {
            str = `${alpha.toString(16).padStart(2, '0')}${str}`
        } else {
            str = `${str}${alpha.toString(16).padStart(2, '0')}`
        }
    }
    return str
}

/**获取单元格rowIdx,colIdx真实的x坐标位置 */
const getTdRealPos = (
    tdsPos: TableTdPosition,
    rowIdx: number,
    colIdx: number
) => {
    let colspanNum = 0;
    let flagNum = 0;
    if (colIdx != 0) {
        const preTdPos = tdsPos[rowIdx][colIdx - 1];
        flagNum = preTdPos.position.x + preTdPos.colspan - 1;
    }
    for (let i = rowIdx; i >= 0; i--) {
        const rowCols = tdsPos[i];
        for (let j = 0; j < rowCols.length; j++) {
            const col = rowCols[j];
            if (i == rowIdx && j < colIdx) {
                //同一行单元格对后面单元格x坐标影响
                colspanNum += col.colspan;
            } else if (i < rowIdx && col.rowspan + i - 1 >= rowIdx) {
                if (
                    col.position.x + col.colspan - 1 <= flagNum ||
                    colspanNum == col.position.x
                ) {
                    //上面单元格rowspan对x坐标的影响
                    colspanNum += col.colspan;
                }
            }
        }
    }
    return { x: colspanNum, y: rowIdx };
};
/**
 * 计算表格中单元格位置坐标
 * @param table 
 * @returns TableTdPosition
 */
export const calculateTableTdPosition = (table: HTMLTableElement) => {
    const tdsPos: TableTdPosition = [];
    const trs = Array.from(table.rows || []);
    for (let i = 0; i < trs.length; i++) {
        const tr = trs[i];
        const tds = Array.from(tr.cells);
        tdsPos[i] = [];
        for (let j = 0; j < tds.length; j++) {
            const td = tds[j];
            const rowSpan = td.rowSpan ? Number(td.rowSpan) : 1;
            const colSpan = td.colSpan ? Number(td.colSpan) : 1;
            tdsPos[i][j] = {
                rowspan: rowSpan,
                colspan: colSpan,
            } as TableTdPositionItem;
        }
    }
    //逐个单元格坐标修复。修复顺序为从上到下，从左到右。即ABCDEFG。。。的顺序修复。
    tdsPos.forEach(function (rowCols, y) {
        rowCols.forEach(function (col, x) {
            col.position = getTdRealPos(tdsPos, y, x);
        });
    });
    return tdsPos;
};