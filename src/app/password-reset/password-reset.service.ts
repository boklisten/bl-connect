import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { BL_CONFIG } from "../bl-connect/bl-config";
import {
	BlApiError,
	PasswordResetConfirmationRequest,
} from "@boklisten/bl-model";

@Injectable()
export class PasswordResetService {
	constructor(private _apiService: ApiService) {}

	public requestPasswordResetLink(email: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._apiService
				.add(BL_CONFIG.collection.pendingPasswordReset, {
					email: email,
				})
				.then(() => {
					resolve(true);
				})
				.catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
		});
	}

	public setNewPassword(
		newPassword: string,
		id: string,
		resetToken: string
	): Promise<boolean> {
		const data: PasswordResetConfirmationRequest = {
			resetToken,
			newPassword,
		};
		return new Promise((resolve, reject) => {
			this._apiService
				.updateWithOperation(
					BL_CONFIG.collection.pendingPasswordReset,
					id,
					data,
					BL_CONFIG.pendingPasswordReset.confirm.operation
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
