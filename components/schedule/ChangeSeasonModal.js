import { TextInput, Label } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import DropdownInput from '../common/DropdownInput';
const ChangeSeasonModal = ({
	setModalVisible,
	currentLeague,
	setCurrentLeague,
	currentSeason,
	setCurrentSeason,
	leagues,
}) => {
	const [seasons, setSeasons] = useState([]);
	const [selectedLeague, setSelectedLeague] = useState(currentLeague);
	const [selectedSeason, setSelectedSeason] = useState(currentSeason);
	const [errorMessage, setErrorMessage] = useState('');

	const customSetSeason = (name) => {
		let season = seasons.find((e) => e.name === name);
		setSelectedSeason(season);
	};

	const customSetLeague = (name) => {
		let league = leagues.find((e) => e.name === name);
		setSelectedLeague(league);
	};
	const onSave = () => {
		setCurrentLeague(selectedLeague);
		setCurrentSeason(selectedSeason);
	};

	// Cancel error message when there's a change
	useEffect(() => {
		setErrorMessage('');
	}, [selectedLeague, selectedSeason]);

	// When changing leagues, automatically select the first season
	useEffect(() => {
		setSeasons(selectedLeague?.Seasons?.items || []);
		if (selectedLeague.Seasons)
			setSelectedSeason(selectedLeague.Seasons.items[0]);
	}, [selectedLeague]);

	useEffect(() => {
		setSelectedLeague(currentLeague);
		setSelectedSeason(currentSeason);
	}, [currentLeague, currentSeason]);
	return (
		<>
			{/* // <!-- Main modal --> */}
			<div
				id="defaultModal"
				tabIndex="-1"
				aria-hidden="true"
				className="fixed top-[10rem] left-0 right-0 z-[150] max-w-[33rem] mx-auto w-full h-[20rem]"
			>
				<div className="relative w-full h-full p-5">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white shadow dark:bg-gray-700 sm:pb-[0rem] rounded-md">
						{/* <!-- Modal header --> */}
						<div className="flex items-start justify-between p-4 pb-0 border-b dark:border-gray-600">
							<h3 className="text-md mb-3 font-semibold text-gray-900 dark:text-white">
								Change League or Season
							</h3>
						</div>
						{/* <!-- Modal body --> */}
						<div className="p-6 space-y-6">
							<div className="flex flex-col gap-5">
								<div>
									<div className="mb-2 block">
										<Label htmlFor="league" value="League Name" />
									</div>
									<DropdownInput
										value={selectedLeague.name}
										setValue={customSetLeague}
										options={leagues.map((league) => league.name)}
									/>
								</div>
								<div>
									<div className="mb-2 block">
										<Label htmlFor="season" value="Season" />
									</div>
									<DropdownInput
										value={selectedSeason?.name}
										placeholder={'No seasons available'}
										setValue={customSetSeason}
										options={seasons.map((season) => season.name)}
									/>
								</div>
							</div>
							<p className="text-red-700 text-xs">{errorMessage}</p>
						</div>
						{/* <!-- Modal footer --> */}
						<div className="flex justify-center gap-3 pb-2">
							<div>
								<button
									className="bg-white h-[30px] w-[90px] rounded-[50px] text-brand-blue-800 font-regular my-4"
									type="button"
									onClick={() => {
										setModalVisible(false);
									}}
								>
									Cancel
								</button>
							</div>
							<div>
								<button
									className="bg-brand-blue-800 h-[30px] w-[90px] rounded-[50px] text-white font-regular my-4"
									type="button"
									onClick={() => {
										if (!selectedSeason)
											return setErrorMessage(
												'This season is not available. Please select a new season'
											);
										onSave();
										setModalVisible(false);
									}}
								>
									Ok
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={() => {
					setModalVisible(false);
				}}
				className="z-[125] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>
		</>
	);
};

export default ChangeSeasonModal;
