

import {ApiService} from "../api/api.service";
import {BlApiError, Branch} from "bl-model";
import {DocumentService} from "./document.service";
describe('DocumentService', () => {
	let service: DocumentService<any>;
	
	const apiServiceMock = {
		get: (url: string, query?: string) => {},
		getById: (collection: string, id: string) => {}
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
		
		it('should reject if the returned ApiService data is not of valid documents', (done: DoneFn) => {
			const branchDoc1 = {documentName: 'somethingElse', data: {age: 'MikkyD'}};
			const returnObj = {data: [
				branchDoc1
			]};
			
			spyOn(apiServiceMock, 'get').and.returnValue(
				Promise.resolve(returnObj)
			);
			
			service.get().catch((blApiError: BlApiError) => {
				expect(blApiError.msg).toMatch('document data not valid');
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
			const branchDoc = {documentName: 'branch', data: {name: 'aBranchName', id: 'abc'}};
			const returnObj = {
				data: [
					branchDoc
				]
			};
			
			spyOn(apiServiceMock, 'getById').and.returnValue(
				Promise.resolve(returnObj)
			);
			
			service.getById('abc').then((branch: Branch) => {
				expect(branch.name).toEqual(branchDoc.data.name);
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
			
			const branchDoc1 = {documentName: 'branch', data: {name: 'aBranchName', id: 'abc'}};
			const branchDoc2 = {documentName: 'branch', data: {name: 'anotherBranchName', id: 'abc'}};
			
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
				expect(apiErr.msg).toMatch('there where more than one document in the response')
				done();
			});
		});
		
	});
	
	
});
