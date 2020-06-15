import { IContactForm, CONTACT_TYPE, IContactApiProps, CONTACT_ORIGIN, INTERACTION_TYPE, IContactInteractionsApiProps } from '../contracts/IContact.repository';

export class ContactModel implements IContactModelProps {
    id: number;
    name: string;
    lastName?: string;
    type?: CONTACT_TYPE;
    origin?: CONTACT_ORIGIN;
    email?: string;
    phone?: string;
    countryCode?: string
    phoneCode?: string
    streetAddress?: string;
    city?: string;
    stateIso?: string;
    createdAt?: string
    updatedAt?: string

    constructor(data: IContactModelProps) {
        this.id = data.id;
        this.name = data.name;
        this.lastName = data.lastName || "";
        this.type = data.type || "NOT_SPECIFIED";
        this.origin = data.origin || "UNKNOWN";
        this.email = data.email || "";
        this.phone = (data.phone || "").replace(/[^0-9]+/g, "").slice(-10);
        this.countryCode = data.countryCode || 'MEX';
        this.phoneCode = data.phoneCode || '+52';
        this.streetAddress = data.streetAddress || "";
        this.city = data.city || "";
        this.stateIso = data.stateIso || "";
        this.createdAt = data.createdAt || ""
        this.updatedAt = data.updatedAt || ""
    }

    static toStorage(contact: ContactModel): IContactModelProps {
        return {
            id: contact.id,
            name: contact.name,
            lastName: contact.lastName,
            type: contact.type,
            origin: contact.origin,
            email: contact.email,
            phone: contact.phone,
            countryCode: contact.countryCode,
            phoneCode: contact.phoneCode,
            streetAddress: contact.streetAddress,
            city: contact.city,
            stateIso: contact.stateIso,
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt
        };
    }

    static toApiModel(contact: ContactModel): any {
        return {
            id: contact.id,
            name: contact.name,
            last_name: contact.lastName || "",
            type: contact.type || "NOT_SPECIFIED",
            email: contact.email || "",
            phone: contact.phone || "",
            country_code: contact.countryCode,
            phone_code: contact.phoneCode,
            street_address: contact.streetAddress || "",
            city: contact.city || "",
            state_iso: contact.stateIso || "",

            //Maybe unused
            //origin: contact.origin,
            //created_at: contact.createdAt,
            //updated_at: contact.updatedAt
        };
    }

    static fromDataResponse(data: IContactApiProps): ContactModel {
        return new ContactModel({
            id: +data.id,
            name: data.name,
            lastName: data.last_name,
            type: data.type,
            origin: data.origin,
            email: data.email,
            phone: data.phone,
            countryCode: data.country_code,
            phoneCode: data.phone_code,
            streetAddress: data.street_address,
            city: data.city,
            stateIso: data.state_iso,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        });
    }

    static fromContactForm(form: IContactForm) {
        return new ContactModel({
            //Required
            id: +form.id,
            name: form.name,
            countryCode: form.country_code,
            phoneCode: form.phone_code,

            lastName: form.last_name,
            type: form.type,
            phone: form.phone,
            email: form.email,
            streetAddress: form.street_address,
            city: form.city,
            stateIso: form.state_iso
        });
    }

    static empty() {
        return new ContactModel({
            id: null,
            name: '',
            countryCode: null,
            phoneCode: null
        })
    }
}

export interface IContactModelProps {
    //Required
    id: number
    name: string
    countryCode?: string
    phoneCode?: string

    //Main optionals
    lastName?: string
    type?: CONTACT_TYPE
    origin?: CONTACT_ORIGIN
    email?: string
    phone?: string
    streetAddress?: string
    city?: string
    stateIso?: string
    createdAt?: string
    updatedAt?: string
}

export class ContactInteractionModel implements IContactInteractionModelProps{
    id: number;
    contactId: number;
    entity: string;
    entityId: number;
    actionType: INTERACTION_TYPE;
    createdAt: string;
    displayText: string;

    constructor(data: IContactInteractionModelProps){
        this.id = data.id
        this.contactId = data.contactId
        this.entity = data.entity
        this.entityId = data.entityId
        this.actionType = data.actionType
        this.createdAt = data.createdAt
        this.displayText = data.displayText || ""
    }

    static fromDataResponse(data: IContactInteractionsApiProps): ContactInteractionModel {
        return new ContactInteractionModel({
            id: +data.id,
            contactId: +data.contact_id,
            entity: data.entity,
            entityId: +data.entity_id,
            actionType: data.action_type,
            createdAt: data.created_at,
            displayText: data.display_text,
        });
    }

    static empty(): ContactInteractionModel {
        return new ContactInteractionModel({
            id: null,
            contactId: null,
            entity: "",
            entityId: null,
            actionType: null,
            createdAt: null,
            displayText: null
        })
    }
}

export interface IContactInteractionModelProps{
    id: number
    contactId: number
    entity: string
    entityId: number
    actionType: INTERACTION_TYPE
    createdAt: string
    displayText: string
}