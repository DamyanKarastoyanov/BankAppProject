import { useState } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Icon,
  Label,
  Modal,
  Segment,
} from "semantic-ui-react";

let credits = [
  {
    type: "Ипотечен",
    interest: "3% лихва",
    primalPrice: "60000 лв",
    leftAmountToPay: "52340 лв",
    thisMonthInstallment: "300.",
    yearsOfCredit: "20",
  },
  {
    type: "Потребителски",
    interest: "5% лихва",
    primalPrice: "3000 лв",
    leftAmountToPay: "2300 лв",
    thisMonthInstallment: "200лв.",
    yearsOfCredit: "1",
  },
  {
    type: "Потребителски",
    interest: "6% лихва",
    primalPrice: "5000 лв",
    leftAmountToPay: "3100 лв",
    thisMonthInstallment: "200лв.",
    yearsOfCredit: "2",
  },
];

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
const Installment = ({ text }) => {
  let [open, setOpen] = useState(false);
  let [accValue, setAccValue] = useState(null);
  return (
    <div>
      {" "}
      <Header textAlign="center">{text}</Header>
      <Segment>
        <Form>
          <Form.Group grouped>
            <Form.Field width={5}>
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
            <Form.Field></Form.Field>
            <Form.Field width={4}>
              <Label>Въведи сума:</Label>
              <Form.Input
                labelPosition="right"
                type="text"
                
              >
                <input />
                <Label>лв.</Label>
              </Form.Input>
            </Form.Field>
            <Form.Field width={7}>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                className="grey-colored-btn"
                open={open}
                trigger={
                  <Grid centered>
                    <Button content="Заяви" className="grey-colored-btn" />
                  </Grid>
                }
              >
                <Modal.Header>Заявката е успешна.</Modal.Header>
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
                    className="grey-colored-btn"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
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

export default Installment;
