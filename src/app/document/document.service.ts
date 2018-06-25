import {Injectable} from '@angular/core';
import {BlApiError, BlDocument} from "@wizardcoder/bl-model";
import {ApiResponse} from "../api/api-response";
import {isArray} from "util";
import {ApiService} from "../api/api.service";

@Injectable()
export class DocumentService<T extends BlDocument> {

	constructor(private _collectionName: string, private _apiService: ApiService) {
	}

	public get(query?: string): Promise<T[]> {
		return new Promise((resolve, reject) => {
			this._apiService.get(this._collectionName, query).then(
				(res: ApiResponse) => {
					this.getDocsIfValid(res).then((docs: T[]) => {
						resolve(docs);
					}).catch((blApiErr: BlApiError) => {
						reject(blApiErr);
					});
				}, (error: BlApiError) => {
					reject(error);
				});
		});
	}

	public getById(id: string): Promise<T> {
		return new Promise((resolve, reject) => {
			this._apiService.getById(this._collectionName, id).then((res: ApiResponse) => {
					this.getDocIfValid(res).then((doc: T) => {
						resolve(doc);
					}).catch((blApiErr: BlApiError) => {
						reject(blApiErr);
					});
				},
				(error: BlApiError) => {
					reject(error);
				});
		});
	}

	public getWithOperation(id: string, operation: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this._apiService.getWithOperation(this._collectionName, id, operation).then((res: ApiResponse) => {
				this.getDocIfValid(res).then((doc: any) => {
					resolve(doc);
				}).catch((blApiError: BlApiError) => {
					reject(blApiError);
				});
			}).catch((err: BlApiError) => {
				reject(err);
			});
		});
	}

	public getManyByIds(ids: string[]): Promise<T[]> {
		return new Promise((resolve, reject) => {
			const promArr: Promise<T>[] = [];

			for (const id of ids) {
				promArr.push(this.getById(id));
			}

			Promise.all(promArr).then((retVals: T[]) => {
				resolve(retVals);
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}

	public update(id: string, data: any): Promise<T> {
		return new Promise((resolve, reject) => {
			this._apiService.update(this._collectionName, id, data).then((res: ApiResponse) => {
				this.getDocIfValid(res).then((doc: T) => {
					resolve(doc);
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}

	public add(data: T): Promise<T> {
		return new Promise((resolve, reject) => {
			this._apiService.add(this._collectionName, data).then((res: ApiResponse) => {
				this.getDocIfValid(res).then((doc: T) => {
					resolve(doc);
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}

	public remove(id: string): Promise<T> {
		return new Promise((resolve, reject) => {
			this._apiService.remove(this._collectionName, id).then((res: ApiResponse) => {
				this.getDocIfValid(res).then((doc: T) => {
					resolve(doc);
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}

	private getDocIfValid(apiRes: ApiResponse): Promise<T> {
		return new Promise((resolve, reject) => {
			this.getDocsIfValid(apiRes).then((docs: T[]) => {
				if (docs.length !== 1) {
					return reject(new BlApiError('there where more than one document in the response'));
				}

				resolve(docs[0]);
			}).catch((err: BlApiError) => {
				reject(err);
			});
		});
	}

	private getDocsIfValid(apiRes: ApiResponse): Promise<T[]> {
		return new Promise((resolve, reject) => {
			try {
				const docs = this.validateAndGetDocs(apiRes);

				resolve(docs);

			} catch (err) {
				console.log('the response::', apiRes);
				reject(new BlApiError('document data not valid'));
			}
		});
	}

	private validateAndGetDocs(apiResponse: ApiResponse): T[] {

		if (!isArray(apiResponse.data)) {

			throw new Error('response data is not an array');
		}

		const docs: T[] = [];

		for (const d of apiResponse.data) {
			docs.push(this.validateAndGetDoc(d));
		}

		return docs;
	}

	private validateAndGetDoc(responseDocument: any): T {

		if (!responseDocument.data || !responseDocument.data.id) {
			return responseDocument as T;
		}

		return responseDocument.data as T;
	}

}
