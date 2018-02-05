import { Injectable } from '@angular/core';
import {AccessToken, UserPermission} from "bl-model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {StorageService} from "../storage/storage.service";
import {BL_CONFIG} from "../bl-connect/bl-config";

@Injectable()
export class TokenService {
	private _accessTokenName: string;
	private _refreshTokenName: string;
	
	
	constructor(private _jwtHelper: JwtHelperService, private _storageService: StorageService) {
		this._accessTokenName = BL_CONFIG.token.accessToken;
		this._refreshTokenName = BL_CONFIG.token.refreshToken;
	}
	
	public isAccessTokenValid(): boolean {
		try {
			this._jwtHelper.isTokenExpired(this.getAccessToken());
		} catch (err) {
			throw new Error('the token is not valid: ' + err);
		}
		return true;
	}
	
	public getAccessTokenBody(): AccessToken {
		try {
			const aToken = this._jwtHelper.decodeToken(this.getAccessToken());
			return aToken;
		} catch (err) {
			throw new Error('could not decode accessToken: ' + err);
		}
	}
	
	public getAccessToken(): string {
		return this._storageService.get(this._accessTokenName);
	}
	
	public accessTokenPermission(): UserPermission {
		try {
			const permission = this.getAccessTokenBody().permission;
			return permission;
		} catch (err) {
			throw new Error('could not decode access token: ' + err);
		}
	}
	
	public validateResponseDataTokens(data: any[]): {accessToken: string, refreshToken: string} {
		let refreshToken = '';
		let accessToken = '';
		
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
		
		return {accessToken: accessToken, refreshToken: refreshToken};
	}
}
