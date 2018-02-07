import {TestBed, inject} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ApiErrorService} from "../api-error/api-error.service";
import {TokenService} from "../token/token.service";
import {Observable} from "rxjs/Observable";
import {BlApiError, BlApiNotFoundError} from "bl-model";
import 'rxjs/add/observable/throw';
import {ApiResponse} from "./api-response";
import {ApiTokenService} from "./api-token.service";
import {ApiRequestService} from "./api-request.service";

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
	
	
	const apiTokenServiceMock = {} as ApiTokenService;
	const apiRequestServiceMock = {
		getHeaders: () => {},
		apiPath: (url: string) => 'valid/path',
		apiPathWithId: (url: string, id: string) => 'valid/path'
	} as ApiRequestService;
	
	beforeEach(() => {
		service = new ApiService(httpClientServiceMock, new ApiErrorService(), tokenServiceMock,
			apiRequestServiceMock, apiTokenServiceMock);
	});
	
	describe('#get', () => {
		it('should reject with BlApiError if url is not defined', (done: DoneFn) => {
			service.get('').catch((err: BlApiError) => {
				expect(err.msg).toMatch('url is undefined');
				done();
			});
		});
		
		it('should reject with BlApiNotFoundError when document is not found', (done: DoneFn) => {
			spyOn(httpClientServiceMock, 'get').and.returnValue(
				Observable.throw({error: {code: 404}}));
			
			service.get('a/path').catch((err: BlApiError) => {
				expect((err instanceof BlApiNotFoundError)).toBeTruthy();
				done();
			});
		});
	});
	
	describe('when the httpResponse is success and contains a valid data document', () => {
		let httpResponseObj: {documentName: string, data: any[]};
		
		beforeEach(() => {
			httpResponseObj = {
				documentName: "validDocument",
				data: [
					{title: "hello there", price: 100, valid: true},
					{title: "another Title", price: 400, valid: true}
				]
			};
			
			spyOn(httpClientServiceMock, 'get').and.returnValue(
				Observable.create(observer => {
					observer.next(httpResponseObj);
					observer.complete();
				}));
			
			spyOn(httpClientServiceMock, 'patch').and.returnValue(
				Observable.create(observer => {
					observer.next(httpResponseObj);
					observer.complete();
				}));
			
			spyOn(httpClientServiceMock, 'post').and.returnValue(
				Observable.create(observer => {
					observer.next(httpResponseObj);
					observer.complete();
				}));
			
			spyOn(httpClientServiceMock, 'delete').and.returnValue(
				Observable.create(observer => {
					observer.next(httpResponseObj);
					observer.complete();
				}));
		});
		
		
		it('#get() should resolve with correct document', (done: DoneFn) => {
			service.get('this/is/valid').then((apiRes: ApiResponse) => {
				expect(apiRes.data).toEqual(httpResponseObj.data);
				expect(apiRes.documentName).toEqual(httpResponseObj.documentName);
				expect(apiRes.code).toEqual(200);
				done();
			});
		});
		
		it('#getById() should resolve with correct document', (done: DoneFn) => {
			service.getById('this/is/valid', 'abc').then((apiRes: ApiResponse) => {
				expect(apiRes.data).toEqual(httpResponseObj.data);
				expect(apiRes.documentName).toEqual(httpResponseObj.documentName);
				expect(apiRes.code).toEqual(200);
				done();
			});
		});
		
		it('#add() should resolve with correct document', (done: DoneFn) => {
			service.add('this/is/valid', 'anyData').then((apiRes: ApiResponse) => {
				expect(apiRes.data).toEqual(httpResponseObj.data);
				expect(apiRes.documentName).toEqual(httpResponseObj.documentName);
				expect(apiRes.code).toEqual(200);
				done();
			});
		});
		
		it('#update() should resolve with correct document', (done: DoneFn) => {
			service.update('this/is/valid', 'abc', {anyData: 'valid'}).then((apiRes: ApiResponse) => {
				expect(apiRes.data).toEqual(httpResponseObj.data);
				expect(apiRes.documentName).toEqual(httpResponseObj.documentName);
				expect(apiRes.code).toEqual(200);
				done();
			});
		});
		
		it('#remove() should resolve with correct document', (done: DoneFn) => {
			service.remove('this/is/valid', 'abc').then((apiRes: ApiResponse) => {
				expect(apiRes.data).toEqual(httpResponseObj.data);
				expect(apiRes.documentName).toEqual(httpResponseObj.documentName);
				expect(apiRes.code).toEqual(200);
				done();
			});
		});
		
	});
	
	describe('when the httpResponse is success, but response document is not valid', () => {
		const httpResponseObj = {hello: "this is not valid", num: 456};
		const errText = "unknown error, bad response document";
		
		beforeEach(() => {
			
			spyOn(httpClientServiceMock, 'get').and.returnValue(
				Observable.create(observer => {
					observer.next(httpResponseObj);
					observer.complete();
				}));
			
			spyOn(httpClientServiceMock, 'patch').and.returnValue(
				Observable.create(observer => {
					observer.next(httpResponseObj);
					observer.complete();
				}));
			
			spyOn(httpClientServiceMock, 'post').and.returnValue(
				Observable.create(observer => {
					observer.next(httpResponseObj);
					observer.complete();
				}));
			
			spyOn(httpClientServiceMock, 'delete').and.returnValue(
				Observable.create(observer => {
					observer.next(httpResponseObj);
					observer.complete();
				}));
			
		});
		
		it('#get() should reject with error', (done: DoneFn) => {
			service.get('a/valid/path').catch((err: BlApiError) => {
				expect(err.msg).toMatch(errText);
				done();
			});
		});
		
		it('#getById() should reject with error', (done: DoneFn) => {
			service.getById('a/valid/path', 'abc').catch((err: BlApiError) => {
				expect(err.msg).toMatch(errText);
				done();
			});
		});
		
		it('#add() should reject with error', (done: DoneFn) => {
			service.add('a/valid/path', {valid: true}).catch((err: BlApiError) => {
				expect(err.msg).toMatch(errText);
				done();
			});
		});
		
		it('#update() should reject with error', (done: DoneFn) => {
			service.update('a/valid/path', 'abc', {valid: true}).catch((err: BlApiError) => {
				expect(err.msg).toMatch(errText);
				done();
			});
		});
		
		it('#remove() should reject with error', (done: DoneFn) => {
			service.remove('a/valid/path', 'abc').catch((err: BlApiError) => {
				expect(err.msg).toMatch(errText);
				done();
			});
		});
		
		
	});
});
