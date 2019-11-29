import axios from "axios";
import { axiosInstance } from "helpers";
import {notify} from 'components';


const errorHelper = (error, variant) => {
  if (error.response === undefined) {
    notify("Network Error");
    return false;
  }
  if (error.response.statusCode === 401) {
    if (variant === "login")
      return notify("Invalid Credentials");
    notify("You may have been logged out");
    //logout();
    return false;
  }
  if (error.response.data.message !== "") {
    notify(error.response.data.message);
    return false;
  }
  if (error.response.statusText !== "") {
    notify(error.response.statusText);
    return false;
  }
}
class API {
  loginUser = async (data, setAccessToken) => {
    return await axios({
      method: "post",
      url: "http://localhost:8031/api/user/login",
      data,
    })
      .then(response => {
        setAccessToken(response.data.data.accessToken);
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  };

  logout = async () => {
    let accessToken = localStorage.getItem("accessToken");
    // window.localStorage.setItem("accessToken", "")

    console.log(accessToken);
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
        console.log(response);
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
        return response.status;
      })
      .catch(error => console.log(error));
  };

  getOpportunity = async accessToken => {
    accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get("/jobs/viewOpportunities")
      .then(response => {
        return { response: response.data.data.opportunityData };
      })
      .catch(error => {
        console.log(error);
        return { error };
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
        console.log(error);
        return { error };
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
        return { "response": response.data.data.customerData };
      })
      .catch(error => {
        return { "error": error };
      });
  };

  getUserProfileExt = async auth => {
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
        return { "error": error };
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
        return { "error": error };
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
        return { "error": error };
      });
  };

  getAddress = async input => {
    const app_id = "TUbNW3GcKxN51q3zZJB0";
    const app_code = "SOaMBDA1FYyc8mAtg7STgg";
    return axios({
      method: "get",
      url: ` http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=${app_id}&app_code=${app_code}&query=${input}`,
    })
      .then(response => response.data)
      .catch(error => console.log(error));
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
      .catch(error => console.log(error));
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
      .catch(error => error);
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
        return { "error": error };
      });
  };

  updateWorkExp = async data => {
    let accessToken = localStorage.getItem("accessToken");
    console.log(data);
    return await axiosInstance
      .put("/user/workExperienceUserExtended", data, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return { "response": response };
      })
      .catch(error => {
        return { "error": error };
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
        return { "response": response };
      })
      .catch(error => {
        return { "error": error };
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
        return { "response": response };
      })
      .catch(error => {
        return { "error": error };
      });
  };

  updateEducationExp = async data => {
    let accessToken = localStorage.getItem("accessToken");
    console.log(data);
    return await axiosInstance
      .put("/user/educationUserExtended", data, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return { "response": response };
      })
      .catch(error => {
        return { "error": error };
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
        return { "response": response };
      })
      .catch(error => {
        return { "error": error };
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
        return { "response": response };
      })
      .catch(error => {
        return { "error": error };
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
        return { "response": response };
      })
      .catch(error => {
        return { "error": error };
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
        return { "response": response };
      })
      .catch(error => {
        return { "error": error };
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
      .catch(error => console.log(error));
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
        return { "response": response };
      })
      .catch(error => {
        return { "error": error };
      });
  };

  userApplyJob = data => {
    let accessToken = localStorage.getItem("accessToken");
    axiosInstance
      .post("/user/applyjob", data, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
      .then(response => {
        console.log(response)
        return response})
      .catch(error => {
        console.log(error)
        errorHelper(error)});
  };
}

const instance = new API();
export default instance;
