import {TestBed, inject} from '@angular/core/testing';

import {TokenService} from './token.service';
import {JwtHelperService} from "@auth0/angular-jwt";
import {StorageService} from "../storage/storage.service";



const jwtHelperServiceMock = {} as JwtHelperService;
const storageServiceMock = {} as StorageService;

describe('TokenService', () => {
	let service: TokenService;
	
	beforeEach(() => {
		service = new TokenService(jwtHelperServiceMock, storageServiceMock);
	});
	
	
});
