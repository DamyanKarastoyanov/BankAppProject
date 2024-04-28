import { useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Header,
  Label,
  Modal,
  Grid,
  Segment,
} from "semantic-ui-react";
import useFetch from "../../../useFetch";

// bank_accounts, branches,

export const fetchOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

const RequestCard = ({ text, type }) => {
  let [accValue, setAccValue] = useState(null);
  let [open, setOpen] = useState(false);
  let [officeValue, setOfficeValue] = useState(null);
  let currUser = JSON.parse(sessionStorage.getItem("username"));

  let bAccountsRaw = useFetch(
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
  return (
    <div className="centered">
      <Header textAlign="center"> {text} </Header>
      <Segment>
        <Form>
          <Form.Group grouped>
            <Form.Field width={7}>
              <Label>Вързана към сметка: </Label>
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
                placeholder="Избери сметка"
              />
            </Form.Field>
            {branchesRaw.data && (
              <Form.Field width={7}>
                <Label>Вземане от клон:</Label>
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
                  placeholder="Избери клон"
                />
              </Form.Field>
            )}
            <Form.Field width={7}>
              <Label>Въведи парола</Label>
              <Form.Input icon="key" readonly></Form.Input>
            </Form.Field>
            <Form.Field width={7}>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                className="grey-colored-btn"
                trigger={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      content="Заяви"
                      className="grey-colored-btn"
                      disabled={!officeValue || !accValue}
                    />
                  </div>
                }
              >
                <Modal.Header>Заявката е изпратена.</Modal.Header>
                <Modal.Content>
                  <Header textAlign="center">
                    {" "}
                    Код при отиване на каса :{" "}
                    <b> {Math.floor(Math.random() * 1000 + 1)}</b>
                    <br /> Вид услуга: Искане за издавне на{" "}
                    {type === "credit" ? "кредитна" : "дебитна"} карта
                  </Header>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    content="Okey"
                    labelPosition="right"
                    icon="checkmark"
                    className="grey-colored-btn"
                    onClick={() => setOpen(false)}
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
export default RequestCard;
