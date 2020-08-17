import axios from "axios";
import { axiosInstance, axiosInstanceNews } from "helpers";
import { notify } from 'components';
import { logout } from "contexts/helpers";

/**
 * @param {any} data data to return in response
 * @returns {Object}
 */
const sendSuccess = (data) => {
  return {
    "success": true,
    "response": data
  };
};

/**
 * 
 * @param {Object} error Error Object from axios error catch 
 * @param {String} variant "login" or undefined
 */
const errorHelper = (error, variant) => {
  if (error.response === undefined) {
    notify("Network Error");
    return {
      "success": false,
      "response": "Network Error"
    };
  }
  if (error.response.statusCode === 401) {
    if (variant === "login") {
      notify("Invalid Credentials");
      return {
        "success": false,
        "response": "Invalid Credentials"
      };
    }
    notify("You may have been logged out");
    logout();
    return {
      "success": false,
      "response": error
    };
  }
  if (error.response.data.statusCode === 401) {
    if (variant === "login") return notify("Invalid Credentials");
    notify("You may have been logged out");
    logout();
    return {
      "success": false,
      "response": error
    };
  }
  if (error.response.status === 401) {
    if (variant === "login") return notify("Invalid Credentials");
    notify("You may have been logged out");
    logout();
    return {
      "success": false,
      "response": error
    };
  }
  if (error.response.data.message !== "") {
    notify(error.response.data.message);
    return {
      "success": false,
      "response": error
    };
  }
  if (error.response.statusText !== "") {
    notify(error.response.statusText);
    return {
      "success": false,
      "response": error
    };
  }
};

/**
 * @author Sanchit Dang
 * @param {Function} callback Callback function to perform
 * @param {any} data Data to pass as param 
 */
const performCallback = (callback, data) => {
  if (callback instanceof Function) {
    if (data !== undefined)
      return callback(data);
    callback();
  }
};



class API {
  loginUser = async (data, setAccessToken) => {
    return await axiosInstance
      .post("/user/login", data)
      .then(response => {
        setAccessToken(response.data.data.accessToken);
        return response.data.data;
      })
      .catch(error => {
        return errorHelper(error, "login");
      });
  };

  logout = async () => {
    let accessToken = localStorage.getItem("accessToken");
    // window.localStorage.setItem("accessToken", "")
    return await axiosInstance
      .put(
        "/user/logout",
        {},
        {
          headers: {
            authorization: "Bearer " + accessToken,
          },
        }
      )
      .then(response => {
        window.localStorage.setItem("accessToken", "");
        return { "response": response };
      })
      .catch(error => {
        return { "error": error };
      });
  };

  registerUser = async data => {
    return await axiosInstance
      .post("/user/register", data)
      .then(response => {
        return { response: response.data.data };
      })
      .catch(error => {
        errorHelper(error);

      });
  };

  sendOTP = async (data, accessToken) => {
    //accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .put("/user/verifyOTP", data, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
      .then(response => {
        return {
          success: true
        };
      })
      .catch(error => errorHelper(error))
  };

  getOpportunity = async accessToken => {
    accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get("/jobs/viewOpportunities")
      .then(response => {
        return { response: response.data.data.opportunityData };
      })
      .catch(error => {
        errorHelper(error);
      });
  };

