import {BranchService} from "./branch.service";
import {SimpleCache} from "../simple-cache/simple-cache.service";
import {ApiService} from "../api/api.service";
import {DocumentService} from "../document/document.service";
import {CachedDocumentService} from "./cached-document.service";

describe('CachedDocumentService', () => {
	const simpleCache = new SimpleCache();
	const apiService = new ApiService();
	let service: CachedDocumentService;
	const documentService = new DocumentService();

	beforeEach(() => {
		service = new CachedDocumentService(documentService, simpleCache);
		simpleCache.refreshTimeMs = 50000;
	});

	afterEach(() => {
		simpleCache.clear();
	});

	describe('#get', () => {
		it('should add all documents returned to cache', (done) => {
			const testDocOne = {id: 'abc', name: 'Ally Bally'};
			const testDocTwo = {id: '123', name: 'Jimmy Bimmy'};

			spyOn(documentService, 'get').and.callFake(() => {
				return Promise.resolve([testDocOne, testDocTwo]);
			});

			service.get().then((returnedDocuments: any[]) => {
				expect(returnedDocuments).toEqual([testDocOne, testDocTwo]);
				expect(simpleCache.get(testDocOne.id)).toEqual(testDocOne);
				expect(simpleCache.get(testDocTwo.id)).toEqual(testDocTwo);
				done();
			});
		});
	});

	describe('#getById', () => {

		it('should resolve with the correct document and store it in cache', (done) => {
			const testDocument = {id: 'abc', name: 'test document name'};

			spyOn(documentService, 'getById').and.callFake((id) => {
				return Promise.resolve(testDocument);
			});

			service.getById('abc').then((returnedBranch) => {
				expect(returnedBranch).toEqual(testDocument);
				expect(simpleCache.get(returnedBranch.id)).toEqual(testDocument);
				done();
			});
		});

		it('should not call documentService if document is already in cache', (done) => {
			const testDocument = {id: '123', name: 'test document name'};
			simpleCache.add(testDocument);

			const spy = spyOn(documentService, 'getById');

			service.getById('123').then((returnedDocument) => {
				expect(spy).not.toHaveBeenCalled();
				expect(returnedDocument).toEqual(testDocument);
				done();
			});
		});

		it('should call documentService if document is in cache but is expired', (done) => {
			const testDocument = {id: 'abc', someArr: ['a value']};
			simpleCache.refreshTimeMs = 1;
			simpleCache.add(testDocument);

			const spy = spyOn(documentService, 'getById').and.callFake(() => {
				return Promise.resolve(testDocument);
			});

			setTimeout(() => {
				service.getById(testDocument.id).then((returnedDoc) => {
					expect(spy).toHaveBeenCalled();
					expect(returnedDoc).toEqual(testDocument);
					done();
				});
			}, 2); // the time is over the expire time
		});
	});

	describe('#getManyByIds', () => {
		it('should not call documentService if the ids are already cached', (done) => {
			const testDocOne = {id: 'abc', name: 'some name'};
			const testDocTwo = {id: '123', title: 'Legoland is fun'};
			const testDocThree = {id: 'zxy', someArr: [{name: 'alf'}]};

			simpleCache.add(testDocOne);
			simpleCache.add(testDocTwo);
			simpleCache.add(testDocThree);

			const spy = spyOn(documentService, 'getManyByIds').and.callFake(() => {

			});

			service.getManyByIds(['abc', '123', 'zxy']).then((documents: any[]) => {
				expect(spy).not.toHaveBeenCalled();
				expect(documents).toEqual([testDocOne, testDocTwo, testDocThree]);
				done();
			});
		});

		it('should call documentService if none of the ids are cached', (done) => {
			const testDocOne = {id: 'kk1', name: 'some name'};
			const testDocTwo = {id: 'slj', title: 'Legoland is fun'};
			const testDocThree = {id: 'bcb', someArr: [{name: 'alf'}]};

			const spy = spyOn(documentService, 'getManyByIds').and.callFake(() => {
				return Promise.resolve([testDocOne, testDocTwo, testDocThree]);
			});

			service.getManyByIds(['kk1', 'slj', 'bcb']).then((documents: any[]) => {
				expect(spy).toHaveBeenCalled();
				expect(documents).toEqual([testDocOne, testDocTwo, testDocThree]);
				done();
			});
		});

		it('should only call documentService with the ids that are not cached', (done) => {
			const testDocOne = {id: 'td1', name: 'some name'};
			const testDocTwo = {id: 'td2', title: 'Legoland is fun'};
			const testDocThree = {id: 'td3', someArr: [{name: 'alf'}]};

			simpleCache.add(testDocOne);
			//testDocTwo is not saved to cache
			simpleCache.add(testDocThree);


			const spy = spyOn(documentService, 'getManyByIds').and.callFake(() => {
				return Promise.resolve([testDocTwo]);
			});

			service.getManyByIds(['td1', 'td2', 'td3']).then((returnedDocuments: any[]) => {
				expect(spy).toHaveBeenCalledWith(['td2']); // should only ask api for the none cached object
				expect(returnedDocuments).toEqual([testDocOne, testDocThree, testDocTwo]);
				done();
			});
		});
	});

	describe('#update', () => {
		it('should add the document after return from api', (done) => {
			const updatedTestDoc = {id: 'abc', name: 'Sam Hikky'};

			spyOn(documentService, 'update').and.callFake((id: string, data: any) => {
				return Promise.resolve(updatedTestDoc);
			});

			service.update('abc', {name: 'Sam Hikky'}).then((updatedDocument) => {
				expect(updatedDocument).toEqual(updatedTestDoc);
				expect(simpleCache.get(updatedDocument.id)).toEqual(updatedDocument);
				done();
			});
		});
	});

	describe('#add', () => {
		it('should add the document after return from api', (done) => {
			const testDoc = {id: 'abc', name: 'Joseph Hansen'};

			spyOn(documentService, 'add').and.callFake(() => {
				return Promise.resolve(testDoc);
			});

			service.add(testDoc).then((addedDocument) => {
				expect(addedDocument).toEqual(testDoc);
				expect(simpleCache.get(addedDocument.id)).toEqual(testDoc);
				done();
			});
		});
	});

	describe('#remove', () => {
		it('should remove the document from cache after api resolves', (done) => {
			const testDoc = {id: 'abc', someArr: ['kkk']};
			simpleCache.add(testDoc);

			spyOn(documentService, 'remove').and.callFake(() => {
				return Promise.resolve(testDoc);
			});

			service.remove(testDoc.id).then((removedDoc) => {
				expect(removedDoc).toEqual(testDoc);
				expect(simpleCache.get(testDoc.id)).toBeUndefined();
				done();
			});
		});
	});
});
