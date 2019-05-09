import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { ApiResponse } from "../api/api-response";
import { BlApiError } from "@wizardcoder/bl-model";
import { TokenService } from "../token/token.service";
import { BL_CONFIG } from "../bl-connect/bl-config";

@Injectable()
export class LoginService {
	constructor(
		private _apiService: ApiService,
		private _tokenService: TokenService
	) {}

	public login(username: string, password: string): Promise<boolean> {
		const loginData = { username: username, password: password };
		return new Promise((resolve, reject) => {
			this._apiService
				.add(BL_CONFIG.login.local.url, loginData)
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

	public facebookLogin(): Promise<boolean> {
		return this.socialLogin(BL_CONFIG.login.facebook.url);
	}

	public googleLogin(): Promise<boolean> {
		return this.socialLogin(BL_CONFIG.login.google.url);
	}

	private socialLogin(url: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._apiService
				.get(url)
				.then((apiRes: ApiResponse) => {
					try {
						this._tokenService.parseTokensFromResponseDataAndStore(
							apiRes
						);
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
