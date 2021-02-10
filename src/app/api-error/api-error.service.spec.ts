import { TestBed, inject } from "@angular/core/testing";

import { ApiErrorService } from "./api-error.service";
import { HttpErrorResponse } from "@angular/common/http";
import { UserSessionService } from "../user-session/user-session.service";

describe("ApiErrorService", () => {
	let apiErrorService: ApiErrorService;
	let userSessionService: UserSessionService;

	beforeEach(() => {
		userSessionService = new UserSessionService();
		apiErrorService = new ApiErrorService(userSessionService);
	});

	it("should call userSessionService if refresh token is invalid", () => {
		const httpErrorResponse = {
			name: "BlLoginRequiredError",
			error: {
				code: 909, // refreshToken is invalid
			},
		} as HttpErrorResponse;

		const userSessionLogoutSpy = spyOn(userSessionService, "logout");
		apiErrorService.handleError(httpErrorResponse);

		expect(userSessionLogoutSpy).toHaveBeenCalled();
	});
});
