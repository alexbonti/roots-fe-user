import axios from "axios";
import { axiosInstance } from "helpers";



class API {
  loginEmployer = async (data, setAccessToken) => {
    return await axios({
      method: "post",
      url: "http://localhost:8031/api/user/login",
      data,
    })
      .then(response => {
        setAccessToken(response.data.data.accessToken);
        return response.data.data.employerDetails;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  };


  logout = async (accessToken) => {
    accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
    .put("/employer/logout",{}, {
      headers: {
        authorization: "Bearer " + accessToken,
      }
    })
    .then(response => {
      return {"response": response}
    })
    .catch(error => window.localStorage.clear)
  }

  registerUser = async data => {
    return await axiosInstance
      .post("/user/register", data)
      .then(response => {
        console.log(response)
        return { response: response.data.data };
      })
      .catch(error => {
        console.log(error);
        return false;
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

  



  


  getOpportunity = async (accessToken) => {
    accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get("/jobs/viewOpportunities")
      .then(response => {
        return { response: response.data.data.opportunityData};
      })
      .catch(error => {
        console.log(error);
        return { error };
      });
  };





  getUserProfile = async(auth) =>{
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get('/user/getProfile', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        }
      })
      .then(response => {
        return {"response": response.data.data.customerData}
      })
      .catch(error => {
        return {"error": error}
      })
  }

  getUserProfileExt= async(auth) =>{
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get('/user/getUserExtended', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        }
      })
      .then(response => {
        return {"response": response.data.data.extendedCustomerData}
      })
      .catch(error => {
        return {"error": error}
      })
  }

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
      .then(response => response.data.suggestions)
      .catch(error => console.log(error));
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

  updateWorkExp = async (data) => {
    let accessToken = localStorage.getItem("accessToken");
    console.log(data)
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
  updateEducationExp = async (data) => {
    let accessToken = localStorage.getItem("accessToken");
    console.log(data)
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

  updateUserPreferences = async (data) => {
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

  updateUserProfile = async (data) => {
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

  updateUserResumeAndCoverLetter = async (data) => {
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


  


  updateShortList = async (array) => {
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
  }
  userSaveJob = data => {
    let accessToken = localStorage.getItem("accessToken");
    axiosInstance
      .put("/user/saveJob", data, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      } )
      .then(response => response)
      .catch(error => console.log(error));
  };

  userApplyJob = data => {
    let accessToken = localStorage.getItem("accessToken");
    axiosInstance
      .post("/user/applyjob", data, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      } )
      .then(response => response)
      .catch(error => console.log(error));
  };

}
  



const instance = new API();
export default instance;
