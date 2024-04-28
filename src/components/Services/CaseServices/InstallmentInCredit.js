import { useState } from "react";
import {
  Button,
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
import useFetch from "../../../useFetch";
import { fetchOptions } from "../RequestService/RequestCard";
import { findAccountById, getFormattedDate } from "../PaymentViaCode";

export function findCreditById(credits, targetId) {
  for (let i = 0; i < credits.length; i++) {
    if (credits[i].id === targetId) {
      return credits[i];
    }
  }
  return null;
}
const InstallmentInCredit = ({ text }) => {
  let [open, setOpen] = useState(false);
  let [accValue, setAccValue] = useState(null);
  let [selectedCreditValue, setSelectedCreditValue] = useState(null);
  let [selectedCredit, setSelectedCredit] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  let [moneyValue, setValue] = useState(null);
  const currUser = JSON.parse(sessionStorage.getItem("username"));

  const bAccountsRaw = useFetch(
    "http://localhost:3002/bank_accounts?user=" + currUser,
    fetchOptions
  );

  let bankAccountsOptions;
  if (bAccountsRaw.data) {
    bankAccountsOptions = bAccountsRaw.data.map((account, index) => ({
      key: account.id,
      text: `${account.name} - ${account.balance.toFixed(2)} ${
        account.currency
      }`,
      value: account.id,
    }));
  }

  const creditsRaw = useFetch(
    "http://localhost:3002/taken_credits?user=" + currUser,
    fetchOptions
  );

  let creditsOptions;
  if (creditsRaw.data) {
    creditsOptions = creditsRaw.data.map((credit, index) => ({
      key: credit.id,
      text: `${credit.type} - ${credit.leftAmountToPay} `,
      value: credit.id,
    }));
  }

  const handleCreditInstallment = () => {
    if (
      selectedAccount.balance >= moneyValue &&
      moneyValue < selectedCredit.leftAmountToPay
    ) {
      selectedAccount.balance -= moneyValue;
      selectedCredit.leftAmountToPay -= moneyValue;

      setSelectedAccount(selectedAccount.balance.toFixed(2));
      selectedAccount.transactions.push({
        type: "expense",
        date: getFormattedDate(),
        description: `Вноска ${moneyValue} в ${selectedCredit.type}`,
        amount: -moneyValue,
      });
      fetch("http://localhost:3002/bank_accounts/" + selectedAccount.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedAccount),
      });
      fetch("http://localhost:3002/taken_credits/" + selectedCredit.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedCredit),
      });
      setOpen(true);
    }
    // check money -> account.balance

    // -> if true
    // substact value of the account.balance
    // add transaction to the account & fetch it
    // reduce credit remainAmount & fetch it
  };
  return (
    <div>
      {" "}
      <Header textAlign="center">{text}</Header>
      <Segment>
        <Form>
          <Form.Group grouped>
            <Grid columns={3} row={1}>
              <GridRow>
                <GridColumn width={7}>
                  <Form.Field>
                    <Label>Избор на сметка:</Label>
                    <Dropdown
                      required
                      fluid
                      search
                      selection
                      wrapSelection={true}
                      options={bankAccountsOptions}
                      onChange={(e, { value }) => {
                        setAccValue(value);
                        setSelectedAccount(
                          findAccountById(bAccountsRaw.data, value)
                        );
                      }}
                      value={accValue}
                      placeholder="Избери сметка"
                    />
                  </Form.Field>
                </GridColumn>
                <GridColumn width={1} verticalAlign="middle">
                  <Icon name="arrow right"> </Icon>
                </GridColumn>
                <GridColumn width={7}>
                  <Form.Field>
                    <Label>Внасяне по кредит</Label>
                    <Dropdown
                      required
                      fluid
                      search
                      selection
                      wrapSelection={true}
                      disabled={!accValue}
                      options={creditsOptions}
                      onChange={(e, { value }) => {
                        setSelectedCreditValue(value);
                        setSelectedCredit(
                          findCreditById(creditsRaw.data, value)
                        );
                      }}
                      value={selectedCreditValue}
                      placeholder="Избери кредита"
                    />
                  </Form.Field>
                </GridColumn>
              </GridRow>
              <GridRow centered>
                <Form.Field width={7}>
                  <Label>Посочи сума:</Label>
                  <Form.Input
                    icon="money"
                    iconPosition="right"
                    type="number"
                    disabled={!accValue || !selectedCreditValue}
                    onChange={(e) => {
                      let currValue = e.target.value;
                      if (selectedAccount.balance < currValue) {
                        currValue = selectedAccount.balance;
                      }
                      setValue(currValue);
                    }}
                  />
                </Form.Field>
              </GridRow>
            </Grid>
            <Form.Field width={7}>
              <Grid centered>
                <Button
                  content="Внеси"
                  className="grey-colored-btn"
                  onClick={handleCreditInstallment}
                  disabled={!accValue || !selectedCreditValue}
                />
              </Grid>
            </Form.Field>
          </Form.Group>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            className="grey-colored-btn"
          >
            <Modal.Header>
              {!accValue && !selectedCreditValue
                ? "Въведи всички полета правилно!"
                : "Вноската е успещна"}
            </Modal.Header>
            <Modal.Actions>
              <Button
                content="Okey"
                labelPosition="right"
                icon="checkmark"
                className="grey-colored-btn"
                onClick={() => {
                  setOpen(false);
                  setAccValue(null);
                  setSelectedAccount(null);
                  setSelectedCredit(null);
                  setSelectedCreditValue(null);
                }}
              />
            </Modal.Actions>
          </Modal>
        </Form>
      </Segment>
    </div>
  );
};

export default InstallmentInCredit;
