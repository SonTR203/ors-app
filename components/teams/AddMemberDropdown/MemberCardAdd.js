import React, { useState, useEffect } from 'react';
import { getImageFromS3 } from '@/utils/graphql.services';

export default function MemberCardAdd({user, search, selectedUsers, members}) {
    const [userImage, setUserImage] = useState(null);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        getImage();
    }, [search])

    useEffect(() => {
        members.forEach((member) => {
            if (member.Username === user.Username) {
                setDisable(true);
            }
        })
    }, [])

    const getImage = async () => {
        if (user.Attributes.find(o => o.Name === 'picture')['Value'] !== 'none') {
            let url = await getImageFromS3(user.Attributes.find(o => o.Name === 'picture')['Value']);
            setUserImage(url);
        } else {
            setUserImage(null);
        }
    }

  return (
    <div class={`flex items-center px-4 py-2 gap-2 ${disable && 'bg-gray-300 opacity-40 hover:bg-gray-300 cursor-default'}
        ${selectedUsers.includes(user.Username) && 'bg-blue-600  hover:bg-blue-500 text-white font-semibold'}`}>
        <img
            style={{ objectFit: 'cover' }}
            width={132}
            height={132}
            className="w-[3rem] h-[3rem] rounded-full shadow-md border border-black"
            src={`${userImage ? userImage : "/images/defaultProfilePic.png"}`}
        />
        <p className='text-sm'>{`${user.Attributes.find(o => o.Name === 'name')['Value']} ${user.Attributes.find(o => o.Name === 'family_name')['Value']}`}</p>
    </div>
  )
}