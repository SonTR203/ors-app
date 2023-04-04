/**
 * Last updated: 2023-03-27
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import { API } from 'aws-amplify';
import * as queries from '../src/graphql/queries';
import * as mutations from '../src/graphql/mutations';
import { Auth } from 'aws-amplify';
import makeid from '@/utils/makeId';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
	region: 'us-east-1',
});
const bucketName = 'orsappe5c5a5b29e5b44099d2857189b62061b154029-dev';
const signedUrlExpireSeconds = 60 * 1;
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

/**
 * @param {String} _id Retrieves player with ID
 * @returns
 */
export const getPlayerFunc = async (_id) => {
	try {
		const resp = await API.graphql({
			query: queries.getPlayer,
			variables: { id: _id },
		});
		console.log(resp);
		return resp.data.getPlayer;
	} catch (err) {
		console.warn(err);
	}
};

export const getPlayersByUsername = async (_id) => {
	try {
		const variables = {
			filter: {
				user_id: {
					eq: _id,
				},
			},
		};
		const resp = await API.graphql({
			query: queries.listPlayers,
			variables: variables,
		});
		return resp.data.listPlayers.items;
	} catch (err) {
		console.warn(err);
	}
};

/**
 * Returns all players in the database
 * @returns {[Object]} Player objects in an array
 */
export const getAllPlayers = async () => {
	try {
		const resp = await API.graphql({
			query: queries.listPlayers,
		});
		return resp.data.listPlayers.items.filter((item) => !item._deleted);
	} catch (err) {
		console.warn(err);
	}
};
/**
 *
 * @param {String} _id Retrieves team with ID
 * @returns
 */
export const getTeam = async (_id) => {
	try {
		const resp = await API.graphql({
			query: queries.getTeam,
			variables: { id: _id },
		});
		return resp.data.getTeam;
	} catch (err) {
		console.warn(err);
	}
};

/**
 * Returns all teams in the database
 * @returns {[Object]} Team objects in an array
 */
export const getAllTeams = async () => {
	try {
		const resp = await API.graphql({
			query: queries.listTeams,
		});
		return resp.data.listTeams.items;
	} catch (err) {
		console.warn(err);
	}
};

/**
 * Sends an update request to the User table
 * @param {String} id The id of the user that needs to be updated
 * @param {Object} updatedData An object containing the fields that needs to be updated.
 */
export const updateUserInfo = async (id, updatedData) => {
	try {
		const resp = await API.graphql({
			query: mutations.updateUsers,
			variables: {
				input: {
					id,
					...updatedData,
				},
			},
		});
		return resp;
	} catch (err) {
		console.warn(err);
	}
};

/**
 * Returns the current authenticated user
 * @returns {Object} the current authenticated user object.
 */
export const getCurrentUser = async () => {
	try {
		const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
		return user;
	} catch (err) {
		console.warn(err);
	}
};

// Reference https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/
/**
 * Update the user attributes in cognito
 * @param {Object} updatedData An object containing the fields that needs to be updated.
 * @returns {String} The result of the update operation as a string.
 */
export const changeUserAttributes = async (newAttributes) => {
	try {
		const user = await Auth.currentAuthenticatedUser();
		const result = await Auth.updateUserAttributes(user, newAttributes);
		return result;
	} catch (err) {
		console.warn(err);
		throw new Error(err.message);
	}
};

export const verifyUserAttributes = async (code) => {
	try {
		const result = await Auth.verifyCurrentUserAttributeSubmit('email', code);
		return result;
	} catch (err) {
		console.warn(err);
	}
};
// Reference https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/
/**
 * Update the user's password
 * @param {String} oldPassword The user's old password.
 * @param {String} newPassword The user's new password.
 * @returns {String} The result of the update operation as a string.
 */
export const changeUserPassword = async (oldPassword, newPassword) => {
	try {
		const user = await Auth.currentAuthenticatedUser();
		const result = await Auth.changePassword(user, oldPassword, newPassword);
		return result;
	} catch (err) {
		console.warn(err);
	}
};
/**
 * Create a team object
 * @param {object} teamData An object containing the team data.
 * @returns {String} The result of the operation.
 */
export const createTeam = async (teamData) => {
	try {
		const resp = await API.graphql({
			query: mutations.createTeam,
			variables: {
				input: teamData,
			},
		});
		return resp;
	} catch (err) {
		console.warn(err);
	}
};
/**
 * Update a team
 * @param {object} teamData An object containing the fields that needs to be updated.
 * @returns {String} The result of the operation.
 */
