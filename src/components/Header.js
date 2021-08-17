import menuList from '../shared/menu-list';
import GithubStats from './GithubStats';
import Link from 'next/link';
import { ReactComponent as Logo } from '@/img/logo-white.svg';

export default function Header() {
  const hideMenu = () => {
    if (document && document.activeElement) document.activeElement.blur();
  };
  return (
    <header className="bg-primary py-6 h-20 text-white">
      <div className="max-w-[90rem] mx-auto flex items-center h-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <Link href="/">
          <a className="flex-shrink-0 relative flex items-center">
            <Logo className="rounded-full w-16 h-16" alt="Swiper" />
            <span className="min-w-0 text-xs font-medium opacity-70 absolute left-full top-0 text-white pointer-events-none -mt-1">
              v{process.env.swiperReleaseVersion}
            </span>
          </a>
        </Link>
        <Link href="/">
          <a className="md:hidden ml-2 text-4xl font-medium text-white hover:no-underline">
            Swiper
          </a>
        </Link>

        <nav className="flex-wrap ml-4 hidden md:flex">
          {menuList.map(({ name, link }) => (
            <Link key={link} href={link}>
              <a className="font-medium mr-4 text-white text-sm lg:text-base">
                {name}
              </a>
            </Link>
          ))}
        </nav>
        <div className="group ml-auto mr-4 relative">
          <button className="md:hidden flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <nav className="hidden group-focus-within:block absolute overflow-hidden z-10 rounded-xl bg-white shadow-lg right-0 top-full w-60 divide-y">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link}>
                <a
                  className="font-medium mr-4 text-gray-500 hover:text-primary hover:bg-primary hover:bg-opacity-10 duration-100 block text-base py-2 px-4 w-full hover:no-underline"
                  onClick={hideMenu}
                >
                  {name}
                </a>
              </Link>
            ))}
          </nav>
        </div>
        <GithubStats white responsive className="md:ml-auto" />
      </div>
    </header>
  );
}
