import { Injectable } from '@angular/core';
import {AccessToken, RefreshToken} from "bl-model";
import {StorageService} from "../storage/storage.service";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {JwtHelper} from "angular2-jwt";

@Injectable()
export class TokenService {
	private _accessTokenName: string;
	private _refreshTokenName: string;
	private _jwtHelper: JwtHelper;
	
	
	constructor(private _storageService: StorageService) {
		this._accessTokenName = BL_CONFIG.token.accessToken;
		this._refreshTokenName = BL_CONFIG.token.refreshToken;
		this._jwtHelper = new JwtHelper();
		
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
		if (!this.isAccessTokenValid()) {
			throw new Error('accessToken is not valid');
		}
		return this._jwtHelper.decodeToken(this.getAccessToken());
	}
	
	public getRefreshTokenBody(): RefreshToken {
		if (!this.isRefreshTokenValid()) {
			throw new Error('refreshToken is not valid');
		}
		return this._jwtHelper.decodeToken(this.getRefreshToken());
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
