import {TestBed, inject} from '@angular/core/testing';

import {ApiRequestService} from './api-request.service';
import {TokenService} from "../token/token.service";

describe('ApiRequestService', () => {
	let service: ApiRequestService;
	
	const tokenServiceMock = {} as TokenService;
	
	beforeEach(() => {
		service = new ApiRequestService(tokenServiceMock);
	});

});
