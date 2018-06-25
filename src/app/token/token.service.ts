import { Injectable } from '@angular/core';
import {AccessToken, RefreshToken} from "@wizardcoder/bl-model";
import {StorageService} from "../storage/storage.service";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class TokenService {
	private _accessTokenName: string;
	private _refreshTokenName: string;
	private _jwtHelper: JwtHelperService;


	constructor(private _storageService: StorageService) {
		this._accessTokenName = BL_CONFIG.token.accessToken;
		this._refreshTokenName = BL_CONFIG.token.refreshToken;
		this._jwtHelper = new JwtHelperService();

	}

	public haveAccessToken(): boolean {
		try {
			this._storageService.get(this._accessTokenName);
			return true;
		} catch (err) {
			return false;
		}
	}

	public haveRefreshToken(): boolean {
		try {
			this._storageService.get(this._refreshTokenName);
			return true;
		} catch (err) {
			return false;
		}
	}

	public addAccessToken(val: string) {
		if (!val || val.length <= 0) {
			throw new Error('provided value is empty or undefined');
		}
		this._storageService.add(this._accessTokenName, val);
	}

	public addRefreshToken(val: string) {
		if (!val) {
			throw new Error('provided value is empty or undefined');
		}
		this._storageService.add(this._refreshTokenName, val);
	}

	public getAccessToken(): string {
		try {
			return this._storageService.get(this._accessTokenName);
		} catch (err) {
			throw new Error('could not get accessToken: ' + err);
		}
	}

	public getRefreshToken(): string {
		try {
			return this._storageService.get(this._refreshTokenName);
		} catch (err) {
			throw new Error('could not get refreshToken: ' + err);
		}
	}

	public removeTokens() {
		this._storageService.remove(this._accessTokenName);
		this._storageService.remove(this._refreshTokenName);
	}

	public isAccessTokenValid(): boolean {
		return this.isTokenValid(this.getAccessToken());
	}

	public isRefreshTokenValid(): boolean {
		return this.isTokenValid(this.getRefreshToken());
	}

	public getAccessTokenBody(): AccessToken {
		/*
		if (!this.isAccessTokenValid()) {
			throw new Error('accessToken is not valid');
		}
		*/
		return this._jwtHelper.decodeToken(this.getAccessToken());
	}

	public getRefreshTokenBody(): RefreshToken {
		if (!this.isRefreshTokenValid()) {
			throw new Error('refreshToken is not valid');
		}
		return this._jwtHelper.decodeToken(this.getRefreshToken());
	}

	public parseTokensFromResponseDataAndStore(responseData: any): boolean {
		let refreshToken = '';
		let accessToken = '';

		if (!responseData.data) {
			throw new Error('responseData.data is not defined');
		}

		if (Object.prototype.toString.call(responseData.data) !== '[object Array]') {
			throw new Error('responseData.data is not an array');
		}

		const data = responseData.data;

		for (const d of data) {
			if (!d.data || d.data.length <= 0) {
				throw new Error('data of refreshToken is not defined');
			}

			if (!d.documentName) {
				throw new Error('documentName is missing on return data');
			}

			if (d.documentName === 'refreshToken') {
				refreshToken = d.data;
			} else if (d.documentName === 'accessToken') {
				accessToken = d.data;
			}
		}

		if (!accessToken || accessToken.length <= 0 || !refreshToken || refreshToken.length <= 0) {
			throw new Error('tokens or one of the tokens are not defined');
		}


		this.addAccessToken(accessToken);
		this.addRefreshToken(refreshToken);

		return true;
	}

	private isTokenValid(token: string): boolean {
		try {
			this._jwtHelper.decodeToken(token);
		} catch (err) {
			return false;
		}
		return !this._jwtHelper.isTokenExpired(token);
	}
}
