import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { Contacts } from '@ionic-native/contacts';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppSettingsService } from './providers/global-params';
import { ContactsRepository } from './repositories/contacts.repository';
import { ContactsService } from './services/contacts.service';
import { CONTACTS_SERVICE } from './services/identifiers';
import { ContactStore } from './services/state/contact.store';
import { ContactsEffects, contactsReducer } from './store';

export const AppSettingsObject = new InjectionToken('AppSettingsObject');

export function createAppSettingsService(settings: ContactsModuleOptionsInterface) {
    return new AppSettingsService(settings);
}

@NgModule({
    imports: [
        HttpClientModule,
        StoreModule.forFeature('contacts', contactsReducer),
        EffectsModule.forFeature([ContactsEffects]),
    ],
    providers: [

    ],
    declarations: [
        // declare all components that your module uses
        // MyComponent
    ],
    exports: [
        // export the component(s) that you want others to be able to use
        // MyComponent
    ]
})
export class ContactsCoreModule {
    static forRoot(config: ContactsModuleOptionsInterface): ModuleWithProviders<ContactsCoreModule> {

        return {
            ngModule: ContactsCoreModule,
            providers: [
                { provide: AppSettingsObject, useValue: config },
                {
                    provide: AppSettingsService,
                    useFactory: (createAppSettingsService),
                    deps: [AppSettingsObject]
                },
                { provide: CONTACTS_SERVICE, useClass: ContactsService },
                ContactsRepository,
                Contacts,
                ContactStore
            ]
        };
    }
}

export interface ContactsModuleOptionsInterface {
    apiUrl: string;
    instanceName: string;
}

