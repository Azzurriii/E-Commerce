export interface IUserSalesReportItem {
	date: string;
	total: number;
	order: number;
}

export interface IUserSalesReport {
	[date: string]: IUserSalesReportItem;
}
