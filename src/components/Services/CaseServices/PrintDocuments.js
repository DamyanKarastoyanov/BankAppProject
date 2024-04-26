import { useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Header,
  Label,
  Modal,
  Segment,
} from "semantic-ui-react";

let documentOptions = [
  { key: 0, text: "-", value: "hide" },
  { key: 1, text: "Удостоверение за банкова сметка", value: "show" },
  { key: 2, text: "Извлечения по сметка", value: "show" },
];
let accounts = [
  { name: "Раплащателна сметка", balance: 77.77, currency: "BGN" },
  { name: "Кредитна сметка", balance: 66.66, currency: "EUR" },
  { name: "Депозитна сметка", balance: 55.55, currency: "USD" },
];
let accA =
  accounts[0].name + " " + accounts[0].balance + " " + accounts[0].currency;
let accB =
  accounts[1].name + " " + accounts[1].balance + " " + accounts[1].currency;
let accC =
  accounts[2].name + " " + accounts[2].balance + " " + accounts[2].currency;

let accOptions = [
  { key: 1, text: accA, value: accA },
  { key: 2, text: accB, value: accB },
  { key: 3, text: accC, value: accC },
];
const PrintDocuments = ({ text }) => {
  let [open, setOpen] = useState(false);
  let [accValue, setAccValue] = useState(null);
  let [selectedDocument, setSelectedDocument] = useState(null);
  return (
    <div>
      {" "}
      <Header textAlign="center">{text}</Header>
      <Segment>
        <Form>
          <Form.Group grouped>
            <Form.Field width={7}>
              <Label>Вид документ:</Label>
              <Dropdown
                required
                fluid
                search
                selection
                wrapSelection={true}
                options={documentOptions}
                onChange={(e, { value }) => {
                  setSelectedDocument(value);
                }}
                value={selectedDocument}
                placeholder="Избери вид документи..."
              />
            </Form.Field>
            <Form.Field
              hidden={selectedDocument === "hide" ? true : false}
              width={7}
            >
              <Label>Избор на сметка:</Label>
              <Dropdown
                required
                fluid
                search
                selection
                wrapSelection={true}
                options={accOptions}
                onChange={(e, { value }) => {
                  setAccValue(value);
                }}
                value={accValue}
                placeholder="Избери сметка"
              />
            </Form.Field>
            <Form.Field width={7}>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                  <Grid centered>
                    <Button content="Заяви" className="grey-colored-btn" />
                  </Grid>
                }
              >
                <Modal.Header>Заявката е изпратена.</Modal.Header>
                <Modal.Content>
                  <Header textAlign="center">
                    {" "}
                    Код при отиване на каса :{" "}
                    <b> {Math.floor(Math.random() * 1000 + 1)}</b>
                  </Header>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    content="Okey"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
                    className="grey-colored-btn"
                  />
                </Modal.Actions>
              </Modal>
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    </div>
  );
};

export default PrintDocuments;
