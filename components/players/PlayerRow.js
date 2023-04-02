/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listPlayers, getTeam as getTeam2 } from '@/src/graphql/queries';
import { useRouter } from 'next/router';
import { getImageFromS3, getPlayersByUsername, getTeam } from '@/utils/graphql.services';
import Link from 'next/link';
import AWS from 'aws-sdk';
const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
	region: 'us-east-1',
});

export default function PlayerRow({ player, index }) {
	const [profileImage, setProfileImage] = useState(null);
	const router = useRouter();
	const bucketName = 'orsappe5c5a5b29e5b44099d2857189b62061b154029-dev';
	const signedUrlExpireSeconds = 60 * 1;
	const [details, setDetails] = useState();
	const [teamName, setTeamName] = useState('');
	const [teams, setTeams] = useState([]);

	useEffect(() => {
		if(!index) {
			return
		}
		fetchPlayer();
	}, [index])

	useEffect(() => {
		setTeams([]);
		fetchTeams();
	}, [])

	useEffect(() => {
		if (player.Attributes.find(o => o.Name === 'picture')['Value'] === 'none') {
			setProfileImage(null);
		} else {
			const url = s3.getSignedUrl('getObject', {
				Bucket: bucketName,
				Key: player.Attributes.find(o => o.Name === 'picture')['Value'],
				Expires: signedUrlExpireSeconds,
			});
			setProfileImage(url);
		}
	},[])

	useEffect(() => {
		if(details != undefined){
			getTeamName();
		}
	console.log('details', details);
	}, [details])

	const fetchPlayer = async () => {
		const data = await getPlayersByUsername(index);
		if (data) {
			setDetails(data[0]);
		}
	}

	const getTeamName = async () => {
		if (details.soccer_stats){
			const teamId = details.soccer_stats[0].team;
		const data = await getTeam(teamId);
		setTeamName(data.name);
		}
		else {
			setTeamName('-')
		
		}
	}

	// Reference: Stack Overflow/Roy <https://stackoverflow.com/questions/73598303/calculate-age-in-js-given-the-birth-date-in-dd-mm-yyyy-format>
	function calculateAge(dob) {
		const birthDate = new Date(dob);
		const currentDate = Date.now();
		const difference = currentDate - birthDate;
		// 1000 * 60 * 60 * 24 * 365 is miliseconds in a year.
		const age = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
		return age;
	}

	const handleClick = () => {
		router.push(`/players/${player.Username}`);
	};

	const fetchTeams = async () => {
		setTeams([]);
		const variables = {
			filter: {
			  user_id: {
				eq: player.Username
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
			setTeams((teams) => {
				return uniqueById([...teams, data])
			})
			// setTeams((teams) => [...teams, data]);
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
		<tr
			key={player.Username}
			className="border-b border-brand-neutral-300 hover:cursor-pointer"
			onClick={handleClick}
		>
			{/* odd:bg-white even:bg-brand-neutral-100 */}
			<td className="p-5 text-md">
				<div className="flex items-center">
					<img
						src={`${profileImage ? profileImage : "/images/defaultProfilePic.jpeg"}`}
						className="rounded-full mr-5 w-10 h-10"
					></img>
					<div className="flex flex-col gap-1">
						<h1 className="font-medium">
							{player.Attributes.find(o => o.Name === 'name')['Value'].slice(0,1)}{". "}
							{player.Attributes.find(o => o.Name === 'family_name')['Value']}
							
						</h1>
						<div className="flex text-sm font-light">
							<span className="mr-5">
								{calculateAge(
									player.Attributes.find((o) => o.Name === 'birthdate')['Value']
								)}
							</span>
							<span>
								{player.Attributes.find((o) => o.Name === 'gender')['Value']}
							</span>
						</div>
					</div>
				</div>
			</td>
			<td className="p-5 font-light">
				{player.Attributes.find(o => o.Name === 'custom:location')['Value']}
			</td>
			<td className="p-5 font-light">
				<div className="flex flex-col gap-1">
					Soccer
				</div>
			</td>
				<td className="p-5 font-light">
					<div className="flex flex-col gap-1 items-start justify-start content-start align-top">
						{teams && teams.map((team) => (
							<span>{team.name}</span>
						))}
					</div>
				</td>
				<td className="p-5 font-light">
					<div className="flex flex-col gap-1 items-start justify-start content-start align-top">
						{teams && teams.map((team) => (
							<span>
								{team.captains && team.captains.includes(player.Username) ? "Captain" : "Player"}
							</span>
						))}
					</div>
				</td>
		</tr>
	);
}
