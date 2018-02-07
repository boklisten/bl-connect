import {TestBed, inject} from '@angular/core/testing';

import {TokenService} from './token.service';
import {JwtHelperService} from "@auth0/angular-jwt";
import {StorageService} from "../storage/storage.service";
import {LocalStorageService} from "angular-2-local-storage";
import {statsErrorsToString} from "@angular/cli/utilities/stats";


const jwtHelperServiceMock = {} as JwtHelperService;
const storageServiceMock = {} as StorageService;

describe('TokenService', () => {
	let service: TokenService;
	const validCustomerAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
		".eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJ" +
		"pYXQiOjE1MTc4MzEyNjIsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5" +
		"ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJwZXJtaXNzaW9uIjoiY3VzdG9tZXIiLCJkZXRhaWxzI" +
		"joiNWE3NDdhNDNmNDZmZDM2NTNmYjFjYjFkIiwiZXhwIjo0NjczNTkxMjYyfQ" +
		".QeHlCbGfKAhD9I07tDlKI8z2SolJ9W81CNwBTm7Xsds";
	const validCustomerRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
		".eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJ" +
		"pYXQiOjE1MTc4MzEyNjIsInN1YiI6InUjZDViY2U1N" +
		"jUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJleHAiOjQ2NzM1OTEyNjJ9" +
		".RXhblaIb8t0VWRy4AHYjlNfp6gQCuf603iz2y_jRhhE";
	
	const expiredCustomerAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
		".eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0Z" +
		"W4uY28iLCJpYXQiOjE1MTc4MzIxNTQsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZ" +
		"SI6ImFAYi5jb20iLCJwZXJtaXNzaW9uIjoiY3VzdG9tZXIiLCJkZXRhaWxzIjoiNWE3NDdhNDNmNDZmZDM2NTNmYjFjYjFkIiwiZXhwIjoxNTE3ODMyMjE0fQ" +
		".E_Ic1pEdIIx9T3bg3OjkBW6jriIRhoqEwcaKGVa4js0";
	const expiredCustomerRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
		".eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJpYXQiOjE1MTc4MzIxNTQsInN1YiI6InUjZDViY2U" +
		"1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJleHAiOjE1MTc4MzIyMTR9" +
		".1V_452IlN4g9I0OnPSse_wnM2XMEiNPgEvbZU1A2iZ8";
	
	
	beforeEach(() => {
		service = new TokenService(new StorageService({isSupported: true} as LocalStorageService));
		service.removeTokens();
	});
	
	describe('#addAccessToken', () => {
		it('should add the provided value', () => {
			const aTokenVal = 'aTokenValue';
			
			service.addAccessToken(aTokenVal);
			expect(service.getAccessToken()).toEqual(aTokenVal);
		});
		
		it('should throw error when provided string is empty or undefined', () => {
			expect(() => {
				service.addAccessToken(null);
			}).toThrowError(/provided value is empty or undefined/);
		});
	});
	
	describe('#addRefreshToken', () => {
		it('should add the provided value', () => {
			const rTokenVal = 'rTokenVal';
			
			service.addRefreshToken(rTokenVal);
			expect(service.getRefreshToken()).toEqual(rTokenVal);
		});
		
		it('should throw error when provided value is empty or undefined', () => {
			expect(() => {
				service.addRefreshToken('');
			}).toThrowError(/provided value is empty or undefined/);
		});
	});
	
	describe('#removeTokens', () => {
		it('should remove all tokens', () => {
			service.addAccessToken('accessTokenVal');
			service.addRefreshToken('refreshTokenVal');
			
			service.removeTokens();
			
			expect(() => {
				service.getAccessToken();
			}).toThrowError(/could not get accessToken/);
			
			expect(() => {
				service.getRefreshToken();
			}).toThrowError(/could not get refreshToken/);
		});
	});
	
	describe('#isAccessTokenValid', () => {
		it('should return true when provided with a valid accessToken', () => {
			service.addAccessToken(validCustomerAccessToken);
			
			expect(service.isAccessTokenValid()).toBeTruthy();
		});
		
		it('should return false when provided with a invalid accessToken', () => {
			
			service.addAccessToken('thisIsNotAValidToken');
			
			expect(service.isAccessTokenValid()).toBeFalsy();
		});
		
		it('should return false when provided accessToken is expired', () => {
			service.addAccessToken(expiredCustomerAccessToken);
			
			expect(service.isAccessTokenValid()).toBeFalsy();
		});
	});
	
	describe('#isRefreshTokenValid', () => {
		it('should return true when provided with a valid refreshToken', () => {
			service.addRefreshToken(validCustomerRefreshToken);
			
			expect(service.isRefreshTokenValid()).toBeTruthy();
		});
		
		it('should return false when provided with a invalid refreshToken', () => {
			service.addRefreshToken('not.a.validAccessToken');
			expect(service.isRefreshTokenValid()).toBeFalsy();
		});
		
		it('should return false when provided with a expired refreshToken', () => {
			service.addRefreshToken(expiredCustomerRefreshToken);
			expect(service.isRefreshTokenValid()).toBeFalsy();
		});
	});
	
	describe('#getAccessTokenBody', () => {
		it('should return the accessToken body for the provided accessToken string', () => {
			service.addAccessToken(validCustomerAccessToken);
			const accessTokenBody = service.getAccessTokenBody();
			
			expect(accessTokenBody).toBeDefined();
		});
		
		it('should throw error when accessToken body could not be decoded', () => {
			service.addAccessToken('not.valid.accessToken');
			
			expect(() => {
				service.getAccessTokenBody();
			}).toThrowError(/accessToken is not valid/);
		});
		
		it('should throw error when accessToken is not found', () => {
			service.removeTokens();
			
			expect(() => {
				service.getAccessTokenBody();
			}).toThrowError(/could not get accessToken/);
		});
	});
	
	describe('#getRefreshTokenBody', () => {
		it('should return the refreshToken body for the provided refreshToken string', () => {
			service.addRefreshToken(validCustomerRefreshToken);
			
			expect(service.getRefreshTokenBody()).toBeDefined();
		});
		
		it('should throw error when refreshToken body could not be decoded', () => {
			service.addRefreshToken('not.valid.refreshToken');
			
			expect(() => {
				service.getRefreshTokenBody();
			}).toThrowError(/refreshToken is not valid/);
		});
		
		it('should throw error when refreshToken is not found', () => {
			service.removeTokens();
			
			expect(() => {
				service.getRefreshTokenBody();
			}).toThrowError(/could not get refreshToken/);
		});
	});
	
	
});
