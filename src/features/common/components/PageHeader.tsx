import Image from 'next/image';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Logo from 'public/logo.png';
import Link from 'next/link';

interface PageHeaderProps {
  showMenu?: boolean;
}

export default function PageHeader({ showMenu }: PageHeaderProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleAddPlaceClick = () => {
    router.push('/add-place');
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-800 w-full h-14 flex shrink-0 justify-center items-center">
      <h1 className="hidden">JN Ventures</h1>
      <div className="max-w-6xl px-4 w-full flex justify-center items-center">
        <div
          className={classNames('relative w-48 h-14 cursor-pointer', {
            'ml-auto': !!showMenu,
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
        {showMenu && (
          <div className="ml-auto">
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'login',
                    label: <Link href="/login">Login</Link>,
                  },
                  {
                    key: 'add-place',
                    label: <Link href="/add-place">Add place</Link>,
                  },
                ],
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <MenuOutlined className="text-white" />
            </Dropdown>
          </div>
        )}
      </div>
    </header>
  );
}
