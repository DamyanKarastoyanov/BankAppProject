import { useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Header,
  Label,
  Segment,
} from "semantic-ui-react";

const VignettesForm = ({ text }) => {
  let options = [
    { key: 1, text: "1 Месец", value: "1 Месец" },
    { key: 2, text: "3 Месеца", value: "3 Месеца" },
    { key: 3, text: "6 Месеца", value: "6 Месеца" },
    { key: 3, text: "12 Месеца", value: "12 Месеца" },
  ];
  let accountOptions = [
    {
      key: 1,
      text: "Разплащателна сметка - 77.77 BGN",
      value: "Разплащателна сметка - 77.77 BGN",
    },
    {
      key: 2,
      text: "Кредитна сметка - 66.66 EUR",
      value: "Кредитна сметка - 66.66 EUR",
    },
    {
      key: 3,
      text: "Депозитна сметка - 55.55 USD",
      value: "Депозитна сметка - 55.55 USD",
    },
  ];
  let result = {
    "1 Месец": "34 BGN",
    "3 Месеца": "23 BGN",
    "6 Месеца": "40 BGN",
    "12 Месеца": "74 BGN",
  };
  let [selectedValue, setValue] = useState(null);
  let [selectedValueB, setValueB] = useState(null);
  return (
    <div className="centered">
      <Header textAlign="center"> {text} </Header>
      <Segment>
        <Form>
          <Form.Group grouped>
            <Form.Field width={7}>
              <Label>въведи ЕГН</Label>
              <Form.Input
                required
                placeholder="Въведи ЕГН, 8905768588"
                maxLength={10}
              />
            </Form.Field>
            <Form.Field width={7}>
              <Label>Номер на колата</Label>
              <Form.Input required readonly></Form.Input>
            </Form.Field>
            <Form.Field width={7}>
              <Label>Продължителност</Label>
              <Dropdown
                required
                fluid
                search
                selection
                wrapSelection={true}
                options={options}
                onChange={(e, { value }) => {
                  setValue(value);
                  console.log(selectedValue);
                }}
                value={selectedValue}
                placeholder="Choose an option"
              />
            </Form.Field>
            <Form.Field width={7}>
              <Label>Цена</Label>
              <Form.Input
                required
                readonly
                value={result[selectedValue]}
              ></Form.Input>
            </Form.Field>
            <Form.Field width={7}>
              <Label>Сметка за плащане</Label>
              <Dropdown
                readonly
                required
                fluid
                search
                selection
                wrapSelection={true}
                options={accountOptions}
                onChange={(e, { value }) => {
                  setValueB(value);
                  console.log(selectedValueB);
                }}
                value={selectedValueB}
                placeholder="Choose an option"
              />
            </Form.Field>

            <Grid centered>
              <Form.Field width={7}>
                <Button content="Купи Е-Винетка" className="grey-colored-btn" />
              </Form.Field>
            </Grid>
          </Form.Group>
        </Form>
      </Segment>
    </div>
  );
};

export default VignettesForm;
