import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Form,
  Image,
  Input,
  Modal,
} from "semantic-ui-react";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate("/");
  };
  let [open, setOpen] = useState(false);
  return (
    <div className="forget-pass-container">
      <Image src=""> </Image>
      <Form>
        <Form.Field>
          <Input
            type="text"
            icon="mail"
            iconPosition="left"
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            icon="phone"
            iconPosition="left"
            placeholder="Phone number"
          />
        </Form.Field>
        <ButtonGroup>
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
            trigger={<Button>Reset Password</Button>}
          >
            <Modal.Content>
              Емайл за възстановяване на паролата е изпратен.
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" onClick={redirectPage}>
                Okey
              </Button>
            </Modal.Actions>
          </Modal>
        </ButtonGroup>
      </Form>
    </div>
  );
};

export default ForgetPassword;
