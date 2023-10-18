import React from 'react';

const SignUp = () => {

  
  const [modalIsOpen1, setIsOpen1] = React.useState(false);

  function openModal1() {
    setIsOpen1(true);
  }
  const handleSignIn = (e) => {
    e.preventDefault();
    setShowLoginModal(true);
  };
  function closeModal1() {
    setIsOpen1(false);
  }
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    appType: "ecommerce",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const signUp = async (userInfo) => {
    try {
      const res = await axios.post(
        `https://academics.newtonschool.co/api/v1/user/signup`,
        getHeaderWithProjectIdAndBody(),
        userInfo
      );
      console.log(res);
      if (res.data.token) {
        console.log(res.data.token);
        setSuceessMessage("Account created succesffuly!");
        sessionStorage.setItem("authToken", res.data.token);
        sessionStorage.setItem(
          "userInfoSignUp",
          JSON.stringify(res.data.data.user)
        );
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    signUp(userInfo);
  };
  return (
    <div>
      
    </div>
  );
}

export default SignUp;
