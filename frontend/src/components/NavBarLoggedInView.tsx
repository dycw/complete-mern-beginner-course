import { User } from "../models/user";
import { logOut as logOutAPI } from "../network/notes_api";
import { Button, Navbar } from "react-bootstrap";

type Props = {
  user: User;
  onLogoutSuccessful: () => void;
};

export default function NavBarLoggedInView({
  user,
  onLogoutSuccessful,
}: Props) {
  async function logOut() {
    try {
      await logOutAPI();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Signed in as: {user.username}</Navbar.Text>
      <Button onClick={logOut}>Log out</Button>
    </>
  );
}
