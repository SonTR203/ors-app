import { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { IconRepeat } from '@tabler/icons-react';
import DivisionRow from '@/components/schedule/DivisionRow';
import ChangeSeasonModal from '@/components/schedule/ChangeSeasonModal';
import { getLeagues } from '@/utils/graphql.services';

const soccer = () => {
	const [leagues, setLeagues] = useState([]);
	const [divisions, setDivisions] = useState([]);
	const [currentLeague, setCurrentLeague] = useState({});
	const [currentSeason, setCurrentSeason] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedDivision, setSelectedDivision] = useState();
	const getAllLeagues = async () => {
		const listOfLeagues = await getLeagues();
		setLeagues(listOfLeagues);
		setDefaultLeaguesAndSeasons(listOfLeagues);
	};
	// set default league and season to the first one
	const setDefaultLeaguesAndSeasons = (listOfLeagues) => {
		setCurrentLeague(listOfLeagues[0]);
		setCurrentSeason(listOfLeagues[0].Seasons.items[0]);
	};
	useEffect(() => {
		getAllLeagues();
	}, []);
	useEffect(() => {
		if (!currentSeason.Divisions) return setDivisions([]);
		setDivisions(currentSeason.Divisions.items);
	}, [currentSeason]);
	return (
		<>
			<main className="w-full flex flex-col gap-6 p-8">
				{modalVisible && (
					<ChangeSeasonModal
						setModalVisible={setModalVisible}
						currentSeason={currentSeason}
						setCurrentSeason={setCurrentSeason}
						currentLeague={currentLeague}
						setCurrentLeague={setCurrentLeague}
						leagues={leagues}
					/>
				)}
				{/* Results */}
				<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
					<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300 items-center">
						<h1 className="text-xl self-center">Spring Season Divisions</h1>
						<Button
							pill={true}
							className="px-[1.75rem] bg-blue-900 hover:bg-blue-800 px-4"
							onClick={() => setModalVisible(true)}
						>
							<IconRepeat className="mr-2 h-5 w-5" />
							Change
						</Button>
					</div>

					<table className="table-auto">
						<thead className="bg-brand-neutral-100">
							<tr className="text-left">
								<th className="py-3 px-5 text-sm font-light w-4/12">Name</th>
								<th className="py-3 px-5 text-sm font-light w-4/12">Level</th>
								<th className="py-3 px-5 text-sm font-light w-3/12">
									Description
								</th>
								<th className="py-3 px-5 text-sm font-light w-2/12">Action </th>
							</tr>
						</thead>
						<tbody>
							{divisions.length > 0 ? (
								divisions.map((division) => (
									<DivisionRow
										division={division}
										selectedDivision={selectedDivision}
										setSelectedDivision={setSelectedDivision}
									/>
								))
							) : (
								<tr>
									<td
										colSpan={6}
										className="pt-8 pb-4 text-center text-sm text-brand-neutral-800"
									>
										No divisions available
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</main>
		</>
	);
};

export default soccer;
