import { useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";

const TransactionItem = ({ list }) => {
  return (
    <Grid columns={3} className="activity-container">
      {list &&
        list.map((transaction) => {
          return (
            <Grid.Row verticalAlign="middle">
              <Grid.Column textAlign="center">
                <Header> {transaction.date} </Header>
              </Grid.Column>
              <Grid.Column> {transaction.description}</Grid.Column>
              <Grid.Column color={transaction.amount > 0 ? "green" : "red"}>
                {transaction.amount}
              </Grid.Column>
            </Grid.Row>
          );
        })}
    </Grid>
  );
};

const BAccActions = ({ transactions }) => {
  let [isChecked, setClicked] = useState([true, false, false]);
  let [filteredList, setFilteredList] = useState(transactions);
  let handleClick = (e, index) => {
    // Selected button to be colored in orange
    // All other buttons to be decolored
    // If 'incomes' or 'expenses' are clicked twice, make 'all' filter

    if (index === 0) {
      setFilteredList(transactions);
    } else if (index === 1) {
      setFilteredList(
        transactions.filter((transaction) => {
          return transaction.amount > 0;
        })
      );
    } else if (index === 2) {
      setFilteredList(
        transactions.filter((transaction) => {
          return transaction.amount < 0;
        })
      );
    }

    if (isChecked[index]) {
      if (index !== 0) {
        let checkList = isChecked;
        checkList = [false, false, false];
        checkList[index] = false;
        checkList[0] = true;
        setClicked(checkList);
        setFilteredList(transactions);
      }
    } else {
      if (index === 1) {
        e.target.classList.add("red");
      }
      if (index === 2) {
        e.target.classList.add("orange");
      }
      let checkList = [false, false, false];
      checkList[index] = true;
      setClicked(checkList);
    }
  };
  return (
    <div className="bAcc-options">
      <Header textAlign="center">Движения по сметка</Header>
      <Button.Group>
        <Button
          content="Всички"
          color={isChecked[0] ? "orange" : ""}
          onClick={(e) => handleClick(e, 0)}
        />
        <Button.Or />
        <Button
          content="Приходи"
          color={isChecked[1] ? "green" : ""}
          onClick={(e) => handleClick(e, 1)}
        />
        <Button.Or />
        <Button
          content="Разходи"
          color={isChecked[2] ? "red" : ""}
          onClick={(e) => handleClick(e, 2)}
        />
      </Button.Group>
      <TransactionItem list={filteredList} />
    </div>
  );
};

export default BAccActions;
