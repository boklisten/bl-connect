

import {ApiService} from "../api/api.service";
import {BlApiError, BlApiLoginRequiredError, BlApiNotFoundError, BlApiPermissionDeniedError, Branch} from "@wizardcoder/bl-model";
import {DocumentService} from "./document.service";
describe('DocumentService', () => {
	let service: DocumentService<any>;

	const apiServiceMock = {
		get: (url: string, query?: string) => {},
		getById: (collection: string, id: string) => {},
		update: (collection: string, id: string, data: any) => {},
		add: (collection: string, data: any) => {},
		remove: (collection: string, id: string) => {}
	} as ApiService;

	beforeEach(() => {
		service = new DocumentService('any', apiServiceMock);
	});

	describe('#get()', () => {
		it('should resolve with a array of valid branches when apiService returns success', (done: DoneFn) => {
			const branchDoc1 = {documentName: 'branch', data: {name: 'MikkyD', id: 'abc'} as Branch};
			const branchDoc2 = {documentName: 'branch', data: {name: 'Bking', id: 'x'} as Branch};
			const returnObj = {data: [
				branchDoc1,
				branchDoc2
			]};

			spyOn(apiServiceMock, 'get').and.returnValue(
				Promise.resolve(returnObj)
			);

			service.get().then((branches: Branch[]) => {
				expect(branches[0].name).toEqual(branchDoc1.data.name);
				expect(branches[1].name).toEqual(branchDoc2.data.name);
				done();
			});
		});

		it('should reject with BlApiError if apiService rejects', (done: DoneFn) => {
			const blApiErr = new BlApiError();
			blApiErr.msg = 'an error occurred';

			spyOn(apiServiceMock, 'get').and.returnValue(
				Promise.reject(blApiErr)
			);

			service.get().catch((apiErr: BlApiError) => {
				expect(apiErr.msg).toEqual(blApiErr.msg);
				done();
			});
		});
	});

	describe('#getById()', () => {
		it('should resolve with a branch if apiService returns a valid document', (done: DoneFn) => {
			const branchDoc = {documentName: 'branch', data: {id: 'abc'}};
			const returnObj = {
				data: [
					branchDoc
				]
			};

			spyOn(apiServiceMock, 'getById').and.returnValue(
				Promise.resolve(returnObj)
			);

			service.getById('abc').then((branch: Branch) => {
				expect(branch.id).toEqual(branchDoc.data.id);
				done();
			});
		});

		it('should reject with BlApiError if apiService rejects', (done: DoneFn) => {
			const blApiErr = new BlApiError();
			blApiErr.msg = 'an error occurred';

			spyOn(apiServiceMock, 'getById').and.returnValue(
				Promise.reject(blApiErr)
			);

			service.getById('abc').catch((apiErr: BlApiError) => {
				expect(apiErr.msg).toEqual(blApiErr.msg);
				done();
			});
		});

		it('should reject with BlApiError if the response includes more than one document', (done: DoneFn) => {

			const branchDoc1 = {documentName: 'branch', data: {id: 'abc'}};
			const branchDoc2 = {documentName: 'branch', data: {id: 'abc'}};

			const returnObj = {
				data: [
					branchDoc1,
					branchDoc2
				]
			};

			spyOn(apiServiceMock, 'getById').and.returnValue(
				Promise.resolve(returnObj)
			);

			service.getById('abc').catch((apiErr: BlApiError) => {
				expect(apiErr.msg).toMatch('there where more than one document in the response');
				done();
			});
		});

	});

	describe('#update()', () => {
		it('should resolve with the document if apiService resolves with success', (done: DoneFn) => {

			const doc = {documentName: 'aDoc', data: {title: 'aDocumentTitle', id: 'abc'}};

			spyOn(apiServiceMock, 'update').and.returnValue(
				Promise.resolve({data: [doc]})
			);

			service.update('abc', {hello: 'there'}).then((resDoc: any) => {
				expect(resDoc).toEqual(doc.data);
				done();
			});
		});

		it('should reject with BlApiError if the document returned from ApiService is invalid', (done: DoneFn) => {

			const doc = {documentName: 'aDoc', data: {missing: 'this doc is missing an id field'}};

			spyOn(apiServiceMock, 'update').and.returnValue(
				Promise.resolve([doc])
			);

			service.update('abc', {hello: 'there'}).catch((blApiError: BlApiError) => {
				expect(blApiError.msg).toMatch('document data not valid');
				done();
			});
		});

		it('should reject with BlApiLoginRequiredError if apiService throws it', (done: DoneFn) => {
			spyOn(apiServiceMock, 'update').and.returnValue(
				Promise.reject(new BlApiLoginRequiredError())
			);

			service.update('abc', {hello: 'my man'}).catch((blApiError: BlApiError) => {
				expect((blApiError instanceof BlApiLoginRequiredError)).toBeTruthy();
				done();
			});
		});
	});

	describe('#add()', () => {
		it('should resolve with the document if apiService resolves with success', (done: DoneFn) => {

			const doc = {documentName: 'aDoc', data: {title: 'aDocumentTitle', id: 'abc'}};

			spyOn(apiServiceMock, 'add').and.returnValue(
				Promise.resolve({data: [doc]})
			);

			service.add({hello: 'there'}).then((resDoc: any) => {
				expect(resDoc).toEqual(doc.data);
				done();
			});
		});

		it('should reject with BlApiError if the document returned from ApiService is invalid', (done: DoneFn) => {

			const doc = {documentName: 'aDoc', data: {missing: 'this doc is missing an id field'}};

			spyOn(apiServiceMock, 'add').and.returnValue(
				Promise.resolve([doc])
			);

			service.add({hello: 'there'}).catch((blApiError: BlApiError) => {
				expect(blApiError.msg).toMatch('document data not valid');
				done();
			});
		});

		it('should reject with BlApiPermissionDeniedError if apiService throws it', (done: DoneFn) => {
			spyOn(apiServiceMock, 'add').and.returnValue(
				Promise.reject(new BlApiPermissionDeniedError())
			);

			service.add({hello: 'my man'}).catch((blApiError: BlApiError) => {
				expect((blApiError instanceof BlApiPermissionDeniedError)).toBeTruthy();
				done();
			});
		});
	});

	describe('#remove()', () => {
		it('should resolve with the document if apiService resolves with success', (done: DoneFn) => {

			const doc = {documentName: 'aDoc', data: {title: 'aDocumentTitle', id: 'abc'}};

			spyOn(apiServiceMock, 'remove').and.returnValue(
				Promise.resolve({data: [doc]})
			);

			service.remove('abc').then((resDoc: any) => {
				expect(resDoc).toEqual(doc.data);
				done();
			});
		});

		it('should reject with BlApiError if the document returned from ApiService is invalid', (done: DoneFn) => {

			const doc = {documentName: 'aDoc', data: {missing: 'this doc is missing an id field'}};

			spyOn(apiServiceMock, 'remove').and.returnValue(
				Promise.resolve(doc)
			);

			service.remove('abc').catch((blApiError: BlApiError) => {
				expect(blApiError.msg).toMatch('document data not valid');
				done();
			});
		});

		it('should reject with BlApiNotFoundError if apiService throws it', (done: DoneFn) => {
			spyOn(apiServiceMock, 'remove').and.returnValue(
				Promise.reject(new BlApiNotFoundError())
			);

			service.remove('abc').catch((blApiError: BlApiError) => {
				expect((blApiError instanceof BlApiNotFoundError)).toBeTruthy();
				done();
			});
		});
	});
});
