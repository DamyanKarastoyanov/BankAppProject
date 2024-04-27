import { useState } from "react";
import {
  Button,
  Form,
  Grid,
  GridColumn,
  Input,
  Modal,
  Popup,
  Segment,
} from "semantic-ui-react";

const ChangeUsername = () => {
  const [open, setOpen] = useState(false);
  return (
    <Segment textAlign="center" vertical>
      <Form>
        <Grid centered verticalAlign="middle">
          <Grid.Row verticalAlign="middle">
            <Form.Field width={6}>
              <Input
                required
                type="text"
                icon="user"
                iconPosition="left"
                placeholder="Current Username"
              />
            </Form.Field>
          </Grid.Row>
          <Grid.Row>
            <Form.Field width={6}>
              <Input
                required
                type="text"
                icon="user"
                iconPosition="left"
                placeholder="New Username"
              />
            </Form.Field>
          </Grid.Row>
          <Grid.Row>
            <Form.Field width={6}>
              <Input
                required
                type="password"
                icon="key"
                iconPosition="left"
                placeholder="Current Password"
              />
            </Form.Field>
          </Grid.Row>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
              <Button
                type="submit"
                className="grey-colored-btn"
                color="#E7717D"
              >
                Confirm
              </Button>
            }
          >
            <Modal.Content>
              <Grid columns={3} rows={1}>
                <Grid.Row>
                  <GridColumn width={14} verticalAlign="middle">
                    A confirmation code was send your the given e-mail.
                  </GridColumn>
                  <GridColumn width={2}>
                    <Popup
                      content="Close"
                      trigger={
                        <Button
                          className="grey-colored-btn"
                          circular
                          onClick={() => setOpen(false)}
                          icon="close"
                        />
                      }
                    />{" "}
                  </GridColumn>
                </Grid.Row>
              </Grid>
            </Modal.Content>
          </Modal>
        </Grid>
      </Form>
    </Segment>
  );
};

export default ChangeUsername;
