import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { SessionStorageService } from './session-storage.service';
import { AuthorizedGuard } from './guards/authorized.guard';
import { AuthStateFacade } from './store/auth.facade';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [],
  imports: [CommonModule, UserModule],
  providers: [AuthService, SessionStorageService, AuthorizedGuard, AuthStateFacade],
})
export class AuthModule { }