  getUserAppliedJobs = async () => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get("/user/viewjobs", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        return { response: response.data.data.opportunityData };
      })
      .catch(error => {
        errorHelper(error)
      });
  };

  getUserProfile = async auth => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get("/user/getProfile", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        return sendSuccess(response?.data?.data?.customerData);
      })
      .catch(error => {
        return errorHelper(error)
      });
  };

  getUserProfileExt = async () => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get("/user/getUserExtended", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        return { "response": response.data.data.extendedCustomerData };
      })
      .catch(error => {
        errorHelper(error)
      });
  };

  uploadImage = async data => {
    return await axiosInstance
      .post("/upload/uploadImage", data, {
        headers: {
          "Content-Type": "multipart/form-data; boundary='boundary'",
        },
      })
      .then(response => {
        return { "response": response };
      })
      .catch(error => {
        errorHelper(error)
      });
  };

  upLoadFile = async data => {
    return await axiosInstance
      .post("upload/uploadDocument", data, {
        headers: {
          "Content-Type": "multipart/form-data; boundary='boundary'",
        },
      })
      .then(response => {
        return { "response": response };
      })
      .catch(error => {
        errorHelper(error)
      });
  };

  getAddress = async input => {
    const app_id = "TUbNW3GcKxN51q3zZJB0";
    const app_code = "SOaMBDA1FYyc8mAtg7STgg";
    return axios({
      method: "get",
      url: ` http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=${app_id}&app_code=${app_code}&query=${input}&country=AUS`,
    })
      .then(response => response.data)
      .catch(error => errorHelper(error));
  };

  getLatLong = async input => {
    const app_id = "TUbNW3GcKxN51q3zZJB0";
    const app_code = "SOaMBDA1FYyc8mAtg7STgg";
    return await axios({
      method: "get",
      url: ` http://geocoder.api.here.com/6.2/geocode.json?locationid=${input}&jsonattributes=1&gen=9&app_id=${app_id}&app_code=${app_code}`,
    })
      .then(response => {
        return {
          "response":
            response.data.response.view[0].result[0].location.displayPosition,
        };
      })
      .catch(error => errorHelper(error));
  };

  searchByLocation = async data => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get(
        `/jobs/searchOpportunities?latitude=${data.lat}&longitude=${data.long}&distance=${data.distance}`,
        {
          headers: {
            "authorization": `bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        return { "response": response.data.data.opportunityData };
      })
      .catch(error => errorHelper(error));
  };

  getCompanyDetails = async auth => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get("/employer/getcompany", {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return { "response": response.data.data.companyData };
      })
      .catch(error => {
        errorHelper(error)
      });
  };

  updateWorkExp = async data => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .put("/user/workExperienceUserExtended", data, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return sendSuccess(response);
      })
      .catch(error => {
        errorHelper(error)
      });
  };

  deleteWorkExperience = async data => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .put("/user/removeWorkExperience", data, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return sendSuccess(response);
      })
      .catch(error => {
        errorHelper(error)
      });
  };

  deleteEducation = async data => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .put("/user/removeEducation", data, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return sendSuccess(response);
      })
      .catch(error => {
        errorHelper(error)
      });
  };

  editWorkExperience = async data => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .put("/user/editWorkExperience", data, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return sendSuccess(response);
      })
      .catch(error => {
        errorHelper(error);
      });
  };
  editEduExperience = async data => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .put("/user/editEducation", data, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return sendSuccess(response);
      })
      .catch(error => {
        return errorHelper(error);
      });
  };

  updateEducationExp = async data => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .put("/user/educationUserExtended", data, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return sendSuccess(response);
      })
      .catch(error => {
        errorHelper(error);
      });
  };

  updateUserPreferences = async data => {
    let accessToken = localStorage.getItem("accessToken");

    return await axiosInstance
      .put("/user/preferrencesUserExtended", data, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return sendSuccess(response);
      })
      .catch(error => {
        errorHelper(error);
      });
  };

  updateUserProfile = async data => {
    let accessToken = localStorage.getItem("accessToken");

    return await axiosInstance
      .put("/user/updateProfile", data, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return sendSuccess(response);
      })
      .catch(error => {
        errorHelper(errorHelper);
      });
  };

  updateUserResumeAndCoverLetter = async data => {
    let accessToken = localStorage.getItem("accessToken");

    return await axiosInstance
      .put("/user/uploadNewResumeAndCoverLetter", data, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return sendSuccess(response);
      })
      .catch(error => {
        errorHelper(error);
      });
  };

  updateShortList = async array => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .put("/jobs/updateShortListed", array, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return sendSuccess(response);
      })
      .catch(error => {
        errorHelper(error)
      });
  };
  userSaveJob = data => {
    let accessToken = localStorage.getItem("accessToken");
    axiosInstance
      .put("/user/saveJob", data, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
      .then(response => response)
      .catch(error => console.log(error));
  };

  userUnsaveJob = data => {
    let accessToken = localStorage.getItem("accessToken");
    axiosInstance
      .put("/user/unSaveJob", data, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
      .then(response => response)
      .catch(error => errorHelper(error))
  };

  userGetSavedJob = async data => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get("/user/getSavedJobs", data, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        return sendSuccess(response);
      })
      .catch(error => {
        errorHelper(error)
      });
  };

  userApplyJob = async data => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .post("/user/applyjob", data, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
      .then(response => {
        return response
      })
      .catch(error => {
        errorHelper(error)
      });
  };

  getNews = async data => {
    return await axiosInstanceNews
      .post("/news/getNews", data)
      .then(response => {
        return sendSuccess(response?.data?.data?.data);
      })
      .catch(error => {
        return errorHelper(error);
      });
  };

  resetPasswordFirstStep = async data => {
    return await axiosInstance
      .post("/user/forgotPassword", data)
      .then(response => {
        return { "response": response };
      })
      .catch(error => {
        return errorHelper(error);
      });
  };
  resetPasswordSecondStep = async data => {
    return await axiosInstance
      .post("/user/resetPassword", data)
      .then(response => {
        return { "response": response };
      })
      .catch(error => {
        return errorHelper(error);
      });
  };
  resendOTP = async (accessToken) => {
    return await axiosInstance
      .put("/user/resendOTP", {}, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
      .then(response => {
        return { "response": response };
      })
      .catch(error => {
        return errorHelper(error);
      });
  };

  getAllCertificates = (callback) => {
    axiosInstance.get("/user/certificates/getUserCertificates", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }
    }).then((response) => {
      performCallback(callback, response.data.data);
    }).catch(error => errorHelper(error));
  }

  deleteCertificate = (certificateId, callback) => {
    axiosInstance.delete(`/user/certificates/delete/${certificateId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }
    }).then((response) => {
      performCallback(callback, response.data.data);
    }).catch(error => errorHelper(error));
  }

  /**
   * 
   * @author Sanchit Dang
   * @param {Object} certificateData Certificate Data to create
   * @param {String} certificateData.title Certificate Title 
   * @param {String} certificateData.organisation Certificate Organisation 
   * @param {String} certificateData.credentialUrl Certificate credentialUrl 
   * @param {Date} certificateData.issueDate Certificate issueDate
   * @param {Date} certificateData.expiryDate Certificate expiryDate
   * @param {Function} callback Callback function
   */
  createCretificate = (certificateData, callback) => {
    axiosInstance.post(`/user/certificates/addCertificate`, certificateData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }
    }).then(() => {
      performCallback(callback, true);
    }).catch(error => {
      errorHelper(error)
    });
  }

  /**
   * 
   * @author Sanchit Dang
   * @param {String} certificateId Certificate ID 
   * @param {Object} certificateData Certificate Data to create
   * @param {String} certificateData.title Certificate Title 
   * @param {String} certificateData.organisation Certificate Organisation 
   * @param {String} certificateData.credentialId Certificate credentialId
   * @param {String} certificateData.credentialUrl Certificate credentialUrl 
   * @param {Date} certificateData.issueDate Certificate issueDate
   * @param {Date} certificateData.expiryDate Certificate expiryDate
   * @param {Function} callback Callback function
   */
  updateCretificate = (certificateId, certificateData, callback) => {
    axiosInstance.put(`/user/certificates/edit/${certificateId}`, certificateData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }
    }).then((response) => {
      performCallback(callback, response.data.data);
    }).catch(error => errorHelper(error));
  }

  /**
   * @author Sanchit Dang
   * @description Skip User Onboarding process
   * @param {Function} callback 
   */
  skipUserOnboarding(callback) {
    axiosInstance.put("/user/skipUserOnboarding", {}, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }
    }).then((response) => performCallback(callback, response)).catch(error => errorHelper(error));

  }
}

const instance = new API();
export default instance;
