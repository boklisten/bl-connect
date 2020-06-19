import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { BL_CONFIG } from "../bl-connect/bl-config";
import { BlApiError } from "@wizardcoder/bl-model";

@Injectable()
export class PasswordResetService {
	constructor(private _apiService: ApiService) {}

	public requestPasswordResetLink(email: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._apiService
				.add(BL_CONFIG.collection.passwordReset, { email: email })
				.then(() => {
					resolve(true);
				})
				.catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
		});
	}

	public setNewPassword(password: string, id: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._apiService
				.updateWithOperation(
					BL_CONFIG.collection.passwordReset,
					id,
					{ password: password },
					BL_CONFIG.passwordReset.setNew.operation
				)
				.then(() => {
					resolve(true);
				})
				.catch((blApiError: BlApiError) => {
					reject(blApiError);
				});
		});
	}
}
