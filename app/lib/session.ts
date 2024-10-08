"use server";

import 'server-only';
import { Payload } from './definations';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';


const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: Payload) {
    try {
        const token = jwt.sign(payload, encodedKey as jwt.Secret, { expiresIn: '1d' });
        // console.log('type of token:', typeof token);
        return token;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function decrypt(token: string) {
    try {
        return jwt.verify(token, encodedKey as jwt.Secret);
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function createSession(payload: Payload) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ ...payload, expiresAt });

    cookies().set('session', session as string, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function updateSession() {
    const session = cookies().get('session')?.value;
    if (!session) {
        return null;
    }

    const payload = await decrypt(session);
    if (!payload) {
        return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession() {
    cookies().delete('session');
}