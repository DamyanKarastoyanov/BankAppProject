import React from "react";
import {
  Form,
  Button,
  Input,
  Image,
  Grid,
  GridRow,
  GridColumn,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo-edited.png";
import { ListGroup } from "react-bootstrap";

function LoginForm() {
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate("account");
  };
  return (
    <Grid>
      <GridRow />
      <GridRow />
      <GridRow>
        <GridColumn>
          <div className="login-form">
            <Grid>
              <GridRow>
                <Image src={logo} size="small" centered />
              </GridRow>
              <GridRow />
              <GridRow centered>
                <Form.Field width={16}>
                  <Input
                    required
                    type="text"
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail"
                  />
                </Form.Field>
              </GridRow>
              <GridRow centered>
                <Form.Field>
                  <Input
                    required
                    type="password"
                    icon="key"
                    iconPosition="left"
                    placeholder="Password"
                  />
                </Form.Field>
              </GridRow>
              <GridRow centered>
                <Button className="change-password-btn" onClick={redirectPage}>
                  Login
                </Button>
                <Link to="/forget-password">Forget Password</Link>
                <Link to="/activate-account">Activate Account</Link>
                <Link to="/terms">Terms of Service</Link>
              </GridRow>
            </Grid>
          </div>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}

export default LoginForm;
