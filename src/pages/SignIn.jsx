
import {SignIn} from "../components/signinandup/index"

const SignInPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
    <SignIn/>
    </>
  );
};

export default SignInPage;
