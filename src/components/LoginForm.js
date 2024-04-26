import React from "react";
import { Form, Button, Input, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate("account");
  };
  return (
    <div className="login-form">
      <Image src=""> </Image>
      <Form>
        <Form.Field>
          <Input
            required
            type="text"
            icon="user"
            iconPosition="left"
            placeholder="Username"
          />
        </Form.Field>
        <Form.Field>
          <Input
            required
            type="password"
            icon="key"
            iconPosition="left"
            placeholder="Password"
          />
        </Form.Field>
        <Button type="submit" color="yellow" onClick={redirectPage}>
          Login
        </Button>
      </Form>
      <a href="/forget-password">Forget Password</a>
      <a href="/activate-account">Activate Account</a>
      <a href="/terms">Terms of Service</a>
    </div>
  );
}

export default LoginForm;
