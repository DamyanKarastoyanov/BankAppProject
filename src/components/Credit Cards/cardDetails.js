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
  const [isChangeDone, setIsChangeDone] = useState(false);
  return (
    <Modal
      className="cCard-options"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button
          circular
          color={creditCard["color"]}
          icon={creditCard["icon"]}
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
        <Input
          labelPosition="right"
          type="text"
          placeholder={creditCard["24h_limit_withdrawing"]}
          onChange={(e) => {
            e.target.value !== creditCard["24h_limit_withdrawing"]
              ? setIsChangeDone(true)
              : setIsChangeDone(false);
          }}
        >
          <input />
          <Label>BGN</Label>
        </Input>
        <br />
        <Label>24ч. лимит за теглене при търговец </Label>
        <br />
        <Input
          labelPosition="right"
          type="text"
          placeholder={creditCard["24h_limit_purchase"]}
          onChange={(e) => {
            e.target.value !== creditCard["24h_limit_purchase"]
              ? setIsChangeDone(true)
              : setIsChangeDone(false);
          }}
        >
          <input />
          <Label>BGN</Label>
        </Input>
        <br />
        <Label>24ч. общ лимит </Label>
        <br />
        <Input
          labelPosition="right"
          type="text"
          placeholder={creditCard["24h_total_limit"]}
          onChange={(e) => {
            e.target.value !== creditCard["24h_total_limit"]
              ? setIsChangeDone(true)
              : setIsChangeDone(false);
          }}
        >
          <input />
          <Label>BGN</Label>
        </Input>
        <br />
        {creditCard.status !== "frozen" ? (
          <ConfirmationWindow
            btnProps={{
              icon: "snowflake",
              content: "Freeze",
              color: "blue",
              action: "frozen",
            }}
            message={freezeMessage}
            parentState={{ open, setOpen }}
            creditCard={creditCard}
          />
        ) : (
          <></>
        )}
        <ConfirmationWindow
          btnProps={{
            icon: "ban",
            content: "Block",
            color: "red",
            action: "blocked",
          }}
          message={blockMessage}
          parentState={{ open, setOpen }}
          creditCard={creditCard}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          labelPosition="left"
          content="Save Changes"
          icon="check"
          color={isChangeDone ? "green" : "grey"}
          disabled={isChangeDone ? false : true}
          onClick={() => setOpen(false)}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default CardDetails;
