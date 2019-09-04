import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFrCa from '@angular/common/locales/fr-CA';
import localeFrCaExtra from '@angular/common/locales/extra/fr-CA';
import localeEnCa from '@angular/common/locales/en-CA';
import localeEnCaExtra from '@angular/common/locales/extra/en-CA';

registerLocaleData(localeEnCa, 'en-CA', localeEnCaExtra);
registerLocaleData(localeFrCa, 'fr-CA', localeFrCaExtra);

import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { PropertyComponent } from './property/property.component';
import { ResourceComponent } from './resource/resource.component';
import { ItemComponent } from './item/item.component';
import { CreditsComponent } from './credits/credits.component';
import { DataService } from './data.service';

const appRoutes: Routes = [
  {path: '', component: ContainerComponent},
  {path: 'credits', component: CreditsComponent}
];

/* const locales = {
  provide: LOCALE_ID,
  useValue: 'en-CA'
}
 */
@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    PropertyComponent,
    ResourceComponent,
    ItemComponent,
    CreditsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'en-CA'}, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
