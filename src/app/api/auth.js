export const isLoggedIn = () => {
    let data = localStorage.getItem("userDetail");
    return data !== null; 
  };
  
  export const doLogin = (data, token) => {
    localStorage.setItem("userDetail", JSON.stringify(data)); 
    localStorage.setItem("token", token);
  };
  
  export const doLogout = () => {
    localStorage.removeItem("userDetail"); 
    localStorage.removeItem("token");
  };
  
  export const getToken = () => {
    if (isLoggedIn()) {
      return localStorage.getItem("token");
    } else {
      return null;
    }
  };
  
  export const getUserDetails = () => {
    if (isLoggedIn()) {
      return JSON.parse(localStorage.getItem("userDetail"));
    } else {
      return null;
    }
  };

  export const getUserId = () => {
    if (isLoggedIn()) {
      const data =  JSON.parse(localStorage.getItem("userDetail"));
      return data?.appUserId??null
    } else {
      return null;
    }
  };