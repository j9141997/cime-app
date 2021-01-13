import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'

export function distanceToNow(date: Date | number): string {
  return formatDistanceToNow(date, { locale: ja })
}
