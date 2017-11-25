import {Injectable} from '@angular/core';
import {ApiErrorResponse} from "../api/api-error-response";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class ApiErrorService {
	
	constructor() {
	}
	
	
	public handleError(error: HttpErrorResponse): ApiErrorResponse {
		
		if (error.status >= 0) {
			switch (error.status) {
				case 404: return new ApiErrorResponse('not found', error.status);
				case 0: return new ApiErrorResponse('could not connect to server', error.status);
			}
		}
		
		return new ApiErrorResponse('unexpected error', -1);
	}
	
}
