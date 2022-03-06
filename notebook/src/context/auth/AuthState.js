import { useState ,useEffect} from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
    const intialUser=()=>{
        if(localStorage.getItem('token')) return true
        else return false
    }
    const [user, setUser] = useState(intialUser);
    const [userDetail, setUserDetail] = useState({  
      name:"Guest"
    });

    //geting user detail after login user is true
    const getUserDetail = async (noteRec) => {      
      const response = await fetch(`http://localhost:8000/api/auth/getuserdetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        }
      });
      const json =await response.json();
      setUserDetail(json)
    };
    useEffect(() => {
      if(user)
      {
        getUserDetail()
      }
    }, [user])
    
   

  return (
    <AuthContext.Provider value={{ user, setUser, userDetail}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
