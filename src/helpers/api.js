import { AccessToken } from "contexts/helpers";
import axios from "axios";
import { axiosInstance } from "helpers";

let config = {
  headers: { authorization: "Bearer " + AccessToken },
};

class API {
  loginEmployer = async (data, setAccessToken) => {
    return await axios({
      method: "post",
      url: "http://localhost:8031/api/employer/login",
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

  registerEmployer = async data => {
    return await axios({
      method: "post",
      url: "http://localhost:8031/api/employer/register",
      data,
    })
      .then(response => {
        return { response: response.data.data };
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  };

  sendOTP = async (data, accessToken) => {
    //accessToken = localStorage.getItem("accessToken");
    return await axios
      .put("http://localhost:8031/api/employer/verifyOTP", data, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
      .then(response => {
        return response.status;
      })
      .catch(error => console.log(error));
  };

  postOpportunity = data => {
    let accessToken = localStorage.getItem("accessToken");
    axiosInstance
      .post("/jobs/opportunities", data, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      } )
      .then(response => response)
      .catch(error => console.log(error));
  };

  postOpportunityDraft = data => {
    axiosInstance
      .post("/jobs/opportunityDraft", data, config)
      .then(response => response)
      .catch(error => console.log(error));
  };

  createMyCompany = async (data, accessToken ) => {
    console.log(accessToken)
    return await axiosInstance
      .post("/employer/createcompany", data, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
      .then(response => {return response})
      .catch(error => console.log(error));
  };

  getOpportunity = async (accessToken) => {
    accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get("/employer/viewjobsposted", {
        headers: {
          authorization: "Bearer " + accessToken,
        }
      })
      .then(response => {
        return { response: response.data.data.jobsData, status: true };
      })
      .catch(error => {
        console.log(error);
        return { status: false };
      });
  };

  getOpportunityDraft = async accessToken => {
     accessToken = localStorage.getItem("accessToken");
    return axiosInstance
      .get("jobs/getOpportunityDraft", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        }
      })
      .then(response => {
        return {
          response: response.data.data.opportunityData,
          status: true,
        };
      })
      .catch(error => {
        console.log(error);
        return { status: false };
      });
  };

  getApplicantsData = async (data,accessToken) => {
    accessToken = localStorage.getItem("accessToken");
    return axiosInstance
      .post(
        "employer/viewjobapplicants",
        data,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          }
        }
      )
      .then(response => {
        return ({"response": response.data.data});
      })
      .catch(error => console.log(error));
  };


  getProfileEmployer = async(auth) =>{
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get('/employer/getProfile', {
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

  updateCompanyDetails = async (data, auth) => {
    let accessToken = localStorage.getItem("accessToken");

    return await axiosInstance
      .put("/employer/updatecompany", data, {
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

}
  



const instance = new API();
export default instance;
