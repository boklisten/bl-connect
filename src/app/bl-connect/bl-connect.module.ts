import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../api/api.service";

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [],
	providers: [
		HttpClient,
		ApiService
	]
})
export class BlConnectModule {
}
