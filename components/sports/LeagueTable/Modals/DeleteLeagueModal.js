/**
 * Last updated: 2023-03-29
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import { API } from "aws-amplify";
import { deleteDivision, deleteLeague, deleteSeason } from "@/src/graphql/mutations";
import { listDivisions, listSeasons } from "@/src/graphql/queries";

export default function DeleteLeagueModal({ leagueInfo, setDeleteModal, listLeaguesFunc }) {
    
    const deleteLeagueFunc = async (e) => {
        try {
            const deletedLeague = await API.graphql({
                query: deleteLeague,
                variables: {
                    input: { id: leagueInfo.id }
                }
            })
            setDeleteModal(false);
            await deleteAllSeasonsAndDivisions(leagueInfo.id);
            listLeaguesFunc();
        } catch (error) {
            alert('Problem deleting League');
            console.error(error);
        }
    }

    const deleteAllSeasonsAndDivisions = async (leagueID) => {
        const variables1 = {
            filter: { league: { eq: leagueID } }
        }
        const seasons = await API.graphql({
            query: listSeasons, variables: variables1,
        })
        const deleteTheseSeasons = seasons.data.listSeasons.items;
        // console.log('OBJECTS TO DELETE SEASONS', deleteTheseSeasons);

        // Delete all seasons from leagueID
        deleteTheseSeasons.forEach(async object => {
            const variables2 = {
                filter: { season: { eq: object.id } }
            }
            const divisions = await API.graphql({
                query: listDivisions, variables: variables2,
            })
            const deleteTheseDivisions = divisions.data.listDivisions.items;
            // console.log('OBJECTS TO DELETE DIVISIONS', deleteTheseDivisions);

            deleteTheseDivisions.forEach(async object => {
                await API.graphql({
                    query: deleteDivision,
                    variables: { input: { id: object.id }}
                })
            })
            await API.graphql({
                query: deleteSeason,
                variables: { input: { id: object.id }}
            })
        })
    }

    return (
        <>
          <div tabIndex="-1" class="z-[200] fixed top-[10rem] right-0 left-[0] p-4 overflow-x-hidden overflow-y-auto w-[32rem] mx-auto">
      <div class="relative w-full h-full max-w-md mx-auto w-[25rem]">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button onClick={(e) => setDeleteModal(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Close modal</span>
              </button>
              <div class="p-6 pr-[3.6rem] text-center min-w-[30rem]">
                  <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete <b>League<br/><i>{leagueInfo.name}</i></b>?</h3>
                  <button onClick={() => deleteLeagueFunc()} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                      Yes, I'm sure
                  </button>
                  <button onClick={() => setDeleteModal(false)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
              </div>
          </div>
      </div>
    </div>
    <div onClick={(e) => setDeleteModal(false)} class='z-[150] bg-gray-500 opacity-50 fixed top-0 left-0 w-[100%] h-[100%]' />
    </>
      )
}