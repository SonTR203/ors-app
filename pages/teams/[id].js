/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, {useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'flowbite-react';
import { IconChevronLeft } from '@tabler/icons-react';
import { IconSearch } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { getImageFromS3, getAllPlayers, getTeam, getUser, updateTeam } from '@/utils/graphql.services';
import AWS from 'aws-sdk';
import { useUser } from '@/context/userContext';
import * as mutations from '@/src/graphql/mutations';
import { API } from 'aws-amplify';
import EditTeamModal from '@/components/teams/EditTeamModal';
import UsersSearchBar from '@/components/common/UsersSearchBar';
import { listPlayers } from '@/src/graphql/queries';
import MemberCard from '@/components/teams/MemberCard';

export default function TeamProfile() {
	const router = useRouter();
	const teamId = router.query.id;
	const [team, setTeam] = useState();
	const [captains, setCaptains] = useState([]);
	const [members, setMembers] = useState([]);
	const [profileImage, setProfileImage] = useState('');
	const [playerUsername, setPlayerUsename] = useState([]);
	// Opens user dropdown
	const [openDropdown, setOpenDropdown] = useState(false);
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
	const [user, authRoles] = useUser();
	const [editModal, setEditModal] = useState(false);


	useEffect(() => {
		if(!teamId) {
			return
		}
		const callMeAsync = async () => {
			await fetchTeam();
			await fetchPlayersFromTeam();
		}
		callMeAsync();
	}, [teamId]);

	useEffect(() => {
		if (team != undefined) {
			// console.log('MY TEAM', team);
			fetchCaptains();
			getPicture();
			setPlayerUsename(team.team_history[0].roster);
		}
	}, [team])

	useEffect(() => {
		fetchPlayer();
	}, [playerUsername])

	const fetchTeam = async () => {
		const data = await getTeam(teamId);
		setTeam(data);
		console.log('TEAM', data);
	};

	const fetchPlayer = async () => {
		if(!playerUsername) return;
		setMembers([]);
		playerUsername.forEach(async player => {
			const params = {
				Username: player,
				UserPoolId: 'us-east-1_70GCK7G6t'
			}
			cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				else {
					setMembers(members => [...members, data] );
					return;
				}       // successful response
			})
	})
}

	const fetchCaptains = async () => {
		if (!team.team_history[0].captains) return; //
		setCaptains([]);
		team.team_history[0].captains.forEach(async captain => {
			const params = {
				Username: captain,
				UserPoolId: 'us-east-1_70GCK7G6t'
			}
			cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				else     {
					// setCaptains(data);
					setCaptains((captains) => {
                        return uniqueByUsername([...captains, data]);
                    });
					return;
				}          // successful response
			});
		})
		// console.log('Captains', captains);
	}

	function uniqueByUsername(items) {
        const set = new Set();
        return items.filter((item) => {
          const isDuplicate = set.has(item.Username);
          set.add(item.Username);
          return !isDuplicate;
        });
    }

	//Function for gettin profile image.

	const getPicture = async () => {
		if (!team.team_picture)
			return setProfileImage('http://via.placeholder.com/200x200');
		const url = await getImageFromS3(team.team_picture);
		setProfileImage(url);
	};

	//Function to delete Player

	async function deletePlayer(player){
			console.log(player.Username);
			/**DELETE PLAYER FROM TEAM */
		// in team.team_history, find the current SoccerTeamStat object, which represents the current season
		// in this phase no history, so its always going to be team.team_history[0]
		// team.team_history[0], which is an array, remove the player's id from the array

		// store a copy version of team.team_history[0] in an array
		// const newTeamHistoryArray = team.team_history[0]

		// remove the player id from the array
		// newTeamHistoryArray.team_history[0].splice(index, 1)
		
		console.log(team.team_history[0]);

		const newTeamRosterArray = team.team_history[0].roster.filter(item => item !== player.Username)
		// console.log(newTeamHistoryArray);

		// const newTeamHistoryArray = 
		// team.team_history[0].roster = newTeamRosterArray

		const data = {
			id: teamId,
			team_history:{
				roster: newTeamRosterArray
			}
		}
		const resp = await API.graphql({
			query: mutations.updateTeam,
			variables: {
				input: data,
			},
		});

		// run the updateTeam function
		/**
		 * updateTeam(
		 * {
		 * 	team_history: newTeamHistoryArray
		 * }
		 * )
		 */

		/**DELETE TEAM FROM PLAYER */
		// if doest have current player, get current player using the id (should be username)

		// the teams are stored in player.soccer_stats
		// const playerTeams = player.soccer_stats

		// find the index of the object that represents the team that the player is being removed from
		// const teamIndex = player.soccer_stats.indexOf(e => e.team === team.id)

		// remove this object from the array
		// playerTeams.soccer_stats.splice(teamIndex, 1)

		// run the update function 
		/**
		 * updatePlayer({
		 * 	soccer_starts: playerTeams
		 * })
		 */
	}

	const fetchPlayersFromTeam = async () => {
		const variables = {
			filter: {
			  teamID: {
				eq: teamId
			  }
			}
		  };
		  const players = await API.graphql({ 
			query: listPlayers, variables: variables
		  });
		  console.log('Members', players.data.listPlayers.items);
		  setMembers(players.data.listPlayers.items);
	}

	return (
		<main className="w-full h-screen flex flex-col gap-6 p-8">
			{/* Edit Modal */}
			<EditTeamModal
				isVisible={editModal}
				setIsVisible={setEditModal}
				teamId={teamId}
				team={team}
			/>
			{/* Results */}
			<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
				<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300">
					<h1 className="text-lg self-center font-medium">Team Name</h1>
					<Button
						pill={true}
						className="py-0.5 px-3 bg-blue-900 hover:bg-blue-800"
						onClick={() => router.back()}
					>
						<IconChevronLeft className="mr-2 h-5 w-5" />
						Back to Teams
					</Button>
				</div>

				<div className="grid grid-cols-3 gap-4 p-8">
					{/* Team Image */}
					<div className="col-span-3 sm:col-span-1 row-span-2 flex flex-col gap-4">
						<img
							src={profileImage}
							className="rounded-full self-center w-[200px] h-[200px] object-cover"
							alt="Team profile image."
						></img>
						<div className="flex justify-center gap-1">
							<Image src="/images/medal.png" width="26" height="26" alt="Medal" />
							<Image src="/images/medal.png" width="26" height="26" alt="Medal" />
							<Image src="/images/medal.png" width="26" height="26" alt="Medal" />
						</div>
						<button
							onClick={() => setEditModal(true)}
							type="button"
							className="border border-brand-blue-800 text-brand-blue-800 h-9 w-full rounded-2xl font-regular mb-3"
						>
							Edit Team Details
						</button>
					</div>

					{/* Player Information */}
					<div className="col-span-3 sm:col-span-2 grid grid-cols-2 gap-y-4 gap-x-8">
						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Team Name</h3>
							<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								{team && team.name}
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Team Captain</h3>
							<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
							{captains && captains.map((captain, index) => (
								// <>
								<p  key={index}>{captain.UserAttributes.find(o => o.Name === 'name')['Value']} {captain.UserAttributes.find(o => o.Name === 'family_name')['Value']}</p>
							))}
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Sport</h3>
							<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								Soccer
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Members</h3>
							<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								{team && team.Players.items.length}
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Home Colours</h3>
							<div className="flex flex-wrap gap-4 py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								{/* <div className={team ? `bg-${team.home_colour.toLocaleLowerCase()}-700 w-[15px] h-[15px] mt-1 `: ''}></div> */}
								<div>
									{team ? team.home_colour : " "}
								</div>
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Away Colours</h3>
							<div className="flex flex-wrap gap-4 py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								{/* <div className={team ? `bg-${team.away_colour.toLocaleLowerCase()}-700 w-[15px] h-[15px] mt-1`: ''}></div> */}
								<div>
									{team ? team.away_colour : " "}
								</div>
							</div>
						</div>

						{/* Player Teams */}
						<div className="col-span-2">
							
							<div className=" w-full border border-brand-blue-900/25 rounded">
								<div className="w-full relative flex flex-row justify-between items-center">
								<h2 className="mb-1 font-light">Members</h2>
								<button
									onClick={(e) => setOpenDropdown(!openDropdown)}
									type="button"
									className="bg-brand-blue-800 text-center rounded w-[10rem] text-white font-regular flex"
								>
									Add Members
								</button>
								{/* // DROP */}
								{openDropdown && (
									<UsersSearchBar openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} setMembers={setMembers} fetchPlayersFromTeam={fetchPlayersFromTeam} />
								)}

								</div>
								{members && members.map((member) => (
									<div className="flex relative border-t border-brand-blue-900/25 px-5 py-2 justify-between" key={member.id} >
										<MemberCard member={member} fetchPlayersFromTeam={fetchPlayersFromTeam} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
