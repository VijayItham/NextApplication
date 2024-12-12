import Cookies from 'js-cookie';

export const isLoggedIn = () => {
    let data = Cookies.get("userDetail");
    return data !== undefined; 
};
  
export const doLogin = (data, token) => {
    console.log('data111', data, 'token111');
    
    // Store token and user details in cookies (1-day expiration)
    Cookies.set("userDetail", JSON.stringify(data));
    Cookies.set("token", token);
};
  
export const doLogout = () => {
    // Remove cookies
    Cookies.remove("userDetail", { path: '/' }); 
    Cookies.remove("token", { path: '/' });
};
  
export const getToken = () => {
    if (isLoggedIn()) {
      return Cookies.get("token");
    } else {
      return null;
    }
};
  
export const getUserDetails = () => {
    if (isLoggedIn()) {
      return JSON.parse(Cookies.get("userDetail"));
    } else {
      return null;
    }
};

export const getUserId = () => {
    if (isLoggedIn()) {
      const data = JSON.parse(Cookies.get("userDetail"));
      return data?.appUserId ?? null;
    } else {
      return null;
    }
};