/**
 * Last updated: 2023-03-22
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 * Son Tran <tran0460@algonquinlive.com>
 */

import { useState, useEffect } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { getImageFromS3, uniqueByUsername } from '@/utils/graphql.services';
import { useRouter } from 'next/router';
import AWS from 'aws-sdk';

export default function TeamRow({ team, setCurrentTeam }) {
	const router = useRouter();
	const [profileImage, setProfileImage] = useState('');
	// const currentSeason = team.team_history[0];
	const [captains, setCaptains] = useState([]);
	const [userName, setUserName] = useState('');

	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	useEffect(() => {
		getPicture();
		fetchCaptains(team.captains);
	}, []);

	const getPicture = async () => {
		if (!team.team_picture)
			return setProfileImage("/images/defaultProfilePic.png");
		const url = await getImageFromS3(team.team_picture);
		setProfileImage(url);
	};

	const fetchCaptains = async (myCaptains) => {
		if (myCaptains === null) {
		   setCaptains([]);
		   return;
		}
		setCaptains([]);
		myCaptains.forEach(async captain => {
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
					} );
					// return;
				}          
			});
		})
	}

	const goToPlayerPage = (e, captain) => {
		e.stopPropagation();
		router.push(`/players/${captain.Username}`)
	}

	const navigateToProfile = () => {
		router.push(`/teams/${team.id}`);
		// Alternatively, we could use: team.name.replace(/\s+/g, '-').toLowerCase()
	};

	return (
		<tr
			key={team.id}
			className="border-b border-brand-neutral-300 cursor-pointer"
			onClick={navigateToProfile}
		>
			{/* odd:bg-white even:bg-brand-neutral-100 */}
			<td className="pl-3 py-3">
				<div className="flex flex-col min-[590px]:flex-row w-[80%] items-center pl-2 gap-2">
					<img
						src={profileImage}
						className="rounded-full w-[82px] h-[82px] object-cover text-center"
					></img>
					<p className='text-center min-[590px]:text-left ml-2 font-medium w-[7rem]'>{team.name}</p>
					<div className='flex-grow'></div>
				</div>
			</td>
			<td className="p-5 mx-auto">
				<ul className=''>
				{captains && captains.map((captain, index) => (
                     <li className='my-1 cursor-pointer text-blue-500 underline w-[8rem] text-[.91rem] text-center' onClick={(e) => goToPlayerPage(e, captain)} key={index}>{captain.UserAttributes.find(o => o.Name === 'name')['Value']} {captain.UserAttributes.find(o => o.Name === 'family_name')['Value']}</li>
                 ))}
				 </ul>
			</td>
			<td className="p-3 text-center">{team.sports || 'Soccer'}</td>
			<td className="p-3 mx-auto text-center">
				<p className='text-[1.4rem]'>{team ? team.Players.items.length : 0}</p>
			</td>
		</tr>
	);
}
