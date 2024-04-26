import { useState } from "react";
import {
  Button,
  Grid,
  GridColumn,
  Header,
  Modal,
  Popup,
} from "semantic-ui-react";
import BAccActions from "./bAccActions";

function BAccountDetails({ bAccount }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="b-acc-details">
      <Modal
        className="bAcc-options"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button circular color="green" icon="info" />}
      >
        <Modal.Header>
          <Grid columns={13} centered>
            <Grid.Row centered>
              <GridColumn></GridColumn>
              <GridColumn verticalAlign="middle" width={13}>
                {bAccount.name} <br />{" "}
                {bAccount.balance + " " + bAccount.currency}{" "}
              </GridColumn>
              <GridColumn width={1}>
                <Popup
                  content="Close"
                  trigger={
                    <Button
                      className="grey-colored-btn"
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
          <Grid columns={3} rows={1} className="bAcc-options">
            <Grid.Row>
              <Grid.Column>
                <Button
                  className="grey-colored-btn"
                  circular
                  centered
                  icon="money"
                />
                <Header> Изпрати средства</Header>
              </Grid.Column>
              <Grid.Column>
                <Button
                  className="grey-colored-btn"
                  circular
                  centered
                  icon="briefcase"
                />
                <Header>Изпрати/Спести</Header>
              </Grid.Column>
              <Grid.Column>
                <Popup
                  content="Copied to clipboard!"
                  on="click"
                  trigger={
                    <Button
                      className="grey-colored-btn"
                      circular
                      centered
                      icon="copy"
                    />
                  }
                />
                <Header> Копирай IBAN</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Modal.Description></Modal.Description>
        </Modal.Content>
        <BAccActions transactions={bAccount.transactions} />
        <Modal.Actions></Modal.Actions>
      </Modal>
    </div>
  );
}

export default BAccountDetails;
