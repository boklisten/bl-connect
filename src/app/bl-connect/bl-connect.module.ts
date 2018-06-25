import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from "../api/api.service";
import {ItemService} from "../item/item.service";
import {BranchService} from "../branch/branch.service";
import {OpeningHourService} from "../opening-hour/opening-hour.service";
import {ApiErrorService} from "../api-error/api-error.service";
import {UserDetailService} from "../user-detail/user-detail.service";
import {TokenService} from "../token/token.service";
import {StorageService} from "../storage/storage.service";
import {LoginService} from "../login/login.service";
import {HttpClientModule} from "@angular/common/http";
import {RegisterService} from "../register/register.service";
import {ApiRequestService} from "../api/api-request.service";
import {ApiTokenService} from "../api/api-token.service";
import {CustomerItemService} from "../customer-item/customer-item.service";
import {OrderService} from "../order/order.service";
import {PaymentService} from "../payment/payment.service";
import {DeliveryService} from "../delivery/delivery.service";
import {BranchItemService} from "../branch-item/branch-item-service";
import {PasswordResetService} from "../password-reset/password-reset.service";
import {EmailValidationService} from "../email-validation/email-validation.service";
import {JwtModule} from '@auth0/angular-jwt';
import {BL_CONFIG} from "./bl-config";

export function tokenGetter() {
	return localStorage.getItem(BL_CONFIG.token.accessToken);
}

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				whitelistedDomains: ['boklisten.co', 'boklisten.no', 'localhost:1337', 'localhost:4200']
			}

		})
	],
	declarations: [],
	providers: [
		ApiService,
		ApiErrorService,
		ApiRequestService,
		ApiTokenService,
		ItemService,
		BranchService,
		BranchItemService,
		OpeningHourService,
		UserDetailService,
		TokenService,
		StorageService,
		LoginService,
		RegisterService,
		CustomerItemService,
		OrderService,
		PaymentService,
		DeliveryService,
		PasswordResetService,
		EmailValidationService
	]
})
export class BlConnectModule {
	/*
	public static withConfig(config?: {
		basePath?: string
	}) {
		if (config) {
			if (config.basePath) {
				BL_CONFIG.api.basePath = config.basePath;
			}
		}

		return this;
	}
	*/
}
