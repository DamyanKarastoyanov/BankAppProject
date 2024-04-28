import { useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Header,
  Label,
  Modal,
  Segment,
} from "semantic-ui-react";
import useFetch from "../../../useFetch";
import { fetchOptions } from "../RequestService/RequestCard";

let options = [
  { key: 1, text: "1000лв.", value: 1000 },
  { key: 2, text: "2000лв.", value: 2000 },
  { key: 3, text: "3000лв.", value: 3000 },
  { key: 4, text: "4000лв.", value: 4000 },
  { key: 5, text: "5000лв.", value: 5000 },
  { key: 6, text: "6000лв.", value: 6000 },
  { key: 7, text: "7000лв.", value: 7000 },
  { key: 8, text: "8000лв.", value: 8000 },
  { key: 9, text: "9000лв.", value: 9000 },
  { key: 10, text: "10000лв.", value: 10000 },
];

const BigAmounts = ({ text }) => {
  let [selectedValue, setValue] = useState(null);
  let [accValue, setAccValue] = useState(null);
  let [officeValue, setOfficeValue] = useState(null);
  let [open, setOpen] = useState(false);
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
      service: `Large withdrawing ${selectedValue} BGN`,
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
              <Label>Изтегли в брой:</Label>
              <Dropdown
                required
                fluid
                search
                selection
                wrapSelection={true}
                options={options}
                onChange={(e, { value }) => {
                  setValue(value);
                  console.log(selectedValue);
                }}
                value={selectedValue}
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
                    content="Заяви сумата"
                    className="grey-colored-btn"
                    onClick={handleRequest}
                    disabled={!accValue || !officeValue || !selectedValue}
                  />
                }
              >
                <Modal.Header>Заявката е изпратена.</Modal.Header>
                <Modal.Content>
                  <Header textAlign="center">
                    {" "}
                    Код при отиване на каса :{" "}
                    <b> {Math.floor(Math.random() * 1000 + 1)}</b>
                  </Header>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    content="Okey"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    className="grey-colored-btn"
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

export default BigAmounts;
