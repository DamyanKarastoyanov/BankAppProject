import { useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Header,
  Label,
  Segment,
} from "semantic-ui-react";
import { fetchOptions } from "./RequestService/RequestCard";
import useFetch from "../../useFetch";
import { findAccountById, getFormattedDate } from "./PaymentViaCode";

function findById(list, targetId) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === targetId) {
      return list[i];
    }
  }
  return null;
}

const VignettesForm = ({ text }) => {
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

  const vignettesRaw = useFetch(
    "http://localhost:3002/vignettes_pricetable",
    fetchOptions
  );
  let formattedVignettes;
  if (vignettesRaw.data) {
    formattedVignettes = vignettesRaw.data.map((vignette, index) => ({
      key: index,
      text: vignette.text + ": -> " + vignette.price + " " + vignette.currency,
      value: vignette.id,
    }));
  }

  let [selVignetteValue, setSelVignetteValue] = useState(null);
  let [currVignette, setCurrentVignette] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accValue, setAccValue] = useState(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isMissingMoney, setIsMissingMoney] = useState(false);

  const handlePayVignette = () => {
    console.log(currVignette);
    console.log(selectedAccount);
    // check if balance is enough
    if (+currVignette.price <= +selectedAccount.balance) {
      // -> add transaction to bank account
      selectedAccount.balance -= +currVignette.price;
      selectedAccount.transactions.push({
        type: "expense",
        date: getFormattedDate(),
        description: "E-vignettes",
        amount: -currVignette.price,
      });
      // -> request to the JSON
      fetch("http://localhost:3002/bank_accounts/" + selectedAccount.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedAccount),
      });
      const newVignette = {
        
      }
      // -> display message " Vignette is successfully purchased."
      setIsPaymentSuccess(true);
      // -> add it on the e-vignette list in the JSON
      // -> clear the fields in the form
    } else {
      // -> display message 'Unsufficient balance, change the
      setIsMissingMoney(true);
    }
  };

  return (
    <div className="centered">
      <Header textAlign="center"> {text} </Header>
      <Segment>
        <Form>
          <Form.Group grouped>
            <Form.Field width={7}>
              <Label>Номер на колата</Label>
              <Form.Input required readonly></Form.Input>
            </Form.Field>
            <Form.Field width={7}>
              <Label>Продължителност</Label>
              <Dropdown
                required
                fluid
                search
                selection
                wrapSelection={true}
                options={formattedVignettes}
                onChange={(e, { value }) => {
                  setTimeout(() => {
                    setSelVignetteValue(value);
                    setCurrentVignette(findById(vignettesRaw.data, value));
                  }, 1000);
                }}
                value={selVignetteValue}
                placeholder="Choose an option"
              />
            </Form.Field>
            <Form.Field width={7}>
              <Label>Цена</Label>
              <Form.Input
                required
                value={currVignette !== null ? currVignette.price : ""}
              ></Form.Input>
            </Form.Field>
            <Form.Field width={7}>
              <Label>Сметка за плащане</Label>
              {bAccountsRaw.data && (
                <Dropdown
                  required
                  fluid
                  search
                  selection
                  wrapSelection={false}
                  options={formattedBAccounts}
                  onChange={(e, { value }) => {
                    setAccValue(value);
                    let matchAcc = findAccountById(bAccountsRaw.data, value);
                    setSelectedAccount(matchAcc);
                  }}
                  value={accValue}
                  placeholder="Choose an option"
                />
              )}
            </Form.Field>

            <Grid centered>
              <Form.Field width={7}>
                <Button
                  content="Купи Е-Винетка"
                  onClick={handlePayVignette}
                  className="grey-colored-btn"
                />
              </Form.Field>
              <Grid.Row>
                <Header
                  textAlign="center"
                  style={{
                    display:
                      isPaymentSuccess || isMissingMoney ? "block" : "none",
                  }}
                >
                  {isMissingMoney
                    ? "Недостатъчна наличност в сметката. Моля посочете друга"
                    : isPaymentSuccess
                    ? "Винетката беше закупена успешно, за повече информация, отворете прозореца за проверка"
                    : " "}
                </Header>
                <Header
                  textAlign="center"
                  style={{ display: isMissingMoney ? "block" : "none" }}
                ></Header>
              </Grid.Row>
            </Grid>
          </Form.Group>
        </Form>
      </Segment>
    </div>
  );
};

export default VignettesForm;
