import { useState } from "react";
import { Button, Flag, Grid, GridColumn, Header } from "semantic-ui-react";
import BAccountDetails from "./BAccountDetails";
import useFetch from "../../useFetch";
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
                {account.balance.toFixed(2) + " " + account.currency}
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
  let currUser = JSON.parse(sessionStorage.getItem("username"));
  let { data, loading, error } = useFetch(
    "http://localhost:3002/bank_accounts?user=" + currUser,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(data);
  // <AddNewBankAccount />
  return (
    <div className="b-accounts-container">
      <AccountsHeader />
      <div className="accounts-contents">
        {data &&
          data.map((account) => {
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
