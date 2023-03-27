import Image from 'next/image';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import Logo from 'public/logo.png';

interface PageHeaderProps {
  showAddPlaceLink?: boolean;
}

export default function PageHeader({ showAddPlaceLink }: PageHeaderProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleAddPlaceClick = () => {
    router.push('/add-place');
  };

  return (
    <header className="sticky z-50 bg-neutral-800 w-full h-16 flex shrink-0 justify-center items-center">
      <h1 className="hidden">JN Ventures</h1>
      <div className="max-w-6xl px-4 w-full flex justify-center items-center">
        <div
          className={classNames('relative w-48 h-16 cursor-pointer', {
            'ml-auto': !!showAddPlaceLink,
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
        {showAddPlaceLink && (
          <div className="ml-auto">
            <Button
              type="text"
              shape="circle"
              size="large"
              className="flex justify-center items-center"
              icon={
                <MdOutlineAddLocationAlt className="w-6 h-6" color="white" />
              }
              onClick={handleAddPlaceClick}
            />
          </div>
        )}
      </div>
    </header>
  );
}
