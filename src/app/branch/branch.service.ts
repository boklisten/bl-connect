import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Branch} from "@wizardcoder/bl-model";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {DocumentService} from "../document/document.service";
import {CachedDocumentService} from "../document/cached-document.service";

@Injectable()
export class BranchService {
	private collectionName: string;
	private documentName: string;

	constructor(private _apiService: ApiService, private _cachedDocumentService: CachedDocumentService<any>) {
		this.collectionName = BL_CONFIG.collection.branch;
		_cachedDocumentService._documentService = new DocumentService<Branch>(this.collectionName, this._apiService);
		this.documentName = 'branch';
	}

	public get(query?: string): Promise<Branch[]>	 {
		return this._cachedDocumentService.get(query);
	}

	public getById(id: string): Promise<Branch> {
		return this._cachedDocumentService.getById(id);
	}

	public getManyByIds(ids: string[]): Promise<Branch[]> {
		return this._cachedDocumentService.getManyByIds(ids);
	}

	public update(id: string, data: any): Promise<Branch> {
		return this._cachedDocumentService.update(id, data);
	}

	public add(branch: Branch): Promise<Branch> {
		return this._cachedDocumentService.add(branch);
	}
}
