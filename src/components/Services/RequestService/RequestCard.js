import { useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Header,
  Label,
  Modal,
  Grid,
  Segment,
} from "semantic-ui-react";

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
let officeOptions = [
  {
    key: 1,
    text: "321 - ул. Хан Крум 12, 9000, Варна",
    value: "321",
  },
  {
    key: 2,
    text: "513 - ул. Витоша, 1000, София",
    value: "513",
  },
  { key: 3, text: "984 - ул. Цар Ивайло 8, 4000, Пловдив", value: "984" },
  {
    key: 3,
    text: "1023 - ул. Цар Борис III, 70, 5800 Плевен",
    value: "1023",
  },
];
const RequestCard = ({ text, type }) => {
  let [accValue, setAccValue] = useState(null);
  let [officeValue, setOfficeValue] = useState(null);
  let [open, setOpen] = useState(false);
  return (
    <div className="centered">
      <Header textAlign="center"> {text} </Header>
      <Segment>
        <Form>
          <Form.Group grouped>
            <Form.Field width={7}>
              <Label>Вързана към сметка: </Label>
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
              <Label>Вземане от клон:</Label>
              <Dropdown
                required
                fluid
                search
                selection
                wrapSelection={true}
                options={officeOptions}
                onChange={(e, { value }) => {
                  setOfficeValue(value);
                }}
                value={officeValue}
                placeholder="Избери клон"
              />
            </Form.Field>
            <Form.Field width={7}>
              <Label>Въведи парола</Label>
              <Form.Input icon="key" readonly></Form.Input>
            </Form.Field>
            <Form.Field width={7}>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                className="grey-colored-btn"
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
                    <br /> Вид услуга: Искане за издавне на{" "}
                    {type == "credit" ? "кредитна" : "дебитна"} карта
                  </Header>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    content="Okey"
                    labelPosition="right"
                    icon="checkmark"
                    className="grey-colored-btn"
                    onClick={() => setOpen(false)}
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
export default RequestCard;
