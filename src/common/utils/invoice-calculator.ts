interface InvoiceItem {
	price: number;
	quantity: number;
}

interface TotalPrice {
	subtotal: number;
	taxRate: number;
	discount: number;
}
export class InvoiceCalculator {
	static calculateSubtotal(items: InvoiceItem[]) {
		return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	}

	static calculateTotal(data: TotalPrice) {
		const tax = data.subtotal * data.taxRate;
		return data.subtotal + tax - data.discount;
	}
}
