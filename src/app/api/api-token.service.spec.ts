import { TestBed, inject } from "@angular/core/testing";

import { ApiTokenService } from "./api-token.service";
import {
	HttpClient,
	HttpErrorResponse,
	HttpResponse,
} from "@angular/common/http";
import { TokenService } from "../token/token.service";
import { ApiRequestService } from "./api-request.service";
import { Observable, throwError } from "rxjs";
import {
	BlApiError,
	BlApiLoginRequiredError,
	BlApiPermissionDeniedError,
} from "@boklisten/bl-model";
import { ApiResponse } from "./api-response";
import { ApiErrorService } from "../api-error/api-error.service";
import { UserSessionService } from "../user-session/user-session.service";

describe("ApiTokenService", () => {
	let service: ApiTokenService;

	const httpClientMock = {
		post: (url: string, options?: any) => {},
	} as HttpClient;

	const tokenServiceMock = {
		haveRefreshToken: () => true,
		getRefreshToken: () => "",
		addAccessToken: (val: any) => {},
		addRefreshToken: (val: any) => {},
	} as TokenService;

	const apiRequestServiceMock = {
		apiPath: (url: string) => "a/valid/path",
	} as ApiRequestService;

	const apiErrorServiceMock = {
		handleError: (httpError: HttpErrorResponse) => {},
	} as ApiErrorService;

	beforeEach(() => {
		service = new ApiTokenService(
			httpClientMock,
			tokenServiceMock,
			apiRequestServiceMock,
			new ApiErrorService(new UserSessionService())
		);
	});

	describe("#fetchNewTokens()", () => {
		it("should reject with BlApiError if httpResponse is success but data is bad", (done: DoneFn) => {
			spyOn(httpClientMock, "post").and.returnValue(
				Observable.create((observer) => {
					observer.next({ val: "not a good value" });
					observer.complete();
				})
			);

			service.fetchNewTokens().catch((blApiErr: BlApiError) => {
				expect(blApiErr.msg).toMatch(
					"unknown error, bad response document"
				);
				done();
			});
		});

		it("should resolve if the HttpResponse is success and response data includes accessToken and requestToken", (done: DoneFn) => {
			const returnData = {
				data: [
					{
						refreshToken: "aRandomStringInTheMorning",
					},
					{
						accessToken: "anotherRandomStringInTheMorning",
					},
				],
			};

			spyOn(httpClientMock, "post").and.returnValue(
				Observable.create((observer) => {
					observer.next(returnData);
					observer.complete();
				})
			);

			service.fetchNewTokens().then((valid) => {
				expect(valid).toBeTruthy();
				done();
			});
		});

		it("should reject with error if the HttpResponse is success, but response document only have accessToken", (done: DoneFn) => {
			const returnData = {
				data: [
					{
						accessToken: "aRandomStringInTheMorning",
					},
				],
			};

			spyOn(httpClientMock, "post").and.returnValue(
				Observable.create((observer) => {
					observer.next(returnData);
					observer.complete();
				})
			);

			service.fetchNewTokens().catch((blApiErr: BlApiError) => {
				expect(blApiErr.msg).toMatch(
					"unknown error, bad response document"
				);
				done();
			});
		});

		it("should reject with error if the HttpResponse is success, but response document only have refreshToken", (done: DoneFn) => {
			const returnData = {
				data: [
					{
						refreshToken: "aRandomStringInTheMorning",
					},
				],
			};

			spyOn(httpClientMock, "post").and.returnValue(
				Observable.create((observer) => {
					observer.next(returnData);
					observer.complete();
				})
			);

			service.fetchNewTokens().catch((blApiErr: BlApiError) => {
				expect(blApiErr.msg).toMatch(
					"unknown error, bad response document"
				);
				done();
			});
		});

		it("should reject with error if the HttpResponse is success, but response document dont have any tokens", (done: DoneFn) => {
			const returnData = {
				data: [
					{
						documentName: "aRandomDocument",
						data: [{ what: "something weird" }],
					},
				],
			};

			spyOn(httpClientMock, "post").and.returnValue(
				Observable.create((observer) => {
					observer.next(returnData);
					observer.complete();
				})
			);

			service.fetchNewTokens().catch((blApiErr: BlApiError) => {
				expect(blApiErr.msg).toMatch(
					"unknown error, bad response document"
				);
				done();
			});
		});

		it("should reject with error if the HttpResponse is success, but response document is bad formatted", (done: DoneFn) => {
			const returnData = {
				aValue: "this is not a valid response data",
			};

			spyOn(httpClientMock, "post").and.returnValue(
				Observable.create((observer) => {
					observer.next(returnData);
					observer.complete();
				})
			);

			service.fetchNewTokens().catch((blApiErr: BlApiError) => {
				expect(blApiErr.msg).toMatch(
					"unknown error, bad response document"
				);
				done();
			});
		});

		it("should reject with BlApiLoginRequiredError if request is error and HttpResponseStatus is 401", (done: DoneFn) => {
			spyOn(httpClientMock, "post").and.returnValue(
				throwError({ status: 401, error: { code: 401 } })
			);

			service.fetchNewTokens().catch((blApiErr: BlApiError) => {
				console.log("the err", blApiErr);
				expect(
					blApiErr instanceof BlApiLoginRequiredError
				).toBeTruthy();
				done();
			});
		});

		it("should reject with BlApiPermissionDeniedError if request is error and HttpResponseStatus is 403", (done: DoneFn) => {
			spyOn(httpClientMock, "post").and.returnValue(
				throwError({ status: 403, error: { code: 403 } })
			);

			service.fetchNewTokens().catch((blApiErr: BlApiError) => {
				expect(
					blApiErr instanceof BlApiPermissionDeniedError
				).toBeTruthy();
				done();
			});
		});

		it("should reject with BlApiError if request is error and HttpResponseStatus is not 403 or 401", (done: DoneFn) => {
			spyOn(httpClientMock, "post").and.returnValue(
				throwError({ status: 350, error: { code: 350 } })
			);

			service.fetchNewTokens().catch((blApiErr: BlApiError) => {
				expect(blApiErr.msg).toMatch("unknown error");
				expect(blApiErr instanceof BlApiLoginRequiredError).toBeFalsy();
				expect(
					blApiErr instanceof BlApiPermissionDeniedError
				).toBeFalsy();
				done();
			});
		});

		it("should reject with BlApiLoginRequiredError if refreshToken is not stored", (done: DoneFn) => {
			spyOn(tokenServiceMock, "haveRefreshToken").and.returnValue(false);

			service.fetchNewTokens().catch((blApiErr: BlApiError) => {
				expect(
					blApiErr instanceof BlApiLoginRequiredError
				).toBeTruthy();
				done();
			});
		});
	});
});
