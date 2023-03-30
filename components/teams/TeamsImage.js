/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function UserProfilePictureEdit({
	teamData,
	profilePic,
	setProfilePic,
}) {
	const [defaultPic, setDefaultPic] = useState(
		'https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg'
	);
	useEffect(() => {
		if (teamData && !teamData.team_picture) {
			getImageFromS3();
		}
	}, []);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file.size > 5 * 1024 * 1024) {
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
				{profilePic === null && (
					<img
						style={{ objectFit: 'cover' }}
						width={132}
						height={132}
						className="w-[10rem] h-[10rem] hover:opacity-80 rounded-full shadow-lg border border-black"
						src={defaultPic}
					/>
				)}

				{profilePic !== null && (
					<Image
						style={{ objectFit: 'cover' }}
						width={132}
						height={132}
						className="w-[10rem] h-[10rem] hover:opacity-80 rounded-full shadow-lg border border-black"
						src={
							profilePic
								? URL.createObjectURL(profilePic)
								: '/../public/images/image-placeholder.png'
						}
						alt="user photo"
					/>
				)}

				<div className="absolute translate-x-[10.5rem] translate-y-[-1.5rem]">
					<ion-icon style={{ fontSize: '2rem' }} name="camera"></ion-icon>
				</div>
			</label>
		</div>
	);
}
