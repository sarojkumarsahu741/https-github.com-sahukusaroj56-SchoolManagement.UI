import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'minutesToHHMM'
})
export class MinutesToHHMMPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null || isNaN(value)) return '00:00';
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}`;
  }

  private pad(val: number): string {
    return val < 10 ? `0${val}` : `${val}`;
  }
}
