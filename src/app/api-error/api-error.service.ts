import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import {
	BlApiError,
	BlApiNotFoundError,
	BlApiLoginRequiredError,
	BlApiPermissionDeniedError,
} from "@boklisten/bl-model";
import { UserSessionService } from "../user-session/user-session.service";
import { BlApiUserAlreadyExistsError } from "@boklisten/bl-model";
import { BlApiUsernameAndPasswordError } from "@boklisten/bl-model";

@Injectable()
export class ApiErrorService {
	constructor(private userSessionService: UserSessionService) {}

	public handleError(httpError: HttpErrorResponse): BlApiError {
		if (httpError.status === 0 || httpError.url === null) {
			const err = new BlApiError();
			err.msg = "could not connect";
			err.code = 0;
			return err;
		}

		if (!httpError.error || !httpError.error.code) {
			this.handleErrorByStatus(httpError);
		}

		switch (httpError.error.code) {
			case 901:
				return new BlApiPermissionDeniedError(); // wrong password
			case 903:
				return new BlApiUserAlreadyExistsError(); // username already exists
			case 904:
				return new BlApiPermissionDeniedError(); // does not have the right permission
			case 908:
				return new BlApiUsernameAndPasswordError(); // username or password incorrect
			case 909: // refreshToken invalid
				this.userSessionService.logout();
				return new BlApiLoginRequiredError();
			case 911:
				return new BlApiLoginRequiredError(); //no authToken in request
			case 913: // user not active
				this.userSessionService.logout();
				return new BlApiLoginRequiredError();
			default:
				return this.handleErrorByStatus(httpError);
		}
	}

	private handleErrorByStatus(httpError: HttpErrorResponse) {
		switch (httpError.status) {
			case 401:
				return new BlApiLoginRequiredError();
			case 403:
				return new BlApiPermissionDeniedError();
			case 404:
				return new BlApiNotFoundError();
			default:
				const err = new BlApiError();
				err.msg = httpError.error.msg;
				return err;
		}
	}

	public isAccessTokenInvalid(httpError: HttpErrorResponse): boolean {
		if (
			!httpError.error ||
			!httpError.error.code ||
			httpError.error.code !== 910
		) {
			return false;
		}
		return true;
	}
}
