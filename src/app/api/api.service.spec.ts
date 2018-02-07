import {TestBed, inject} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ApiErrorService} from "../api-error/api-error.service";
import {TokenService} from "../token/token.service";
import {Observable} from "rxjs/Observable";
import {BlApiError, BlApiNotFoundError} from "bl-model";
import 'rxjs/add/observable/throw';

describe('ApiService', () => {
	let service: ApiService;
	const httpClientServiceMock = {
		get: (path: string, options?: any) => {
			return Observable.create();
		},
		post: (path: string, data: any, options?: any) => {
			return Observable.create();
		},
		patch: (path: string, data: any, options?: any) => {
			return Observable.create();
		},
		delete: (path: string, option?: any) => {
			return Observable.create();
		}
		
	} as HttpClient;
	
	const tokenServiceMock = {
		haveAccessToken: () => {
			return true;
		},
		getAccessToken: () => {
			return 'theAccessToken';
		}
	} as TokenService;
	
	beforeEach(() => {
		service = new ApiService(httpClientServiceMock, new ApiErrorService(), tokenServiceMock);
	});
	
	describe('#get', () => {
		it('should reject with BlApiError if url is not defined', (done: DoneFn) => {
			service.get('').catch((err: BlApiError) => {
				expect(err.msg).toMatch('url is undefined');
				done();
			});
		});
		
		it('should reject with BlApiNotFoundError when document is not found', (done: DoneFn) => {
			const spy = spyOn(httpClientServiceMock, 'get').and.returnValue(
				Observable.throw({error: {code: 404}}));
			
			service.get('a/path').catch((err: BlApiError) => {
				console.log('the err: ', err);
				expect((err instanceof BlApiNotFoundError)).toBeTruthy();
				done();
			});
			
		});
	});
	
	
	
	
	
});
