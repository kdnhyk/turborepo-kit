import { addDays, format as _format } from 'date-fns'
import { ko as locale } from 'date-fns/locale'

export type DateFnsDateType = string | number | Date
export type DateFormatType =
  | 'yyyy-MM-dd'
  | 'MMMM d, yyyy'
  | 'MMMM d'
  | 'yyyy-MM-dd HH:mm:ss'

/**
 * Formats a given date to a specified format adjusted by an offset (number of days)
 * in the Korean Standard Time (KST) timezone.
 * @param {DateFnsDateType} date - The date to format (string, number, or Date object)
 * @param {number} offset - The number of days to add or subtract (positive: add, negative: subtract)
 * @param {string} format - The format to return the date in
 * @returns {string} The formatted date string
 */
export const kstFormat = (
  date: DateFnsDateType,
  offset?: number,
  format?: DateFormatType,
): string => {
  if (!offset) return _format(date, format || 'yyyy-MM-dd', { locale })

  return _format(addDays(date, offset), format || 'yyyy-MM-dd', { locale })
}
