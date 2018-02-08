import {Injectable} from '@angular/core';
import {ApiResponse} from "./api-response";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {BlapiResponse, BlApiError, BlApiLoginRequiredError} from "bl-model";
import {ApiErrorService} from "../api-error/api-error.service";
import {TokenService} from "../token/token.service";
import {ApiRequestService} from "./api-request.service";
import {ApiTokenService} from "./api-token.service";
import {isArray} from "util";


@Injectable()
export class ApiService {
	constructor(private _http: HttpClient, private _apiErrorService: ApiErrorService, private _tokenService: TokenService,
				private _apiRequestService: ApiRequestService, private _apiTokenService: ApiTokenService) {
	}
	
	public get(url: string, query?: string): Promise<ApiResponse> {
		if (!url || url.length <= 0) {
			const apiErr = new BlApiError();
			apiErr.msg = 'url is undefined';
			return Promise.reject(apiErr);
		}
		
		return new Promise((resolve, reject) => {
			this._http.get(this._apiRequestService.apiPath(url, query),
				{headers: this._apiRequestService.getHeaders()}).toPromise().then((res: BlapiResponse) => {
				
				this.validateAndReturnResponse(res).then((apiRes: ApiResponse) => {
					resolve(apiRes);
				}).catch((err: BlApiError) => {
					reject(err);
				});
			}).catch((httpErrorResponse: HttpErrorResponse) => {
				this.fetchTokensAndGet(url, httpErrorResponse, query).then((apiRes: ApiResponse) => {
					resolve(apiRes);
				}).catch((apiErr: BlApiError) => {
					reject(apiErr);
				});
			});
		});
	}
	
	private fetchTokensAndGet(collection: string, httpError: HttpErrorResponse, query?: string): Promise<ApiResponse> {
		return new Promise((resolve, reject) => {
			
			if (this._apiErrorService.isAccessTokenInvalid(httpError)) { // accessToken invalid
				this._apiTokenService.fetchNewTokens().then(() => {
					this._http.get(this._apiRequestService.apiPath(collection, query),
						{headers: this._apiRequestService.getHeaders()}).toPromise().then((res: BlapiResponse) => {
						
						this.validateAndReturnResponse(res).then((apiRes: ApiResponse) => {
							resolve(apiRes);
						}).catch((err: BlApiError) => {
							reject(err);
						});
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
			
			this._http.get(this._apiRequestService.apiPathWithId(collection, id),
				{headers: this._apiRequestService.getHeaders()}).toPromise().then((res: BlapiResponse) => {
				resolve(this.validateAndReturnResponse(res));
			}).catch((httpError: HttpErrorResponse) => {
				this.fetchTokensAndGetById(collection, id, httpError).then((res: BlapiResponse) => {
					resolve(this.validateAndReturnResponse(res));
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			});
		});
	}
	
	private fetchTokensAndGetById(collection: string, id: string, httpError: HttpErrorResponse): Promise<BlapiResponse> {
		return new Promise((resolve, reject) => {
			if (this._apiErrorService.isAccessTokenInvalid(httpError)) { // accessToken invalid
				this._apiTokenService.fetchNewTokens().then(() => { // try to get new tokens
					
					this._http.get(this._apiRequestService.apiPathWithId(collection, id),
						{headers: this._apiRequestService.getHeaders()}).toPromise().then((res: BlapiResponse) => {
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
			this._http.post(this._apiRequestService.apiPath(collection), data,
				{headers: this._apiRequestService.getHeaders()}).toPromise().then((res: BlapiResponse) => {
				resolve(this.validateAndReturnResponse(res));
			}).catch((httpError: HttpErrorResponse) => {
				this.fetchTokensAndAdd(collection, data, httpError).then((res: BlapiResponse) => {
					resolve(this.validateAndReturnResponse(res));
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			});
		});
	}
	
	private fetchTokensAndAdd(collection: string, data: any, httpError: HttpErrorResponse): Promise<BlapiResponse> {
		return new Promise((resolve, reject) => {
			if (this._apiErrorService.isAccessTokenInvalid(httpError)) { // accessToken invalid
				this._apiTokenService.fetchNewTokens().then(() => { // try to get new tokens
					this._http.post(this._apiRequestService.apiPath(collection), data,
						{headers: this._apiRequestService.getHeaders()}).toPromise().then((res: BlapiResponse) => {
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
			this._http.patch(this._apiRequestService.apiPathWithId(collection, id), data,
				{headers: this._apiRequestService.getHeaders()}).toPromise().then((res: BlapiResponse) => {
				resolve(this.validateAndReturnResponse(res));
			}).catch((httpError: HttpErrorResponse) => {
				this.fetchTokensAndUpdate(collection, id, data, httpError).then((res: BlapiResponse) => {
					resolve(this.validateAndReturnResponse(res));
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			});
		});
	}
	
	private fetchTokensAndUpdate(collection: string, id: string, data: any, httpError: HttpErrorResponse): Promise<BlapiResponse> {
		return new Promise((resolve, reject) => {
			if (this._apiErrorService.isAccessTokenInvalid(httpError)) { // accessToken invalid
				this._apiTokenService.fetchNewTokens().then(() => { // try to get new tokens
					this._http.patch(this._apiRequestService.apiPathWithId(collection, id), data,
						{headers: this._apiRequestService.getHeaders()}).toPromise().then((res: BlapiResponse) => {
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
			this._http.delete(this._apiRequestService.apiPathWithId(collection, id),
				{headers: this._apiRequestService.getHeaders()}).toPromise().then((res: BlapiResponse) => {
				resolve(this.validateAndReturnResponse(res));
			}).catch((httpError: HttpErrorResponse) => {
				this.fetchTokensAndRemove(collection, id, httpError).then((res: BlapiResponse) => {
					resolve(this.validateAndReturnResponse(res));
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			});
		});
	}
	
	private fetchTokensAndRemove(collection: string, id: string, httpError: HttpErrorResponse): Promise<BlapiResponse> {
		return new Promise((resolve, reject) => {
			if (this._apiErrorService.isAccessTokenInvalid(httpError)) { // accessToken invalid
				this._apiTokenService.fetchNewTokens().then(() => { // try to get new tokens
					this._http.delete(this._apiRequestService.apiPathWithId(collection, id),
						{headers: this._apiRequestService.getHeaders()}).toPromise().then((res: BlapiResponse) => {
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
	
	private validateAndReturnResponse(res: BlapiResponse): Promise<ApiResponse> {
		try {
			const apiRes = this.handleResponse(res);
			return Promise.resolve(apiRes);
		} catch (err) {
			const blApiErr = new BlApiError();
			blApiErr.msg = 'unknown error, bad response document';
			return Promise.reject(blApiErr);
		}
	}
	
	
	private handleResponse(res: BlapiResponse): ApiResponse {
		try {
			this.validateResponse(res);
		} catch (err) {
			throw new Error('BlApiDocumentError: response document is not valid: ' + err);
		}
		
		return new ApiResponse('success', 200, res.data);
	}
	
	private validateResponse(res: any) {
		if (!res.data && !isArray(res.data)) {
			throw new Error('BlApiDocumentError: mandatory field "data" not defined or is not an array');
		}
	}
	
	
	private handleError(error: any): BlApiError {
		return this._apiErrorService.handleError(error);
	}
}
