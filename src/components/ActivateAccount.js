import { useNavigate } from "react-router-dom";
import { Button, Form, Image, Input } from "semantic-ui-react";

const ActivateAccount = () => {
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate("/");
  };
  return (
    <div className="activate-Acc">
      <Image src=""> </Image>
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
        <Button type="submit" color="yellow" onClick={redirectPage}>
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default ActivateAccount;
