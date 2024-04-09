import { Injectable } from "@angular/core";
import { Branch } from "@boklisten/bl-model";
import { BL_CONFIG } from "../../bl-connect/bl-config";
import { BlDocumentService } from "../../document/bl-document.service";
import { CachedDocumentService } from "../../document/cached-document.service";

@Injectable()
export class BranchService extends BlDocumentService<Branch> {
	constructor(private cachedDocumentService: CachedDocumentService) {
		super(cachedDocumentService);
		this.setCollection(BL_CONFIG.collection.branch);
	}

	public isUpperSecondarySchool(branch: Branch): boolean {
		return branch.type === "VGS";
	}
}
