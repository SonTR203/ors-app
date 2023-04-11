/**
 * Last updated: 2023-03-26
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import { Avatar } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import ProfileDropdown from './ProfileDropdown';
import Image from 'next/image';
import { getCurrentUser, getImageFromS3 } from '@/utils/graphql.services';
import { useUser } from '@/context/userContext';

const Profile = () => {
	const [profileImage, setProfileImage] = useState(null);
	const [openDropdown, setOpenDropdown] = useState(false);
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	
	useEffect(() => {
		if (!user) return;

		if (user?.attributes?.picture === 'none') {
			return setProfileImage(null);
		} else {
			const url = getImageFromS3(user?.attributes?.picture);
			setProfileImage(url);
		}
	}, [])

	useEffect(() => {
		getProfilePic();
	}, [user])

	const getProfilePic = async () => {
		const timer = setTimeout( async () => {
			if (!user) return;
			
			if (user.attributes.picture === 'none') {
				return setProfileImage(null);
			} else {
				const url = await getImageFromS3(user.attributes.picture);
				setProfileImage(url);
			}
		}, 1000);
		return () => clearTimeout(timer);
	}

	return (
		<>
		<div className="flex flex-wrap gap-4 p-1 mr-2 items-center">
			<div className="text-black text-right hidden lg:block">
				{user && ( <p className="font-medium text-base">{`${user?.attributes?.name} ${user?.attributes?.family_name} `}</p> ) }
				{!user && ( <p className="font-medium text-base">{`Guest`}</p> ) }
				{user && ( <p className="font-regular text-xs">{authRoles && authRoles.join(', ')}</p> ) }
			</div>
			<div>
				<img
					onClick={(e) => {
						e.preventDefault();
						setOpenDropdown(!openDropdown);
					}}
					style={{ objectFit: 'cover' }}
					width={132}
					height={132}
					className="w-[2.7rem] h-[2.7rem] rounded-full border border-brand-blue-900 cursor-pointer"
					src={profileImage ? profileImage : "/images/defaultProfilePic.png"}
				/>
				<ProfileDropdown user={user} setUser={setUser} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} setProfileImage={setProfileImage} />
			</div>
		</div>
		</>
	);
};

export default Profile;
