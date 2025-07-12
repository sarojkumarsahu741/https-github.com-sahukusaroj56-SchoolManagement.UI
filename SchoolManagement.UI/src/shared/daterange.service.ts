// src/app/services/date-range.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {

  constructor() { }

  getDateRange(selectedDate: string): { fromDate: string, toDate: string } {
    let fromDate: Date;
    let toDate: Date;

    const today = new Date();

    switch (selectedDate) {
      case 'today': {
        fromDate = toDate = today;
        break;
      }
      case 'yesterday': {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        fromDate = toDate = yesterday;
        break;
      }
      case 'thisWeek': {
        const firstDayOfWeek = new Date(today);
        const dayOfWeek = today.getDay(); // Sunday = 0

        const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        firstDayOfWeek.setDate(today.getDate() + diffToMonday);
        firstDayOfWeek.setHours(0, 0, 0, 0);

        fromDate = firstDayOfWeek;
        toDate = today;
        break;
      }
      case 'thisMonth': {
        fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
        fromDate.setHours(0, 0, 0, 0);
        toDate = new Date(today);
        toDate.setHours(23, 59, 59, 999);
        break;
      }
      case 'lastMonth': {
        fromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        fromDate.setHours(0, 0, 0, 0);
        toDate = new Date(today.getFullYear(), today.getMonth(), 0);
        toDate.setHours(23, 59, 59, 999);
        break;
      }
      default: {
        fromDate = toDate = today;
        break;
      }
    }
    const format = (date: Date) => date.toLocaleDateString('en-CA');

    return {
      fromDate: format(fromDate),
      toDate: format(toDate)
    };
  }
}