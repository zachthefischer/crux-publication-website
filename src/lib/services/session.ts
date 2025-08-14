// session.ts manages the authentication state
import { writable, type Writable } from 'svelte/store';

type User = {
    email       ?: string | null;
    displayName ?: string | null;
    photoURL    ?: string | null;
    uid         ?: string | null;
};

// Define session state
export type SessionState = {
    user      : User | null;
    loading  ?: boolean;
    loggedIn ?: boolean;
};

// Export session store
export const session = <Writable<SessionState>>writable({
    user: null,
    loading: true,
    loggedIn: false
});