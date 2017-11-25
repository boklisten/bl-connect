import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../api/api.service";
import {ItemService} from "../item/item.service";

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [],
	providers: [
		HttpClient,
		ApiService,
		ItemService
	]
})
export class BlConnectModule {
}
