/**
 * Last updated: 2023-04-4
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';
import { API } from 'aws-amplify';
import AWS from 'aws-sdk';
import { useUser } from '@/context/userContext';
import { useEffect, useState } from 'react';
import { getTeam, getImageFromS3 } from '@/utils/graphql.services';
import { listPlayers, getTeam as getTeam2 } from '@/src/graphql/queries';
import { getTeamShort } from '@/src/graphql/custom-queries';
const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
	region: 'us-east-1',
});

export default function PlayerSpotlight() {
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [userList, setUserList] = useState([]);
	const [spotlightUser, setSpotlightUser] = useState();
	const [profileImage, setProfileImage] = useState(null);
	const [teams, setTeams] = useState([]);
	const [spotlightUserRole, setSpotlightUserRole] = useState();

	useEffect(() => {
		fetchAllUsers();
	}, []);

	useEffect(() => {
		getRandomUser();
	}, [userList]);

	useEffect(() => {
		if (!spotlightUser) {
			return;
		}

		fetchSpotlightInformation();
		getPicture();
	}, [spotlightUser]);

	useEffect(() => {
		if (!teams) {
			setSpotlightUserRole('N/A');
			return;
		}
		checkPlayerRole(teams[0]);
	}, [teams]);

	const checkPlayerRole = (team) => {
		try {
			if (team.captains.includes(spotlightUser.Username)) {
				setSpotlightUserRole('Captain');
			} else {
				setSpotlightUserRole('Player');
			}
		} catch (error) {
			return;
		}
	};

	const fetchSpotlightInformation = async () => {
		await fetchTeams();
	};

	const fetchAllUsers = async () => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
		};
		cognitoidentityserviceprovider.listUsers(params, function (err, data) {
			if (err) {
				console.log(err, err.stack);
			} else {
				setUserList(data.Users);
			}
		});
	};

	const getRandomUser = () => {
		try {
			// Get a random index found in list of users:
			let randomIndex = Math.floor(Math.random() * userList.length);

			// Return random user:
			let user = userList[randomIndex];
			setSpotlightUser(user);
		} catch (error) {
			console.error(error);
		}
	};

	const getPicture = async () => {
		if (
			spotlightUser.Attributes.find((o) => o.Name === 'picture')['Value'] ===
			'none'
		) {
			setProfileImage(null);
		} else {
			const url = await getImageFromS3(
				spotlightUser.Attributes.find((o) => o.Name === 'picture')['Value']
			);
			setProfileImage(url);
		}
	};

	const fetchTeams = async () => {
		setTeams([]);
		const variables = {
			filter: {
				user_id: {
					eq: spotlightUser.Username,
				},
			},
		};
		const players = await API.graphql({
			query: listPlayers,
			variables: variables,
		});
		if (!players) {
			return;
		}
		try {
			players.data.listPlayers.items.map(async (player) => {
				if(!player.teamID) return;
				const apiData = await API.graphql({
					query: getTeamShort,
					variables: { id: player.teamID },
				});
				const data = await apiData.data.getTeam;
				setTeams((teams) => [...teams, data]);
			});
		} catch (error) {
			console.warn(error);
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
				className="object-cover rounded-full bg-red-500 self-center mr-3 lg:mr-0 lg:mb-3 w-[100px] h-[100px]"
				alt="N/A"
			/>
			<div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Name</span>
					<span className="col-span-1 truncate">
						{spotlightUser &&
							spotlightUser.Attributes.find((o) => o.Name === 'name')[
								'Value'
							]}{' '}
						{spotlightUser &&
							spotlightUser.Attributes.find((o) => o.Name === 'family_name')[
								'Value'
							]}
					</span>
				</div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Sport</span>
					<span className="truncate">Soccer</span>
				</div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Team Name</span>
					<span className="truncate col-span-1">
						{teams[0] ? teams[0].name : 'N/A'}
					</span>
				</div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Role</span>
					<span className="truncate col-span-1">
						{spotlightUserRole ? spotlightUserRole : 'N/A'}
					</span>
				</div>
			</div>
		</div>
	);
}
