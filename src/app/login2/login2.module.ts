import { NgModule } from '@angular/core';

import { Login2RoutingModule } from './login2-routing.module';
import {LoginMainComponent} from './login-main/login-main.component';
import {StorybookModule} from "../../stories/storybook/storybook.module";





@NgModule({
  declarations: [
    LoginMainComponent,
  ],
  imports: [
    Login2RoutingModule,
    StorybookModule
  ],
  exports: [

  ],
  providers: [],
  bootstrap: []
})
export class Login2Module { }
