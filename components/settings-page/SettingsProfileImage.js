/**
 * Last updated: 2023-03-23
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getImageFromS3 } from '@/utils/graphql.services';

export default function UserProfilePictureEdit({
	userAttributes,
	profilePic,
	setProfilePic,
}) {
	const defaultPic = '/images/defaultProfilePic.jpeg';
	const [profileImage, setProfileImage] = useState('');
	const getPicture = async () => {
		if (userAttributes?.picture === 'none')
			return setProfileImage('/images/defaultProfilePic.jpeg');
		const url = await getImageFromS3(userAttributes?.picture);
		setProfileImage(url);
	};
	useEffect(() => {
		getPicture();
	}, []);

	const handleFileChange = (event) => {
		if (!event.target.files[0]) return;
		const file = event.target.files[0];
		if (file.size > 1024 * 1024) {
			alert('File is too large!');
		} else {
			setProfilePic(file);
		}
	}

	return (
		<div className="w-[12rem] mx-auto">
			<label className="cursor-pointer">
				<input
					className="hidden"
					id="file"
					type="file"
					accept={'image/*'}
					onChange={handleFileChange}
					// onChange={(e) => setProfilePic(e.target.files[0])}
				/>

				<img
					style={{ objectFit: 'cover' }}
					width={132}
					height={132}
					className="w-[12rem] h-[12rem] hover:opacity-80 rounded-full border"
					src={profilePic ? URL.createObjectURL(profilePic) : profileImage}
				/>

				<div className="absolute translate-x-[10.5rem] translate-y-[-1.5rem]">
					<ion-icon style={{ fontSize: '2rem' }} name="camera"></ion-icon>
				</div>
			</label>
		</div>
	);
}
