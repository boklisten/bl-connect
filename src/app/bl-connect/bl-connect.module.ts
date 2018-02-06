import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "../api/api.service";
import {ItemService} from "../item/item.service";
import {BranchService} from "../branch/branch.service";
import {OpeningHourService} from "../opening-hour/opening-hour.service";
import {ApiErrorService} from "../api-error/api-error.service";
import {UserDetailService} from "../user-detail/user-detail.service";
import {TokenService} from "../token/token.service";
import {StorageService} from "../storage/storage.service";
import {LocalStorageModule} from "angular-2-local-storage";
import {CookieModule} from "ngx-cookie";
import {LoginService} from "../login/login.service";

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		LocalStorageModule.withConfig({prefix: 'bl', storageType: 'sessionStorage'}),
		CookieModule.forChild()
	],
	declarations: [],
	providers: [
		ApiService,
		ApiErrorService,
		ItemService,
		BranchService,
		OpeningHourService,
		UserDetailService,
		TokenService,
		StorageService,
		LoginService
	]
})
export class BlConnectModule {
}
