import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {TokenService} from "../token/token.service";
import {BL_CONFIG} from "../bl-connect/bl-config";

@Injectable()
export class ApiRequestService {
	
	constructor(private _tokenService: TokenService) {
	}
	
	public apiPath(collection: string, query?: string): string {
		const path = BL_CONFIG.api.basePath;
		
		if (query) {
			return path + collection + query;
		}
		
		return path + collection;
	}
	
	public apiPathWithId(collection: string, id: string) {
		return this.apiPath(collection) + '/' + id;
	}
	
	public getHeaders(): HttpHeaders {
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
	
}
