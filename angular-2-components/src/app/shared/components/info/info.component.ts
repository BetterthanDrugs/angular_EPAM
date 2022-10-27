import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IInfo, IINFO_DATA } from './info.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  @Input() option: IInfo = IINFO_DATA;
  @Input() isShowMessage = true;
  @Output() addCourseEvent = new EventEmitter();

  constructor() {}
}
