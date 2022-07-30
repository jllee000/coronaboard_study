import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Accordion, Button } from 'react-bootstrap';

export default function CardPage() {
    return (
        <Container className="pt-3">
            <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle
                    className="p-0"
                    as={Button}
                    variant="Link"
                    eventKey="0"
                    >
                        카드의 헤더
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>카드컨텐츠</Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
        </Container>
    );
}