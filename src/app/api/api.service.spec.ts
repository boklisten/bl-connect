import {TestBed, inject} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ApiErrorService} from "../api-error/api-error.service";
import {TokenService} from "../token/token.service";

describe('ApiService', () => {
	let service: ApiService;
	const httpClientServiceMock = {} as HttpClient;
	const tokenServiceMock = {} as TokenService;
	
	beforeEach(() => {
		service = new ApiService(httpClientServiceMock, new ApiErrorService(), tokenServiceMock);
	});
	
});
