import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BlConnectModule} from "./bl-connect/bl-connect.module";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BlConnectModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
