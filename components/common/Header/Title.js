/**
 * Last updated: 2023-04-05
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDivisionShort } from '@/src/graphql/custom-queries';
import { getTeam } from '@/utils/graphql.services';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';

const HeaderTitle = () => {
	const [team, setTeam] = useState();
	const [division, setDivision] = useState();
	const router = useRouter();
	const {teamId} = router.query;
	const {divisionID} = router.query;

	useEffect(() => {
		if (teamId) {
			getTeamFunc();
		}
	}, [teamId])

	const getTeamFunc = async () => {
		const data = await getTeam(teamId);
		setTeam(data);
    console.log(data)
	}

	useEffect(() => {
		if (divisionID) {
			getDivisionFunc();
			console.log('TEST 2')
		}
	}, [divisionID])

	const getDivisionFunc = async () => {
		const apiData = await API.graphql({
			query: getDivisionShort,
			variables: { id: divisionID },
		});
		const data = await apiData.data.getDivision;
		setDivision(data);
	}

  useEffect(() => {
    if (teamId) {
      getTeamFunc();
    }
  }, [teamId])

return (
		<>
			{router.pathname === '/' && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
						</div>
						<p className="font-semibold text-[1.8rem]">Dashboard</p>
					</div>
				</div>
			)}
			{router.pathname === '/sports/soccer' && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<p className="font-light text-[.8rem]">Sports</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link href="/sports/soccer" className="font-light text-[.8rem]">
								Soccer
							</Link>
						</div>
						<p className="font-semibold text-[1.8rem]">Soccer ⚽</p>
					</div>
				</div>
			)}
			{router.pathname === '/sports/[divisionID]' && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<p className="font-light text-[.8rem]">Sports</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link href={`/sports/${division?.id}`} className="font-light text-[.8rem]">
								{division?.name}
							</Link>
						</div>
						<p className="font-semibold text-[1.8rem]">All Teams - {division?.name}</p>
					</div>
				</div>
			)}
			{router.pathname === '/players' && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<p className="font-light text-[.8rem]">Rosters</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link href="/players" className="font-light text-[.8rem]">
								Players
							</Link>
						</div>
						<p className="font-semibold text-[1.8rem]">Players ⛹️‍♂️</p>
					</div>
				</div>
			)}
      {router.pathname === '/players/[id]' && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<p className="font-light text-[.8rem]">Rosters</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link href="/players" className="font-light text-[.8rem]">
								Players
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link href="/players/[id]" className="font-light text-[.8rem]">
								Player Profile
              </Link>
						</div>
						<p className="font-semibold text-[1.8rem]">Player Profile</p>
					</div>
				</div>
			)}
			{router.pathname === '/teams' && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<p className="font-light text-[.8rem]">Rosters</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link href="/teams" className="font-light text-[.8rem]">
								Teams
							</Link>
						</div>
						<p className="font-semibold text-[1.8rem]">Teams 👨‍👦‍👦</p>
					</div>
				</div>
			)}
      {router.pathname === '/teams/[teamId]' && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<p className="font-light text-[.8rem]">Rosters</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link href="/teams" className="font-light text-[.8rem]">
								Teams
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link href={`/teams/${teamId}`} className="font-light text-[.8rem]">
								{team && team.name}
							</Link>
						</div>
						<p className="font-semibold text-[1.8rem]">Team Profile</p>
					</div>
				</div>
			)}
			{router.pathname.includes('/schedule/soccer') && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<p className="font-light text-[.8rem]">Schedule</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link href="/schedule/soccer" className="font-light text-[.8rem]">
								Soccer
							</Link>
						</div>
						<p className="font-semibold text-[1.8rem]">All Divisions - Soccer ⚽</p>
					</div>
				</div>
			)}
			{router.pathname.includes('/schedule/soccer/[id]') && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<p className="font-light text-[.8rem]">Schedule</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link href="/schedule/soccer" className="font-light text-[.8rem]">
								Soccer
							</Link>
						</div>
						<p className="font-semibold text-[1.8rem]">All Matches</p>
					</div>
				</div>
			)}
			{router.pathname === '/admin-portal/leagues' && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<p className="font-light text-[.8rem]">Admin Portal</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link
								href="/admin-portal/leagues"
								className="font-light text-[.8rem]"
							>
								Leagues
							</Link>
						</div>
						<p className="font-semibold text-[1.8rem]">Leagues ⚽</p>
					</div>
				</div>
			)}
			{router.pathname === '/admin-portal/leagues/[divisionID]' && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<p className="font-light text-[.8rem]">Admin Portal</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link 
                href="/admin-portal/leagues"
								className="font-light text-[.8rem]"
							>
								Leagues
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link href={`/admin-portal/leagues/${division?.id}`} className="font-light text-[.8rem]">
								{division?.name}
							</Link>
						</div>
						<p className="font-semibold text-[1.8rem]">All Teams - {division?.name}</p>
					</div>
				</div>
			)}
			{router.pathname === '/admin-portal/users' && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<p className="font-light text-[.8rem]">Admin Portal</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link
								href="/admin-portal/users"
								className="font-light text-[.8rem]"
							>
								Users
							</Link>
						</div>
						<p className="font-semibold text-[1.8rem]">Users</p>
					</div>
				</div>
			)}
			{router.pathname === '/admin-portal/teams' && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<p className="font-light text-[.8rem]">Admin Portal</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link
								href="/admin-portal/teams"
								className="font-light text-[.8rem]"
							>
								Teams
							</Link>
						</div>
						<p className="font-semibold text-[1.8rem]">Teams</p>
					</div>
				</div>
      )}
      {router.pathname === '/admin-portal/locations' && (
        <div className="p-1 pt-0 pl-2 lg:pl-7">
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row'>
              <Link href="/" className="font-light text-[.8rem]">Home</Link>
                <p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
              <p className="font-light text-[.8rem]">Admin Portal</p>
                <p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
              <Link href="/admin-portal/locations" className="font-light text-[.8rem]">Locations</Link>
            </div>
            <p className="font-semibold text-[1.8rem]">Locations</p>
          </div>
        </div>
      )}
			{router.pathname === '/settings' && (
				<div className="p-1 pt-0 pl-2 lg:pl-7">
					<div className="flex flex-col gap-2">
						<div className="flex flex-row">
							<Link href="/" className="font-light text-[.8rem]">
								Home
							</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<Link href="/settings" className="font-light text-[.8rem]">
								Settings
							</Link>
						</div>
						<p className="font-semibold text-[1.8rem]">Settings</p>
					</div>
				</div>
			)}
		</>
	);
};

export default HeaderTitle;
