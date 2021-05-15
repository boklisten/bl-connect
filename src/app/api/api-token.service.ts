import { Injectable } from "@angular/core";
import { TokenService } from "../token/token.service";
import { BlApiError, BlApiLoginRequiredError } from "@boklisten/bl-model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ApiRequestService } from "./api-request.service";
import { ApiErrorService } from "../api-error/api-error.service";

@Injectable()
export class ApiTokenService {
	constructor(
		private _http: HttpClient,
		private _tokenService: TokenService,
		private _apiRequestService: ApiRequestService,
		private _apiErrorService: ApiErrorService
	) {}

	public fetchNewTokens(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (this._tokenService.haveRefreshToken()) {
				const refreshTokenBody = {
					refreshToken: this._tokenService.getRefreshToken(),
				};

				this._http
					.post(
						this._apiRequestService.apiPath("token"),
						refreshTokenBody
					)
					.toPromise()
					.then((res) => {
						try {
							const tokens = this.validateResponseDataTokens(
								res["data"]
							);
							this._tokenService.addAccessToken(
								tokens.accessToken
							);
							this._tokenService.addRefreshToken(
								tokens.refreshToken
							);
							resolve(true);
						} catch (err) {
							const badDataError = new BlApiError();
							badDataError.msg =
								"unknown error, bad response document";
							return reject(badDataError);
						}
					})
					.catch((err: HttpErrorResponse) => {
						return reject(this._apiErrorService.handleError(err));
					});
			} else {
				return reject(new BlApiLoginRequiredError());
			}
		});
	}

	private validateResponseDataTokens(tokens: any[]): {
		accessToken: string;
		refreshToken: string;
	} {
		let refreshToken = "";
		let accessToken = "";

		for (const token of tokens) {
			if (token["refreshToken"]) {
				refreshToken = token["refreshToken"];
			} else if (token["accessToken"]) {
				accessToken = token["accessToken"];
			}
		}

		if (
			!accessToken ||
			accessToken.length <= 0 ||
			!refreshToken ||
			refreshToken.length <= 0
		) {
			throw new Error("tokens or one of the tokens are not defined");
		}

		return { accessToken: accessToken, refreshToken: refreshToken };
	}
}
