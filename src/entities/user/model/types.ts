export type UserRole = 'USER' | 'ORGANIZER';

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: UserRole;
}
