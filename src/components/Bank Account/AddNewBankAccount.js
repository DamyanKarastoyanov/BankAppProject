import { useState } from "react";
import {
  Button,
  Grid,
  GridColumn,
  Header,
  Input,
  Label,
  Modal,
  Popup,
} from "semantic-ui-react";
import ConfirmationWindow from "../ConfirmationWindow";

function AddNewBankAccount() {
  const [open, setOpen] = useState(false);
  const confirmMessage =
    "Веднъж създаден, тази опция ще бъде недостъпна в следващите 2 месеца";
  return (
    <Modal
      className="addNewAccount"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon="plus"></Button>}
    >
      <Modal.Header>
        <Grid columns={13} centered>
          <Grid.Row centered>
            <GridColumn></GridColumn>
            <GridColumn verticalAlign="middle" width={13}>
              <Header> Създаване на нова сметка </Header>
            </GridColumn>
            <GridColumn width={1}>
              <Popup
                content="Close"
                trigger={
                  <Button
                    color="grey"
                    circular
                    onClick={() => setOpen(false)}
                    icon="close"
                  />
                }
              />
            </GridColumn>
          </Grid.Row>
        </Grid>
      </Modal.Header>
      <Modal.Content className="new-Acc-formdata">
        <Modal.Description>
          <Label>Име на сметка: </Label>
          <br />
          <Input
            label={{ icon: "asterisk" }}
            labelPosition="right corner"
            placeholder="Въведи име на сметка..."
            type="text"
          />{" "}
          <br />
          <Label>Избери валута за сметката: </Label> <br />
          <Input
            list="languages"
            label={{ icon: "arrow down" }}
            labelPosition="right corner"
          />
          <datalist id="languages">
            <option value="BNG">BNG</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </datalist>
        </Modal.Description>
        <ConfirmationWindow
          message={confirmMessage}
          btnProps={{
            content: "Confirm",
            icon: "check",
            color: "green",
          }}
          parentState={{ open, setOpen }}
        />
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}

export default AddNewBankAccount;
