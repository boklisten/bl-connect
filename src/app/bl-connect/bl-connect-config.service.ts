import {Injectable} from "@angular/core";
import {BL_CONFIG} from "./bl-config";

@Injectable()

export class BlConnectConfigService {
	public setConfig(config?: {basePath?: string}) {
		if (config && config.basePath) {
			BL_CONFIG.api.basePath = config.basePath;
		}
	}
}
