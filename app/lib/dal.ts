import 'server-only';

import { cookies } from 'next/headers';
import { decrypt } from './session';
import { cache } from 'react';

export const verifySession = cache(async () => {
    const cookie = cookies().get('session')?.value;
    if (!cookie) {
        return null;
    }

    const session = await decrypt(cookie);
    if (!session) {
        return null;
    }

    // console.log('Session:', session.id, session.name, session.email);

    return { isAuth: true, id: session.id as string, name: session.name as string, email: session.email as string };
})

export const getUser = cache(async () => {

    try {
        const session = await verifySession();
        if (!session) {
            return null;
        }

        // fetch user details from the server

        const user = {
            id: session.id,
            name: session.name,
            email: session.email,
        }

        return user;
    } catch (err) {
        console.error(err);
        return null;
    }
})