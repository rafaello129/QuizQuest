import React, { useState } from 'react';
import { Container, Form, Button, ListGroup, Card, Modal, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Groups.css';

const Groups = ({ groups, addGroup, updateGroup, quizzes }) => {
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null);

  const handleShowModal = (group = null) => {
    if (group) {
      setEditingGroup(group);
      setGroupName(group.name);
      setSelectedQuizzes(group.quizzes);
    } else {
      setGroupName('');
      setSelectedQuizzes([]);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingGroup(null);
  };

  const handleSaveGroup = () => {
    const group = {
      id: editingGroup ? editingGroup.id : Date.now(),
      name: groupName,
      quizzes: selectedQuizzes
    };
    if (editingGroup) {
      updateGroup(group);
    } else {
      addGroup(group);
    }
    handleCloseModal();
  };

  const handleQuizSelection = (quizId) => {
    setSelectedQuizzes((prev) =>
      prev.includes(quizId) ? prev.filter((id) => id !== quizId) : [...prev, quizId]
    );
  };

  return (
    <Container className="mt-5 groups-container">
      <h2 className="text-center">Grupos</h2>
      <div className="text-center mb-3">
        <Button variant="primary" onClick={() => handleShowModal()}>
          Crear Grupo
        </Button>
      </div>
      <ListGroup>
        {groups.map((group) => (
          <Card key={group.id} className="mb-3 card-dark">
            <Card.Body>
              <Card.Title>{group.name}</Card.Title>
              <Row>
                <Col>
                  <Button variant="outline-secondary" onClick={() => handleShowModal(group)} className="w-100 mb-3">
                    Editar
                  </Button>
                </Col>
                <Col>
                  <Button as={Link} to={`/group-quiz/${group.id}`} className="start-quiz-button w-100">
                    Iniciar Quizzes del Grupo
                  </Button>
                </Col>
              </Row>
              <ListGroup className="quiz-list mt-3">
                {group.quizzes.map((quizId) => {
                  const quiz = quizzes.find((q) => q.id === quizId);
                  return quiz ? <ListGroup.Item key={quiz.id} className="quiz-list-item">{quiz.title}</ListGroup.Item> : null;
                })}
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="modal-header-dark">
          <Modal.Title>{editingGroup ? 'Editar Grupo' : 'Crear Grupo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-dark">
          <Form>
            <Form.Group controlId="groupName">
              <Form.Label>Nombre del Grupo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del Grupo"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                className="form-control-dark"
              />
            </Form.Group>
            <Form.Group controlId="groupQuizzes">
              <Form.Label>Cuestionarios</Form.Label>
              {quizzes.map((quiz) => (
                <Form.Check
                  key={quiz.id}
                  type="checkbox"
                  label={quiz.title}
                  checked={selectedQuizzes.includes(quiz.id)}
                  onChange={() => handleQuizSelection(quiz.id)}
                  className="form-check-dark"
                />
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer-dark">
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveGroup}>
            {editingGroup ? 'Actualizar Grupo' : 'Guardar Grupo'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Groups;
