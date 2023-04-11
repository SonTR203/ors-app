/**
 * Last updated: 2023-04-06
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import RemoveTeamModal from './RemoveTeamModal';
import { IconTrash, IconEdit, IconCut } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { getImageFromS3 } from '@/utils/graphql.services';
import AWS from 'aws-sdk';
 
 export default function TeamCard({ teamDivision, listTeamDivisionsFunc }) {
     const [removeModal, setRemoveModal] = useState(false);
     const [captains, setCaptains] = useState([]);
     const [membersCount, setMembersCount] = useState(0);
     const [teamImage, setTeamImage] = useState(null);
     const router = useRouter();

     var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();


     useEffect(() => {
    //   console.log(teamDivision);
      if (teamDivision.team.Players.items) {
        setMembersCount(teamDivision.team.Players.items.length);
      }
      getTeamImage();
     }, [listTeamDivisionsFunc])

     useEffect(() => {
        fetchCaptains(teamDivision.team.captains);
     }, [])

     const fetchCaptains = async (myCaptains) => {
        if (teamDivision.team.captains === null) return;
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

    function uniqueByUsername(items) {
		const set = new Set();
		return items.filter((item) => {
			const isDuplicate = set.has(item.Username);
			set.add(item.Username);
			return !isDuplicate;
		});
	}

     const getTeamImage = async () => {
      if (teamDivision.team.team_picture === null || teamDivision.team.team_picture === '') {
          setTeamImage(null);
      } else {
          const url = await getImageFromS3(teamDivision.team.team_picture);
          setTeamImage(url);
      }
  }
 
     const removeTeamFunc = (e) => {
         e.stopPropagation();
         setRemoveModal(!removeModal);
     }
 
     const goToTeamPage = (e) => {
         e.preventDefault();
         router.push(`/teams/${teamDivision.team.id}`)
     }
     
     const goToPlayerPage = (e, captain) => {
         e.stopPropagation();
         router.push(`/players/${captain.Username}`)
     }
 
     return (
         <>
         <tr onClick={(e) => goToTeamPage(e)} class="bg-white border border-gray-400 cursor-pointer">
                 <th scope="row" class="relative px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 <div className='flex items-center gap-2'>
                  <img
                        style={{ objectFit: 'cover' }}
                        width={132}
                        height={132}
                        className="w-[3rem] h-[3rem] rounded-full shadow-md border border-black"
                        src={`${teamImage ? teamImage : "/images/defaultProfilePic.png"}`}
                    />
                    <p>{teamDivision.team.name}</p>
                    </div>
                 </th>
                 <td class="px-6 py-3">
                 {captains && captains.map((captain, index) => (
                    // <>
                    <p className='cursor-pointer text-blue-500 underline text-center' onClick={(e) => goToPlayerPage(e, captain)} key={index}>{captain.UserAttributes.find(o => o.Name === 'name')['Value']} {captain.UserAttributes.find(o => o.Name === 'family_name')['Value']}</p>
                ))}
                 </td>
                 <td class="px-6 py-3 text-center text-lg">
                     {membersCount}
                 </td>
                 <td class="text-center">
                     <IconTrash onClick={(e) => removeTeamFunc(e)} style={{color: 'red', fontSize: '21px', cursor: 'pointer', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto'}} name="trash-outline"></IconTrash>
                 </td>
                 </tr>
         
         {removeModal && (
             <RemoveTeamModal teamDivision={teamDivision} setRemoveModal={setRemoveModal} listTeamDivisionsFunc={listTeamDivisionsFunc} />
         )}
     </>
     )
 }