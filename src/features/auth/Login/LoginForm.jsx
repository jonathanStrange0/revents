import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { login, socialLogin} from "../authActions";
import { connect } from "react-redux";
import { Fragment } from "react";
import SocailLogin from "../SocialLogin/SocialLogin";

const actions = {
  login,
  socialLogin
};

const LoginForm = ({ login, handleSubmit, error, socialLogin }) => {
  return (
    <Form size='large' onSubmit={handleSubmit(login)} autoComplete='off'>
      <Segment>
        <Field
          name='email'
          component={TextInput}
          type='text'
          placeholder='Email Address'
        />
        <Field
          name='password'
          component={TextInput}
          type='password'
          placeholder='password'
        />
        {error && (
          <Fragment>
            <Label basic color='red'>
              {error}
            </Label>
            <br />
            <br />
          </Fragment>
        )}
        <Button fluid size='large' color='teal'>
          Login
        </Button>
        <Divider horizontal>Or</Divider>
        <SocailLogin socialLogin={socialLogin}/>
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: "loginForm" })(LoginForm));
