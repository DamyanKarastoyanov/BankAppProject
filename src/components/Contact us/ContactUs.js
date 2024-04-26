import {
  Button,
  Grid,
  Header,
  Icon,
  Item,
  Popup,
  Segment,
} from "semantic-ui-react";

const ContactUs = () => {
  return (
    <Grid rows={3} columns={3}>
      <Grid.Row />
      <Grid.Row />
      <Grid.Row rows={2}>
        <Grid.Column />
        <Grid.Column>
          {" "}
          <Segment textAlign="center" className="contact-container">
            <Header> Contact Information</Header>
            <br />{" "}
            <Grid centered>
              <Button className="contact-btn" icon="facebook" color="blue" />
              <Button className="contact-btn" icon="twitter" color="blue" />
              <Button className="contact-btn" icon="youtube" color="red" />
              <Popup
                content="Copied to clipboard"
                on="click"
                trigger={
                  <Button color="black" icon="phone" className="contact-btn" />
                }
              />
            </Grid>
          </Segment>
        </Grid.Column>
        <Grid.Column />
      </Grid.Row>
    </Grid>
  );
};

export default ContactUs;
