import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationPipe',
})
export class DurationPipe implements PipeTransform {
  transform(duration: number) {
    if (duration > 0) {
      let hours: string | number = Math.floor(duration / 60);
      let minutes: string | number = duration % 60;
      let formatHours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return minutes > 0 ? `${formatHours}:${minutes}` : `${hours}`;
    } else {
      return `0`;
    }
  }
}
