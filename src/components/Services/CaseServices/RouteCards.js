import { useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Label,
  Modal,
  Segment,
  Step,
} from "semantic-ui-react";

let routeOptions = [
  {
    key: 1,
    text: "Карта за АМ 'Тракия'-> София и Бургас",
    value: 1,
  },
  {
    key: 2,
    text: "Карти на АМ 'Хемус' -> София и Варна",
    value: 2,
  },
  { key: 3, text: "Карти на АМ 'Марица'", value: 3 },
  {
    key: 4,
    text: "Карти за градове и общини",
    value: 4,
  },
];
let routeResult = {
  1: "34 BGN",
  2: "23 BGN",
  3: "40 BGN",
  4: "74 BGN",
};
let accounts = [
  { name: "Раплащателна сметка", balance: 77.77, currency: "BGN" },
  { name: "Кредитна сметка", balance: 66.66, currency: "EUR" },
  { name: "Депозитна сметка", balance: 55.55, currency: "USD" },
];
let accA =
  accounts[0].name + " " + accounts[0].balance + " " + accounts[0].currency;
let accB =
  accounts[1].name + " " + accounts[1].balance + " " + accounts[1].currency;
let accC =
  accounts[2].name + " " + accounts[2].balance + " " + accounts[2].currency;

let accOptions = [
  { key: 1, text: accA, value: accA },
  { key: 2, text: accB, value: accB },
  { key: 3, text: accC, value: accC },
];
const RouteCardProgress = ({ text }) => {
  let [moveActives, setSteps] = useState([false, false, false]);
  let [revealForms, setRevealForms] = useState([false, true, true]);
  let [accValue, setAccValue] = useState(null);
  let [routeValue, setRouteValue] = useState(null);
  let [isMessageHidden, setFinalMessage] = useState(true);
  return (
    <div className="centered">
      <Header textAlign="center"> {text} </Header>
      <Step.Group ordered widths={3} hidden={!isMessageHidden}>
        <Step completed={moveActives[0]} active={!moveActives[0]}>
          <Step.Content>
            <Step.Title>Превозното средство</Step.Title>
            <Step.Description>
              Въведи данни на превозното средство
            </Step.Description>
          </Step.Content>
        </Step>

        <Step completed={moveActives[1]} active={!moveActives[1]}>
          <Step.Content>
            <Step.Title>Маршрут</Step.Title>
            <Step.Description>Въведи данни относно маршрута</Step.Description>
          </Step.Content>
        </Step>

        <Step completed={moveActives[2]} active={!moveActives[2]}>
          <Step.Content>
            <Step.Title>Финализиране</Step.Title>
            <Step.Description>Избери данни за плащане</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
      <Segment hidden={revealForms[2]}>
        <Form>
          <Form.Group grouped>
            <Form.Field width={5}>
              <Label>Избери сметка</Label>
              <Dropdown
                required
                fluid
                search
                selection
                wrapSelection={true}
                options={accOptions}
                onChange={(e, { value }) => {
                  setAccValue(value);
                }}
                value={accValue}
                placeholder="Избери сметка"
              />
            </Form.Field>
            <Form.Field width={5}>
              <Label>Въведи парола</Label>
              <Form.Input icon="key" required></Form.Input>
            </Form.Field>
            <Form.Field width={5}>
              <Header textAlign="center" size="huge">
                <Label>Цена: </Label> <br />
                {routeResult[routeValue]}{" "}
              </Header>
            </Form.Field>
            <Form.Field width={5}>
              <Grid centered>
                <Button
                  content="Финализирай"
                  onClick={() => {
                    setSteps([true, true, true]);
                    setRevealForms([true, true, true]);
                    setFinalMessage(false);
                  }}
                  className="grey-colored-btn"
                />
              </Grid>
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
      <Segment hidden={revealForms[1]}>
        <Form>
          <Form.Group grouped>
            <Form.Field width={5}>
              <Label>Начална дата:</Label>
              <Form.Input readonly type="date"></Form.Input>
            </Form.Field>
            <Form.Field width={5}>
              <Label>Въведи маршрут</Label>
              <Dropdown
                required
                fluid
                search
                selection
                wrapSelection={true}
                options={routeOptions}
                onChange={(e, { value }) => {
                  setRouteValue(value);
                }}
                value={routeValue}
                placeholder="Избери маршрут"
              />
            </Form.Field>
            <Form.Field width={5}>
              <Label>Цена</Label>
              <Form.Input
                icon="key"
                readonly
                value={routeResult[routeValue]}
              ></Form.Input>
            </Form.Field>
            <Form.Field width={5}>
              <Grid centered>
                <Button
                  content="Продължи"
                  onClick={() => {
                    setSteps([true, true, false]);
                    setRevealForms([true, true, false]);
                  }}
                  className="grey-colored-btn"
                />
              </Grid>
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
      <Segment hidden={revealForms[0]}>
        <Form>
          <Grid columns={2} centered>
            <Grid.Row>
              <Form.Field width={4}>
                <Label>Тип на превозно средство</Label>
                <Form.Input required></Form.Input>
              </Form.Field>
              <Form.Field width={4}>
                <Label>Класификация, спрямо тол.таксите</Label>
                <Form.Input required></Form.Input>
              </Form.Field>
            </Grid.Row>
            <Grid.Row>
              <Form.Field width={4}>
                <Label>Екологична категория</Label>
                <Form.Input required></Form.Input>
              </Form.Field>
              <Form.Field width={4}>
                <Label>Брой оси</Label>
                <Form.Input required></Form.Input>
              </Form.Field>
            </Grid.Row>
            <Grid.Row>
              <Form.Field width={4}>
                <Button
                  content="Продължи"
                  onClick={() => {
                    setSteps([true, false, false]);
                    setRevealForms([true, false, true]);
                  }}
                  className="grey-colored-btn"
                />
              </Form.Field>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
      <Segment hidden={isMessageHidden}>
        <Header textAlign="center">
          {" "}
          Маршрутната карта ще бъде издадена от 7 до 14 работни дни.{" "}
        </Header>
      </Segment>
    </div>
  );
};

const RouteCards = ({ text }) => {
  <div>
    <RouteCardProgress text={text} />
  </div>;
};
export default RouteCardProgress;
