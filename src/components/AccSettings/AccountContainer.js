import { Grid, Segment } from "semantic-ui-react";
import ChangeAccountSettings from "./ChangeAccountSettings";
import InfoContainer from "./InfoContainer";

const AccountContainer = () => {
  return (
    <Grid centered id="acc-settings" columns={5}>
      <Grid.Row />
      <Grid.Column className="change-account" width={8}>
        <Segment className="contact-container">
          <ChangeAccountSettings />
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <InfoContainer />
      </Grid.Column>
    </Grid>
  );
};

export default AccountContainer;
