import { AccessToken, logout } from 'contexts/helpers'
import { notify } from 'components'
import { axiosInstance } from './index';
/**
 *  @errorHelper :  Function to return error StatusText.
 */
const errorHelper = (error) => {
  if (error.response === undefined) {
    notify("Network Error");
    return false;
  }
  if(error.response.data.message!==undefined){
    notify(error.response.data.message);
  }
  
  if (error.response.statusCode === 401) {
    notify("You may have been logged out");
    logout();
    return false;
  }
  if (error.response.statusText !== "") {
    notify(error.response.statusText);
    return false;
  }
}
class API {
  displayAccessToken = () => {
    console.log(AccessToken)
  }

  login = (data, setAccessToken, setRedirectToChangePasswordView, setLoginAccessToken, setFirstLoginStatus) => {
    axiosInstance.post('user/login', data)
      .then(response => {
        setFirstLoginStatus(response.data.data.userDetails.firstLogin);
        setLoginAccessToken(response.data.data.accessToken);
        return response.data.data.userDetails.firstLogin ? setAccessToken(response.data.data.accessToken) : setRedirectToChangePasswordView(true);
      })
      .catch(error => {
        errorHelper(error)
      })
  }

  changePassword = (data, accessToken, setRedirectionStatus) => {
    axiosInstance.put('user/changePassword', data, {
      headers: {
        authorization: "Bearer " + accessToken
      }})
      .then(response => {
        return setRedirectionStatus(accessToken)
      })
      .catch(error => {
        errorHelper(error);
      })
  }

  profileChangePassword = async (data) => {
    return await axiosInstance.put('user/changePassword', data, {
      headers: {
        authorization: "Bearer " + localStorage.getItem('accessToken')
      }})
      .then(response => {
        return { status: true };
      })
      .catch(error => {
        errorHelper(error);
        return { message: error.response.data.message, status: false };
      })
  }

  logoutUser = (callback) => {
    logout()
    if (typeof callback === "function") {
      callback()
    }
  }

  logout = async (token) => {
    return await axiosInstance.put(`/user/logout`, {}, {
      headers: {
        authorization: "Bearer " + token,
      }
    })
  }

  // Get all timetable for users
  getUserProfileData = async () => {
    return await axiosInstance.get(`/user/getProfile`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem('accessToken'),
      }
    })
      .then(response => {
        return { data: response.data.data.customerData, status: true };
      })
      .catch(error => {
        errorHelper(error);
        return { message: error.response.data.message, status: false };
      })
  }

  // Get all modules for users
  getAllModules = (programId, setModulesArray) => {
    axiosInstance.get(`/program/${programId}`)
      .then(response => {
        return setModulesArray(response.data.data.moduleData);
      })
      .catch(error => {
        errorHelper(error);
      })
  }

  // Get specific module for users
  getSpecificModule = async (programId, moduleId) => {
    return await axiosInstance.get(`/program/${programId}/module/${moduleId}`)
      .then(response => {
        return { data: response.data.data.moduleData, status: true };
      })
      .catch(error => {
        errorHelper(error);
        return { message: error.response.data.message, status: false };
      })
  }

  // Get all timetable for users
  getAllTimetable = async (programId, moduleId) => {
    return await axiosInstance.get(`/program/${programId}/module/${moduleId}/timeTable`)
      .then(response => {
        return { data: response.data.data.timeTableData, status: true };
      })
      .catch(error => {
        // errorHelper(error);
        return { message: error.response.data.message, status: false };
      })
  }

  // Get all activities for users
  getListOfActivities = async (programId, moduleId, setDataArray) => {
    return await axiosInstance.get(`/program/${programId}/module/${moduleId}/activity`)
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        errorHelper(error);
      })
  }

  // Get all timetable for users
  getSpecificActivity = async (programId, moduleId, activityId) => {
    return await axiosInstance.get(`/program/${programId}/module/${moduleId}/activity/${activityId}`)
      .then(response => {
        return { data: response.data.data.activityData, status: true };
      })
      .catch(error => {
        errorHelper(error);
      })
  }
}
const instance = new API();
export default instance;
