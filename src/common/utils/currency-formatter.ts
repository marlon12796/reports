export class CurrencyFormatter {
	private static currencyLocales: { [currency: string]: Intl.LocalesArgument } = {
		USD: 'en-US',
		EUR: 'de-DE',
		MXN: 'es-MX',
		PEN: 'es-PE',
	};

	static format(value: number, currency: string = 'USD', minimumFractionDigits: number = 2): string {
		const locale: Intl.LocalesArgument = this.currencyLocales[currency] || 'en-US';
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency,
			minimumFractionDigits,
		}).format(value);
	}
}
