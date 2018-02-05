import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {UserDetail} from "bl-model";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {ApiResponse} from "../api/api-response";
import {errorSymbol} from "@angular/compiler-cli/src/metadata/evaluator";
import {ApiErrorResponse} from "../api/api-error-response";

@Injectable()
export class UserDetailService {
	private _collectionName: string;
	
	constructor(private _apiService: ApiService) {
		this._collectionName = BL_CONFIG.collection.userDetail;
	}
	
	public getById(id: string): Promise<UserDetail> {
		return new Promise((resolve, reject) => {
			this._apiService.getById(this._collectionName, id).then((res: ApiResponse) => {
				if (res.data.length > 1) {
					return reject(new ApiErrorResponse('bad data', 500));
				}
				resolve(res.data[0] as UserDetail);
			}).catch((error: ApiErrorResponse) => {
				reject(error);
			});
			
		});
	}
	
}
