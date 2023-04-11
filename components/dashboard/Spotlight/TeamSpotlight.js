/**
 * Last updated: 2023-04-4
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
import { getAllTeams } from '@/utils/graphql.services';
import { getImageFromS3, uniqueByUsername } from '@/utils/graphql.services';
import AWS from 'aws-sdk';

export default function TeamSpotlight() {
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	const [teams, setTeams] = useState();
	const [spotlightTeam, setSpotlightTeam] = useState();
	const [profileImage, setProfileImage] = useState(null);
	const [spotlightTeamCaptains, setSpotlightTeamCaptains] = useState();

	useEffect(() => {
		getTeamsData();
	}, []);

	useEffect(() => {
		if (!teams) return;
		getRandomTeam();
	}, [teams]);

	useEffect(() => {
		if (!spotlightTeam) return;

		fetchCaptains(spotlightTeam.captains);
		getPicture();
	}, [spotlightTeam]);

	const getTeamsData = async () => {
		try {
			const response = await getAllTeams();
			setTeams(response);
		} catch (error) {
			console.error(error);
		}
	};

	const getPicture = async () => {
		if (!spotlightTeam || !spotlightTeam.team_picture)
			return setProfileImage("/images/defaultProfilePic.png");
		const url = await getImageFromS3(spotlightTeam.team_picture);
		setProfileImage(url);
	};

	const fetchCaptains = async (captains) => {
		if (captains === null) {
			setSpotlightTeamCaptains([]);
			return;
		}

		setSpotlightTeamCaptains([]);
		captains.forEach(async (captain) => {
			const params = {
				Username: captain,
				UserPoolId: 'us-east-1_70GCK7G6t',
			};
			cognitoidentityserviceprovider.adminGetUser(params, function (err, data) {
				if (err) console.log(err, err.stack);
				else {
					setSpotlightTeamCaptains((captains) => {
						return uniqueByUsername([...captains, data]);
					});
				}
			});
		});
	};

	const getRandomTeam = () => {
		try {
			// Get a random index found in list of users:
			let randomIndex = Math.floor(Math.random() * teams.length);

			// Return random user:
			let team = teams[randomIndex];
			setSpotlightTeam(team);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-row lg:flex-col col-span-1 items-center justify-start lg:justify-center border-b lg:border-b-0 lg:border-r border-brand-neutral-300 p-8 gap-4 lg:gap-2">
			<img
				src={`${
					profileImage ? profileImage : "/images/defaultProfilePic.png"
				}`}
				width="100"
				height="100"
				className="rounded-full bg-red-500 self-center mr-3 lg:mr-0 lg:mb-3 w-[100px] h-[100px] object-cover"
				alt="N/A"
			/>
			<div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Team Name</span>
					<span className="col-span-1 truncate">
						{spotlightTeam ? spotlightTeam.name : 'Unknown'}
					</span>
				</div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Sport</span>
					<span className="truncate">Soccer</span>
				</div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Team Captain(s)</span>
					<span className="col-span-1">
						<ul>
							{spotlightTeamCaptains &&
								spotlightTeamCaptains.map((captain, index) => (
									<li key={index} className="truncate">
										{
											captain.UserAttributes.find((o) => o.Name === 'name')[
												'Value'
											]
										}{' '}
										{
											captain.UserAttributes.find(
												(o) => o.Name === 'family_name'
											)['Value']
										}
									</li>
								))}
						</ul>
					</span>
				</div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Team Members</span>
					<span className="truncate col-span-1">
						{spotlightTeam ? spotlightTeam.Players.items.length : '0'}
					</span>
				</div>
			</div>
		</div>
	);
}
