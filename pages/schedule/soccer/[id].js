import MatchesTable from '@/components/schedule/MatchesTable';
import { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { IconCirclePlus } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { getDivisionGames, getAllTeams } from '@/utils/graphql.services';
import AWS from 'aws-sdk';
import { listGames } from '@/src/graphql/queries';
import CreateMatchModal from '@/components/schedule/CreateMatchModal';

export default function DivisionMatches() {
	const [games, setGames] = useState([]);
	const [teams, setTeams] = useState([]);
	const [referees, setReferees] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const router = useRouter();
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
	
	const fetchReferees = async () => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
			GroupName: 'Referee',
		};
		cognitoidentityserviceprovider.listUsersInGroup(
			params,
			function (err, data) {
				if (err) {
					console.log(err, err.stack);
				} else {
					setReferees(data.Users);
				}
			}
		);
	};

	const getGames = async () => {
		if (!router.query.divisionID) return;
		const resp = await getDivisionGames(router.query.divisionID);
		setGames(resp);
	};

	const getTeams = async () => {
		const resp = await getAllTeams();
		setTeams(resp);
	};

	useEffect(() => {
		getGames();
		getTeams();
		fetchReferees();
	}, [router]);
	return (
		<>
			<main className="w-full flex flex-col gap-6 p-8 pt-0">
				{/* Results */}
				<Button
					pill={true}
					className="py-0.5 px-3 bg-blue-900 hover:bg-blue-800 ml-auto"
					onClick={() => setModalVisible(!modalVisible)}
					>
					<IconCirclePlus className="mr-2 h-5 w-5" />
					Create New Match
				</Button>
				<MatchesTable matches={games} />
			</main>
			<CreateMatchModal isVisible={modalVisible}
          setIsVisible={setModalVisible} />
		</>
	);
}
