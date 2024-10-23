export class DateFormatter {
  static readonly formatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
  static getDDMMYYYY(date: Date) {
    return this.formatter.format(date);
  }
}
