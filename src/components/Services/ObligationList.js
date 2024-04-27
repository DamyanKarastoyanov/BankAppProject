import { useState } from "react";
import {
  Button,
  Checkbox,
  Header,
  Modal,
  Table,
  Form,
  Label,
  Dropdown,
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

const ObligationList = ({ text }) => {
  let [open, setOpen] = useState(false);
  let obligationsList = [
    {
      oblID: 1,
      selected: false,
      recipient: "Tok OOD ",
      price: 29.43,
      currency: "BGN",
      toBePaidUntil: "5-25-2023",
    },
    {
      oblID: 2,
      selected: false,
      recipient: "Voda OOD ",
      price: 56.43,
      currency: "BGN",
      toBePaidUntil: "5-25-2023",
    },
    {
      oblID: 3,
      selected: false,
      recipient: "Parno OOD ",
      price: 29.43,
      currency: "BGN",
      toBePaidUntil: "5-25-2023",
    },
  ];
  let itemTCell = (
    <Table.Cell verticalAlign="middle" textAlign="center" selectable negative>
      {" "}
      Плати
    </Table.Cell>
  );
  let chosenTCells = (
    <Table.Cell verticalAlign="middle" textAlign="center" selectable negative>
      Плати посочените
    </Table.Cell>
  );
  let allCells = (
    <Table.Cell verticalAlign="middle" textAlign="center" selectable negative>
      {" "}
      Плати всичко
    </Table.Cell>
  );
  let [accValue, setAccValue] = useState(null);
  let [sum, setSum] = useState(null);
  return (
    <div>
      <Header textAlign="center"> {text} </Header>
      <Table celled textAlign="center" compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Избери:</Table.HeaderCell>
            <Table.HeaderCell>Име на подател</Table.HeaderCell>
            <Table.HeaderCell>Срок за плашане</Table.HeaderCell>
            <Table.HeaderCell>Цена</Table.HeaderCell>
            <Table.HeaderCell>Плащане</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {obligationsList &&
            obligationsList.map((obligation, index) => {
              return (
                <Table.Row>
                  <Table.Cell>
                    <Checkbox
                      name="checkboxRadioGroup"
                      value="Account"
                      onChange={(e, { checked }) => {
                        if (checked) {
                          setSum(sum + obligation.price);
                        } else {
                          setSum(sum - obligation.price);
                        }
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell negative={obligation.selected}>
                    {obligation.recipient}
                  </Table.Cell>
                  <Table.Cell negative={obligation.selected}>
                    {obligation.toBePaidUntil}
                  </Table.Cell>
                  <Table.Cell negative={obligation.selected} textAlign="right">
                    {obligation.price + " " + obligation.currency}
                  </Table.Cell>
                  <ModalPaymentWindow
                    obligation={obligation}
                    tableCell={itemTCell}
                  />
                </Table.Row>
              );
            })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.Cell colspan={4} textAlign="right">
              Избрани :{sum} BGN
            </Table.Cell>
            <ModalPaymentWindow tableCell={chosenTCells} />
          </Table.Row>
          <Table.Row>
            <Table.Cell colspan={4} textAlign="right">
              Total: {103.46 + " BGN"}
            </Table.Cell>
            <ModalPaymentWindow tableCell={allCells} />
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default ObligationList;

const ModalPaymentWindow = ({ tableCell, obligation = null }) => {
  let [open, setOpen] = useState(false);
  let [accValue, setAccValue] = useState(null);
  let chosenPrice = "";
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={tableCell}
    >
      <Modal.Header>Плащане на задължение</Modal.Header>
      <Modal.Content style={{ display: "flex", justifyContent: "center" }}>
        <Form>
          <Form.Group grouped>
            <Form.Field width={16}>
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
            <br></br>
            <Form.Field width={16}>
              <Label>Въведи сума:</Label>
              <Form.Input labelPosition="right" type="text" value="">
                <input />
                <Label>лв.</Label>
              </Form.Input>
            </Form.Field>
            <Form.Field width={7}></Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Okey"
          labelPosition="right"
          icon="checkmark"
          onClick={() => {
            setOpen(false);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};
