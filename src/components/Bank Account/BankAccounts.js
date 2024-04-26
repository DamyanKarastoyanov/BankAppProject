import { useState } from "react";
import { Button, Flag, Grid, GridColumn, Header } from "semantic-ui-react";
import BAccountDetails from "./BAccountDetails";
const AccountsHeader = () => {
  const [isRevealed, setRevealed] = useState(true);
  const revealAccounts = () => {
    if (isRevealed) {
      document.querySelector(".accounts-contents").style.display = "block";
      setRevealed(false);
    } else {
      document.querySelector(".accounts-contents").style.display = "none";
      setRevealed(true);
    }
  };
  return (
    <Grid columns={15}>
      <Grid.Row>
        <GridColumn width={1} />
        <GridColumn width={12}>
          <h2> Сметки</h2>{" "}
        </GridColumn>
        <GridColumn width={2}>
          <Button
            onClick={revealAccounts}
            circular
            icon={"arrow " + (isRevealed ? "up" : "down")}
          ></Button>
        </GridColumn>
      </Grid.Row>
    </Grid>
  );
};

const AccountCard = ({ account }) => {
  return (
    <div className="bank-account" key={account.id}>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={1}>
            <Grid>
              <Grid.Row />
              <Grid.Row width={2}>
                <Flag name={account.flag} />
              </Grid.Row>
              <Grid.Row />
            </Grid>
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid.Row />
            <Grid.Row>
              <Header textAlign="center" size="large">
                {account.name} <br />
                {account.balance + " " + account.currency}
              </Header>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={2}>
            <Grid rows={5}>
              <Grid.Row width={1} />
              <Grid.Row width={3}>
                <BAccountDetails bAccount={account} />
              </Grid.Row>
              <Grid.Row width={1} />
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const BankAccounts = () => {
  let [accountList, setAccountList] = useState([
    {
      id: 87987,
      flag: "bg",
      currency: "BGN",
      name: "Разплащателна сметка",
      balance: 77.77,
      transactions: [
        {
          type: "expense",
          description: "Maint Fee Uncollected",
          amount: -24.34,
          date: "23 march 2024",
        },
        {
          type: "income",
          description: "Maint Fee Uncollected",
          amount: 54.39,
          date: "20 april 2024",
        },
        {
          type: "expense",
          description: "Maint Fee Uncollected",
          amount: -8.34,
          date: "15 may 2024",
        },
        {
          type: "income",
          description: "Maint Fee Uncollected",
          amount: 9.67,
          date: "15 june 2024",
        },
      ],
    },
    {
      id: 8787,
      flag: "bt",
      currency: "EUR",
      name: "Кредитна сметка",
      balance: 66.66,
      transactions: [
        {
          type: "expense",
          description: "Maint Fee Uncollected",
          amount: -24.34,
          date: "23 march 2024",
        },
        {
          type: "expense",
          description: "Maint Fee Uncollected",
          amount: -8.34,
          date: "15 may 2024",
        },
        {
          type: "income",
          description: "Maint Fee Uncollected",
          amount: 9.67,
          date: "15 june 2024",
        },
      ],
    },
    {
      id: 8987,
      flag: "bh",
      currency: "USD",
      name: "Депозитна сметка",
      balance: 55.55,
      transactions: [
        {
          type: "expense",
          description: "Maint Fee Uncollected",
          amount: -24.34,
          date: "23 march 2024",
        },
        {
          type: "income",
          description: "Maint Fee Uncollected",
          amount: 54.39,
          date: "20 april 2024",
        },
      ],
    },
  ]);
  // <AddNewBankAccount />
  return (
    <div class="b-accounts-container">
      <AccountsHeader />
      <div className="accounts-contents">
        {accountList.map((account) => {
          return <AccountCard account={account} />;
        })}
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column />
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default BankAccounts;
