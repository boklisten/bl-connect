import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { TokenService } from "../token/token.service";
import { BL_CONFIG } from "../bl-connect/bl-config";
import { ApiResponse } from "../api/api-response";
import { ApiErrorService } from "../api-error/api-error.service";
import { BlApiError } from "@boklisten/bl-model";

@Injectable()
export class RegisterService {
	constructor(
		private _apiService: ApiService,
		private _tokenService: TokenService
	) {}

	public localRegister(username: string, password: string): Promise<boolean> {
		const registerData = { username: username, password: password };

		return new Promise((resolve, reject) => {
			this._apiService
				.add(BL_CONFIG.register.local.url, registerData)
				.then((apiRes: ApiResponse) => {
					try {
						this._tokenService.parseTokensFromResponseDataAndStore(
							apiRes
						);
						return resolve(true);
					} catch (err) {
						return reject(new BlApiError());
					}
				})
				.catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
		});
	}

	public facebookRegister(): Promise<boolean> {
		return this.socialRegister(BL_CONFIG.register.facebook.url);
	}

	public googleRegister(): Promise<boolean> {
		return this.socialRegister(BL_CONFIG.register.google.url);
	}

	public feideRegister(): Promise<boolean> {
		return this.socialRegister(BL_CONFIG.register.feide.url);
	}

	private socialRegister(url: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._apiService
				.get(url)
				.then((apiRes: ApiResponse) => {
					try {
						this._tokenService.parseTokensFromResponseDataAndStore(
							apiRes
						);
						return resolve(true);
					} catch (err) {
						return reject(new BlApiError());
					}
				})
				.catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
		});
	}
}
