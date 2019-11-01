export interface User {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    cities?: Array<string>;
}

export interface Locations{
    name: string ;
    country: string;
}
