import { useState } from "react";
import {
  Button,
  Checkbox,
  Dimmer,
  Dropdown,
  Form,
  Header,
  Icon,
  Image,
  Input,
  Label,
  Loader,
  Segment,
  Table,
  Modal,
} from "semantic-ui-react";
import ObligationList from "./ObligationList";

let options = [
  { key: 1, text: "Разплащателна сметка 77.77 BGN", value: 1 },
  { key: 2, text: "Кредитна сметкa 66.66 EUR", value: 2 },
  { key: 3, text: "Депозитна сметкa 55.55 USD", value: 3 },
];
const ComplexatoryTaxes = ({ text }) => {
  let [isTableHidden, setTableVisibility] = useState(true);
  let [loader, setLoader] = useState(true);
  return (
    <div>
      <Header textAlign="center"> {text} </Header>
      <Segment textAlign="center" vertical>
        <Form.Field>
          <Label> Рег. номер</Label>
          <Form.Input />
        </Form.Field>
        <div className="awaiting-data-field">
          <Button
            content="Зареди"
            color="blue"
            onClick={() => {
              setLoader(false);
              setInterval(() => {
                setLoader(true);
                setTableVisibility(false);
              }, 2000);
            }}
          />
        </div>

        <Segment hidden={loader}>
          <Dimmer active>
            <Loader size="huge">Loading</Loader>
          </Dimmer>

          <Image src="/images/wireframe/short-paragraph.png" />
          <Image src="/images/wireframe/short-paragraph.png" />
          <Image src="/images/wireframe/short-paragraph.png" />
        </Segment>

        <div hidden={isTableHidden}>
          <ObligationTable />
        </div>
      </Segment>
    </div>
  );
};
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

const ObligationTable = () => {
  let complexatoryTaxes = [
    {
      id: 1,
      registationID: "B 3923 BM",
      reason: "Електронен Фиш",
      status: "Връчена",
      dateOfOccurance: "4-25-2023",
      mustPayDate: "5-24-2023",
      price: 100.78,
    },
    {
      id: 2,
      registationID: "B 3923 BM",
      reason: "Електронен Фиш",
      status: "Платена",
      dateOfOccurance: "4-25-2023",
      mustPayDate: "5-24-2023",
      price: 50.64,
    },
    {
      id: 3,
      registationID: "B 3923 BM",
      reason: "Електронен Фиш",
      status: "Връчена",
      dateOfOccurance: "4-25-2023",
      mustPayDate: "5-24-2023",
      price: 25.09,
    },
    {
      id: 4,
      registationID: "B 3923 BM",
      reason: "Електронен Фиш",
      status: "Платена",
      dateOfOccurance: "4-25-2023",
      mustPayDate: "5-24-2023",
      price: 55.75,
    },
    {
      id: 5,
      registationID: "B 3923 BM",
      reason: "Електронен Фиш",
      status: "Връчена",
      dateOfOccurance: "4-25-2023",
      mustPayDate: "5-24-2023",
      price: 25.87,
    },
  ];

  let itemTCell = (tax) => (
    <Table.Cell
      negative={tax.status === "Връчена" ? true : false}
      positive={tax.status === "Платена" ? true : false}
      selectable={tax.status === "Връчена" ? true : false}
      verticalAlign="middle"
    >
      {" "}
      Плати{" "}
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
  let placeholderValue = 0;
  let [chosenSum, setSum] = useState(0);
  let [fullSum, setFullSum] = useState(0);
  return (
    <Table celled textAlign="center" compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Icon name="check" />
          </Table.HeaderCell>
          <Table.HeaderCell>Регистрационен номер</Table.HeaderCell>
          <Table.HeaderCell>Основание</Table.HeaderCell>
          <Table.HeaderCell>Статус</Table.HeaderCell>
          <Table.HeaderCell>Дата на нарушението</Table.HeaderCell>
          <Table.HeaderCell>Цена</Table.HeaderCell>
          <Table.HeaderCell>Действие</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {complexatoryTaxes &&
          complexatoryTaxes.map((tax) => {
            complexatoryTaxes.map((tax) => {
              if (tax.status === "Връчен") {
                placeholderValue += tax.price;
              }
            });
            return (
              <Table.Row>
                <Table.Cell
                  negative={tax.status === "Връчена" ? true : false}
                  positive={tax.status === "Платена" ? true : false}
                >
                  <Checkbox
                    name="checkboxRadioGroup"
                    value="Account"
                    disabled={tax.status === "Платена" ? true : false}
                    onChange={(e, { checked }) => {
                      if (checked) {
                        setSum(chosenSum + tax.price);
                      } else {
                        setSum(chosenSum - tax.price);
                      }
                    }}
                  />
                </Table.Cell>
                <Table.Cell
                  negative={tax.status === "Връчена" ? true : false}
                  positive={tax.status === "Платена" ? true : false}
                >
                  {tax.registationID}
                </Table.Cell>

                <Table.Cell
                  negative={tax.status === "Връчена" ? true : false}
                  positive={tax.status === "Платена" ? true : false}
                >
                  {tax.reason}
                </Table.Cell>

                <Table.Cell
                  negative={tax.status === "Връчена" ? true : false}
                  positive={tax.status === "Платена" ? true : false}
                >
                  {tax.status}
                </Table.Cell>

                <Table.Cell
                  negative={tax.status === "Връчена" ? true : false}
                  positive={tax.status === "Платена" ? true : false}
                >
                  {tax.dateOfOccurance}
                </Table.Cell>

                <Table.Cell
                  negative={tax.status === "Връчена" ? true : false}
                  positive={tax.status === "Платена" ? true : false}
                >
                  {tax.price}лв.
                </Table.Cell>
                <ModalPaymentWindow tableCell={itemTCell(tax)} object={tax} />
              </Table.Row>
            );
          })}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.Cell colspan={5} />
          <Table.Cell textAlign="right"> Избрано: {chosenSum} лв.</Table.Cell>
          <ModalPaymentWindow tableCell={chosenTCells} price={chosenSum} />
        </Table.Row>
        <Table.Row>
          <Table.Cell colspan={5} />
          <Table.Cell textAlign="right">Total: {fullSum} BGN</Table.Cell>
          <ModalPaymentWindow tableCell={allCells} price={chosenSum} />
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

const ModalPaymentWindow = ({ tableCell, price, object = null }) => {
  let [open, setOpen] = useState(false);
  let [accValue, setAccValue] = useState(null);
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
              <Form.Input labelPosition="right" type="text" value={price}>
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
export default ComplexatoryTaxes;
