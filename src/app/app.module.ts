import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BlConnectModule} from "./bl-connect/bl-connect.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BlConnectModule.withConfig({basePath: 'localhost:1337/'})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {

}
