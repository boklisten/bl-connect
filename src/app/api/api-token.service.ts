import {Injectable} from '@angular/core';
import {TokenService} from "../token/token.service";
import {BlApiError, BlApiLoginRequiredError} from "@wizardcoder/bl-model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiRequestService} from "./api-request.service";

@Injectable()
export class ApiTokenService {
	
	constructor(private _http: HttpClient, private _tokenService: TokenService, private _apiRequestService: ApiRequestService) {
	}
	
	public fetchNewTokens(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (this._tokenService.haveRefreshToken()) {
				const refreshTokenBody = {refreshToken: this._tokenService.getRefreshToken()};
				
				this._http.post(this._apiRequestService.apiPath('token'), refreshTokenBody).toPromise().then((res) => {
					try {
						const tokens = this.validateResponseDataTokens(res['data']);
						this._tokenService.addAccessToken(tokens.accessToken);
						this._tokenService.addRefreshToken(tokens.refreshToken);
						resolve(true);
					} catch (err) {
						const badDataError = new BlApiError();
						badDataError.msg = 'unknown error, bad response document';
						return reject(badDataError);
					}
				}).catch((err: HttpErrorResponse) => {
					
					return reject(this.handleHttpErrorResponse(err));
					
				});
			} else {
				return reject(new BlApiLoginRequiredError());
			}
		});
	}
	
	private handleHttpErrorResponse(httpErr: HttpErrorResponse): BlApiError {
		if (httpErr && httpErr.status) {
			switch (httpErr.status) {
				case 401: return new BlApiLoginRequiredError();
				case 403: return new BlApiLoginRequiredError();
			}
		}
		
		const apiErr = new BlApiError();
		apiErr.msg = 'unknown error';
		return apiErr;
	}
	
	private validateResponseDataTokens(data: any[]): {accessToken: string, refreshToken: string} {
		let refreshToken = '';
		let accessToken = '';
		
		for (const d of data) {
			if (!d.data || d.data.length <= 0) {
				throw new Error('data of refreshToken is not defined');
			}
			
			if (!d.documentName) {
				throw new Error('documentName is missing on return data');
			}
			
			if (d.documentName === 'refreshToken') {
				refreshToken = d.data;
			} else if (d.documentName === 'accessToken') {
				accessToken = d.data;
			}
		}
		
		if (!accessToken || accessToken.length <= 0 || !refreshToken || refreshToken.length <= 0) {
			throw new Error('tokens or one of the tokens are not defined');
		}
		
		return {accessToken: accessToken, refreshToken: refreshToken};
	}
}
