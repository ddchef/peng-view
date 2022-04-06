import dayjs from 'dayjs';

export function formatDate(dateStr:string, template = 'YYYY-MM-DD HH:mm:ss'):string {
  if (!dateStr) return '';
  return dayjs(dateStr).format(template);
}
