import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../api/api.service";
import { ItemService } from "../document-services/item/item.service";
import { BranchService } from "../document-services/branch/branch.service";
import { OpeningHourService } from "../document-services/opening-hour/opening-hour.service";
import { ApiErrorService } from "../api-error/api-error.service";
import { UserDetailService } from "../document-services/user-detail/user-detail.service";
import { EditableTextService } from "../document-services/editable-text/editable-text.service";
import { TokenService } from "../token/token.service";
import { StorageService } from "../storage/storage.service";
import { LoginService } from "../login/login.service";
import { HttpClientModule } from "@angular/common/http";
import { RegisterService } from "../register/register.service";
import { ApiRequestService } from "../api/api-request.service";
import { ApiTokenService } from "../api/api-token.service";
import { CustomerItemService } from "../document-services/customer-item/customer-item.service";
import { OrderService } from "../document-services/order/order.service";
import { PaymentService } from "../document-services/payment/payment.service";
import { DeliveryService } from "../document-services/delivery/delivery.service";
import { BranchItemService } from "../document-services/branch-item/branch-item.service";
import { PasswordResetService } from "../password-reset/password-reset.service";
import { EmailValidationService } from "../email-validation/email-validation.service";
import { JwtModule } from "@auth0/angular-jwt";
import { BL_CONFIG } from "./bl-config";
import { CachedDocumentService } from "../document/cached-document.service";
import { SimpleCache } from "../simple-cache/simple-cache.service";
import { DocumentService } from "../document/document.service";
import { BlConnectConfigService } from "./bl-connect-config.service";
import { PrintPdfService } from "../print-pdf/print-pdf.service";
import { OrderPdfService } from "../order-pdf/order-pdf.service";
import { MessageService } from "../document-services/message/message.service";
import { InvoiceService } from "../document-services/invoice/invoice.service";
import { CompanyService } from "../document-services/company/company.service";
import { MatchService } from "../document-services/match/match.service";
import { BookingService } from "../document-services/booking/booking.service";
import { UniqueItemService } from "../document-services/unique-item/unique-item.service";
import { SignatureService } from "../document-services/signature/signature.service";

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
				allowedDomains: [
					"bladmin.test.boklisten.no",
					"api.test.boklisten.no",
					"web.test.boklisten.no",
					"bladmin.boklisten.no",
					"api.boklisten.no",
					"boklisten.no",
					"www.boklisten.no",
					"localhost:1337",
					"localhost:4200",
				],
			},
		}),
	],
	declarations: [],
	providers: [
		SimpleCache,
		DocumentService,
		CachedDocumentService,
		BlConnectConfigService,
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
		EmailValidationService,
		PrintPdfService,
		OrderPdfService,
		MessageService,
		InvoiceService,
		CompanyService,
		MatchService,
		BookingService,
		UniqueItemService,
		EditableTextService,
		SignatureService,
	],
})
export class BlConnectModule {}
