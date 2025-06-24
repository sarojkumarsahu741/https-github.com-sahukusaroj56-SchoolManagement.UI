import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcToIst'
})
export class UtcToIstPipe implements PipeTransform {

  transform(value: string | Date | null): Date | null {
    if (!value) return null;

    const utcDate = new Date(value);
    const istOffsetMinutes = 330; // +5:30 IST
    const istTime = new Date(utcDate.getTime() + istOffsetMinutes * 60000);

    return istTime;
  }
}
