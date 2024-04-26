import { useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Input,
  Label,
  Modal,
  Segment,
} from "semantic-ui-react";
const systemData = [
  {
    id: 87987,
    flag: "bg",
    currency: "BGN",
    name: "Разплащателна сметка",
    balance: 77.77,
    transactions: [
      {
        type: "expense",
        description: "Maint Fee Uncollected",
        amount: -24.34,
        date: "23 march 2024",
      },
      {
        type: "income",
        description: "Maint Fee Uncollected",
        amount: 54.39,
        date: "20 april 2024",
      },
      {
        type: "expense",
        description: "Maint Fee Uncollected",
        amount: -8.34,
        date: "15 may 2024",
      },
      {
        type: "income",
        description: "Maint Fee Uncollected",
        amount: 9.67,
        date: "15 june 2024",
      },
    ],
  },
  {
    id: 8787,
    flag: "bt",
    currency: "EUR",
    name: "Кредитна сметка",
    balance: 66.66,
    transactions: [
      {
        type: "expense",
        description: "Maint Fee Uncollected",
        amount: -24.34,
        date: "23 march 2024",
      },
      {
        type: "expense",
        description: "Maint Fee Uncollected",
        amount: -8.34,
        date: "15 may 2024",
      },
      {
        type: "income",
        description: "Maint Fee Uncollected",
        amount: 9.67,
        date: "15 june 2024",
      },
    ],
  },
  {
    id: 8987,
    flag: "bh",
    currency: "USD",
    name: "Депозитна сметка",
    balance: 55.55,
    transactions: [
      {
        type: "expense",
        description: "Maint Fee Uncollected",
        amount: -24.34,
        date: "23 march 2024",
      },
      {
        type: "income",
        description: "Maint Fee Uncollected",
        amount: 54.39,
        date: "20 april 2024",
      },
    ],
  },
];
let options = [
  { key: 1, text: "", value: 1 },
  { key: 2, text: "", value: 2 },
  { key: 3, text: "", value: 3 },
];
systemData.map((account, index) => {
  options[index].key = index + 1;
  options[index].value = index + 1;
  options[
    index
  ].text = `${account.name}, ${account.balance} ${account.currency}`;
  return false;
});

let attachedPayments = [
  { recipient: "Еха ООД", endDate: "29/5/23", price: 24.95, currency: "BGN" },
];

const AccountSelection = () => (
  <Dropdown
    fluid
    search
    selection
    wrapSelection={false}
    options={options}
    placeholder="Choose an option"
  />
);

const PaymentViaCode = ({ text }) => {
  let [open, setOpen] = useState(false);
  let findPayment = (e) => {
    let neededInputValue = e.target.parentNode.querySelector("div input").value;
    if (neededInputValue.length >= 10) {
      setOpen(true);
    } else {
      return false;
    }
  };
  let openBtn = (
    <Button content="Провери" color="green" onClick={findPayment} />
  );
  return (
    <div>
      <Header textAlign="center"> {text} </Header>
      <Segment textAlign="center" vertical>
        <Input
          icon="search"
          placeholder="Enter your code"
          className="pay-with-10-code"
          maxLength={10}
        />{" "}
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => findPayment}
          open={open}
          trigger={openBtn}
        >
          <Modal.Header className="ui centered">
            {" "}
            Прикачено плащане с 10 цифрен{" "}
          </Modal.Header>
          <Modal.Content>
            <Grid
              columns="equal"
              textAlign="center"
              divided
              className="margin-less"
            >
              <GridRow>
                <GridColumn>Фирма</GridColumn>
                <GridColumn>Срок</GridColumn>
                <GridColumn>Цена</GridColumn>
              </GridRow>
              {attachedPayments &&
                attachedPayments.map((payment) => {
                  return (
                    <GridRow>
                      <GridColumn>{payment.recipient}</GridColumn>
                      <GridColumn>{payment.endDate}</GridColumn>
                      <GridColumn>
                        {payment.price + payment.currency}
                      </GridColumn>
                    </GridRow>
                  );
                })}
            </Grid>
            <Divider></Divider> <Label> Избери сметка </Label>
            <AccountSelection />
          </Modal.Content>{" "}
          <Header textAlign="right">
            {"Общо: " +
              attachedPayments[0].price +
              attachedPayments[0].currency}
          </Header>
          <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)}>
              Back
            </Button>
            <Button
              content="Pay"
              labelPosition="right"
              icon="money"
              onClick={() => setOpen(false)}
              positive
            />
          </Modal.Actions>
        </Modal>
      </Segment>{" "}
    </div>
  );
};
export default PaymentViaCode;
