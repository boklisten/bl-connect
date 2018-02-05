import {Injectable} from '@angular/core';
import {ApiResponse} from "./api-response";
import {ApiErrorResponse} from "./api-error-response";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {BlapiResponse} from "bl-model";
import {ApiErrorService} from "../api-error/api-error.service";


@Injectable()
export class ApiService {
	
	constructor(private http: HttpClient, private apiErrorService: ApiErrorService) {
	
	}
	
	public get(collection: string, query?: string): Promise<ApiResponse> {
		return this.http.get(this.apiPath(collection, query), {headers: this.getHeaders()})
			.toPromise()
			.then((res: BlapiResponse) => {
				return this.handleResponse(res);
			})
			.catch(e => this.handleError(e));
	}
	
	public getById(collection: string, id: string): Promise<ApiResponse> {
		
		return this.http.get(this.apiPathWithId(collection, id), {headers: this.getHeaders()})
			.toPromise()
			.then((res: BlapiResponse) => {
				return this.handleResponse(res);
			})
			.catch(e => this.handleError(e));
	}
	
	public add(collection: string, data: any): Promise<any> {
		return this.http.post(this.apiPath(collection), data, {headers: this.getHeaders()})
			.toPromise()
			.then((res: BlapiResponse) => {
				this.handleResponse(res);
			})
			.catch(e => this.handleError(e));
	}
	
	public update(collection: string, id: string, data: any): Promise<ApiResponse> {
		return this.http.patch(this.apiPathWithId(collection, id), data, {headers: this.getHeaders()})
			.toPromise()
			.then((res: BlapiResponse) => {
				return this.handleResponse(res);
			})
			.catch(e => this.handleError(e));
	}
	
	public delete(collection: string, id: string): Promise<ApiResponse> {
		return this.http.delete(this.apiPathWithId(collection, id), {headers: this.getHeaders()})
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
	
	
	private handleError(error: HttpErrorResponse): Promise<ApiErrorResponse> {
		return Promise.reject(this.apiErrorService.handleError(error));
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
	
	private apiPathWithId(collection: string, id: string) {
		return this.apiPath(collection) + '/' + id;
	}
	
	private getHeaders(authToken?: string): HttpHeaders {
		if (!authToken) {
			return new HttpHeaders({'Content-Type': 'application/json'});
		}
		return new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken});
	}
}
