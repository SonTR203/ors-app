import {useState, useEffect} from 'react';
import {API} from 'aws-amplify';
import DropdownInput from '../common/DropdownInput';
import { useRouter } from 'next/router';
import { createGame } from '@/src/graphql/mutations';
import makeid from '@/utils/makeId';
import TeamDropdown from './TeamDropdown';
import TeamCardSelected from './TeamCardSelected';
import RefereeSearchBar from './RefereeSearchBar';
import RefereeChip from './RefereeChip';
import AWS from 'aws-sdk';
import Datepicker from 'tailwind-datepicker-react';

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
  const [referees, setReferees] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [matchLocation, setMatchLocation] = useState('');
  const [openHomeTeamDrop, setOpenHomeTeamDrop] = useState(false);
  const [openAwayTeamDrop, setOpenAwayTeamDrop] = useState(false);
  const [openRefDrop, setOpenRefDrop] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const router = useRouter();
  const {divisionID} = router.query;
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showFounded, setShowFounded] = useState(false);
  const [message, setMessage] = useState(null);

  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(); //Required for fetching in AWS Cognito

  const options = {
    title: "Select Game Date",
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    maxDate: new Date("2060-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "border border-[1px] border-gray-500 shadow-lg relative right-0",
    },
    icons: {
      prev: () => <ion-icon style={{fontSize: '1.5rem'}} name="arrow-back-outline"></ion-icon>,
      next: () => <ion-icon style={{fontSize: '1.5rem'}} name="arrow-forward-outline"></ion-icon>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date(),
    language: "en",
  }

  function getConvertedDate(date) {
    let yourDate = date
        yourDate.toISOString().split('T')[0]
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        return yourDate.toISOString().split('T')[0];
    }

  const handleChange = (selectedDate) => {
	setDate(getConvertedDate(selectedDate));
	console.log(getConvertedDate(selectedDate))
	}
	const handleClose = (state) => {
		setShowFounded(state)
	}

  useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

  const createNewMatch = async (e) => {
	e.preventDefault();
    try {
      if (homeTeam === null || awayTeam === null || startTime === '' || location === '') {
        setMessage({status: 'error', message: 'Please fill out all required fields.'});
        return;
      }

	  if (homeTeam.id === awayTeam.id) {
		setMessage({status: 'error', message: 'Teams cannot be the same.'})
		return;
	  }
      
      const matchData = {
        division: divisionID,
        date: new Date().toISOString(),
        location: location,
        status: "NOT_STARTED",
        home_roster: JSON.stringify(homeTeam.Players.items),
        away_roster: JSON.stringify(awayTeam.Players.items),
        home_score: 0,
        away_score: 0,
        goals: [],
        round: 1,
        referees: referees,
		gameHomeTeamId: homeTeam.id,
		gameAwayTeamId: awayTeam.id,
	}

	  const apiData = await API.graphql({
			query: createGame,
			variables: { input: matchData },
	});
	console.log('New Game', apiData)
	setMessage({status: 'success', message: 'Game was created successfully.'})
    } catch (error) {
      console.error(error)
      setMessage({status: 'error', message: error.message});
    }
  }

  useEffect(() => {
	if (homeTeam) {
		setHomeColour(homeTeam.home_colour);
	}
  }, [homeTeam])

  useEffect(() => {
	if (awayTeam) {
		setAwayColour(awayTeam.away_colour);
	}
  }, [awayTeam])

  useEffect(() => {
		fetchUsers();
	}, [])

	const fetchUsers = (e) => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t', /* required */
		};
		cognitoidentityserviceprovider.listUsers(params, function(err, data) {
			if (err) {
				console.log(err, err.stack);
			} else {
				setListUsers(data.Users);
			}
		})
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
										className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
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

              {/**Referee */}
              <div className='relative cursor-pointer' onClick={() => setOpenRefDrop(!openRefDrop)}>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Referee(s)</label>
                        <input value='' disabled type="text" id="name" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer" />
                        <div className='absolute right-2 top-[2.8rem]'>
                            <ion-icon style={{fontSize: '25px'}} name="caret-down-circle-outline"></ion-icon>
                        </div>
                        <div className='flex absolute top-[2.3rem]'>
                            {referees && referees.map((referee) => (
                                <>
                                    <RefereeChip referee={referee} referees={referees} setReferees={setReferees} />
                                </>
                            ))}
                        </div>
                    </div>
                        {openRefDrop && (
                            <>
                            <RefereeSearchBar openDropdown={openRefDrop} setOpenDropdown={setOpenRefDrop} referees={referees} setReferees={setReferees} listUsers={listUsers} />
                            </>
                        )}

			{/* DATE */}
			<div className='w-full'>
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                  <Datepicker options={options} onChange={handleChange} show={showFounded} setShow={handleClose} />
              </div>

              {/**Start Time */}
              <div className="w-full">
							<label
									htmlFor="startdate"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Start Time
								</label>
								<div>
								<input value={startTime} onChange={(e) => setStartTime(e.target.value)} type="text" id="startTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="3:20pm" required />
						</div>
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

						{message && (<p id="standard_error_help" className={`mt-4 text-center text-sm ${message.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}><span className="font-medium">{message.message}</span></p>)}
              
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
									createNewMatch(e);
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