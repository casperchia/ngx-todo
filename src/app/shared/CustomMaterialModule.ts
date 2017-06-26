import {NgModule} from "@angular/core";
import {
  MdButtonModule,
  MdCardModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSidenavModule,
  MdSlideToggleModule,
  MdSnackBarModule
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
    MdSnackBarModule,
  ],
  providers: [],
})

export class CustomMaterialModule {
}
