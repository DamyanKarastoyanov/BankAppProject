import { useState } from "react";
import {
  Button,
  Grid,
  GridColumn,
  Header,
  Icon,
  Input,
  Label,
  Modal,
  Popup,
} from "semantic-ui-react";
import ConfirmationWindow from "../ConfirmationWindow";

function CardDetails({ creditCard }) {
  const [open, setOpen] = useState(false);
  const freezeMessage = "Are you sure you want to freeze that card?";
  const blockMessage =
    "Are you sure you want to block that card? \n You won't be able to use this card until its reactivation at bank office";
  return (
    <Modal
      className="cCard-options"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button
          circular
          color={creditCard.currentStatus["color"]}
          icon={creditCard.currentStatus["icon"]}
        />
      }
    >
      <Modal.Header>
        <Grid columns={13} centered>
          <Grid.Row>
            <GridColumn>
              <Icon name="credit card" />
            </GridColumn>
            <GridColumn verticalAlign="middle" width={13}>
              {" "}
              {creditCard.cardNumber}
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
      <Modal.Content>
        <Header> Детайли : </Header>
        <Label>24ч. лимит за теглене в брой </Label>
        <br />
        <Input labelPosition="right" type="text" placeholder="1500">
          <input />
          <Label>BGN</Label>
        </Input>
        <br />
        <Label>24ч. лимит за теглене при търговец </Label>
        <br />
        <Input labelPosition="right" type="text" placeholder="1500">
          <input />
          <Label>BGN</Label>
        </Input>
        <br />
        <Label>24ч. общ лимит </Label>
        <br />
        <Input labelPosition="right" type="text" placeholder="1500">
          <input />
          <Label>BGN</Label>
        </Input>
        <br />
        <ConfirmationWindow
          btnProps={{ icon: "snowflake", content: "Freeze", color: "blue" }}
          message={freezeMessage}
          parentState={{ open, setOpen }}
          creditCard={creditCard}
        />
        <ConfirmationWindow
          btnProps={{ icon: "ban", content: "Block", color: "red" }}
          message={blockMessage}
          parentState={{ open, setOpen }}
          creditCard={creditCard}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          icon="check"
          labelPosition="left"
          content="Save Changes"
          color="green"
          onClick={() => setOpen(false)}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default CardDetails;
