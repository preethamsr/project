import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav'
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const MaterialComponents=[
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatSliderModule,
  MatIconModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MaterialComponents
  ],
  exports:[MaterialComponents]
})

export class MaterialModule { }