export const updateTeam = async (teamData) => {
	try {
		const resp = await API.graphql({
			query: mutations.updateTeam,
			variables: {
				input: teamData,
			},
		});
		return resp;
	} catch (err) {
		console.warn(err);
	}
};
/**
 * Update a soccer player
 * @param {object} teamData An object containing the fields that needs to be updated.
 * @returns {String} The result of the operation.
 */
export const updatePlayerSoccer = async (newData) => {
	try {
		const resp = await API.graphql({
			query: mutations.updatePlayersSoccer,
			variables: {
				input: newData,
			},
		});
		return resp;
	} catch (err) {
		console.warn(err);
	}
};
/**
 * Uploads an image to s3
 * @param {String} imageKey An unique identifier for the file.
 * @param {Object} image The image object
 * @returns {String} The file url
 */
export const uploadNewImageToS3 = async (imageKey = makeid(15), image) => {
	try {
		if (!image) return;
		const params = {
			Bucket: bucketName,
			Key: imageKey,
			Body: image,
			ContentType: image.type,
		};
		// Upload the image to S3
		s3.upload(params, (err, data) => {
			if (err) {
				// fail
				console.warn(err);
			} else {
				// success
				return data.Location;
			}
		});
		return imageKey;
	} catch (error) {
		console.error(error);
	}
};
/**
 * Gets a file from s3
 * @param {String} Key An unique identifier for the file.
 * @returns {String} The file url
 */
export const getImageFromS3 = async (key) => {
	const url = s3.getSignedUrl('getObject', {
		Bucket: bucketName,
		Key: key,
		Expires: signedUrlExpireSeconds,
	});
	return url;
};

/**
 * Get all matches
 * @returns {Array} An array of all available matches.
 */
export const getAllMatches = async () => {
	try {
		const resp = await API.graphql({
			query: queries.listGames,
		});
		return resp.data.listGames.items.filter((item) => !item._deleted);
	} catch (err) {
		console.warn(err);
	}
};

/**
 * Create a match object
 * @param {object} matchData An object containing the match data.
 * @returns {String} The result of the operation.
 */
export const createMatch = async (matchData) => {
	try {
		const resp = await API.graphql({
			query: mutations.createGames,
			variables: {
				input: matchData,
			},
		});
		return resp;
	} catch (err) {
		console.warn(err);
	}
};

/**
 *
 * @param {String} Key The file's name that will be deleted from S3 Bucket
 */
export const deleteImageFromS3 = async (key) => {
	try {
		const params = {
			Bucket: bucketName,
			Key: key,
		};
		s3.deleteObject(params, (err, data) => {
			if (err) {
				// fail
				console.warn(err);
			} else {
				// success
				console.log('Object deleted successfully');
			}
		});
	} catch (error) {
		console.error(error);
	}
};

export const getUser = async (username, setState) => {
	const params = {
		Username: username,
		UserPoolId: 'us-east-1_70GCK7G6t',
	};
	cognitoidentityserviceprovider.adminGetUser(params, function (err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else {
			return data;
		} // successful response
	});
};

export const createPlayer = async (username) => {
	try {
		const data = {
			user_id: username,
		};
		const apiData = await API.graphql({
			query: mutations.createPlayer,
			variables: { input: data },
		});
		return apiData;
	} catch (error) {
		console.error(error);
	}
};

export const createPlayerOnTeam = async (username, teamID) => {
	try {
		const data = {
			user_id: username,
			teamID: teamID,
		};
		const apiData = await API.graphql({
			query: mutations.createPlayer,
			variables: { input: data },
		});
		return apiData;
	} catch (error) {
		console.error(error);
	}
};

/**
 * get all leagues in the database
 * @returns {Array} an array of league objects
 */
export const getLeagues = async () => {
	try {
		const resp = await API.graphql({
			query: queries.listLeagues,
		});
		return resp.data.listLeagues.items;
	} catch (err) {
		console.warn(err);
	}
};
/**
 * get all games in a divisions
 * @param {String} divisionID The id of the division to get games for
 * @returns {Array} an array of games objects
 */
export const getDivisionGames = async (divisionID) => {
	try {
		const resp = await API.graphql({
			query: queries.gamesByDivision,
			variables: {
				division: divisionID,
			},
		});
		return resp.data.gamesByDivision.items;
	} catch (err) {
		console.warn(err);
	}
};
