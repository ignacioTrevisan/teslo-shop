'use server'
import { signOut } from '@/auth.config';

export const LogOut = async () => {
    await signOut();
}