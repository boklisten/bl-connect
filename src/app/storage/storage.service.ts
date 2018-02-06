import { Injectable } from '@angular/core';
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class StorageService {
	
	constructor(private _localStorage: LocalStorageService) {
	
	}
	
	public add(key: string, val: string): boolean {
		/*
		if (!this._localStorage.isSupported) {
			try {
				this.storeCookie(key, val);
			} catch (err) {
				console.log('the error', err);
				return false;
			}
			return true;
		}
		*/
		localStorage.setItem(key, val);
		return true;
	}
	
	public get(key: string): string {
		/*
		if (!this._localStorage.isSupported) {
			try {
				return this.getCookie(key);
			} catch (err) {
				throw new Error('could not get stored item with key "' + key + '"');
			}
		}
		*/
		
		const storedObj = localStorage.getItem(key);
		
		if (!storedObj) {
			throw new Error('could not find stored object with key "' + key + '"');
		}
		
		return storedObj;
		
	}
	
	public remove(key: string): boolean {
		/*
		if (!this._localStorage.isSupported) {
			return this.deleteCookie(key);
		}
		*/
		localStorage.removeItem(key);
		return true;
	}
	
	public removeAll(): void {
		/*
		if (!this._localStorage.isSupported) {
			this._cookieService.removeAll();
			return;
		}
		*/
		localStorage.clear();
	}
	
	private storeCookie(key: string, val: string) {
		/*
		try {
			this._cookieService.put(key, val);
		} catch (err) {
			throw new Error('could not store cookie: ' + err);
		}
		*/
		return true;
	}
	
	private getCookie(key: string) {
		/*
		const val: any = this._cookieService.get(key);
		if (!val) {
			throw new Error('could not find cookie');
		}
		return val;
		*/
	}
	
	private deleteCookie(key: string) {
		/*
		this._cookieService.remove(key);
		return true;
		*/
	}

}
