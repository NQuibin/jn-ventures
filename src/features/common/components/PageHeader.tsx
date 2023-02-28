import Image from 'next/image';
import Logo from 'public/logo.png';

export default function PageHeader() {
  return (
    <header className="bg-black h-20 flex shrink-0 justify-center items-center">
      <h1 className="hidden">JN Ventures</h1>
      <div className="relative w-48 h-full">
        <Image
          fill
          alt="JN Ventures logo"
          src={Logo}
          className="object-contain"
        />
      </div>
    </header>
  );
}
