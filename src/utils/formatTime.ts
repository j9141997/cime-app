import { formatDistanceToNow, differenceInDays } from 'date-fns'
import { ja } from 'date-fns/locale'

export function distanceToNow(date: Date | number): string {
  return formatDistanceToNow(date, { locale: ja })
}

export function isRecently(date: Date | number): boolean {
  const now = Date.now()
  return differenceInDays(date, now) === 0
}
