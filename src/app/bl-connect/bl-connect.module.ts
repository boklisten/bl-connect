import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "../api/api.service";
import {ItemService} from "../item/item.service";
import {BranchService} from "../branch/branch.service";
import {OpeningHourService} from "../opening-hour/opening-hour.service";
import {ApiErrorService} from "../api-error/api-error.service";
import {UserDetailService} from "../user-detail/user-detail.service";

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	],
	declarations: [],
	providers: [
		ApiService,
		ApiErrorService,
		ItemService,
		BranchService,
		OpeningHourService,
		UserDetailService
	]
})
export class BlConnectModule {
}
