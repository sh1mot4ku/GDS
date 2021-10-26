import database from "../firebase/firebase"

export const insertUser = (postingInfo, authId) => {
	database.ref(`/user/${authId}`).set(postingInfo).then(() => {
		console.log(postingInfo);
	})
}