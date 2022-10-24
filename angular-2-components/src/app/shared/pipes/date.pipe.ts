import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe',
})
export class CourseDatePipe implements PipeTransform {
  transform(data?: string): string {
    const dateParts = data?.split('/') || [];

    const dateObj = new Date(`${dateParts[1]}.${dateParts[0]}.${dateParts[2]}`);
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const date = ('0' + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();
    return `${date}.${month}.${year}`;
  }
}