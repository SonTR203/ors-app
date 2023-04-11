import React, { useState, useEffect } from 'react';
import { getImageFromS3 } from '@/utils/graphql.services';

export default function TeamCard({ team, search }) {
	const [teamImage, setTeamImage] = useState(null);

	useEffect(() => {
		getTeamImage();
	}, [search]);

	const getTeamImage = async () => {
		if (team.team_picture === null || team.team_picture === '') {
			setTeamImage(null);
		} else {
			//Fetch from S3
			const url = await getImageFromS3(team.team_picture);
			setTeamImage(url);
		}
	};

	return (
		<div className="flex items-center px-4 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
			<img
				style={{ objectFit: 'cover' }}
				width={132}
				height={132}
				className="w-[3rem] h-[3rem] rounded-full shadow-md border border-black"
				src={`${teamImage ? teamImage : "/images/defaultProfilePic.png"}`}
			/>
			<p className="text-sm">{team.name}</p>
		</div>
	);
}
