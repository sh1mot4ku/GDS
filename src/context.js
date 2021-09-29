import { createContext } from 'react';
export const UserContext = createContext([{},() => {}]);
export const BusinessUserContext = createContext([{},() => {}]);
const userCommonInfo = {
	fullName: "",
	email: "",
	password: "",
	location: "",
	lookingFor: "",
};

export const initialUser = {
	...userCommonInfo,
	linkedin: "",
	github: "",
	website: "",
	englishLevel: "",
	description: "",
};

export const initialBusinessUser = {
	...userCommonInfo,
	commitment: "",
	mustHave: "",
	niceToHave: "",
	projectDetail: "",
};



