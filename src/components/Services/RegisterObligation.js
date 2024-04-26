import { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Label,
  Modal,
  Segment,
} from "semantic-ui-react";

const RegisterObligation = ({ text }) => {
  let [exampleData, setData] = useState(["", "", ""]);
  let [open, setOpen] = useState(false);

  let openBtn = (
    <Button
      content="Добави задължение"
      color="green"
      onClick={() => {
        setData(["", "", ""]);
      }}
    />
  );
  let loadAllInfo = () => {
    setData(["Телефонни услуги", "VIVACOM", "Ерика Страцимирова"]);
  };
  return (
    <div className="centered">
      <Header textAlign="center"> {text} </Header>
      <Segment>
        <Form>
          <Form.Group grouped>
            <Form.Field width={7}>
              <Label>Въведи Абонаментен Код</Label>
              <Form.Input placeholder="Въведи номер, 3905f948e9" />
              <Button icon="arrow down" onClick={loadAllInfo} />
            </Form.Field>
            <Form.Field width={7}>
              <Label>Категория</Label>
              <Form.Input value={exampleData[0]} readonly></Form.Input>
            </Form.Field>
            <Form.Field width={7}>
              <Label>Търговец</Label>
              <Form.Input value={exampleData[1]} readonly></Form.Input>
            </Form.Field>
            <Form.Field width={7}>
              <Label>Длъжно лице: </Label>
              <Form.Input value={exampleData[2]} readonly></Form.Input>
            </Form.Field>
            <Form.Field width={7}></Form.Field>
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={<Grid centered>{openBtn}</Grid>}
            >
              <Modal.Header>Задължението е запазено в системата.</Modal.Header>
              <Modal.Actions>
                <Button
                  content="Okey"
                  labelPosition="right"
                  icon="checkmark"
                  onClick={() => setOpen(false)}
                  positive
                />
              </Modal.Actions>
            </Modal>
          </Form.Group>
        </Form>
      </Segment>
    </div>
  );
};

export default RegisterObligation;
