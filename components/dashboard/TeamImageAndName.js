/**
 * Last updated: 2023-04-06
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Greg Coghill <cogh0020@algonquinlive.com>
 */

import { getImageFromS3 } from '@/utils/graphql.services';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const TeamImageAndName = ({ src, reverse, teamName, teamId }) => {
	const [profileImage, setProfileImage] = useState(null);
	const router = useRouter();

	useEffect(() => {
		getPicture();
	}, []);

	const getPicture = async () => {
		if (!src) return setProfileImage("/images/defaultProfilePic.png");
		const url = await getImageFromS3(src);
		setProfileImage(url);
	};

	const goToTeamPage = (e) => {
		e.preventDefault();
		router.push(`/teams/${teamId}`);
	}

	return (
		<span
			className={`flex flex-col md:flex-row grow items-center gap-3 justify-items-stretch`}
		>
			{reverse === true ? (
				<>
					<img onClick={(e) => goToTeamPage(e)}
						style={{ objectFit: 'cover' }}
						width={72}
						height={72}
						className="rounded-full border w-[72px] h-[72px] cursor-pointer"
						src={profileImage}
					/>
					<p onClick={(e) => goToTeamPage(e)} className="w-12 md:w-24 cursor-pointer">{teamName || 'SuperTeam'}</p>
				</>
			) : (
				<>
					<p onClick={(e) => goToTeamPage(e)} className="w-24 text-center md:text-left order-last md:order-none cursor-pointer">
						{teamName || 'SuperTeam'}
					</p>
					<img onClick={(e) => goToTeamPage(e)}
						style={{ objectFit: 'cover' }}
						width={72}
						height={72}
						className="rounded-full border w-[72px] h-[72px]"
						src={profileImage}
					/>
				</>
			)}
		</span>
	);
};

export default TeamImageAndName;
