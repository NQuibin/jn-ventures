import Image from 'next/image';
import classNames from 'classnames';
import { Icon } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { useRouter } from 'next/router';

import Logo from 'public/logo.png';
import { ReactNode } from 'react';

interface PageHeaderProps {
  rightSideContent?: ReactNode;
}

export default function PageHeader({ rightSideContent }: PageHeaderProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <header className="bg-neutral-800 w-full h-20 flex shrink-0 justify-center items-center">
      <h1 className="hidden">JN Ventures</h1>
      <div className="max-w-6xl p-4 w-full flex justify-center items-center">
        <div
          className={classNames('relative w-48 h-20 cursor-pointer', {
            'ml-auto': !!rightSideContent,
          })}
          onClick={handleLogoClick}
        >
          <Image
            fill
            alt="JN Ventures logo"
            src={Logo}
            className="object-contain"
          />
        </div>
        {rightSideContent && (
          <div className="ml-auto">{rightSideContent}</div>
        )}
      </div>
    </header>
  );
}
