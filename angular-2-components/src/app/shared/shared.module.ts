import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components';
import { ButtonComponent } from './components';
import { InfoComponent } from './components/info/info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './components/search/search.component';
import { EmailValidatorDirective } from './directive/email-validator.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { FormsModule } from '@angular/forms';
import { CourseDatePipe } from './pipes/date.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    EmailValidatorDirective,
    DurationPipe,
    CourseDatePipe,
  ],
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  exports: [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    EmailValidatorDirective,
    DurationPipe,
    CourseDatePipe,
  ],
})
export class SharedModule {}
