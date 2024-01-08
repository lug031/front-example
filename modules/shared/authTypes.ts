import type { UserCredential } from 'firebase/auth';
import type { User } from '../users/domain/models/User';

export interface AuthModule {
    loginGoogleAuth: () => Promise<UserCredential>;
    logout: () => Promise<void>;
    currentUserPromise: () => Promise<User | null>;
    infoUser: User | null;
}