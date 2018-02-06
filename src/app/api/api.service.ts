import {Injectable} from '@angular/core';
import {ApiResponse} from "./api-response";
import {ApiErrorResponse} from "./api-error-response";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {BlapiErrorResponse, BlapiResponse} from "bl-model";
import {ApiErrorService} from "../api-error/api-error.service";
import {TokenService} from "../token/token.service";


@Injectable()
export class ApiService {
	
	constructor(private _http: HttpClient, private _apiErrorService: ApiErrorService, private _tokenService: TokenService) {
	
	}
	
	public get(collection: string, query?: string): Promise<ApiResponse> {
		return new Promise((resolve, reject) => {
			const headers = this.getHeaders();
				
				this._http.get(this.apiPath(collection, query), {headers: headers})
					.toPromise().then((res: BlapiResponse) => {
						resolve(this.handleResponse(res));
					}).catch((httpError: HttpErrorResponse) => {
						const blapiResponseError = this._apiErrorService.handleError(httpError);
						
						if (blapiResponseError.code === 910) { // accessToken invalid
							this.fetchNewTokens().then((accessToken) => {
								this._http.get(this.apiPath(collection, query), {headers: this.createHeaders(accessToken)})
									.toPromise().then((res: BlapiResponse) => {
										resolve(this.handleResponse(res));
								}).catch((err) => {
									this.handleError(err);
								});
							});
						} else {
							return reject(blapiResponseError);
						}
					});
		});
	}
	
	private fetchNewTokenAndRetryRequest(callback) {
		this.fetchNewTokens().then(() => {
		
		}).catch(() => {
		
		
		});
	}
	
	public getById(collection: string, id: string): Promise<ApiResponse> {
		return new Promise((resolve, reject) => {
			const headers = this.getHeaders();
			
			this._http.get(this.apiPathWithId(collection, id), {headers: headers})
				.toPromise().then((res: BlapiResponse) => {
					resolve(this.handleResponse(res));
				}).catch((httpError: HttpErrorResponse) => {
					console.log('there was an error from api', httpError.error);
					const blapiResponseError = this._apiErrorService.handleError(httpError);
					
					if (blapiResponseError.code === 910) { // accessToken invalid
						console.log('the accessToken was invalid, must try to get a new one with refreshToken');
						this.fetchNewTokens().then((accessToken) => {
							console.log('got accessToken by providing refreshToken, trying to fetch the doc again');
							this._http.get(this.apiPathWithId(collection, id), {headers: this.createHeaders(accessToken)})
								.toPromise().then((res: BlapiResponse) => {
									console.log('we got the doc!');
									resolve(this.handleResponse(res));
							}).catch((err) => {
								console.log('could not get accessToken, something wrong with fetching of new tokens', err);
								return this.handleError(err);
							});
						}).catch((err) => {
							console.log('could not fetch new tokens, the err: ', err);
						});
					} else {
						return reject(blapiResponseError);
					}
				});
		});
		/*
		return this._http.get(this.apiPathWithId(collection, id))
			.toPromise()
			.then((res: BlapiResponse) => {
				return this.handleResponse(res);
			})
			.catch(e => this.handleError(e));
			*/
	}
	
	public add(collection: string, data: any): Promise<any> {
		return this._http.post(this.apiPath(collection), data)
			.toPromise()
			.then((res: BlapiResponse) => {
				this.handleResponse(res);
			})
			.catch(e => this.handleError(e));
	}
	
	public update(collection: string, id: string, data: any): Promise<ApiResponse> {
		return this._http.patch(this.apiPathWithId(collection, id), data)
			.toPromise()
			.then((res: BlapiResponse) => {
				return this.handleResponse(res);
			})
			.catch(e => this.handleError(e));
	}
	
	public delete(collection: string, id: string): Promise<ApiResponse> {
		
		return this._http.delete(this.apiPathWithId(collection, id))
			.toPromise()
			.then((res: BlapiResponse) => {
				return this.handleResponse(res);
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
	
	
	private handleError(error: any): Promise<BlapiErrorResponse> {
		return Promise.reject(this._apiErrorService.handleError(error));
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
						return reject('could not get tokens');
					}
				}).catch((err) => {
					return reject('LoginRequiredError: ' + err);
				});
			} else {
				return reject('does not have refreshToken');
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
