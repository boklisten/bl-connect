import {TestBed, inject} from '@angular/core/testing';

import {StorageService} from './storage.service';
import {LocalStorageService} from "angular-2-local-storage";
import {CookieService} from "ngx-cookie";



const localStorageServiceMock = {} as LocalStorageService;
const cookieServiceMock = {} as CookieService;

describe('StorageService', () => {
	let service: StorageService;
	
	beforeEach(() => {
		service = new StorageService(localStorageServiceMock, cookieServiceMock);
	});
	
});
