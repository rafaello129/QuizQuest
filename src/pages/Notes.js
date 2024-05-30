import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup, Card, Modal } from 'react-bootstrap';
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', subtitle: '', text: '', important: false });
  const [editingNote, setEditingNote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addOrUpdateNote = () => {
    if (editingNote) {
      setNotes(notes.map(note => (note.id === editingNote.id ? { ...editingNote, ...newNote } : note)));
    } else {
      setNotes([...notes, { ...newNote, id: Date.now() }]);
    }
    setNewNote({ title: '', subtitle: '', text: '', important: false });
    setEditingNote(null);
    setShowModal(false);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleImportant = (id) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, important: !note.important } : note)));
  };

  const handleShowModal = (note = null) => {
    if (note) {
      setEditingNote(note);
      setNewNote({ title: note.title, subtitle: note.subtitle, text: note.text, important: note.important });
    } else {
      setNewNote({ title: '', subtitle: '', text: '', important: false });
    }
    setShowModal(true);
  };

  return (
    <Container className="mt-5 notes-container">
      <h2 className="text-center">Notas</h2>
      <div className="text-center mb-3">
        <Button variant="primary" onClick={() => handleShowModal()}>
          Añadir Nota
        </Button>
      </div>
      <ListGroup className="mt-4">
        {notes.map(note => (
          <Card key={note.id} className={`mb-2 note-card ${note.important ? 'important-note' : ''}`}>
            <Card.Body>
              <Card.Title>{note.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted blanco">{note.subtitle}</Card.Subtitle>
              <Card.Text>{note.text}</Card.Text>
              <Button variant="outline-primary" onClick={() => handleShowModal(note)} className="mr-2">
                Editar
              </Button>
              <Button variant="outline-danger" onClick={() => deleteNote(note.id)} className="mr-2">
                Eliminar
              </Button>
              <Button variant={note.important ? "warning" : "outline-warning"} onClick={() => toggleImportant(note.id)}>
                {note.important ? "Quitar Importancia" : "Marcar como Importante"}
              </Button>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="modal-header-dark">
          <Modal.Title>{editingNote ? 'Editar Nota' : 'Añadir Nota'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-dark">
          <Form>
            <Form.Group controlId="noteTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Título de la nota"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="form-control-dark"
              />
            </Form.Group>
            <Form.Group controlId="noteSubtitle">
              <Form.Label>Subtítulo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subtítulo de la nota"
                value={newNote.subtitle}
                onChange={(e) => setNewNote({ ...newNote, subtitle: e.target.value })}
                className="form-control-dark"
              />
            </Form.Group>
            <Form.Group controlId="noteText">
              <Form.Label>Texto</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Texto de la nota"
                value={newNote.text}
                onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
                className="form-control-dark"
              />
            </Form.Group>
            <Form.Group controlId="noteImportant">
              <Form.Check
                type="checkbox"
                label="Importante"
                checked={newNote.important}
                onChange={(e) => setNewNote({ ...newNote, important: e.target.checked })}
                className="form-check-dark"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer-dark">
          <Button variant="secondary" onClick={() => setShowModal(false)} className="mr-2">
            Cancelar
          </Button>
          <Button variant="primary" onClick={addOrUpdateNote} className="ml-2">
            {editingNote ? 'Actualizar Nota' : 'Guardar Nota'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Notes;
