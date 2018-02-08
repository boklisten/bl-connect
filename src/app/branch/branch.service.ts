import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BlApiError, Branch} from "bl-model";
import {ApiResponse} from "../api/api-response";
import {ApiErrorResponse} from "../api/api-error-response";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {isArray} from "util";
import {DocumentService} from "../document/document.service";

@Injectable()
export class BranchService {
	private collectionName: string;
	private documentName: string;
	private _documentService: DocumentService<Branch>;
	
	constructor(private _apiService: ApiService) {
		this.collectionName = BL_CONFIG.collection.branch;
		this.documentName = 'branch';
		this._documentService = new DocumentService(this.collectionName, _apiService);
	}
	
	public get(query?: string): Promise<Branch[]>	 {
		return new Promise((resolve, reject) => {
			this._documentService.get(query).then((docs: Branch[]) => {
				resolve(docs);
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}
	
	public getById(id: string): Promise<Branch> {
		return new Promise((resolve, reject) => {
			this._documentService.getById(id).then((doc: Branch) => {
				resolve(doc);
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}
}
