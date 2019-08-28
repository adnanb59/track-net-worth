import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { SheetFormComponent } from './sheet-form/sheet-form.component';
import { ResourceComponent } from './resource/resource.component';
import { ItemComponent } from './item/item.component';
import { CreditsComponent } from './credits/credits.component';

const appRoutes: Routes = [
  {path: '', component: ContainerComponent},
  {path: 'credits', component: CreditsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    SheetFormComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
