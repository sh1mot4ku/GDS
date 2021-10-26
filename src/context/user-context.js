import { createContext, useState } from 'react';
export const UserContext = createContext();
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

const UserProvider = ({children}) => {
  const [user, setUser] = useState(initialUser);
  const [business, setBusiness] = useState(initialBusinessUser);

  return (
      <UserContext.Provider value={{user, setUser, business, setBusiness}}>
					{children}
      </UserContext.Provider>
  );
};

export default UserProvider;


