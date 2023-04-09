/**
 * Last updated: 2023-04-05
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
import { IconClock, IconCalendarEvent, IconMapPin } from '@tabler/icons-react';
import TeamImageAndName from '../TeamImageAndName';
import { useUser } from '@/context/userContext';

export default function Game({ game }) {
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [visible, setVisible] = useState(false);
	const [user, setUser, authRoles] = useUser();

	useEffect(() => {
		dateOfGame();
		if (authRoles.includes('Admin') || authRoles.includes('Owner')) {
			setVisible(true);
		}
		if (game.referees) {
			const refereesUsername = game.referees.map((referee) => referee);

			if (refereesUsername.includes(user.username)) {
				setVisible(true);
			}
		}
	}, []);

	const dateOfGame = () => {
		const resp = new Date(game.date);
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'June',
			'July',
			'Aug',
			'Sept',
			'Oct',
			'Nov',
			'Dec',
		];
		var daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

		//For date of game
		const date = resp.getDate();
		const day = daysOfWeek[resp.getDay()];
		const month = months[resp.getMonth()];

		const reqDate = day + ', ' + month + ' ' + date;
		setDate(reqDate);

		//Reference from https://www.geeksforgeeks.org/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format/
		//For time of game
		let hours = resp.getHours();

		const AmOrPm = hours >= 12 ? 'PM' : 'AM';

		hours = hours % 12 || 12;
		hours = (hours < 10 ? '0' : '') + hours;

		const minutes = (resp.getMinutes() < 10 ? '0' : '') + resp.getMinutes();

		const finalTime = hours + ':' + minutes + ' ' + AmOrPm;
		setTime(finalTime);
	};

	return (
		<>
			{visible ? (
				<div className="w-full p-8 flex flex-col lg:flex-row justify-between items-center gap-4 border-b">
					<div className="min-w-[0px] flex justify-center hidden xl:contents">
						<img src="/images/soccerball_orange.png" />
					</div>
					<div className="font-medium flex flex-row gap-8 items-center">
						<TeamImageAndName
							teamName={game.HomeTeam ? game.HomeTeam.name : "Unknown"}
							src={game.HomeTeam ? game.HomeTeam.team_picture : null}
						/>
						<span className="border-2 border-brand-orange-800 rounded-xl px-[47px] py-[10px] flex flex-row items-center h-fit gap-1">
							<p>{game.home_score}</p>
							<p>:</p>
							<p>{game.away_score}</p>
						</span>
						<TeamImageAndName
							teamName={game.AwayTeam ? game.AwayTeam.name : "Unknown"}
							src={game.AwayTeam ? game.AwayTeam.team_picture : null}
							reverse={true}
						/>
					</div>
					<div className="mx-8 mt-5">
						<div className="grid lg:grid-cols-2 grid-cols-3 lg:gap-3 text-sm ">
							<span className="flex items-center gap-1">
								<IconCalendarEvent />
								{date}
							</span>
							<span className="flex items-center gap-1">
								<IconClock /> {time}
							</span>
							<span className="flex gap-1 text-sm lg:col-span-2">
								<IconMapPin /> Algonquin Dome Field #1
							</span>
						</div>
					</div>
				</div>
			) : (
				<div></div>
			)}
		</>
	);
}
