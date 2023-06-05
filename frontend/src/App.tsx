import LogInModal from "./components/LogInModal";
import NavBar from "./components/NavBar";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/user";
import { getLoggedInUser } from "./network/notes_api";
import styles from "./styles/NotesPage.module.css";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogInClicked={() => setShowLogInModal(true)}
        onLogOutSuccessful={() => setLoggedInUser(null)}
      ></NavBar>
      <Container className={styles.notesPage}>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
      </Container>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLogInModal && (
        <LogInModal
          onDismiss={() => setShowLogInModal(false)}
          onLogInSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLogInModal(false);
          }}
        />
      )}
    </div>
  );
}
