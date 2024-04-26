import { useState } from "react";
import {
  Button,
  Checkbox,
  Dimmer,
  Dropdown,
  Form,
  Header,
  Image,
  Input,
  Loader,
  Segment,
  Table,
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
const AwaitingObligations = ({ text }) => {
  let [criteria, setCriteria] = useState("EGN");
  let [accValue, setAccValue] = useState(null);
  let [isTableHidden, setTableVisibility] = useState(true);
  let [loader, setLoader] = useState(true);
  return (
    <div>
      <Header textAlign="center"> {text} </Header>
      <Segment textAlign="center" vertical>
        <Form.Field>
          <Checkbox
            radio
            label="EGN"
            name="checkboxRadioGroup"
            value="EGN"
            checked={criteria === "EGN"}
            onChange={(e, data) => setCriteria(data.value)}
          />
          <Checkbox
            radio
            label="Сметка"
            name="checkboxRadioGroup"
            value="Account"
            checked={criteria === "Account"}
            onChange={(e, data) => setCriteria(data.value)}
          />
        </Form.Field>
        <div className="awaiting-data-field">
          {criteria === "EGN" ? (
            <Input
              icon="search"
              placeholder="Въведи ЕГН"
              className="pay-with-10-code"
              maxLength={10}
              value="024985984"
            />
          ) : (
            <Dropdown
              search
              selection
              wrapSelection={false}
              options={accOptions}
              placeholder="Избери сметка"
              onChange={(e, { value }) => {
                setAccValue(value);
              }}
              defaultValue={accOptions[0].text}
            />
          )}
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
          <ObligationTable currency="BGN" />
        </div>
      </Segment>
    </div>
  );
};
const ObligationTable = ({ currency }) => {
  let obligationsList = [
    {
      oblID: 1,
      selected: false,
      recipient: "Tok OOD ",
      price: 29.43,
      currency,
      toBePaidUntil: "5-25-2023",
    },
    {
      oblID: 2,
      selected: false,
      recipient: "Voda OOD ",
      price: 56.43,
      currency,
      toBePaidUntil: "5-25-2023",
    },
    {
      oblID: 3,
      selected: false,
      recipient: "Parno OOD ",
      price: 29.43,
      currency,
      toBePaidUntil: "5-25-2023",
    },
  ];
  return (
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
                    onChange={() => {
                      obligationsList[index].selected =
                        !obligationsList[index].selected;
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
                <Table.Cell
                  verticalAlign="middle"
                  textAlign="center"
                  selectable
                  negative
                  onClick={() => {}}
                >
                  {" "}
                  Плати
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.Cell></Table.Cell>
          <Table.Cell textAlign="right">Избрани: 29.34BGN</Table.Cell>
          <Table.Cell
            verticalAlign="middle"
            textAlign="center"
            selectable
            positive
          >
            {" "}
            Плати посочените
          </Table.Cell>
          <Table.Cell textAlign="right">Total: {103.46 + " BGN"}</Table.Cell>
          <Table.Cell
            verticalAlign="middle"
            textAlign="center"
            selectable
            positive
          >
            {" "}
            Плати всичко
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default AwaitingObligations;
