import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
//import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import {UploadFilesComponent} from "./components/upload-files/upload-files.component";
import {RouterModule, RouterOutlet} from "@angular/router";
import { Routes } from '@angular/router';
import {AdminComponent} from "./components/admin/admin.component";
import {StorybookModule} from "../stories/storybook/storybook.module";

export const routes: Routes = [
  { path: 'login2', loadChildren: () => import('./login2/login2.module').then(m => m.Login2Module), },

  { path: '', redirectTo: 'login2', pathMatch: 'full' },
  //{ path: "", component: AppComponent, pathMatch: "full" },
  { path: "uploadfiles", component: UploadFilesComponent, pathMatch: "full" },
  //{ path: "login", component: LoginComponent, pathMatch: "full" }


];

@NgModule({
  declarations: [
    AppComponent,
    UploadFilesComponent,
    AdminComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterOutlet,
    StorybookModule,

  ],
  providers: [
    AppComponent,
    UploadFilesComponent,
    //{provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
