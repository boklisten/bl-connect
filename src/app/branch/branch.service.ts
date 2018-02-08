import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BlApiError, Branch} from "bl-model";
import {ApiResponse} from "../api/api-response";
import {ApiErrorResponse} from "../api/api-error-response";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {isArray} from "util";

@Injectable()
export class BranchService {
	private collectionName: string;
	private documentName: string;
	
	constructor(private apiService: ApiService) {
		this.collectionName = BL_CONFIG.collection.branch;
		this.documentName = 'branch';
		
	}
	
	public get(query?: string): Promise<Branch[]>	 {
		return new Promise((resolve, reject) => {
			this.apiService.get(this.collectionName, query).then(
				(res: ApiResponse) => {
					try {
						const branches = this.getBranchesIfValid(res);
						resolve(branches);
					} catch (err) {
						console.log('the error is here', err);
						const blApiError = new BlApiError();
						blApiError.msg = 'branch data not valid';
						reject(blApiError);
					}
				}, (error: BlApiError) => {
					reject(error);
				});
		});
	}
	
	public getById(id: string): Promise<Branch> {
		return new Promise((resolve, reject) => {
			this.apiService.getById(this.collectionName, id).then((res: ApiResponse) => {
					try {
						const branches = this.getBranchesIfValid(res);
						if (branches.length !== 1) {
							return reject(new BlApiError());
						}
						
						resolve(branches[0]);
					} catch (err) {
						const blApiError = new BlApiError();
						blApiError.msg = 'branch data not valid';
						reject(blApiError);
					}
				},
				(error: BlApiError) => {
					reject(error);
				});
		});
	}
	
	private getBranchesIfValid(apiResponse: ApiResponse): Branch[] {
		let branches: Branch[] = [];
		
		if (!isArray(apiResponse.data)) {
			throw new Error('response data is not an array');
		}
		
		for (const d of apiResponse.data) {
			branches.push(this.getBranchIfValid(d));
		}
		
		return branches;
	}
	
	private getBranchIfValid(responseDocument: any): Branch {
		if (responseDocument.documentName !== this.documentName) {
			throw new Error('response data document does not have documentName');
		}
		
		if (!responseDocument.data || !responseDocument.data.name || !responseDocument.data.id) {
			throw new Error('branch does not have the required fields');
		}
		
		return responseDocument.data as Branch;
	}
}
