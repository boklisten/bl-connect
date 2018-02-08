import {Injectable} from '@angular/core';
import {BlApiError, BlDocument} from "bl-model";
import {ApiResponse} from "../api/api-response";
import {isArray} from "util";
import {ApiService} from "../api/api.service";

@Injectable()
export class DocumentService<T> {
	
	constructor(private _collectionName: string, private _apiService: ApiService) {
	}
	
	public get(query?: string): Promise<T[]>	 {
		return new Promise((resolve, reject) => {
			this._apiService.get(this._collectionName, query).then(
				(res: ApiResponse) => {
					try {
						const docs = this.getDocumentsIfValid(res);
						resolve(docs);
					} catch (err) {
						const blApiError = new BlApiError();
						blApiError.msg = 'document data not valid';
						reject(blApiError);
					}
				}, (error: BlApiError) => {
					reject(error);
				});
		});
	}
	
	public getById(id: string): Promise<T> {
		return new Promise((resolve, reject) => {
			this._apiService.getById(this._collectionName, id).then((res: ApiResponse) => {
					try {
						const docs = this.getDocumentsIfValid(res);
						
						if (docs.length !== 1) {
							return reject(new BlApiError());
						}
						
						resolve(docs[0]);
					} catch (err) {
						const blApiError = new BlApiError();
						blApiError.msg = 'document data not valid';
						reject(blApiError);
					}
				},
				(error: BlApiError) => {
					reject(error);
				});
		});
	}
	
	private getDocumentsIfValid(apiResponse: ApiResponse): T[] {
		let docs: T[] = [];
		
		if (!isArray(apiResponse.data)) {
			throw new Error('response data is not an array');
		}
		
		for (const d of apiResponse.data) {
			docs.push(this.getDocIfValid(d));
		}
		
		return docs;
	}
	
	private getDocIfValid(responseDocument: any): T {
		if (!responseDocument.documentName || responseDocument.documentName.length <= 0) {
			throw new Error('response data document does not have documentName');
		}
		
		if (!responseDocument.data || !responseDocument.data.name || !responseDocument.data.id) {
			throw new Error('document does not have the required fields');
		}
		
		return responseDocument.data as T;
	}
	
}
