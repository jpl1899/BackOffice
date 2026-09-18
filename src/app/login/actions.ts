'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/infrastructure/supabase/server';

export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    redirect('/login?error=missing-credentials');
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect('/login?error=invalid-credentials');
  }

  redirect('/usuarios');
}
