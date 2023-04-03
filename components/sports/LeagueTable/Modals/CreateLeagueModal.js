/**
 * Last updated: 2023-04-01
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect, use } from 'react';
import CoordinatorChip from '../CoordinatorDropdown/CoordinatorChip';
import CoordinatorDropdown from '../CoordinatorDropdown';
import { API } from '@aws-amplify/api';
import { createLeague } from '@/src/graphql/mutations';
import { listLeaguesLong } from '@/src/graphql/custom-queries';

export default function CreateLeagueModal({ sport, setOpenModal, setLeagues, setSelectedLeague }) {
    const [leagueName, setLeagueName] = useState('');
    const [leagueCoordinators, setLeagueCoordinators] = useState([]);
    const [numPerPeriod, setNumPerPeriod] = useState();
    const [timePerPeriod, setTimePerPeriod] = useState();
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [founded, setFounded] = useState(null);

    const [openCoordinatorDrop, setOpenCoordinatorDrop] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [message, setMessage] = useState(null);
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 5000);
        return () => clearTimeout(timer);
    }, [message]);

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

    const saveLeague = async (e) => {
        e.preventDefault();
        if (leagueName === '') {
            setMessage({status: 'error', message: 'Please fill out all required field.'});
            return;
        }
        const coordinatorUsernames = leagueCoordinators.map(a => a.username)
        try{
            const data = {
                name: leagueName,
                sport: sport,
                date_founded: new Date(),
                cost_per_individual: 32,
                cost_per_team: 328,
                coordinators: coordinatorUsernames,
                description: description,
                number_of_periods: numPerPeriod,
                time_per_period: timePerPeriod,
            }
            const apiData = await API.graphql({
                query: createLeague,
                variables: { input: data},
            });
            setMessage({status: 'success', message: 'League created successfully!'});
            listLeaguesFunc2(apiData.data.createLeague);
        } catch (error) {
            setMessage({status: 'error', message: error.message});
            console.error(error);
        }

    }

    const listLeaguesFunc2 = async (newLeague) => {
        const timer = setTimeout(async () => {
            
            const variables = {
                filter: {
                  sport: {
                    eq: sport
                  }
                }
              };
              const leagues = await API.graphql({ 
                query: listLeaguesLong, variables: variables
              });
              console.log('Leagues', leagues.data.listLeagues.items);
              
              setLeagues(leagues.data.listLeagues.items);
              setSelectedLeague(newLeague);
              setOpenModal(false);
              
        }, 500);
        return () => clearTimeout(timer);
    }


    return (
        <>
    {/* // <!-- Main modal --> */}
    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-[5rem] left-0 right-0 z-[220] p-4 w-[32rem] mx-auto">
        <div class="relative w-full h-full">
            {/* <!-- Modal content --> */}
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-md font-semibold text-gray-900 dark:text-white">
                        Create New League
                    </h3>
                    <button onClick={() => setOpenModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
    
                {/* <!-- Modal body --> */}
                <div class="p-6 space-y-6">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">League Name *</label>
                        <input value={leagueName} onChange={(e) => setLeagueName(e.target.value)} type="text" id="name" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
    
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type *</label>
                        <input value={type} onChange={(e) => setType(e.target.value)} type="text" id="name" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    
                    <div className='relative cursor-pointer' onClick={() => setOpenCoordinatorDrop(!openCoordinatorDrop)}>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coordinator</label>
                        <input value='' disabled type="text" id="name" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer" />
                        <div className='absolute right-2 top-[2.8rem]'>
                            <ion-icon style={{fontSize: '25px'}} name="caret-down-circle-outline"></ion-icon>
                        </div>
                        <div className='flex absolute top-[2.3rem]'>
                            {leagueCoordinators && leagueCoordinators.map((coordinator) => (
                                <>
                                    <CoordinatorChip coordinator={coordinator} leagueCoordinators={leagueCoordinators} setLeagueCoordinators={setLeagueCoordinators} />
                                </>
                            ))}
                        </div>
                    </div>
                        {openCoordinatorDrop && (
                            <>
                            <CoordinatorDropdown openDropdown={openCoordinatorDrop} setOpenDropdown={setOpenCoordinatorDrop} leagueCoordinators={leagueCoordinators} setLeagueCoordinators={setLeagueCoordinators} listUsers={listUsers} />
                            <div onClick={(e) => setOpenCoordinatorDrop(false)} class='z-[200] opacity-0 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
                            </>
                        )}
    
                    <div className='flex justify-between'>
                    <div>
                        <label for="numPerPeriod" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Period</label>
                        <input value={numPerPeriod} onChange={(e) => setNumPerPeriod(e.target.value)} type="text" id="numPerPeriod" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label for="timePerPeriod" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time per Period</label>
                        <input value={timePerPeriod} onChange={(e) => setTimePerPeriod(e.target.value)} type="text" id="timePerPeriod" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    </div>
    
    
                    <div>
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">League Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                    </div>
    
                    {message && (<p id="standard_error_help" className={`mt-4 text-center text-sm ${message.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}><span className="font-medium">{message.message}</span></p>)}
                    
                </div>
    
                {/* <!-- Modal footer --> */}
                <div class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button onClick={() => setOpenModal(false)} data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                    <button onClick={(e) => saveLeague(e)} data-modal-hide="defaultModal" type="button" class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[2rem] py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Save</button>
                </div>
            </div>
        </div>
    </div>
        <div onClick={(e) => setOpenModal(false)} class='z-[200] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
    </>
        )
}