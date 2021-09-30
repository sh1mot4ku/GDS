import database from "../firebase/firebase"
import { v4 as uuidv4 } from 'uuid';

export const insertUser = (postingInfo) => {
  const uuid = uuidv4();
	database.ref(`/user/${uuid}`).set(postingInfo).then(() => {
		console.log(postingInfo);
	})
}