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
