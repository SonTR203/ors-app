import React, { useState, useEffect } from 'react';
import { listPlayers } from '@/src/graphql/queries';
import { getImageFromS3, createPlayerOnTeam } from "@/utils/graphql.services";
import { useRouter } from 'next/router';

export default function UserCard({ user, openDropdown, setOpenDropdown, fetchPlayersFromTeam }) {
    const [userImage, setUserImage] = useState(null);
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        getImage();
    }, [])

    const getImage = async () => {
        if (user.Attributes.find(o => o.Name === 'picture')['Value'] !== 'none') {
            let url = await getImageFromS3(user.Attributes.find(o => o.Name === 'picture')['Value']);
            setUserImage(url);
        } else {
            setUserImage(null);
        }
    }

    const addUser = async (e) => {
        e.preventDefault();
        setOpenDropdown(!openDropdown)
        await createPlayerOnTeam(user.Username, id);
        // console.log(user);
        await fetchPlayersFromTeam();
    }

    return (
        <div onClick={(e) => {
            addUser(e);
        }} class="flex items-center px-4 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <img
                style={{ objectFit: 'cover' }}
                width={132}
                height={132}
                className="w-[3rem] h-[3rem] rounded-full border border-brand-blue-900 cursor-pointer"
                src={userImage ? userImage : "/images/defaultProfilePic.png"}
                alt="User Image"
            />
            <p className='text-sm'>{user.Attributes.find(o => o.Name === 'name')['Value']} {user.Attributes.find(o => o.Name === 'family_name')['Value']}</p>
        </div>
    )
}