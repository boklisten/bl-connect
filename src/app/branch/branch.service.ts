import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Branch} from "@wizardcoder/bl-model";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {DocumentService} from "../document/document.service";
import {CachedDocumentService} from "../document/cached-document.service";

@Injectable()
export class BranchService {
	private collection: string;

	constructor(private _apiService: ApiService, private _cachedDocumentService: CachedDocumentService) {
		this.collection = BL_CONFIG.collection.branch;
	}

	public get(query?: string): Promise<Branch[]>	 {
		return this._cachedDocumentService.get(this.collection, query);
	}

	public getById(id: string): Promise<Branch> {
		return this._cachedDocumentService.getById(this.collection, id);
	}

	public getManyByIds(ids: string[]): Promise<Branch[]> {
		return this._cachedDocumentService.getManyByIds(this.collection, ids);
	}

	public update(id: string, data: any): Promise<Branch> {
		return this._cachedDocumentService.update(this.collection, id, data);
	}

	public add(branch: Branch): Promise<Branch> {
		return this._cachedDocumentService.add(this.collection, branch);
	}
}
