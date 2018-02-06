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
			case 904: return new BlApiPermissionDeniedError();
			case 911: return new BlApiLoginRequiredError();
			case 909: return new BlApiLoginRequiredError();
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
