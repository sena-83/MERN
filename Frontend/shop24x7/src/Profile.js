import * as React from "react";

import TopNav from "./TopNav";
import { useState } from "react";
import { useEffect } from "react";

const profileapi = "http://localhost:8080/api/v1/profile";

function Profile() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetch(profileapi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      //body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result);
          setItem(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <TopNav />
        <div class="row">
          <div class="col-xl-4">
            <div class="card mb-4 mb-xl-0">
              <div class="card-header">Profile Picture</div>
              <div class="card-body text-center">
                <img
                  class="img-account-profile rounded-circle mb-2"
                  src="/img/avatar.png"
                  alt=""
                />
                <div class="small font-italic text-muted mb-4">
                  Image no larger than 5 MB
                </div>
                <div className="d-flex justify-content-center py-3">
                  <button class="btn btn-secondary me-2" type="button">
                    Delete{" "}
                  </button>
                  <div> </div>
                  <button class="btn btn-primary" type="button">
                    Upload{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-8">
            <div class="card mb-4">
              <div class="card-header">Account Details</div>
              <div class="card-body">
                <form>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1">First name</label>
                      <label class="form-control">
                        <b>
                          {!!item} {item.firstName}
                        </b>
                      </label>
                    </div>
                    <div class="col-md-6">
                      <label class="small mb-1">Last name</label>
                      <label class="form-control">
                        <b>
                          {!!item} {item.lastName}
                        </b>
                      </label>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="small mb-1">Email address</label>
                    <label class="form-control">
                      <b>
                        {!!item} {item.email}
                      </b>
                    </label>
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="phone">
                        Phone number
                      </label>
                      <input
                        class="form-control"
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value=""
                      />
                    </div>
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="interests">
                        Interests
                      </label>
                      <input
                        class="form-control"
                        id="interests"
                        type="text"
                        placeholder="Enter your interests"
                        value=""
                      />
                    </div>
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small me-3">
                        {!!item.address && "Address"}
                      </label>
                      <label>
                        <b>
                          {!!item.address && item.address.streetAddress}{" "}
                          {!!item.address && item.address.city}
                          {!!item.address && item.address.state}{" "}
                          {!!item.address && item.address.zipcode}{" "}
                        </b>
                      </label>
                    </div>
                    <div class="col-md-6">
                      <input
                        class="form-control"
                        id="street"
                        type="text"
                        placeholder="Enter your street"
                        value=""
                        hidden
                      />
                      <label class="small mb-1"></label>
                      <button class="btn btn-primary" type="button">
                        {" "}
                        Edit{" "}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
