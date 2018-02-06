import {Injectable} from '@angular/core';
import {ApiErrorResponse} from "../api/api-error-response";
import {HttpErrorResponse} from "@angular/common/http";
import {BlApiError, BlapiErrorResponse, BlApiLoginRequiredError, BlApiPermissionDeniedError} from "bl-model";


@Injectable()
export class ApiErrorService {
	
	constructor() {
	}
	
	
	public handleError(httpError: HttpErrorResponse): BlApiError {
		if (!httpError.error || !httpError.error.code) {
			const err = new BlApiError();
			err.msg = 'unknown error';
			err.code = 500;
			
			return err;
		}
		
		switch (httpError.error.code) {
			case 901: return new BlApiPermissionDeniedError(); // wrong password
			case 904: return new BlApiPermissionDeniedError(); // does not have the right permission
			case 908: return new BlApiPermissionDeniedError(); // username or password incorrect
			case 909: return new BlApiLoginRequiredError(); // refreshToken invalid
			case 911: return new BlApiLoginRequiredError(); //no authToken in request
			default: return new BlApiError();
		}
	}
	
	public isAccessTokenInvalid(httpError: HttpErrorResponse): boolean {
		if (!httpError.error || !httpError.error.code || httpError.error.code !== 910) {
			return false;
		}
		return true;
	}
	
}
