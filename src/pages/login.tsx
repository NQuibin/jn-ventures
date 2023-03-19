import { GetServerSidePropsContext } from 'next';
import { supabaseBrowserClient } from '@/core/supabase';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // TODO: handle deep link
};

export default function Login() {
  async function signInWithGoogle() {
    const { data, error } = await supabaseBrowserClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: '/add-login',
      },
    });
  }
  return <button onClick={signInWithGoogle}>Login</button>;
}
