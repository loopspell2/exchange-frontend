import 'server-only';
import { getUser } from './dal';
import { User } from 'next-auth';

function canSeeEmail(viewer: User){
    return true;
}

export async function getProfileDTO(slug: string){
    //TODO: fetch user details from the server

    const user = await getUser();

    //TODO: send only the necessary details
    return {
        id: user.id,
        name: user.name,
        email: canSeeEmail(user) ? user.email : null,
    };
}