import { useState } from "react";
import { Button, Grid, GridColumn, Header } from "semantic-ui-react";
import CreditDetails from "./CreditDetails";
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
  let [creaditList, setCreditList] = useState([
    {
      type: "Ипотечен",
      interest: "3% лихва",
      primalPrice: "60000 лв",
      leftAmountToPay: "52340 лв",
      thisMonthInstallment: "300.",
      yearsOfCredit: "20",
    },
    {
      type: "Потребителски",
      interest: "5% лихва",
      primalPrice: "3000 лв",
      leftAmountToPay: "2300 лв",
      thisMonthInstallment: "200лв.",
      yearsOfCredit: "1",
    },
    {
      type: "Потребителски",
      interest: "6% лихва",
      primalPrice: "5000 лв",
      leftAmountToPay: "3100 лв",
      thisMonthInstallment: "200лв.",
      yearsOfCredit: "2",
    },
  ]);
  return (
    <div>
      <CreditHeader />
      <div className="credit-List-container">
        {creaditList.map((credit) => {
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
