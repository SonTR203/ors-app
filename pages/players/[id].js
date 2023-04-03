/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import { Button } from 'flowbite-react';
import { IconChevronLeft } from '@tabler/icons-react';
import AWS from 'aws-sdk';
import Image from 'next/image';
import { getTeam, getImageFromS3, getPlayersByUsername } from '@/utils/graphql.services';
import { listPlayers, getTeam as getTeam2 } from '@/src/graphql/queries';

export default function PlayerProfile() {
	const router = useRouter();
	const userId = router.query.id;
	const [player, setPlayer] = useState(); // Player Table
	const [user, setUser] = useState(); // Cognito User
	const [profileImage, setProfileImage] = useState('');
	const [teams, setTeams] = useState([]);
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	useEffect(() => {
		if (!userId) {
			return;
		}
		const callMe = async () => {
			await fetchPlayer();
			await fetchPlayerCognito();
			await fetchTeams();
		}
		callMe();
	}, [userId]);

	useEffect(() => {
		if (!user) {
			return;
		}
		getPicture();
	}, [user]);

	useEffect(() =>{
		if(player != undefined){
			getTeamName();
		}
	}, [player]);

	const fetchPlayer = async () => {
		const data = await getPlayersByUsername(userId);
		if (data) {
			setPlayer(data[0]);
		}
	};

	const fetchPlayerCognito = async () => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t',
			Username: userId,
		};
		cognitoidentityserviceprovider.adminGetUser(params, function (err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			// successful response
			else setUser(data);
		});
	};

	const getPicture = async () => {
		if (
			user.UserAttributes.find((o) => o.Name === 'picture')['Value'] === 'none'
		) {
			setProfileImage(null);
		} else {
			const url = await getImageFromS3(
				user.UserAttributes.find((o) => o.Name === 'picture')['Value']
			);
			setProfileImage(url);
		}
	};

	const getTeamName = async () => {
		if (player.soccer_stats){
			const teamId = player.soccer_stats[0].team;
		const data = await getTeam(teamId);
		setTeamName(data.name);
		}
		else {
		
	}
	}

	const fetchTeams = async () => {
		setTeams([]);
		const variables = {
			filter: {
			  user_id: {
				eq: userId
			  }
			}
		  };
		  const players = await API.graphql({ 
			query: listPlayers, variables: variables
		  });
		  if (!players) { return; }
		  players.data.listPlayers.items.map(async (player) => {
				const apiData = await API.graphql({ query: getTeam2, variables: { id: player.teamID }});
				const data = await apiData.data.getTeam;
				setTeams((teams) => 
				{
					return uniqueById([...teams, data])
				});
		  })
	}

	function uniqueById(items) {
		const set = new Set();
		return items.filter((item) => {
			const isDuplicate = set.has(item.id);
			set.add(item.id);
			return !isDuplicate;
		});
}

	return (
		<>
		{/* Content */}
			<main className="w-full h-screen flex flex-col gap-6 p-8">
				{/* Results */}
				<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
					<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300">
						<h1 className="text-lg self-center font-medium">
							{user &&
								user.UserAttributes.find((o) => o.Name === 'name')[
									'Value'
								]}{' '}
							{user &&
								user.UserAttributes.find((o) => o.Name === 'family_name')[
									'Value'
								]}
						</h1>
						<Button
							pill={true}
							className="py-0.5 px-3 bg-blue-900 hover:bg-blue-800"
							onClick={() => router.back()}
						>
							<IconChevronLeft className="mr-2 h-5 w-5" />
							Back to Players
						</Button>
					</div>

					<div className="grid grid-cols-3 gap-4 p-8">
						{/* Player Avatar */}
						<div className="col-span-3 md:col-span-1 row-span-2 flex flex-col gap-4">
							<img
								src={`${
									profileImage ? profileImage : '/images/defaultProfilePic.jpeg'
								}`}
								className="rounded-full self-center w-[200px] h-[200px] object-cover"
								alt="Player profile image."
							></img>
							<div className="flex justify-center gap-1">
								<Image
									src="/images/medal.png"
									width="26"
									height="26"
									alt="Medal"
								/>
								<Image
									src="/images/medal.png"
									width="26"
									height="26"
									alt="Medal"
								/>
								<Image
									src="/images/medal.png"
									width="26"
									height="26"
									alt="Medal"
								/>
							</div>
						</div>

						{/* Player Information */}
						<div className="col-span-3 md:col-span-2 grid grid-cols-2 gap-y-4 gap-x-8">
							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-light">First Name</h3>
								<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									{user &&
										user.UserAttributes.find((o) => o.Name === 'name')['Value']}
								</div>
							</div>

							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-light">Last Name</h3>
								<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									{user &&
										user.UserAttributes.find((o) => o.Name === 'family_name')[
											'Value'
										]}
								</div>
							</div>

							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-light">Location</h3>
								<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									{user &&
										user.UserAttributes.find(
											(o) => o.Name === 'custom:location'
										)['Value']}
								</div>
							</div>

							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-light">Gender</h3>
								<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									{user &&
										user.UserAttributes.find((o) => o.Name === 'gender')[
											'Value'
										]}
								</div>
							</div>
						</div>

						{/* Player Teams */}
						<div className="col-span-3 md:col-span-2 border rounded-md border-brand-blue-900/25">
							<table className="border-collapse table-fixed w-full overflow-hidden rounded-md">
								<thead className="bg-brand-neutral-100 border-b border-brand-blue-900/25">
									<tr className="text-left">
										<th className="py-2 px-3 text-sm font-light w-4/12">
											Sport
										</th>
										<th className="py-2 px-3 text-sm font-light w-4/12">
											Team
										</th>
										<th className="py-2 px-3 text-sm font-light w-4/12">
											Role
										</th>
									</tr>
								</thead>
								<tbody>
									{(player && player.soccer_stats != "") ? (
										<>
										{teams && teams.map((team) => (
											<>
											<tr className="font-light">
												<td className="py-2 px-3">Soccer</td>
												<td className="py-2 px-3">
													{team && team.name}
												</td>
												<td className="py-2 px-3">
													{team.captains && team.captains.includes(userId) ? "Captain" : "Player"}
												</td>
											</tr>
											</>
										))}
										</>
									) : (
										<tr className="text-center text-brand-neutral-800">
											<td colSpan={3}>
												This player currently is not a part of any teams.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						{/* Player Game History */}
						{/* <div className="col-span-3">
							<h2 className="mb-1 font-light">Games History</h2>

							<div className="col-span-3 border rounded-md border-brand-blue-900/25">
								<table className="border-collapse table-fixed w-full overflow-hidden rounded-md">
									<thead className="bg-brand-neutral-100 border-b border-brand-blue-900/25">
										<tr className="text-left">
											<th className="py-2 px-3 text-sm font-light w-4/12">
												Games Played
											</th>
											<th className="py-2 px-3 text-sm font-light w-4/12">
												Wins
											</th>
											<th className="py-2 px-3 text-sm font-light w-4/12">
												Losses
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className="font-light">
											<td className="py-2 px-3">0</td>
											<td className="py-2 px-3">0</td>
											<td className="py-2 px-3">0</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div> */}
					</div>
				</div>
			</main>
		</>
	);
}
