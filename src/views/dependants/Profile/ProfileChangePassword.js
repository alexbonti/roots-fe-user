import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from 'contexts';
import { withRouter, Link } from 'react-router-dom';
import { API } from 'helpers';
import { HeaderElements, notify } from 'components';
import {
  Button,
  Typography,
  Grid,
  useMediaQuery,
  IconButton,
  TextField,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const ProfileChangePassword = () => {
  const matches = useMediaQuery('(max-width:335px)');
  const { setHeaderElements } = useContext(LayoutContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setHeaderElements(
      <HeaderElements>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item xs={2}>
            <IconButton
              size={matches ? 'small' : 'medium'}
              style={{ padding: 0 }}
              component={Link}
              to='/profile/settings'
            >
              <ArrowBack />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" align="center">
              Change Password
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </HeaderElements>
    );
  }, [setHeaderElements, matches]);

  const saveChanges = async () => {
    if (!currentPassword) {                   // When current password is empty
      setLoading(false);
      return notify('Please enter your current password.');
    }

    if (!newPassword || !confirmPassword) {
      setLoading(false);
      return notify('Please complete the fields.');
    }

    const response = await API.profileChangePassword({
      skip: false,
      oldPassword: currentPassword,
      newPassword
    });

    if (response.status) {
      notify('Successfully updated password.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <Grid container direction="row" alignItems="center" justify="center" spacing={1}>
      <Grid item xs={11}>
        <Typography variant="body2" style={{ marginTop: '1vh' }}>
          Please enter your current password
        </Typography>
      </Grid>

      <Grid item xs={11}>
        <TextField
          fullWidth
          autoFocus
          type="password"
          id="current-password-textfield"
          label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          margin="normal"
          style={{ margin: 0 }}
        />
      </Grid>

      <Grid item xs={11}>
        <TextField
          fullWidth
          type="password"
          id="new-password-textfield"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
          style={{ margin: 0 }}
          error={newPassword.length < 5 && newPassword ? true : false}
        />
      </Grid>

      <Grid item xs={11}>
        <TextField
          fullWidth
          type="password"
          id="confirm-password-textfield"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          style={{ margin: 0 }}
          error={confirmPassword !== newPassword && confirmPassword ? true : false}
        />
      </Grid>

      <Grid item xs={11}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading ? true : false}
          onClick={() => { setLoading(true); saveChanges(); }}
          id="save-changes-button"
          size={matches ? 'medium' : 'small'}
        >
          Save Changes
        </Button>
      </Grid>

      <Grid item xs={11}>
        <Button
          fullWidth
          variant="contained"
          component={Link}
          to='/profile/settings'
          id="cancel-button"
          size={matches ? 'medium' : 'small'}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default withRouter(ProfileChangePassword);
