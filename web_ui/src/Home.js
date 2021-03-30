import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { load_user } from "./store";


function Home({user}) {
    const [userInfo, setUserInfo] = useState();

    

    user = user || load_user()

    if (user){
        const requestData = {
            access_token: user.access_token,
          };
    
          const proxy_url = "http://localhost:4000/api/v1/user/info";
    
          console.log(requestData)
    
          // Use code parameter and other parameters to make POST request to proxy_server
          fetch(proxy_url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData),
          })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            });
        
    }



    return (<div> Home Goes Here </div>)
}

export default connect(({ user }) => ({ user }))(Home);
