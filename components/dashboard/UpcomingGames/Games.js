/**
 * Last updated: 2023-04-3
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
import { API } from '@aws-amplify/api';
import { getGamesByTeam } from '@/src/graphql/custom-queries';
import { getPlayersByUsername } from '@/utils/graphql.services';
import { useUser } from '@/context/userContext';

export default function Games() {
	// Get currently logged in user:
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [userId, setUserId] = useState();
	const [playerData, setPlayerData] = useState();
	const [teams, setTeams] = useState();
	const [games, setGames] = useState();
	const [gameSchedule, setGameSchedule] = useState([
		{ day: 'Sunday', games: [] },
		{ day: 'Monday', games: [] },
		{ day: 'Tuesday', games: [] },
		{ day: 'Wednesday', games: [] },
		{ day: 'Thursday', games: [] },
		{ day: 'Friday', games: [] },
		{ day: 'Saturday', games: [] },
	]);

	useEffect(() => {
		setGames(null);
		setGameSchedule([
			{ day: 'Sunday', games: [] },
			{ day: 'Monday', games: [] },
			{ day: 'Tuesday', games: [] },
			{ day: 'Wednesday', games: [] },
			{ day: 'Thursday', games: [] },
			{ day: 'Friday', games: [] },
			{ day: 'Saturday', games: [] },
		]);
	}, []);

	useEffect(() => {
		if (!user) return;
		setUserId(user.username);
	}, [user]);

	useEffect(() => {
		if (!userId) return;
		fetchPlayer();
	}, [userId]);

	useEffect(() => {
		if (!playerData) return;
		getGames(playerData.teamID);
	}, [playerData]);

	useEffect(() => {
		if (!games) return;
		console.log(games);
		sortGamesByDate(games);
	}, [games]);

	const fetchPlayer = async () => {
		const data = await getPlayersByUsername(userId);
		if (data) {
			setPlayerData(data[0]);
		}
	};

	const getGames = async (id) => {
		setGames([]);
		const apiData = await API.graphql({
			query: getGamesByTeam,
			variables: { teamId: id },
		});
		setGames(apiData.data.listGames.items);
	};

	const sortGamesByDate = (games) => {
		const arr = [...gameSchedule];

		games.forEach((game) => {
			const date = new Date(game.date);
			const dayOfWeek = date.getDay();
			arr[dayOfWeek].games.push(game);
		});

		setGameSchedule(arr);
	};

	return (
		<div className="flex flex-row lg:flex-col gap-8 md:gap-4 xl:gap-1">
			{gameSchedule &&
				gameSchedule.map(
					(game, index) =>
						game.games.length > 0 && (
							<div
								key={index}
								className="flex flex-col xl:flex-row justify-between xl:gap-3"
							>
								<div className="font-light text-sm">{game.day}</div>
								<div className="font-medium">{game.games.length} Matches</div>
							</div>
						)
				)}
		</div>
	);
}
