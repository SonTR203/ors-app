import {useState, useEffect} from 'react';
import {API} from 'aws-amplify';
import DropdownInput from '../common/DropdownInput';
import { useRouter } from 'next/router';
import { createGame } from '@/src/graphql/mutations';
import makeid from '@/utils/makeId';
import TeamDropdown from './TeamDropdown';
import TeamCardSelected from './TeamCardSelected';

//TODO:
//Make graphQL queries for making a match, import them
//Get the existing roster of the home/away teams
//Auto populate jersey colour
//Import date picker

const CreateMatchModal = ({isVisible, setIsVisible }) => {

  const { v4: uuidv4 } = require('uuid');

  const [homeTeam, setHomeTeam] = useState();
  const [awayTeam, setAwayTeam] = useState();
  const [homeColour, setHomeColour] = useState('Red');
  const [awayColour, setAwayColour] = useState('Blue');
  const [matchDate, setMatchDate] = useState('');
  const [referee, setReferee] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [matchLocation, setMatchLocation] = useState('');
  const [openHomeTeamDrop, setOpenHomeTeamDrop] = useState(false);
  const [openAwayTeamDrop, setOpenAwayTeamDrop] = useState(false);
  const router = useRouter();
  const {divisionID} = router.query;
  const [message, setMessage] = useState(null);

  useEffect(() => {
	console.log('Division ID', divisionID);
  }, [])

  useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

  const createNewMatch = async () => {
    try {
      if (!isVisible) {
        setMessage({status: 'error', message: 'Please fill out all required fields'});
        return;
      }
      const randomId = uuidv4();
      
      const matchData = {
        id: randomId,
        division: 0,
        date: "",
        location: "",
        status: "",
        home_roster: [],
        away_roster: [],
        home_score:"",
        away_score:"",
        goals: [],
        round: "",
        referees: [],
	}

      console.log(matchData)

    } catch (error) {
      console.error(error)
      setMessage({status: 'error', message: error.message});
    }
  }

  const resetData = () => {
	
  }

  if (!isVisible) return;

  return (
    <>
    <div
		id="defaultModal"
		tabIndex="-1"
		aria-hidden="true"
		className="fixed top-0 bottom-0 left-0 right-0 z-[150] p-4 max-w-[42rem] mx-auto w-full h-[40rem] sm:overflow-visible overflow-auto"
			>
        <div className="relative w-full h-full">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700 sm:pb-[0rem] pb-[7rem] ">
						{/* <!-- Modal header --> */}
						<div className="flex items-start justify-between p-4 pb-0 border-b rounded-t dark:border-gray-600">
							<h3 className="text-md font-semibold text-gray-900 dark:text-white">
								Create New Match
							</h3>
							<button
								onClick={() => {
									resetData();
									setIsVisible(false);
								}}
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-hide="defaultModal"
							>
								<svg
									aria-hidden="true"
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									></path>
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						{message && (<p id="standard_error_help" className={`mt-4 text-center text-sm ${message.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}><span className="font-medium">{message.message}</span></p>)}

            {/* <!-- Modal body --> */}
            <div className='p-[2rem]'>
            {/**Home Team */}
            <div className="w-full">
								<div onClick={(e) => setOpenHomeTeamDrop(!openHomeTeamDrop)} >
									<label
									htmlFor="hometeam"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
									Home Team
									</label>
									{homeTeam && (
										<TeamCardSelected team={homeTeam} />
									)}
									{!homeTeam && (
										<div type="text" id="hometeam" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer py-5" placeholder="" required />
									)}
								</div>
						{openHomeTeamDrop && (
							<TeamDropdown setState={setHomeTeam} setOpenDropdown={setOpenHomeTeamDrop} />
						)}
				</div>

              {/**Home Team Jersey*/}
              <div className="w-1/2">
									<label
										htmlFor="home-team-jersey"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Home Team Jersey Colour
									</label>
									<DropdownInput
										options={[
											'Red',
											'Green',
											'Blue',
											'Yellow',
											'Black',
											'White',
										]}
										value={homeColour}
										setValue={setHomeColour}
									/>
								</div>

              {/**Away Team */}
              <div className="w-full">
								<div onClick={(e) => setOpenAwayTeamDrop(!openAwayTeamDrop)}>
									<label
										htmlFor="awayteam"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
										Away Team
									</label>
									{awayTeam && (
										<TeamCardSelected team={awayTeam} />
									)}
									{!awayTeam && (
										<div type="text" id="awayTeam" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer py-5" placeholder="" required />
									)}
								</div>
								{openAwayTeamDrop && (
									<TeamDropdown setState={setAwayTeam} setOpenDropdown={setOpenAwayTeamDrop} />
								)}
						</div>

              {/**Away Team Jersey */}
<div className="w-1/2"> 
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Away Team Jersey Colour
									</label>
									<DropdownInput
										options={[
											'Red',
											'Green',
											'Blue',
											'Yellow',
											'Black',
											'White',
										]}
										value={awayColour}
										setValue={setAwayColour}
									/>
								</div>
              {/**Date */}

              {/**Referee */}
              <div className="w-full">
								<label
									htmlFor="referee"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Referee
								</label>
								<DropdownInput options={['Referee']}
                value={referee}
                setValue={setReferee} />
							</div>

              {/**Start Time */}
              <div className="w-full">
								<label
									htmlFor="startdate"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Start Time
								</label>
								<DropdownInput options={['Start Time']}
                value={startTime}
                setValue={setStartTime} />
							</div>

              {/**Duration */}

              {/**Location */}
              <div className="w-full">
								<label
									htmlFor="location"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Location
								</label>
								<DropdownInput options={['Location']}
                value={matchLocation}
                setValue={setMatchLocation} />
							</div>
</div>
              
						{/* <!-- Modal footer --> */}
						<div className="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								onClick={() => {
									setIsVisible(false);
									resetData();
								}}
								data-modal-hide="defaultModal"
								type="button"
								className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
							>
								Cancel
							</button>
							<button
								onClick={(e) => {
									//createNewMatch
								}}
								data-modal-hide="defaultModal"
								type="button"
								className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[2rem] py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
							>
								Create
							</button>
						</div>
					</div>
				</div>
    </div>
	<div onClick={(e) => setIsVisible(false)} class='z-[100] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
    </>
  )
}

export default CreateMatchModal;