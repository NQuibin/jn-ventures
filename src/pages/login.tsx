import { supabase } from '../core/supabase';

export default function Login() {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }
  return <button onClick={signInWithGoogle}>Login</button>;
}
