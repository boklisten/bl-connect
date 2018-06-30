import {Injectable} from '@angular/core';
import {BlDocument} from "@wizardcoder/bl-model";

interface SimpleCacheObject {
	doc: any;
	time: number;
}

@Injectable({
	providedIn: 'root'
})
export class SimpleCache<T extends BlDocument> {
	public refreshTimeMs: number; // a number of milliseconds before the cached object is considered old
	private _simpleCacheStorage: {[id: string]: SimpleCacheObject};

	constructor(refreshTimeMs?: number) {
		this._simpleCacheStorage = {};
		this.refreshTimeMs = (refreshTimeMs) ? refreshTimeMs : 600000; // default is 10 minutes
	}

	public add(doc: T) {
		this._simpleCacheStorage[doc.id] = {doc: doc, time: new Date().getTime()};
	}

	public get(id: string): T {
		const simpleCacheObj = this._simpleCacheStorage[id];

		if (!simpleCacheObj) {
			return undefined;
		}

		const now = new Date().getTime();
		if (simpleCacheObj.time <= (now - this.refreshTimeMs)) {
			this._simpleCacheStorage[id] = null;
			return undefined;
		}

		return simpleCacheObj.doc;
	}

	public remove(id: string) {
		this._simpleCacheStorage[id] = null;
	}

	public clear() {
		this._simpleCacheStorage = {};
	}
}
