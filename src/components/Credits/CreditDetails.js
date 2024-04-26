import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  GridColumn,
  Input,
  Label,
  Modal,
  Popup,
} from "semantic-ui-react";

function CreditDetails({ credit }) {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const handleItemClick = () => {
    navigate("/services/installment-in-credit");
  };
  return (
    <Modal
      className="cCard-options"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button circular content="Детайли" />}
    >
      <Modal.Header>
        <Grid columns={13} centered>
          <Grid.Row>
            <GridColumn verticalAlign="middle" width={13}>
              {" "}
              {credit.type} Кредит
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
        <Label>Пълна стойност на кредита: </Label>
        <br />
        <Input
          labelPosition="right"
          type="text"
          value={credit.primalPrice}
          disabled
        >
          <input />
          <Label>BGN</Label>
        </Input>
        <br />
        <Label> % лихва при подписване </Label>
        <br />
        <Input
          labelPosition="right"
          type="text"
          value={credit.interest}
          disabled
        >
          <input />
          <Label>BGN</Label>
        </Input>
        <br />
        <Label>Останало за плащане </Label>
        <br />
        <Input
          labelPosition="right"
          type="text"
          disabled
          value={credit.leftAmountToPay}
        >
          <input />
          <Label>BGN</Label>
        </Input>
        <br />
        <Label>Вноска за този месец </Label>
        <br />
        <Input
          labelPosition="right"
          type="text"
          disabled
          value={credit.thisMonthInstallment}
        >
          <input />
          <Label>BGN</Label>
        </Input>
        <br />
        <Button onClick={handleItemClick}> Вноска по кредит </Button>
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

export default CreditDetails;
