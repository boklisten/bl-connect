

import {BlApiError, BlError, Order} from "bl-model";
import {ApiService} from "../api/api.service";
import {ApiResponse} from "../api/api-response";
import {Injectable} from "@angular/core";

@Injectable()
export class PaymentService {
	
	constructor(private _apiService: ApiService) {
	
	}
	
	public getPaymentId(order: Order): Promise<string> {
		return new Promise((resolve, reject) => {
			this._apiService.add('payment/dibs', order).then((apiRes: ApiResponse) => {
				if (apiRes.data) {
					if (apiRes.data.length === 1) {
						return resolve(apiRes.data[0]['paymentId']);
					}
				}
				return reject(new BlApiError('bad format'));
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}
}
