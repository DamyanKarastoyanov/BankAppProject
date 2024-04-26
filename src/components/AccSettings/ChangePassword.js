import { useState } from "react";
import {
  Button,
  Form,
  Grid,
  GridColumn,
  GridRow,
  Input,
  Modal,
  Popup,
  Segment,
} from "semantic-ui-react";

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  return (
    <Segment textAlign="center" vertical>
      <Form>
        <Grid centered verticalAlign="middle">
          <GridRow verticalAlign="middle">
            <Form.Field width={6}>
              <Input
                required
                type="text"
                icon="mail"
                iconPosition="left"
                placeholder="E-mail"
              />
            </Form.Field>
          </GridRow>
          <GridRow verticalAlign="middle">
            <Form.Field width={6}>
              <Input
                required
                type="password"
                icon="key"
                iconPosition="left"
                placeholder="Old Password"
              />
            </Form.Field>
          </GridRow>
          <GridRow verticalAlign="middle">
            <Form.Field width={6}>
              <Input
                required
                type="password"
                icon="key"
                iconPosition="left"
                placeholder="New Password"
              />
            </Form.Field>
          </GridRow>
          <GridRow verticalAlign="middle">
            <Form.Field width={6}>
              <Input
                required
                type="password"
                icon="key"
                iconPosition="left"
                placeholder="Repeat Password"
              />
            </Form.Field>
          </GridRow>
          <Form.Field width={4}>
            <GridRow>
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
            </GridRow>
          </Form.Field>
        </Grid>
      </Form>
    </Segment>
  );
};

export default ChangePassword;
