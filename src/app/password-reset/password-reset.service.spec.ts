import {TestBed, inject} from '@angular/core/testing';

import {PasswordResetService} from './password-reset.service';
import {Injectable} from "@angular/core";
import {ApiService} from "../api/api.service";

@Injectable()
class ApiStubService {

}
describe('PasswordResetService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				PasswordResetService,
				{provide: ApiService, useClass: ApiStubService}
			]
		});
	});

	it('should be created', inject([PasswordResetService], (service: PasswordResetService) => {
		expect(service).toBeTruthy();
	}));
});
