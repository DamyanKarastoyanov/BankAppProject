import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Input,
  Grid,
  GridRow,
  GridColumn,
  Header,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate("account");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3002/loginData?user=" +
          username +
          "&password=" +
          password,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      console.log(response);
      sessionStorage.setItem("username", JSON.stringify(response[0].user));
      sessionStorage.setItem("gender", JSON.stringify(response[0].gender));
      redirectPage();
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error
    }
  };

  return (
    <Grid>
      <GridRow />
      <GridRow />
      <GridRow>
        <GridColumn>
          <div className="login-form">
            <Grid>
              <GridRow centered>
                <Header>{errMessage}</Header>
              </GridRow>
              <GridRow centered>
                <Form.Field width={16}>
                  <Input
                    required
                    type="text"
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Field>
              </GridRow>
              <GridRow centered>
                <Button className="change-password-btn" onClick={onSubmit}>
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
