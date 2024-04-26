import React from "react";
import "../styles/styles.css";
import ProfileCard from "./ProfileCard";
import BankAccounts from "./Bank Account/BankAccounts";
import CardList from "./Credit Cards/CreditCardList";
import { Grid } from "semantic-ui-react";
import CreditList from "./Credits/Credits";

function AccountDashboard() {
  return (
    <div id="dashboard">
      <ProfileCard />
      <Grid columns={3} divided centered>
        <Grid.Row>
          <Grid.Column>
            <BankAccounts />
          </Grid.Column>
          <Grid.Column>
            <CardList />
          </Grid.Column>
          <Grid.Column>
            <CreditList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
export default AccountDashboard;
