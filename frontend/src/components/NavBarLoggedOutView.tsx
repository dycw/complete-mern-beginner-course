import { Button } from "react-bootstrap";

type Props = {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
};

export default function NavBarLoggedOutView({
  onSignUpClicked,
  onLoginClicked,
}: Props) {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign Up</Button>
      <Button onClick={onLoginClicked}>Log In</Button>
    </>
  );
}
