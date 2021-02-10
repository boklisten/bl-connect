export class ApiErrorResponse {
	private _msg: string;
	private _code: number;
	private _data: any;

	constructor(msg: string, code: number, data?: any) {
		this.msg = msg;
		this.code = code;
		this.data = data;
	}

	get msg(): string {
		return this._msg;
	}

	set msg(msg: string) {
		this._msg = msg;
	}

	get code(): number {
		return this._code;
	}

	set code(code: number) {
		this._code = code;
	}

	get data(): any {
		return this._data;
	}

	set data(data: any) {
		this._data = data;
	}
}
