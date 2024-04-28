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
import {
  findAccountById,
  findCardById,
  getFormattedDate,
} from "../PaymentViaCode";

const InstallmentInCard = ({ text }) => {
  let [open, setOpen] = useState(false);
  let [accValue, setAccValue] = useState(null);
  let [creditCardValue, setCreditCardValue] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [moneyValue, setMoneyValue] = useState(null);

  const currUser = JSON.parse(sessionStorage.getItem("username"));

  const bAccountsRaw = useFetch(
    "http://localhost:3002/bank_accounts?user=" + currUser,
    fetchOptions
  );
  let formattedBAccounts;
  if (bAccountsRaw.data) {
    formattedBAccounts = bAccountsRaw.data.map((account, index) => ({
      key: account.id,
      text: `${account.name} - ${account.balance.toFixed(2)} ${
        account.currency
      }`,
      value: account.id,
    }));
  }
  const creditCardsRaw = useFetch(
    "http://localhost:3002/created_cards?user=" + currUser,
    fetchOptions
  );
  let creditCardOptions;
  if (creditCardsRaw.data) {
    creditCardOptions = creditCardsRaw.data.map((card, index) => ({
      key: card.id,
      text: `${card.cardNumber} - ${card["current_balance"]} BGN`,
      value: card.id,
    }));
  }

  const handleCreditCardRecharge = () => {
    // check money <= account.balance
    if (moneyValue <= selectedAccount.balance) {
      // -> substract the value in account balance
      selectedAccount.balance -= moneyValue;
      // -> add the value in credit card
      selectedCard["current_balance"] += moneyValue;
      // -> add transaction regarding that
      selectedAccount.transactions.push({
        type: "expense",
        date: getFormattedDate(),
        description: `Recharging credit card ${selectedCard.cardNumber}`,
        amount: -moneyValue,
      });
      fetch("http://localhost:3002/bank_accounts/" + selectedAccount.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedAccount),
      });
      fetch("http://localhost:3002/created_cards/" + selectedCard.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedCard),
      });
      setOpen(true);
      // ->
    }
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
                      options={formattedBAccounts}
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
                    <Label>Внасяне в карта</Label>
                    <Dropdown
                      required
                      fluid
                      search
                      selection
                      wrapSelection={true}
                      options={creditCardOptions}
                      onChange={(e, { value }) => {
                        setCreditCardValue(value);
                        setSelectedCard(
                          findCardById(creditCardsRaw.data, value)
                        );
                      }}
                      value={creditCardValue}
                      placeholder="Избери картата"
                    />
                  </Form.Field>
                </GridColumn>
              </GridRow>
              <GridRow centered>
                <Form.Field width={4}>
                  <Label>Въведи сума:</Label>
                  <Form.Input
                    labelPosition="right"
                    type="text"
                    value={moneyValue}
                    onChange={(e) => {
                      setMoneyValue(e.target.value);
                    }}
                  />
                  <Label>лв.</Label>
                </Form.Field>
              </GridRow>
            </Grid>
            <Grid centered>
              <Button
                content="Внеси"
                className="grey-colored-btn"
                onClick={handleCreditCardRecharge}
                disabled={!accValue || !moneyValue || !creditCardValue}
              />
            </Grid>
          </Form.Group>
        </Form>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
        >
          <Modal.Header>Вноската е успешна.</Modal.Header>
          <Modal.Actions>
            <Button
              content="Okey"
              labelPosition="right"
              icon="checkmark"
              className="grey-colored-btn"
              onClick={() => setOpen(false)}
              positive
            />
          </Modal.Actions>
        </Modal>
      </Segment>
    </div>
  );
};

export default InstallmentInCard;
