import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form, Image, Input, Modal } from "semantic-ui-react";

const ActivateAccount = () => {
  const navigate = useNavigate();
  let [open, setOpen] = useState(false);
  const redirectPage = () => {
    navigate("/account");
  };
  return (
    <div className="activate-Acc">
      <Form>
        <Form.Field>
          <Input
            type="text"
            icon="barcode"
            iconPosition="left"
            placeholder="Enter your code"
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            icon="user"
            iconPosition="left"
            placeholder="Username"
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="password"
            icon="key"
            iconPosition="left"
            placeholder="Password"
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="password"
            icon="key"
            iconPosition="left"
            placeholder="Repeat Password"
          />
        </Form.Field>
        <Button.Group>
          <Button
            type="submit"
            color="yellow"
            onClick={redirectPage}
            content="Back"
            icon="arrow left"
          />
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Активирай</Button>}
          >
            <Modal.Content>Акаунта беше успешно създаден.</Modal.Content>
            <Modal.Actions>
              <Button color="green" onClick={redirectPage}>
                Okey
              </Button>
            </Modal.Actions>
          </Modal>
        </Button.Group>
      </Form>
    </div>
  );
};

export default ActivateAccount;
