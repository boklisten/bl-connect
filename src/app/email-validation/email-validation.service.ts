import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {BlApiError} from "@wizardcoder/bl-model";

@Injectable()
export class EmailValidationService {

	constructor(private _apiService: ApiService) {
	}

	public requestNewConfirmationLink(userDetailId: string, email: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._apiService.add(BL_CONFIG.collection.emailValidation,
				{userDetail: userDetailId, email: email}).then(() => {
					resolve(true);
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}

	public validateConfirmationLink(confirmationId: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._apiService.updateWithOperation(
				BL_CONFIG.collection.emailValidation,
				confirmationId,
				BL_CONFIG.emailValidation.confirm.operation,
				{}).then(() => {
					resolve(true);
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}

}
