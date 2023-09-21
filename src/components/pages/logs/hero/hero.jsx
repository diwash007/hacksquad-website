import { stringify, parse } from 'querystring';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useDebouncedCallback } from 'use-debounce';

const title = 'Logs';
const leadersHeader = ['Pr Title', 'Team', 'User', 'Action', 'Taken By'];

const actionPRs = {
  KICK_USER: 'Removed from a team',
  DELTE_PR: 'PR Deleted',
  RECOVER_PR: 'PR Recovered',
  DISQUALIFY_USER: 'User Disqualified',
  RECOVER_USER: 'User Qualified',
  DISQUALITY_TEAM: 'Team Disqualifie',
  RECOVER_TEAM: 'Team Qualified',
};
const formatAction = (action) => actionPRs[action];

const Hero = () => {
  const router = useRouter();

  const findQueryParam = useCallback((key) => {
    if (typeof window === 'undefined') return undefined;
    const params = new URLSearchParams(window.location.href.split('?').pop());
    return params.get(key);
  }, []);

  const [list, setList] = useState(undefined);
  const [teamList, setTeamList] = useState([]);
  const [page, setPage] = useState(findQueryParam('page') || 1);
  const [admin, setAdmin] = useState(findQueryParam('admin'));
  const [user, setUser] = useState(findQueryParam('user'));
  const [team, setTeam] = useState(findQueryParam('team'));
  const [usersList, setUsersList] = useState([]);
  const [prType, setPrType] = useState(findQueryParam('prType'));
  const [search, setSearch] = useState('');
  const [mods, setMods] = useState([]);
  const [searchUser, setSearchUser] = useState('');

  const loadTeam = async () => {
    const getParams = stringify({
      page: +page || 1,
      admin,
      team,
      user,
      prType,
    });
    setList(undefined);
    setList(await (await fetch(`/api/logs?${getParams}`)).json());
  };

  const allTeams = async () => {
    const { teams } = await (await fetch(`/api/leaderboard`)).json();
    setSearch(teams.find((f) => f.id.indexOf(team) > -1)?.name);
    setTeamList(teams);
  };

  const loadMods = async () => {
    const { users } = await (await fetch(`/api/users?mod=1`)).json();
    setMods(users);
  };

  const loadUsers = useDebouncedCallback(async (name) => {
    const { users } = await (await fetch(`/api/users?name=${name || ''}`)).json();
    setUsersList(users);
  }, 500);

  const nextPage = () => {
    router.push('/logs', {
      query: {
        ...(window.location.href.indexOf('?') > -1
          ? parse(window.location.href.split('?').pop())
          : {}),
        page: +page + 1,
      },
    });
    setPage(+page + 1);
  };

  const previousPage = () => {
    router.push('/logs', {
      query: {
        ...(window.location.href.indexOf('?') > -1
          ? parse(window.location.href.split('?').pop())
          : {}),
        page: +page - 1,
      },
    });
    setPage(+page - 1);
  };

  const setTakenBy = (e) => {
    const findAdmin = mods.find((f) => f.name === e.target.value);
    router.push('/logs', {
      query: {
        ...(window.location.href.indexOf('?') > -1
          ? parse(window.location.href.split('?').pop())
          : {}),
        admin: findAdmin?.id,
      },
    });
    setAdmin(findAdmin?.id);
  };

  const setAction = (e) => {
    router.push('/logs', {
      query: {
        ...(window.location.href.indexOf('?') > -1
          ? parse(window.location.href.split('?').pop())
          : {}),
        prType: e.target.value,
      },
    });
    setPrType(e.target.value);
  };

  const chooseTeam = (team) => {
    const findTeam = !team ? undefined : teamList.find((f) => f.name.indexOf(team) > -1);
    router.push('/logs', {
      query: {
        ...(window.location.href.indexOf('?') > -1
          ? parse(window.location.href.split('?').pop())
          : {}),
        team: findTeam?.id,
      },
    });

    setTeam(findTeam?.id);
  };

  const chooseUser = (userr) => {
    const findUser = !userr ? undefined : usersList.find((f) => f.name.indexOf(userr) > -1);
    router.push('/logs', {
      query: {
        ...(window.location.href.indexOf('?') > -1
          ? parse(window.location.href.split('?').pop())
          : {}),
        user: findUser?.id,
      },
    });

    setUser(findUser?.id);
  };

  useEffect(() => {
    allTeams();
    loadUsers();
    loadMods();
  }, []);
  useEffect(() => {
    loadTeam();
  }, [page, admin, user, prType, team]);

  return (
    <section className="safe-paddings relative">
      <div className="container relative flex h-full flex-col items-center justify-center py-16 sm:px-0">
        <h1 className="font-titles text-60 font-semibold leading-none md:text-42">{title}</h1>
        <div className="mx-auto mb-5 mt-20 flex w-full sm:flex-col sm:gap-y-4 sm:px-4">
          <select
            style={{ height: 30 }}
            className="mr-5 flex-1 sm:mr-0"
            placeholder="Action"
            onChange={setAction}
          >
            <option value="">Select Action</option>
            {Object.keys(actionPRs).map((key) => (
              <option value={key} selected={key === prType}>
                {actionPRs[key]}
              </option>
            ))}
          </select>

          <div className="relative mb-10 mr-5 inline-block flex-1 sm:mb-0">
            <ReactSearchAutocomplete
              className="[&>div>div>input]:shadow-none"
              placeholder="Team Search"
              items={teamList
                .filter((f) => f.name.toLowerCase().indexOf(search?.toLowerCase() || '') > -1)
                .slice(0, 10)}
              styling={{
                color: '#fff',
                backgroundColor: 'black',
                hoverBackgroundColor: 'darkblue',
                height: '30px',
                fontSize: '90%',
              }}
              inputSearchString={search}
              onSearch={(string) => {
                setSearch(string);
                if (!string) {
                  chooseTeam(undefined);
                }
              }}
              onSelect={({ name }) => {
                setSearch(name);
                chooseTeam(name);
              }}
            />
          </div>

          <div className="relative mr-5 inline-block flex-1">
            <ReactSearchAutocomplete
              className="[&>div>div>input]:shadow-none"
              placeholder="User Search"
              items={usersList
                .filter((f) => f.name.toLowerCase().indexOf(searchUser?.toLowerCase() || '') > -1)
                .slice(0, 10)}
              styling={{
                color: '#fff',
                backgroundColor: 'black',
                hoverBackgroundColor: 'darkblue',
                height: '30px',
                fontSize: '90%',
              }}
              inputSearchString={searchUser}
              onSearch={(string) => {
                setSearchUser(string);
                loadUsers(string);
                if (!string) {
                  chooseUser(undefined);
                }
              }}
              onSelect={({ name }) => {
                setSearchUser(name);
                chooseUser(name);
              }}
            />
          </div>

          <select style={{ height: 30 }} className="flex-1" onChange={setTakenBy}>
            <option value="">Select Taken By</option>
            {mods.map((mod) => (
              <option value={mod.name} selected={mod.id === admin}>
                {mod.name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:scrollbar-hidden mx-auto max-w-full md:overflow-x-auto">
          <div className="min-w-[716px] md:min-w-[600px] md:px-7 sm:min-w-[300px] sm:px-4">
            <div className="grid grid-cols-[300px_1fr_200px_200px_90px] gap-x-5 border-b border-gray-2 pb-4 sm:grid-cols-[50px_160px_40px_1fr_1fr]">
              {leadersHeader.map((header, index) => (
                <span
                  className="text-18 font-medium uppercase leading-normal text-gray-1 md:text-18"
                  key={index}
                >
                  {header}
                </span>
              ))}
            </div>
            <ul>
              {!list && (
                <li className="grid gap-x-5 border-b border-gray-2 py-4 text-center sm:grid-cols-[50px_160px_40px]">
                  <span>Loading</span>
                </li>
              )}
              {list && !list?.length && (
                <li className="grid gap-x-5 border-b border-gray-2 py-4 text-center sm:grid-cols-[50px_160px_40px]">
                  <span>No Results</span>
                </li>
              )}
              {list?.map((p) => (
                <li
                  className="grid grid-cols-[300px_1fr_200px_200px_90px] gap-x-5 border-b border-gray-2 py-4 sm:grid-cols-[50px_160px_40px]"
                  key={p.id}
                >
                  <span
                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {p?.prDetails?.title ? (
                      <a href={p?.prDetails?.url}>{p?.prDetails?.title}</a>
                    ) : (
                      'Not a PR'
                    )}
                  </span>
                  <span>
                    {p?.team?.name ? <a href={`/team/${p?.team?.slug}`}>{p?.team?.name}</a> : 'N/A'}
                  </span>
                  <span
                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {p?.user?.name ? (
                      <a href={`https://github.com/${p?.user?.handle}`}>{p?.user?.name}</a>
                    ) : (
                      'N/A'
                    )}
                  </span>
                  <span>{formatAction(p?.actionType)}</span>
                  <span
                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {p?.admin?.name?.split(' ')[0]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex">
          {page > 1 && (
            <a
              className="cta-btn-animation relative mr-10 mt-10 flex h-[60px] max-w-full cursor-pointer items-center justify-center leading-none"
              onClick={previousPage}
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
                <span className="text-lg sm:text-[18px]">Previous Page</span>
              </div>
            </a>
          )}
          <a
            className="cta-btn-animation relative mt-10 flex h-[60px] max-w-full cursor-pointer items-center justify-center leading-none"
            onClick={nextPage}
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
              <span className="text-lg sm:text-[18px]">Next Page</span>
            </div>
          </a>
        </div>
        <Link
          className="cta-btn-animation relative mt-10 flex h-[60px] max-w-full items-center justify-center leading-none"
          href="/"
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
            <span className="text-lg sm:text-[18px]">Back to Homepage</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
