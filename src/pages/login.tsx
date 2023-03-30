import type { GetServerSidePropsContext } from 'next';

import { useEffect, useState } from 'react';
import { LoadingOutlined, GoogleOutlined } from '@ant-design/icons';
import { Spin, Button, Alert } from 'antd';
import PageLayout from '../features/common/components/PageLayout';
import PageHeader from '../features/common/components/PageHeader';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  useSupabaseClient,
  useSessionContext,
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (
    session &&
    ['nquibin.dev@gmail.com', 'jeanelle.dimayuga@gmail.com'].includes(
      session.user.email || ''
    )
  ) {
    return {
      redirect: {
        destination: '/add-place',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Login() {
  const [isValidatingUser, setIsValidatingUser] = useState(false);
  const [isInvalidUser, setIsInvalidUser] = useState(false);
  const { isLoading, session, error } = useSessionContext();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    /*
      There's a bug where on initial sign in, the session from the server side
      context is null. This is used to do a client side redirect instead once
      the session is done loading and there is a valid session.
    */
    if (!isLoading && session) {
      setIsValidatingUser(true);

      if (
        !['nquibin.dev@gmail.com', 'jeanelle.dimayuga@gmail.com'].includes(
          session.user.email || ''
        )
      ) {
        setIsInvalidUser(true);
        setIsValidatingUser(false);
        supabaseClient.auth.signOut();
      } else {
        router.push('/add-place');
      }
    }
  }, [isLoading, session]);

  const signInWithGoogle = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      },
    });
  };

  return (
    <PageLayout headTitle="Login">
      <PageHeader />
      <div className="flex flex-wrap justify-center max-w-xl w-full mx-auto p-8">
        {isLoading || isValidatingUser ? (
          <Spin
            size="large"
            indicator={<LoadingOutlined style={{ color: 'black' }} />}
          />
        ) : (
          <>
            {isInvalidUser && (
              <Alert
                showIcon
                closable
                type="error"
                message="Sorry, you're not one of the lucky few to be a maintainer."
                className="mb-6 w-full"
              />
            )}
            <div className="bg-white p-4 rounded border-2 border-solid border-neutral-200">
              <h2 className="text-lg font-bold mb-2">Login</h2>
              <p className="mb-6">
                Only some people are allowed to maintain the site. Maybe
                you&apos;re one of them!
              </p>
              <Button
                type="primary"
                icon={<GoogleOutlined />}
                onClick={signInWithGoogle}
              >
                Login
              </Button>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
