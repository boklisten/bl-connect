import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Branch} from "bl-model";
import {ApiResponse} from "../api/api-response";
import {ApiErrorResponse} from "../api/api-error-response";
import {BL_CONFIG} from "../bl-connect/bl-config";

@Injectable()
export class BranchService {
	collectionName: string;
	
	constructor(private apiService: ApiService) {
		this.collectionName = BL_CONFIG.collection.branch;
	}
	
	public get(query?: string): Promise<Branch[]>	 {
		return new Promise((resolve, reject) => {
			this.apiService.get(this.collectionName, query).then(
				(res: ApiResponse) => {
					const branches: Branch[] = [];
					for (const data of res.data) {
						branches.push(data.data);
					}
					resolve(branches);
				}, (error: ApiErrorResponse) => {
					reject(error);
				});
		});
	}
	
	public getById(id: string): Promise<Branch> {
		return new Promise((resolve, reject) => {
			this.apiService.getById(this.collectionName, id).then(
				(res: ApiResponse) => {
					if (res.data.length === 1) {
						resolve(res.data[0].data);
					} else {
						reject(new ApiErrorResponse('bad data', 500));
					}
				},
				(error: ApiErrorResponse) => {
					
					reject(error);
				});
		});
	}
	
}
