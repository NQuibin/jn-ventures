import { GetServerSidePropsContext } from 'next';
import { supabase } from '@/core/supabase';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // TODO: handle deep link
};

export default function Login() {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: '/add-login',
      },
    });
  }
  return <button onClick={signInWithGoogle}>Login</button>;
}
