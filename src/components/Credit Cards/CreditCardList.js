import { useState } from "react";
import { Button, Grid, GridColumn, Icon, Popup } from "semantic-ui-react";
import CardDetails from "./cardDetails";
import useFetch from "../../useFetch";

const CardInfo = ({ card }) => {
  const currCard = statusDeterminer(card);
  return (
    <div className="bank-account" key={card.id}>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={1}>
            <Grid>
              <Grid.Row />
              <Grid.Row width={2}>
                <Icon name="credit card" />
              </Grid.Row>
              <Grid.Row />
            </Grid>
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid.Row />
            <Grid.Row>
              <h3> {card.cardNumber}</h3>
              <br />
              <h5> {card.cardType + " -> " + card.expireDate}</h5>

              <br />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={2}>
            <Grid>
              <Grid.Row width={1} />
              <Grid.Row width={3}>{detailsHandler(currCard)}</Grid.Row>
              <Grid.Row width={1} />
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

let detailsHandler = (card) => {
  if (card.clickable) {
    return <CardDetails creditCard={card} />;
  } else {
    return (
      <Popup
        on="hover"
        trigger={
          <Button
            circular
            color={card["color"]}
            icon={card["icon"]}
            disabled={card.icon === "ban" ? true : null}
          />
        }
      >
        {
          +(card["icon"] === "ban"
            ? "This Credit Card is not available for action "
            : card["icon"] === "snowflake"
            ? "until its freeze period ends after 17 hours."
            : ".")
        }
      </Popup>
    );
  }
};

let statusDeterminer = (card) => {
  switch (card.status) {
    case "active":
      return { ...card, icon: "info", color: "green", clickable: true };
    case "frozen":
      return { ...card, icon: "snowflake", color: "blue", clickable: true };
    case "blocked":
      return { ...card, icon: "ban", color: "red", clickable: false };
    default:
      return { ...card };
  }
};

const CardList = () => {
  let currUser = JSON.parse(sessionStorage.getItem("username"));
  let { data, loading, error } = useFetch(
    "http://localhost:3002/created_cards?user=" + currUser,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return (
    <div>
      <CardsHeader />
      <div className="cardList-container">
        {data &&
          data.map((card) => {
            return <CardInfo card={card} />;
          })}

        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column />
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

const CardsHeader = () => {
  const [isRevealed, setRevealed] = useState(true);
  const revealAccounts = () => {
    if (isRevealed) {
      document.querySelector(".cardList-container").style.display = "block";
      setRevealed(false);
    } else {
      document.querySelector(".cardList-container").style.display = "none";
      setRevealed(true);
    }
  };
  return (
    <Grid columns={15}>
      <Grid.Row>
        <GridColumn width={1} />
        <GridColumn width={12}>
          <h2>Карти</h2>{" "}
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

export default CardList;
