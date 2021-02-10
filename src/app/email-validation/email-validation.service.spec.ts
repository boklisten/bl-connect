import { TestBed, inject } from "@angular/core/testing";

import { EmailValidationService } from "./email-validation.service";
import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";

@Injectable()
class ApiStubService {}

describe("EmailValidationService", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				EmailValidationService,
				{ provide: ApiService, useClass: ApiStubService },
			],
		});
	});

	it("should be created", inject(
		[EmailValidationService],
		(service: EmailValidationService) => {
			expect(service).toBeTruthy();
		}
	));
});
