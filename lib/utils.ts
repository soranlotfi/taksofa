// lib/utils.ts

/**
 * تبدیل اعداد انگلیسی به فارسی
 */
export function toPersianDigits(num: string | number): string {
    const persianDigits: { [key: string]: string } = {
        '0': '۰',
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
    };

    return String(num).replace(/\d/g, (d) => persianDigits[d]);
}

/**
 * تبدیل عدد به فارسی با جداکننده‌ی هزارگان
 */
export function toPersianNumberWithComma(num: number): string {
    const withComma = num.toLocaleString('en-US');
    return toPersianDigits(withComma);
}

/**
 * تبدیل عدد به فارسی بدون جداکننده (برای اعداد کوچک)
 */
export function toPersianNumber(num: number): string {
    return toPersianDigits(num.toString());
}