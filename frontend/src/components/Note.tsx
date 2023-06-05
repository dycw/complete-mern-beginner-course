import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";
import { Note } from "../models/note";

type Props = {
	note: Note;
};

export default function Note({ note: { title, text } }: Props) {
	return (
		<Card className={styles.noteCard}>
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text className={styles.cardText}>{text}</Card.Text>
			</Card.Body>
		</Card>
	);
}
