import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import InviteButton from '../../../shared/invite/invite.button';
import TwitterButton from '../../../shared/twitter/twitter.button';

import DiscordIcon from './images/discord.inline.svg';
import TwitterIcon from './images/twitter.inline.svg';

const title = '>>Bonuses';

const Hero = ({ twitter }) => (
  <section className="safe-paddings relative min-h-[600px]">
    <div className="container relative z-10 flex h-full flex-col items-center justify-center">
      <h1 className="font-mono text-xl font-bold uppercase leading-tight lg:text-[50px] md:text-[40px] xs:text-[32px]">
        {title}
      </h1>
      <div className="md:scrollbar-hidden mx-auto mt-20 max-w-[1220px] bg-black md:max-w-none md:overflow-x-auto">
        <div className="mt-5 md:min-w-[1080px] md:px-7 sm:px-1">
          <div className="grid grid-cols-[20px_485px_230px_1fr] gap-x-5 border-b border-gray-2 pb-4 lg:grid-cols-[20px_390px_1fr_1fr] md:grid-cols-[20px_485px_230px_1fr] sm:grid-cols-[100px_100px_120px]">
            <span className="font-medium uppercase sm:hidden">#</span>
            <span className="font-medium uppercase">Type</span>
            <span className="font-medium uppercase">Points</span>
            <span className="font-medium uppercase">Claim</span>
          </div>
          <ul>
            <li className="grid grid-cols-[20px_485px_230px_1fr] gap-x-5 border-b border-gray-2 py-4 lg:grid-cols-[20px_390px_1fr_1fr] md:grid-cols-[20px_485px_230px_1fr] sm:grid-cols-[100px_100px_120px]">
              <span className="sm:hidden">1</span>
              <span>Twitter connection</span>
              <span>2</span>
              <span>{twitter ? 'Connected' : <TwitterButton />}</span>
            </li>
            <li className="grid grid-cols-[20px_485px_230px_1fr] gap-x-5 border-b border-gray-2 py-4 lg:grid-cols-[20px_390px_1fr_1fr] md:grid-cols-[20px_485px_230px_1fr] sm:grid-cols-[100px_100px_120px]">
              <span className="sm:hidden">2</span>
              <span>Friend invite</span>
              <span>1 per friend [Max:5]</span>
              <span>
                <InviteButton />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <Link href="/myteam" passHref>
        <a
          className="cta-btn-animation relative mt-10 flex h-[60px] max-w-full items-center justify-center leading-none sm:mt-6"
          href="/myteam"
        >
          <svg
            className="cta-btn-animation-border xs:w-full"
            width="268"
            height="59"
            viewBox="0 0 268 59"
            fill="none"
          >
            <path d="M1 58V1H251.586L267 16.4142V58H1Z" stroke="white" strokeWidth="2" />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center space-x-2.5">
            <span className="text-lg sm:text-[18px]">Back to my squad</span>
          </div>
        </a>
      </Link>

      <div className="mt-20 flex flex-col items-center md:bottom-12">
        <span className="font-mono uppercase">Let’s connect</span>
        <div className="flex items-center space-x-8">
          <a
            className="group mt-5"
            href="https://twitter.com/HackSquadDev"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon className="h-[26px] transition-opacity duration-200 group-hover:opacity-80" />
          </a>

          <a
            className="group mt-5"
            href="https://discord.gg/vcqkXgT3Xr"
            target="_blank"
            rel="noreferrer"
          >
            <DiscordIcon className="h-[26px] transition-opacity duration-200 group-hover:opacity-80" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

Hero.propTypes = {
  teams: PropTypes.array,
  twitter: PropTypes.bool,
};

export default Hero;
