import {Injectable} from '@angular/core';
import {ApiResponse} from "./api-response";
import {ApiErrorResponse} from "./api-error-response";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {BlapiErrorResponse, BlapiResponse, BlApiError, BlApiLoginRequiredError, BlApiPermissionDeniedError} from "bl-model";
import {ApiErrorService} from "../api-error/api-error.service";
import {TokenService} from "../token/token.service";
import {reject} from "q";


@Injectable()
export class ApiService {
	private _accessTokenInvalidCode: number;
	constructor(private _http: HttpClient, private _apiErrorService: ApiErrorService, private _tokenService: TokenService) {
		this._accessTokenInvalidCode = 910;
	}
	
	public get(collection: string, query?: string): Promise<ApiResponse> {
		return new Promise((resolve, reject) => {
			this._http.get(this.apiPath(collection, query), {headers: this.getHeaders()}).toPromise().then((res: BlapiResponse) => {
				resolve(this.handleResponse(res));
			}).catch((httpError: HttpErrorResponse) => {
				this.fetchTokensAndGet(collection, httpError, query).then((res: BlapiResponse) => {
					resolve(this.handleResponse(res));
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			});
		});
	}
	
	private fetchTokensAndGet(collection: string, httpError: HttpErrorResponse, query?: string): Promise<BlapiResponse> {
		return new Promise((resolve, reject) => {
			
			if (this._apiErrorService.isAccessTokenInvalid(httpError)) { // accessToken invalid
				this.fetchNewTokens().then((accessToken) => {
					this._http.get(this.apiPath(collection, query), {headers: this.createHeaders(accessToken)}).toPromise().then((res: BlapiResponse) => {
						resolve(this.handleResponse(res));
					}).catch((blApiErr: BlApiError) => {
						this.handleError(blApiErr);
					});
				});
			} else {
				return reject(this._apiErrorService.handleError(httpError));
			}
		});
	}

	public getById(collection: string, id: string): Promise<ApiResponse> {
		return new Promise((resolve, reject) => {
			const headers = this.getHeaders();
			
			this._http.get(this.apiPathWithId(collection, id), {headers: headers}).toPromise().then((res: BlapiResponse) => {
				resolve(this.handleResponse(res));
			}).catch((httpError: HttpErrorResponse) => {
				this.fetchTokensAndGetById(collection, id, httpError).then((res: BlapiResponse) => {
					resolve(this.handleResponse(res));
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			});
		});
	}
	
	private fetchTokensAndGetById(collection: string, id: string, httpError: HttpErrorResponse): Promise<BlapiResponse> {
		return new Promise((resolve, reject) => {
			if (this._apiErrorService.isAccessTokenInvalid(httpError)) { // accessToken invalid
				this.fetchNewTokens().then(() => { // try to get new tokens
					
					this._http.get(this.apiPathWithId(collection, id), {headers: this.getHeaders()}).toPromise().then((res: BlapiResponse) => {
						resolve(res);
					}).catch((blApiErr: BlApiError) => {
						return reject(blApiErr);
					});
					
				}).catch((blApiErr: BlApiError) => {
					return reject(blApiErr);
				});
			} else {
				return reject(this._apiErrorService.handleError(httpError));
			}
		});
	}
	
	
	public add(collection: string, data: any): Promise<ApiResponse> {
		return new Promise((resolve, reject) => {
			this._http.post(this.apiPath(collection), data, {headers: this.getHeaders()}).toPromise().then((res: BlapiResponse) => {
				resolve(this.handleResponse(res));
			}).catch((httpError: HttpErrorResponse) => {
				this.fetchTokensAndAdd(collection, data, httpError).then((res: BlapiResponse) => {
					resolve(this.handleResponse(res));
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			});
		});
	}
	
	private fetchTokensAndAdd(collection: string, data: any, httpError: HttpErrorResponse): Promise<BlapiResponse> {
		return new Promise((resolve, reject) => {
			if (this._apiErrorService.isAccessTokenInvalid(httpError)) { // accessToken invalid
				this.fetchNewTokens().then(() => { // try to get new tokens
					this._http.post(this.apiPath(collection), data, {headers: this.getHeaders()}).toPromise().then((res: BlapiResponse) => {
						resolve(res);
					}).catch((blApiErr: BlApiError) => {
						return reject(blApiErr);
					});
					
				}).catch((blApiErr: BlApiError) => {
					return reject(blApiErr);
				});
			} else {
				return reject(this._apiErrorService.handleError(httpError));
			}
		});
	}
	
	public update(collection: string, id: string, data: any): Promise<ApiResponse> {
		return new Promise((resolve, reject) => {
			this._http.patch(this.apiPathWithId(collection, id), data).toPromise().then((res: BlapiResponse) => {
				resolve(this.handleResponse(res));
			}).catch((httpError: HttpErrorResponse) => {
				this.fetchTokensAndUpdate(collection, id, data, httpError).then((res: BlapiResponse) => {
					resolve(this.handleResponse(res));
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			});
		});
	}
	
	private fetchTokensAndUpdate(collection: string, id: string, data: any, httpError: HttpErrorResponse): Promise<BlapiResponse> {
		return new Promise((resolve, reject) => {
			if (this._apiErrorService.isAccessTokenInvalid(httpError)) { // accessToken invalid
				this.fetchNewTokens().then(() => { // try to get new tokens
					this._http.patch(this.apiPathWithId(collection, id), data, {headers: this.getHeaders()}).toPromise().then((res: BlapiResponse) => {
						resolve(res);
					}).catch((blApiErr: BlApiError) => {
						return reject(blApiErr);
					});
				}).catch((blApiErr: BlApiError) => {
					return reject(blApiErr);
				});
			} else {
				return reject(this._apiErrorService.handleError(httpError));
			}
		});
	}
	
	public remove(collection: string, id: string): Promise<ApiResponse> {
		return new Promise((resolve, reject) => {
			this._http.delete(this.apiPathWithId(collection, id)).toPromise().then((res: BlapiResponse) => {
				resolve(this.handleResponse(res));
			}).catch((httpError: HttpErrorResponse) => {
				this.fetchTokensAndRemove(collection, id, httpError).then((res: BlapiResponse) => {
					resolve(this.handleResponse(res));
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			});
		});
	}
	
	private fetchTokensAndRemove(collection: string, id: string, httpError: HttpErrorResponse): Promise<BlapiResponse> {
		return new Promise((resolve, reject) => {
			if (this._apiErrorService.isAccessTokenInvalid(httpError)) { // accessToken invalid
				this.fetchNewTokens().then(() => { // try to get new tokens
					this._http.delete(this.apiPathWithId(collection, id), {headers: this.getHeaders()}).toPromise().then((res: BlapiResponse) => {
						resolve(res);
					}).catch((blApiErr: BlApiError) => {
						return reject(blApiErr);
					});
				}).catch((blApiErr: BlApiError) => {
					return reject(blApiErr);
				});
			} else {
				return reject(this._apiErrorService.handleError(httpError));
			}
		});
	}
	
	
	private handleResponse(res: BlapiResponse): ApiResponse | Promise<any> {
		for (let i = 0; i < res.data.length; i++) {
			if (res.data[i].data && res.data[i].data._id) {
				res.data[i].data.id = res.data[i].data._id;
			}
		}
		return new ApiResponse('success', 200, res.documentName, res.data);
	}
	
	
	private handleError(error: any): BlApiError {
		return this._apiErrorService.handleError(error);
	}
	
	private apiPath(collection: string, query?: string): string {
		let path = '';
		
		if (BL_CONFIG.devEnvironment) {
			const apiDev = BL_CONFIG.api.dev;
			path += apiDev.protocol + '://' + apiDev.basePath + ':' + apiDev.port + '/' + apiDev.path + '/' + apiDev.version + '/';
		} else {
			const apiProd = BL_CONFIG.api.prod;
			path += apiProd.protocol + '://' + apiProd.basePath + ':' + apiProd.port + '/' + apiProd.path + '/' + apiProd.version + '/';
		}
		
		
		if (query) {
			return path + collection + query;
		}
		
		return path + collection;
	}
	
	private fetchNewTokens(): Promise<string> {
		return new Promise((resolve, reject) => {
			if (this._tokenService.haveRefreshToken()) {
				const refreshTokenBody = {refreshToken: this._tokenService.getRefreshToken()};
				
				this._http.post(this.apiPath('token'), refreshTokenBody).toPromise().then((res) => {
					try {
						const tokens = this.validateResponseDataTokens(res['data']);
						this._tokenService.addAccessToken(tokens.accessToken);
						this._tokenService.addRefreshToken(tokens.refreshToken);
						resolve(tokens.accessToken);
					} catch (err) {
						return reject(new BlApiLoginRequiredError());
					}
				}).catch((err) => {
					return reject(new BlApiLoginRequiredError());
				});
			} else {
				return reject(new BlApiLoginRequiredError());
			}
		});
	}
	
	private apiPathWithId(collection: string, id: string) {
		return this.apiPath(collection) + '/' + id;
	}
	
	private getHeaders(): HttpHeaders {
		if (this._tokenService.haveAccessToken()) {
			const accessToken = this._tokenService.getAccessToken();
			return this.createHeaders(accessToken);
		} else {
			return this.createHeaders();
		}
	}
	
	private createHeaders(authToken?: string): HttpHeaders {
		if (authToken) {
			return new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken});
		}
		return new HttpHeaders({'Content-Type': 'application/json'});
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
