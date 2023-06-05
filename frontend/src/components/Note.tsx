import { Note as NoteModel } from "../models/note";
import styles from "../styles/Note.module.css";
import formatDate from "../utils/formatDate";
import { Card } from "react-bootstrap";

type Props = {
  note: NoteModel;
  className?: string;
};

export default function Note({
  note: { title, text, createdAt, updatedAt },
  className,
}: Props) {
  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated: ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatDate(createdAt)}`;
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
}
