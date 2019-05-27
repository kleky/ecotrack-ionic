import { File } from '@ionic-native/file/ngx';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule, Platform} from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {LoggerComponent} from "./components/logger/logger.component";

import { HomePage } from './home.page';

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
  declarations: [HomePage, LoggerComponent],
  providers: [File, Platform],
})
export class HomePageModule {}
