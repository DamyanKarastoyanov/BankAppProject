import { useState } from "react";
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

let documentOptions = [
  { key: 0, text: "-", value: "hide" },
  { key: 1, text: "Удостоверение за банкова сметка", value: "show" },
  { key: 2, text: "Извлечения по сметка", value: "show" },
];

const PrintDocuments = ({ text }) => {
  let [open, setOpen] = useState(false);
  let [accValue, setAccValue] = useState(null);
  let [selectedDocument, setSelectedDocument] = useState(null);
  let [officeValue, setOfficeValue] = useState(null);
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

    return (
      <div>
        {" "}
        <Header textAlign="center">{text}</Header>
        <Segment>
          <Form>
            <Form.Group grouped>
              <Form.Field width={7}>
                <Label>Вид документ:</Label>
                <Dropdown
                  required
                  fluid
                  search
                  selection
                  wrapSelection={true}
                  options={documentOptions}
                  onChange={(e, { value }) => {
                    setSelectedDocument(value);
                  }}
                  value={selectedDocument}
                  placeholder="Избери вид документи..."
                />
              </Form.Field>
              <Form.Field
                hidden={selectedDocument === "hide" ? true : false}
                width={7}
              >
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
                <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  trigger={
                    <Grid centered>
                      <Button content="Заяви" className="grey-colored-btn" />
                    </Grid>
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
                      positive
                      className="grey-colored-btn"
                    />
                  </Modal.Actions>
                </Modal>
              </Form.Field>
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  }
};

export default PrintDocuments;
