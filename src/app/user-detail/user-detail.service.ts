import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BlApiError, UserDetail} from "bl-model";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {ApiResponse} from "../api/api-response";
import {ApiErrorResponse} from "../api/api-error-response";
import {DocumentService} from "../document/document.service";

@Injectable()
export class UserDetailService {
	private _collectionName: string;
	private _documentService: DocumentService<UserDetail>;
	
	constructor(private _apiService: ApiService) {
		this._collectionName = BL_CONFIG.collection.userDetail;
		this._documentService = new DocumentService<UserDetail>(this._collectionName, this._apiService);
		
	}
	
	public getById(id: string): Promise<UserDetail> {
		return this._documentService.getById(id);
	}
	
	public update(id: string, data: any): Promise<UserDetail> {
		return new Promise((resolve, reject) => {
			this._apiService.update(this._collectionName, id, data).then((res: ApiResponse) => {
				if (res.data.length > 1 || !res.data[0].data) {
					return reject(new BlApiError());
				}
				resolve(res.data[0].data as UserDetail);
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}
	
}
