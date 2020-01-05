import moment from "moment";

export const isEmailValid = (email: string): boolean => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const parseToDateFormat = (date: string): string => {
	const momentDateObject = moment(date, "LL");
	const parsedDate = moment(Object(momentDateObject)._d).format();

	return parsedDate;
};

export const filterByActualYear = (date: string): boolean => {
	const parsedDate = parseToDateFormat(date);
	const result = moment(new Date()).isSame(parsedDate, "year");

	return result;
};

export const sortedArray = <T>(arrayOfDates: T[], key: string) => {
	const sorted = arrayOfDates.slice().sort(function(a, b) {
		const c = new Date(parseToDateFormat(`${a}.${key}`));
		const d = new Date(parseToDateFormat(`${b}.${key}`));
		return +c - +d;
	});
	return sorted;
};
