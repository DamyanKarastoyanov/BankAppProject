import { useNavigate } from "react-router-dom";
import { Button, Form, Image, Input } from "semantic-ui-react";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate("/");
  };
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
          Reset Password
        </Button>
      </Form>
    </div>
  );
};

export default ForgetPassword;
