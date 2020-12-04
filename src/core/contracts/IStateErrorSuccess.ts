
export interface IContactsStateError {
    after: 'GET' | 'GET_INTERACTIONS' | 'CREATE' | 'UPDATE' | 'DELETE' | 'IMPORT' | 'UNKNOWN';
    error: any;
}

export interface IContactsStateSuccess {
    after: 'GET' | 'CREATE' | 'UPDATE' | 'DELETE' | 'IMPORT' | 'UNKNOWN';
}
