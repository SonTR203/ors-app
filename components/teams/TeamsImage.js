/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  getImageFromS3,
} from '@/utils/graphql.services';

export default function TeamsImage({
	team,
	isVisible,
	teamLogoUpload,
	setTeamLogoUpload
}) {
	const defaultPic = "/images/defaultProfilePic.png";
	const [teamLogo, setTeamLogo] = useState('');
	const getPicture = async () => {
		// teamLogoUpload = teamLogo;
		if (team && team.team_picture) {
			const url = await getImageFromS3(team.team_picture);
			setTeamLogo(url);
			return;
		};
		setTeamLogo("/images/defaultProfilePic.png");
	}
	useEffect(() => {
		getPicture();
		setTeamLogoUpload(null);
	}, [isVisible]);

	return (
		<div className="w-[12rem] mx-auto">
			<label className="cursor-pointer">
				<input
					className="hidden"
					id="file"
					type="file"
					accept={'image/*'}
					onChange={(e) => setTeamLogoUpload(e.target.files[0])}
				/>

				<img
					style={{ objectFit: 'cover' }}
					width={132}
					height={132}
					className="w-[12rem] h-[12rem] hover:opacity-80 rounded-full border"
					src={teamLogoUpload ? URL.createObjectURL(teamLogoUpload) : teamLogo}
				/>

				<div className="absolute translate-x-[10.5rem] translate-y-[-1.5rem]">
					<ion-icon style={{ fontSize: '2rem' }} name="camera"></ion-icon>
				</div>
			</label>
		</div>
	);
}
