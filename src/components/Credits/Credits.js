import { useState } from "react";
import { Button, Grid, GridColumn, Header } from "semantic-ui-react";
import CreditDetails from "./CreditDetails";
import useFetch from "../../useFetch";

const CreditHeader = () => {
  const [isRevealed, setRevealed] = useState(true);
  const revealAccounts = () => {
    if (isRevealed) {
      document.querySelector(".credit-List-container").style.display = "block";
      setRevealed(false);
    } else {
      document.querySelector(".credit-List-container").style.display = "none";
      setRevealed(true);
    }
  };
  return (
    <Grid columns={15}>
      <Grid.Row centered>
        <GridColumn width={1} />
        <GridColumn width={12}>
          <h2>Кредити </h2>{" "}
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

const CreditInfo = ({ credit }) => {
  return (
    <div className="bank-account">
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={1}>
            <Grid>
              <Grid.Row />
              <Grid.Row width={2}></Grid.Row>
              <Grid.Row />
            </Grid>
          </Grid.Column>
          <Grid.Column width={12} centered>
            <Grid.Row />
            <Grid.Row centered>
              <h3 centered> {credit.type}</h3>
              <br />
              <h5> {credit.leftAmountToPay + " -> " + credit.interest}</h5>

              <br />
            </Grid.Row>
            <Grid.Row>
              <CreditDetails credit={credit} />
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const CreditList = () => {
  let currUser = JSON.parse(sessionStorage.getItem("username"));
  let { data, isLoading, error } = useFetch(
    "http://localhost:3002/taken_credits?user" + currUser,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return (
    <div>
      <CreditHeader />
      <div className="credit-List-container">
        {data &&
          data.map((credit) => {
            return <CreditInfo credit={credit} />;
          })}

        <Grid columns={3}>
          <Grid.Row></Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default CreditList;
