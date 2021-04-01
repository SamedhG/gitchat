import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { load_user } from "./store";

function Home() {
  const [userInfo, setUserInfo] = useState();

  let user = load_user();
  console.log(typeof(user))

  user = JSON.parse(user);

  console.log(user);

  useEffect(() => {
    let mounted = true;
    if (user) {
      const requestData = {
        access_token: user.access_token,
      };

      const proxy_url = "http://localhost:4000/api/v1/user/info";

      console.log(requestData);

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxy_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data);
        });
    }
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <h2>
        {console.log("User: ")}
        {console.log(userInfo)}
        {userInfo ? <div>Welcome {userInfo.login}</div> : <div></div>}
      </h2>
    </div>
  );
}

export default connect(() => ({  }))(Home);
