import { MenuSectionComponent } from './menu-section/menu-section.component';
import { MenuComponent } from './menu.component';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LinkMenuItemComponent } from './menu-item/link-menu-item.component';
import { TextMenuItemComponent } from './menu-item/text-menu-item.component';
import { OnClickMenuItemComponent } from './menu-item/onclick-menu-item.component';

const COMPONENTS = [
  MenuSectionComponent,
  MenuComponent,
  LinkMenuItemComponent,
  TextMenuItemComponent,
  OnClickMenuItemComponent
];

const ENTRY_COMPONENTS = [
  LinkMenuItemComponent,
  TextMenuItemComponent,
  OnClickMenuItemComponent
];

const MODULES = [
  TranslateModule,
  RouterModule
];
const PROVIDERS = [

];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...COMPONENTS,
    ...ENTRY_COMPONENTS,
  ],
  providers: [
    ...PROVIDERS
  ],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ]
})

/**
 * This module handles all components, providers and modules that are needed for the menu
 */
export class MenuModule {

}
