/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import PropTypes from 'prop-types';

const tableGridClass = 'grid grid-cols-[145px_510px_1fr] gap-x-5 md:grid-cols-[100px_400px_1fr]';

const Hero = ({ teams = [] }) => (
  <section className="safe-paddings relative py-24 sm:py-20">
    <div className="container flex h-full flex-col items-center justify-center">
      <h1 className="max-w-2xl font-titles text-60 font-semibold leading-none md:text-42 xs:max-w-[246px]">
        Leaderboard
      </h1>

      {/* TODO: Remove this block completely after leaderboard are published  */}
      <div className="md:scrollbar-hidden mx-auto mt-[76px] w-[798px] md:w-full md:overflow-x-auto">
        <div className="container">
          <div className="grid grid-cols-[145px_510px_1fr] gap-x-5 border-b border-white border-opacity-20 pb-4 md:grid-cols-[1fr_1fr_1fr]">
            <span className="text-20 font-medium uppercase leading-normal md:text-18">Place</span>
            <span className="text-20 font-medium uppercase leading-normal md:text-18">Name</span>
            <span className="text-20 font-medium uppercase leading-normal md:text-18">Score</span>
          </div>

          <span className="coming-soon-animation block border-b border-white border-opacity-20 py-4 text-center">
            Coming soon <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      </div>

      {/* TODO: Display this block after leaderboard are published */}
      {/* <div className="md:scrollbar-hidden mx-auto mt-[76px] w-[798px] md:w-full md:overflow-x-auto">
        <div className="md:min-w-[700px] md:px-7 sm:px-4">
          <div className={clsx('border-b border-white border-opacity-20 pb-4', tableGridClass)}>
            <span className="text-20 font-medium uppercase leading-normal md:text-18">Place</span>
            <span className="text-20 font-medium uppercase leading-normal md:text-18">Name</span>
            <span className="text-20 font-medium uppercase leading-normal md:text-18">Score</span>
          </div>

          <ul>
            {teams.map((team, index) => (
              <li
                className={clsx(
                  'border-b border-white border-opacity-20 py-4 text-20 leading-normal md:text-18',
                  tableGridClass
                )}
              >
                <span className="text-gray-1">{index + 1}</span>
                <p>{team.name}</p>
                <span>{team.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  </section>
);

Hero.propTypes = {
  teams: PropTypes.array,
};

export default Hero;
