import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import SettingsNav from "./SettingsNav";
import { Route, Redirect, Switch } from "react-router-dom";
import BasicPage from "./BasicPage";
import PhotosPage from "./Photos/PhotosPage";
import AboutPage from "./AboutPage";
import AccountPage from "./AccountPage";
import { updatePassword } from "../../auth/authActions";
import { updateProfile } from "../../user/userActions";

const actions = {
  updatePassword,
  updateProfile,
};

const mapState = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile,
});

const SettingsDashboard = ({
  updatePassword,
  providerId,
  user,
  updateProfile,
}) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from='/settings' to='/settings/basic' />
          <Route
            path='/settings/basic'
            render={() => (
              <BasicPage initialValues={user} updateProfile={updateProfile} />
            )}
          />
          <Route
            path='/settings/about'
            render={() => (
              <AboutPage initialValues={user} updateProfile={updateProfile} />
            )}
          />
          <Route path='/settings/photos' component={PhotosPage} />
          {/* Instead of specifying a component value here for the account page
            we specify the render property of Route, and pass in the account page component
            with the prop we would like to pass it. 
            We do this in the form of an arrow function (just like render on a class component)
          */}
          <Route
            path='/settings/account'
            render={() => (
              <AccountPage
                updatePassword={updatePassword}
                providerId={providerId}
              />
            )}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};
export default connect(mapState, actions)(SettingsDashboard);
