import { useState } from "react";
import { Button, Grid, GridColumn, Icon, Popup } from "semantic-ui-react";
import CardDetails from "./cardDetails";

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

const CardInfo = ({ card, cardList }) => {
  return (
    <div className="bank-account" key={card.cardId}>
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
              <Grid.Row width={3}>{detailsHandler(card, cardList)}</Grid.Row>
              <Grid.Row width={1} />
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
let detailsHandler = (card, cardList) => {
  if (card.clickable) {
    return <CardDetails creditCard={card} cardList={cardList} />;
  } else {
    return (
      <Popup
        on="hover"
        trigger={
          <Button
            circular
            color={card.currentStatus["color"]}
            icon={card.currentStatus["icon"]}
          />
        }
      >
        {"This Credit Card is not available for action " +
          (card.currentStatus["icon"] === "ban"
            ? "."
            : "until its freeze period ends after 17 hours.")}{" "}
      </Popup>
    );
  }
};
const CardList = () => {
  let [cardList, setCardList] = useState([
    {
      id: 4523,
      cardNumber: "****** 4856",
      cardType: "Debit Card",
      expireDate: "5/26",
      currentStatus: { icon: "ban", color: "red" },
      clickable: true,
    },
    {
      id: 5453,
      cardNumber: "****** 4116",
      cardType: "Debit Card",
      expireDate: "10/24",
      currentStatus: { icon: "info", color: "green" },
      clickable: true,
    },
    {
      id: 5523,
      cardNumber: "****** 3156",
      cardType: "Credit Card",
      expireDate: "2/27",
      currentStatus: { icon: "snowflake", color: "blue" },
      clickable: false,
    },
  ]);
  return (
    <div>
      <CardsHeader />
      <div className="cardList-container">
        {cardList.map((card) => {
          return <CardInfo card={card} cardList={cardList} />;
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

export default CardList;
