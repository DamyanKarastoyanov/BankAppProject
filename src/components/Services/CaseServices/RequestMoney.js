import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Header,
  Label,
  Modal,
  Segment,
} from "semantic-ui-react";
import useFetch from "../../../useFetch";
import { fetchOptions } from "../RequestService/RequestCard";
import { findCardById } from "../PaymentViaCode";

const moneyOptions = [
  { key: 1, text: "100", value: 100 },
  { key: 2, text: "200", value: 200 },
  { key: 3, text: "300", value: 300 },
  { key: 4, text: "400", value: 400 },
  { key: 5, text: "500", value: 500 },
  { key: 6, text: "600", value: 600 },
  { key: 7, text: "700", value: 700 },
  { key: 9, text: "800", value: 800 },
  { key: 9, text: "900", value: 900 },
  { key: 10, text: "1000", value: 1000 },
];

export function findBranchById(branches, targetId) {
  for (let i = 0; i < branches.length; i++) {
    if (branches[i].id === targetId) {
      return branches[i];
    }
  }
  return null;
}

const RequestMoney = ({ text }) => {
  let [moneyValue, setValue] = useState(null);
  let [officeValue, setOfficeValue] = useState(null);
  let [open, setOpen] = useState(false);
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
  let branchesRaw = useFetch("http://localhost:3002/branches", fetchOptions);
  let formattedBranches;

  if (branchesRaw.data) {
    formattedBranches = branchesRaw.data.map((branch, index) => ({
      key: index,
      text: `${branch.id} - ${branch.address} `,
      value: branch.id,
    }));
  }
  const handleRequest = () => {
    const caseService = {
      id: Math.floor((Math.random() + 1) * 9999),
      user: currUser,
      service: `Withdrawing ${moneyValue} BGN`,
      branch: officeValue,
      status: "reviewing",
    };

    fetch(`http://localhost:3002/cashier_requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(caseService),
    });
  };

  return (
    <div className="centered">
      <Header textAlign="center"> {text} </Header>
      <Segment>
        <Form>
          <Form.Group grouped>
            <Form.Field width={7}>
              <Label>Избери Сметка</Label>
              <Dropdown
                required
                fluid
                search
                selection
                wrapSelection={true}
                options={formattedBAccounts}
                onChange={(e, { value }) => {
                  setAccValue(value);
                }}
                value={accValue}
                placeholder="Избери сметка."
              />
            </Form.Field>
            <Form.Field width={7}>
              <Label>Избери клон:</Label>
              <Dropdown
                required
                fluid
                search
                selection
                wrapSelection={true}
                options={formattedBranches}
                onChange={(e, { value }) => {
                  setOfficeValue(value);
                }}
                value={officeValue}
                placeholder="Код - Адрес на клон"
              />
            </Form.Field>
            <Form.Field width={7}>
              <Label>Посочи сума:</Label>
              <Dropdown
                required
                fluid
                readOnly
                search
                selection
                wrapSelection={true}
                options={moneyOptions}
                onChange={(e, { value }) => {
                  setValue(value);
                }}
                value={moneyValue}
                placeholder="Избери Сума."
              />
            </Form.Field>
            <Form.Field width={7}>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                  <Button
                    content="Заяви"
                    className="grey-colored-btn"
                    onClick={handleRequest}
                    disabled={!accValue || !officeValue || !moneyValue}
                  />
                }
              >
                <Modal.Header>Заявката е изпратена.</Modal.Header>
                <Modal.Content>
                  <Header textAlign="center">
                    {" "}
                    Код при отиване на каса :
                    <b> {Math.floor(Math.random() * 1000 + 1)}</b>
                    <br />
                    Сума за изтеглене: {moneyValue + "BGN"}
                  </Header>
                </Modal.Content>
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
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    </div>
  );
};

export default RequestMoney;
