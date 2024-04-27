import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Item,
  Segment,
} from "semantic-ui-react";
import useFetch from "../../useFetch";

const EmailCard = ({ email }) => {
  return (
    <Item>
      <Item.Content header={email} />
      <ButtonGroup>
        <Button color="yellow" circular icon="edit" />
      </ButtonGroup>
    </Item>
  );
};

const PhoneCard = ({ phone }) => {
  return (
    <Item>
      <Item.Content header={phone} verticalAlign="middle" />
      <ButtonGroup>
        <Button color="yellow" circular icon="edit" />
      </ButtonGroup>
    </Item>
  );
};
const InfoContainer = () => {
  let currUser = JSON.parse(sessionStorage.getItem("username"));
  let { data, loading, error } = useFetch(
    "http://localhost:3002/loginData?user=" + currUser,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  data && console.log(data);
  return (
    <Segment textAlign="center" className="contact-container">
      <Grid rows={3} id="#acc-settings" className="change-account">
        <Grid.Row>
          <Divider horizontal> Emails</Divider>
        </Grid.Row>
        <Grid.Row>
          <Item.Group>
            {data &&
              data[0]["saved_emails"].map((email) => {
                return <EmailCard email={email} />;
              })}
          </Item.Group>
          <Divider horizontal> Phones</Divider>
          <Item.Group>
            {data &&
              data[0]["saved_phone_numbers"].map((phone) => {
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
