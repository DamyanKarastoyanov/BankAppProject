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

let creditCards = [
  {
    id: 5453,
    cardNumber: "******67 4116",
    cardType: "Credit Card",
    expireDate: "10/24",
  },
  {
    id: 5523,
    cardNumber: "******78 3156",
    cardType: "Credit Card",
    expireDate: "2/27",
  },
];
let creditCardOptions = [
  {
    key: 1,
    text: `${creditCards[0].cardNumber}, ${creditCards[0].expireDate}`,
    value: `${creditCards[0].cardNumber}, ${creditCards[0].expireDate}`,
  },
  {
    key: 2,
    text: `${creditCards[1].cardNumber}, ${creditCards[1].expireDate}`,
    value: `${creditCards[1].cardNumber}, ${creditCards[1].expireDate}`,
  },
];
const RequestMortgage = ({ text }) => {
  let [open, setOpen] = useState(false);
  return (
    <div>
      {" "}
      <Header textAlign="center">{text}</Header>
      <Segment>
        <Form>
          <Form.Group grouped>
            <Form.Field width={4}>
              <Label>Въведи сума:</Label>
              <Form.Input
                labelPosition="right"
                type="text"
                placeholder="2000.00"
              >
                <input />
                <Label>лв.</Label>
              </Form.Input>
            </Form.Field>
            <Form.Field width={4}>
              <Label>Тел.номер</Label>
              <Form.Input type="text" value="0867 984 384"></Form.Input>
            </Form.Field>
            <Form.Field width={4}>
              <Label>Въведи email адрес</Label>
              <Form.Input
                labelPosition="right"
                type="text"
                placeholder="eha123@abv.bg"
              ></Form.Input>
            </Form.Field>
            <Form.Field width={4}>
              <Checkbox
                required
                label="Запознат съм с Информацията за обработване на личните данни"
              />
            </Form.Field>
            <Form.Field width={4}>
              <Checkbox required label="Приемам общите условия" />
            </Form.Field>
            <Form.Field width={4}>
              <Checkbox required label="Да ми бъде издадена кредитна карта." />
            </Form.Field>
            <Form.Field width={7}>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                  <Grid centered>
                    <Button content="Внеси" className="grey-colored-btn" />
                  </Grid>
                }
              >
                <Modal.Header>Вноската е успешна.</Modal.Header>
                <Modal.Actions>
                  <Button
                    content="Okey"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
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

export default RequestMortgage;
