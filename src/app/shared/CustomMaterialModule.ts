import {NgModule} from "@angular/core";
import {
  MdButtonModule,
  MdCardModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSidenavModule,
  MdSlideToggleModule
} from "@angular/material";

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    MdSidenavModule,
    MdSlideToggleModule,
    MdInputModule,
    MdCardModule,
    MdGridListModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
  ],
  providers: [],
})

export class CustomMaterialModule {
}
