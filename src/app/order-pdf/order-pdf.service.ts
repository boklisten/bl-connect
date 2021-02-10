import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {BlApiError} from "@boklisten/bl-model";
import {ApiResponse} from "../api/api-response";



@Injectable({
	providedIn: 'root'
})
export class OrderPdfService {

	constructor(private _apiService: ApiService) {
	}

	public getOrderReceiptPdf(orderId: string): Promise<string> {
		return new Promise((resolve, reject) => {
			this._apiService.getWithOperation(
				BL_CONFIG.collection.order,
				orderId,
				BL_CONFIG.order.receipt.operation
			).then((blapiResponse) => {
				const pdfContent = this.getPdfContent(blapiResponse);
				resolve(pdfContent);
			}).catch((blApiError: BlApiError) => {
				reject(blApiError);
			});
		});
	}

	public getOrderAgreementPdf(orderId: string): Promise<string> {
		return new Promise((resolve, reject) => {
			this._apiService.getWithOperation(
				BL_CONFIG.collection.order,
				orderId,
				BL_CONFIG.order.agreement.operation
			).then((blapiResponse) => {
				const pdfContent = this.getPdfContent(blapiResponse);
				resolve(pdfContent);
			}).catch((blApiError: BlApiError) => {
				reject(blApiError);
			});
		});
	}

	private getPdfContent(blapiResponse: ApiResponse) {
		return blapiResponse.data[0]['content'];
	}
}
