import { useState, useEffect } from 'react';
import { getImageFromS3 } from '@/utils/graphql.services';
import { useRouter } from 'next/router';
import { convertColorsDisplay } from '@/utils/handy-dandy-functions';

const TeamNameAndImage = ({ reverse, team, jerseyColour }) => {
	const [profileImage, setProfileImage] = useState('');
	const router = useRouter();

	const JerseySVG = ({ fill = '#fff', stroke = '#000', className }) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={20}
			height={21}
			fill={'none'}
			className={className}
		>
			<path
				fill={fill}
				stroke={stroke}
				d="M10 4.032C8.497 3.548 7.36 2.147 7.14.428L10 4.032Zm0 0c1.503-.484 2.64-1.885 2.86-3.604L10 4.032Zm5.87 5.187-.283.136V19.081c0 .282-.202.442-.37.442H4.783c-.168 0-.37-.16-.37-.442V9.355L4.13 9.22.5 7.473V4.782c0-1.715.938-3.241 2.35-3.91a3.615 3.615 0 0 1 1.548-.35h2.25c.251 1.882 1.506 3.44 3.199 3.985l.153.05.153-.05c1.693-.545 2.947-2.103 3.199-3.986h2.25c.531 0 1.059.12 1.549.352 1.411.668 2.349 2.194 2.349 3.909v2.69l-3.63 1.746ZM.465 7.48H.5.465Zm0 0H0h.465Zm19.06-.02Z"
			/>
		</svg>
	);
	const getPicture = async () => {
		if (!team?.team_picture)
			return setProfileImage("/images/defaultProfilePic.png");
		const url = await getImageFromS3(team?.team_picture);
		setProfileImage(url);
	};
	useEffect(() => {
		getPicture();
	}, []);

	const goToTeamPage = (e) => {
		e.preventDefault();
		router.push(`/teams/${team.id}`);
	}

	return (
		<span
			className={`flex flex-col md:flex-row grow  items-center gap-3 justify-items-stretch`}
		>
			{reverse === true ? (
				<>
					<span onClick={(e) => {
						goToTeamPage(e);
					}} className="w-[4.5rem] h-[4.5rem] rounded-full relative cursor-pointer">
						<img
							style={{ objectFit: 'cover' }}
							width={72}
							height={72}
							className="w-[4.5rem] h-[4.5rem] rounded-full border"
							src={profileImage}
						/>
						<JerseySVG
							className={'absolute -bottom-2 -right-1'}
							fill={jerseyColour ? jerseyColour : '#fff'}
							stroke={'#000'}
						/>
					</span>
					<p onClick={(e) => {
						goToTeamPage(e);
					}} className="w-12 md:w-24 cursor-pointer">{team?.name || 'SuperTeam'}</p>
				</>
			) : (
				<>
					<p onClick={(e) => {
						goToTeamPage(e);
					}} className="w-24 text-center md:text-left order-last md:order-none cursor-pointer">
						{team?.name || 'SuperTeam'}
					</p>
					<span onClick={(e) => {
						goToTeamPage(e);
					}} className="w-[4.5rem] h-[4.5rem] rounded-full relative cursor-pointer">
						<img
							style={{ objectFit: 'cover' }}
							width={72}
							height={72}
							className=" w-[4.5rem] h-[4.5rem] rounded-full border"
							src={profileImage}
						/>
						<JerseySVG
							className={'absolute -bottom-2 -left-1'}
							fill={jerseyColour ? jerseyColour : '#fff'}
							stroke={'#000'}
						/>
					</span>
				</>
			)}
		</span>
	);
};

export default TeamNameAndImage;
