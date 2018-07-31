import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Subject} from "rxjs/internal/Subject";

@Injectable({
	providedIn: 'root'
})
export class UserSessionService {
	logout$: Subject<boolean>;
	login$: Subject<boolean>;

	constructor() {
		this.logout$ = new Subject<boolean>();
		this.login$ = new Subject<boolean>();
	}

	/**
	 * Sends out a logout alert
	 *
	 */
	public logout() {
		this.logout$.next(true);
	}

	/**
	 * Send out a login alert
	 *
	 */
	public login() {
		this.login$.next(true);
	}

	/**
	 * Alerts the observer when logout is needed
	 *
	 * @returns Observable<boolean>
	 */
	public onLogout(): Observable<boolean> {
		return this.logout$.asObservable();
	}

	/**
	 * Alerts the observer on login
	 *
	 * @returns Observable<boolean>
	 */
	public onLogin(): Observable<boolean> {
		return this.login$.asObservable();
	}
}
