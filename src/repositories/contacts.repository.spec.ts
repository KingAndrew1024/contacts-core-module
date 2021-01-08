import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppSettingsService } from '../providers/global-params';
import { IContactRepository } from '../core/contracts/IContact.repository';
import { CONTACTS_REPOSITORY } from '../services/identifiers';
import { ContactsRepository } from './contacts.repository';

describe('ContactsRepository', () => {
    let contactsRepository: IContactRepository;
    let httpTestingController: HttpTestingController;

    const contactId = 43;

    const fakeAppSettingsService = {
        getApiUrl: () => 'any_string',
        getInstanceName: () => 'any_string'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: CONTACTS_REPOSITORY, useClass: ContactsRepository},
                { provide: AppSettingsService, useValue: fakeAppSettingsService },
            ]
        });

        contactsRepository = TestBed.inject(CONTACTS_REPOSITORY);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('Should be created', () => {
        expect(contactsRepository).toBeTruthy('ContactsRepository was not created');
    });

    it('getContacts Should request endpoint /contacts with method GET', () => {

        contactsRepository.getContacts().subscribe();

        const req = httpTestingController.expectOne(request => request.url.endsWith('/contacts'));

        expect(req.request.method).toEqual('GET');

        req.flush({ status: 'success' });
    });

    it('getCountryCodes Should request asset /assets/countryCodes.json with method GET', () => {
        contactsRepository.getCountryCodes().subscribe();

        const req = httpTestingController.expectOne(request => request.url.endsWith('/assets/countryCodes.json'));

        expect(req.request.method).toEqual('GET');

        req.flush({});
    });

    it('getContactInteractions Should request endpoint /interactions/{id} with method GET', () => {
        contactsRepository.getContactInteractions(contactId).subscribe();

        const req = httpTestingController.expectOne(request => request.url.includes('/interactions/'));

        expect(req.request.method).toEqual('GET');
        expect(req.request.url.endsWith(`${contactId}`)).toBeTrue();

        req.flush({ status: 'success' });
    });

    it('createContact Should request endpoint /create with method POST', () => {
        const fakePayload: any = { hello: 'world' };

        contactsRepository.createContact(fakePayload).subscribe();

        const req = httpTestingController.expectOne(request => request.url.endsWith('/create'));

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toBeDefined();

        req.flush({ status: 'success' });
    });

    it('deleteContact Should request endpoint /delete/{id} with method DELETE', () => {
        contactsRepository.deleteContact(contactId).subscribe();

        const req = httpTestingController.expectOne(request => request.url.includes('/delete/'));

        expect(req.request.method).toEqual('DELETE');
        expect(req.request.url.endsWith(`${contactId}`)).toBeTrue();

        req.flush({ status: 'success' });
    });

    it('updateContact Should request endpoint /update/{id} with method POST', () => {
        const fakePayload: any = { id: contactId, hello: 'World' };

        contactsRepository.updateContact(fakePayload).subscribe();

        const req = httpTestingController.expectOne(request => request.url.includes('/update/'));

        expect(req.request.method).toEqual('POST');
        expect(req.request.url.endsWith(`${contactId}`)).toBeTrue();
        expect(req.request.body).toBeDefined();

        req.flush({ status: 'success' });
    });

    it('importContacts should request endpoint /export_from_mobile with method POST', () => {
        const fakePayload: any = { hello: 'World' };

        contactsRepository.importContacts(fakePayload).subscribe();

        const req = httpTestingController.expectOne(request => request.url.endsWith('/export_from_mobile'));

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toBeDefined();

        req.flush({ status: 'success' });
    });

    it('createInteraction should request endpoint /create_interaction/{id} with method POST', () => {
        const fakePayload: any = { hello: 'World' };

        contactsRepository.createInteraction(contactId, fakePayload).subscribe();

        const req = httpTestingController.expectOne(request => request.url.includes('/create_interaction/'));

        expect(req.request.method).toEqual('POST');
        expect(req.request.url.endsWith(`${contactId}`)).toBeTrue();
        expect(req.request.body).toBeDefined();

        req.flush({ status: 'success' });
    });

    afterEach(() => {
        httpTestingController.verify();
    });
});
