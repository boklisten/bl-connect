import {Injectable} from '@angular/core';
import {ApiErrorResponse} from "../api/api-error-response";
import {HttpErrorResponse} from "@angular/common/http";
import {BlapiErrorResponse} from "bl-model";


@Injectable()
export class ApiErrorService {
	
	constructor() {
	}
	
	
	public handleError(apiError: HttpErrorResponse): BlapiErrorResponse {
		if (!apiError.error) {
			return new BlapiErrorResponse(500, 200, 'unknown error');
		}
		
		return apiError.error as BlapiErrorResponse;
	}
	
}
