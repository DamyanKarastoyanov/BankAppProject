import React from "react";
import "../styles/styles.css";
import ProfileCard from "./ProfileCard";
import BankAccounts from "./Bank Account/BankAccounts";
import CardList from "./Credit Cards/CreditCardList";
import { Grid } from "semantic-ui-react";
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
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default AccountDashboard;
