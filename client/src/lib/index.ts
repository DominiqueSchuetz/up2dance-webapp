import moment from 'moment';
import { instrumentOption } from '../enums';

export const isEmailValid = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const parseToDateFormat = (date: string): string => {
  const momentDateObject = moment(date, 'LL');
  // eslint-disable-next-line no-underscore-dangle
  const parsedDate = moment(Object(momentDateObject)._d).format();

  return parsedDate;
};

export const filterByActualYear = (date: string): boolean => {
  const parsedDate = parseToDateFormat(date);
  const result = moment(new Date()).isSame(parsedDate, 'year');

  return result;
};

export const sortedArray = <T>(arrayOfDates: T[], key: string) => {
  const sorted = arrayOfDates.slice().sort((a, b) => {
    const c = new Date(parseToDateFormat(`${a}.${key}`));
    const d = new Date(parseToDateFormat(`${b}.${key}`));
    return +c - +d;
  });
  return sorted;
};

export const removeString = (originalString: string, stringToRemove: string): string => {
  return originalString.replace(new RegExp(stringToRemove, 'g'), '').trim();
};

export const removeAndClearJwtTokenFromBrowser = (): void => {
  localStorage.removeItem('token');
  localStorage.clear();
};

export const addJwtTokenToApplication = (jwtToken: string): void => {
  localStorage.clear();
  localStorage.setItem('token', jwtToken);
};

export const chooseEmoji = (instrument: string): string => {
  let emoji: string = '😻';
  for (const iterator of instrumentOption) {
    if (instrument === iterator.text) {
      emoji = iterator.emoji!;
    }
  }
  return emoji;
};
