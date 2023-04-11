import React, { useState, useEffect } from 'react';
import { getImageFromS3 } from '@/utils/graphql.services';

export default function TeamCardAdd({team, search, selectedTeams, teamDivisions}) {
    const [teamImage, setTeamImage] = useState(null);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        getTeamImage();
    }, [search])

    useEffect(() => {
        teamDivisions.forEach((teamDiv) => {
            if (teamDiv.team.id === team.id) {
                setDisable(true);
            }
        })
    }, [])

    const getTeamImage = async () => {
        if (team.team_picture === null || team.team_picture === '') {
            setTeamImage(null);
        } else {
            const url = await getImageFromS3(team.team_picture);
            setTeamImage(url);
        }
    }

  return (
    <div class={`flex items-center px-4 py-2 gap-2 ${disable && 'bg-gray-300 opacity-40 hover:bg-gray-300 cursor-default'}
        ${selectedTeams.includes(team.id) && 'bg-blue-600  hover:bg-blue-500 text-white font-semibold'}`}>
        <img
            style={{ objectFit: 'cover' }}
            width={132}
            height={132}
            className="w-[3rem] h-[3rem] rounded-full shadow-md border border-black"
            src={`${teamImage ? teamImage : "/images/defaultProfilePic.png"}`}
        />
        <p className='text-sm'>{team.name}</p>
    </div>
  )
}