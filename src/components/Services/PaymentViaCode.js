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
import { fetchOptions } from "./RequestService/RequestCard";
import useFetch from "../../useFetch";

export function getFormattedDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0"); // Get the day and pad with leading zero if necessary
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Get the month (zero-based) and pad with leading zero if necessary
  const year = today.getFullYear(); // Get the full year

  // Return the formatted date string in dd.mm.yyyy format
  return `${day}.${month}.${year}`;
}
export function findAccountById(accounts, targetId) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id === targetId) {
      return accounts[i];
    }
  }
  return null;
}

const PaymentViaCode = ({ text }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [open, setOpen] = useState(false);
  const [currPayment, setCurrPayment] = useState(null);
  const [code, setCode] = useState("");
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isMissingMoney, setIsMissingMoney] = useState(false);
  const [accValue, setAccValue] = useState(null);
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

  const codePaymentRaw = useFetch(
    "http://localhost:3002/awaiting_payments_via_code",
    fetchOptions
  );

  let displayModal = (e) => {
    setIsCodeInvalid(false);
    if (codePaymentRaw.data) {
      if (code.length === 10) {
        if (codePaymentRaw.data.map((code) => code.id).includes(code)) {
          codePaymentRaw.data.forEach((payment) => {
            if (+code === +payment.id) {
              setCurrPayment(payment);
              setIsCodeInvalid(false);
            }
          });
        } else {
        }
      } else {
        return false;
      }
    }
    if (isCodeInvalid) {
      setOpen(true);
    }
  };

  let handlePay = () => {
    if (selectedAccount.balance >= currPayment.price) {
      //   -> add a transaction to the history of the said
      selectedAccount.balance -= currPayment.price;
      setSelectedAccount(selectedAccount.balance.toFixed(2));
      selectedAccount.transactions.push({
        type: "expense",
        date: getFormattedDate(),
        description: "Payment via 10digit code",
        amount: -currPayment.price,
      });
      fetch("http://localhost:3002/bank_accounts/" + selectedAccount.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedAccount),
      });
      codePaymentRaw.data.forEach((payment, index) => {
        if (+payment.id === code) {
          codePaymentRaw.data.splice(index, 1);
        }
      });
      fetch(
        "http://localhost:3002/awaiting_payments_via_code/" + currPayment.id,
        {
          method: "DELETE",
        }
      );

      setCurrPayment(null);
      setIsPaymentSuccess(true);
      //   -> display message about completed
      setOpen(false);
    } else {
      setIsMissingMoney(true);
      //   -> errorMessage in the dialog saying 'Unsufficient balance.Please change the payment method.
    }
  };
  return (
    <div>
      <Header textAlign="center"> {text} </Header>
      <Segment textAlign="center" vertical>
        <Input
          icon="search"
          placeholder="Enter your code"
          className="pay-with-10-code"
          onChange={(e) => {
            setCode(e.target.value);
          }}
          maxLength={10}
        />{" "}
        <Header
          textAlign="center"
          style={{
            display: isCodeInvalid || isPaymentSuccess ? "block" : "none",
          }}
        >
          {isCodeInvalid
            ? "No obligation with the given code was found."
            : isPaymentSuccess
            ? "Successful Payment"
            : " "}
        </Header>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <Button content="Провери" color="green" onClick={displayModal} />
          }
        >
          <Modal.Header className="ui centered">
            {" "}
            Прикачено плащане с 10 цифрен код <br />
            {currPayment && currPayment.id}
          </Modal.Header>
          <Modal.Content>
            <Grid columns="equal" textAlign="center" divided>
              <GridRow>
                <GridColumn>Фирма</GridColumn>
                <GridColumn>Срок</GridColumn>
                <GridColumn>Цена</GridColumn>
              </GridRow>
              {currPayment !== null && (
                <GridRow>
                  <GridColumn>{currPayment.recipient}</GridColumn>
                  <GridColumn>{currPayment.endDate}</GridColumn>
                  <GridColumn>
                    {currPayment.price + " " + currPayment.currency}
                  </GridColumn>
                </GridRow>
              )}
            </Grid>
            <Divider></Divider> <Label> Избери сметка </Label>
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
                  setSelectedAccount(findAccountById(bAccountsRaw.data, value));
                  console.log(accValue);
                }}
                value={accValue}
                placeholder="Choose an option"
              />
            )}
          </Modal.Content>{" "}
          <Header textAlign="right">
            {currPayment !== null &&
              "Общо: " + currPayment.price + currPayment.currency}
          </Header>
          <Header
            textAlign="right"
            style={{ display: isMissingMoney ? "block" : "none" }}
          >
            Missing missing funds, please select another account.
          </Header>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => {
                setOpen(false);
                setCurrPayment(null);
              }}
            >
              Back
            </Button>

            <Button
              content="Pay"
              labelPosition="right"
              icon="money"
              disabled={isCodeInvalid ? true : false}
              onClick={handlePay}
              positive
            />
          </Modal.Actions>
        </Modal>
      </Segment>{" "}
    </div>
  );
};
export default PaymentViaCode;
