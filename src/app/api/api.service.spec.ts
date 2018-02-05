import {TestBed, inject} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClientModule} from "@angular/common/http";
import {ApiErrorService} from "../api-error/api-error.service";

describe('ApiService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientModule
			],
			providers: [ApiService, ApiErrorService]
		});
	});
	
	it('should be created', inject([ApiService], (service: ApiService) => {
		expect(service).toBeTruthy();
	}));
	
	describe('get()', () => {
	
	});
});
