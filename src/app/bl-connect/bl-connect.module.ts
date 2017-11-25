import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "../api/api.service";
import {ItemService} from "../item/item.service";

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	],
	declarations: [],
	providers: [
		ApiService,
		ItemService
	]
})
export class BlConnectModule {
}
