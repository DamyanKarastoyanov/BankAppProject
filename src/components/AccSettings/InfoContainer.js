import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Item,
  Segment,
} from "semantic-ui-react";

const EmailCard = ({ email }) => {
  return (
    <Item>
      <Item.Content header={email.name} />
      <ButtonGroup>
        <Button className="grey-colored-btn" circular icon="edit" />
      </ButtonGroup>
    </Item>
  );
};

const PhoneCard = ({ phone }) => {
  return (
    <Item>
      <Item.Content header={phone.number} verticalAlign="middle" />
      <ButtonGroup>
        <Button className="grey-colored-btn" circular icon="edit" />
      </ButtonGroup>
    </Item>
  );
};
const InfoContainer = () => {
  let emailList = [
    { name: "erica041@gmail.com" },
    { name: "xonudu87@hekuxo.com" },
  ];
  let phoneList = [{ number: "0898 898 898" }];
  return (
    <Segment textAlign="center" className="contact-container">
      <Grid rows={3} id="#acc-settings" className="change-account">
        <Grid.Row>
          <Divider horizontal> Emails</Divider>
        </Grid.Row>
        <Grid.Row>
          <Item.Group>
            {emailList &&
              emailList.map((email) => {
                return <EmailCard email={email} />;
              })}
          </Item.Group>
          <Divider horizontal> Phones</Divider>
          <Item.Group>
            {phoneList &&
              phoneList.map((phone) => {
                return <PhoneCard phone={phone} />;
              })}
          </Item.Group>
        </Grid.Row>
        <Grid.Row>
          <hr />
          <ButtonGroup>
            <Button circular icon="phone" />
            <Button circular icon="mail" />
          </ButtonGroup>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default InfoContainer;
