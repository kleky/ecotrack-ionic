import { File } from "@ionic-native/file/ngx";


import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {IonicModule, Platform, ToastController} from "@ionic/angular";
import {LoggerComponent} from "./components/logger/logger.component";

import { HomePage } from "./home.page";
import { DateLoggedPipe } from './date-logged.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, LoggerComponent, DateLoggedPipe],
  providers: [File, Platform, ToastController],
})
export class HomePageModule {}
