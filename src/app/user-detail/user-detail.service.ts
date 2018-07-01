import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BlApiError, UserDetail} from "@wizardcoder/bl-model";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {ApiResponse} from "../api/api-response";
import {ApiErrorResponse} from "../api/api-error-response";
import {DocumentService} from "../document/document.service";

@Injectable()
export class UserDetailService {
	private _collection: string;

	constructor(private _apiService: ApiService, private _documentService: DocumentService) {
		this._collection = BL_CONFIG.collection.userDetail;
	}

	public getById(id: string): Promise<UserDetail> {
		return this._documentService.getById(this._collection, id);
	}

	public update(id: string, data: any): Promise<UserDetail> {
		return this._documentService.update(this._collection, id, data);
	}

	public get(query?: string): Promise<UserDetail[]> {
		return this._documentService.get(query);
	}

	public isValid(id: string): Promise<{valid: boolean, invalidFields?: string[]}> {
		return this._documentService.getWithOperation(this._collection, id, 'valid').then((userDetailValidObject: {valid: boolean, invalidFields?: string[]}) => {
			return userDetailValidObject;
		}).catch((blApiError: BlApiError) => {
			throw blApiError;
		});
	}


}
