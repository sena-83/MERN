import * as React from "react";

import TopNav from "./TopNav";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "./Modal";

const profileapi = "http://localhost:8080/api/v1/profile";
const profileimageapi = "http://localhost:8080/api/v1/profile/image";

function Profile() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [show, setShow] = useState(false);
  const [addressView, setAddressView] = useState(false);
  const [addressEdit, setAddressEdit] = useState(true);

  const [interests, setInterests] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleOnChange = (event) => {
    if (event.target.id === "interests") setInterests(event.target.value);
    if (event.target.id === "phone") setPhone(event.target.value);
    if (event.target.id === "street") setStreetAddress(event.target.value);
    if (event.target.id === "city") setCity(event.target.value);
    if (event.target.id === "state") setState(event.target.value);
    if (event.target.id === "zipcode") setZipcode(event.target.value);
    if (event.target.id === "profileImageBtn")
      setProfileImage(event.target.value);
  };

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
          setUser(result);
          setInterests(result.interests);
          setPhone(result.phone);
          setStreetAddress(result.address.streetAddress);
          setCity(result.address.city);
          setState(result.address.state);
          setZipcode(result.address.zipcode);
          setProfileImage(result.profileImage);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function showAddressEdit() {
    setAddressView(true);
    setAddressEdit(false);
  }

  function handleProfileUpdate(event) {
    event.preventDefault();

    const uid = event.target.elements.uid.value;
    console.log("Logged in user id" + uid);

    const userAddress = {
      streetAddress: streetAddress,
      city: city,
      state: state,
      zipcode: zipcode,
    };

    if (uid) {
      const loggedinuser = {
        id: uid,
        phone: phone,
        interests: interests,
        address: userAddress,
      };

      fetch(profileapi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(loggedinuser),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.status === "success") {
              console.log(result.message);
              console.log(result.profile);
              setModalMessage(result.message);
              setModalTitle("Success");
              setUser(result.profile);
              setShow(true);
              setAddressView(false);
              setAddressEdit(true);
            } else {
              setModalTitle("Error");
              setModalMessage(
                "System is experiencing some problem, please try again later"
              );
              setAddressView(false);
              setAddressEdit(true);
            }
          },
          (error) => {
            console.log(error);
            setModalTitle("Error");
            setModalMessage(
              "System is experiencing some problem, please try again later"
            );
            setAddressView(false);
            setAddressEdit(true);
          }
        );
    }
  }

  function getFilename(fullPath) {
    return fullPath.replace(/^.*[\\]/, "");
  }

  function resetBrowse() {
    document.getElementById("profileImageBtn").value = "";
  }
  function uploadImage(event) {
    event.preventDefault();

    const uid = user._id;
    console.log("Logged in user id" + uid);
    console.log("Logged in user profile image" + profileImage);
    console.log(getFilename(profileImage));

    if (uid) {
      const loggedinuser = {
        id: uid,
        profileImage: "/img/" + getFilename(profileImage),
      };

      fetch(profileimageapi, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(loggedinuser),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.status === "success") {
              console.log(result.message);
              console.log(result.profile);
              setModalMessage(result.message);
              setModalTitle("Success");
              setUser(result.profile);
              setProfileImage(result.profile.profileImage);
              setShow(true);
              resetBrowse();
            } else {
              setModalTitle("Error");
              setModalMessage(
                "System is experiencing some problem, please try again later"
              );
            }
          },
          (error) => {
            console.log(error);
            setModalTitle("Error");
            setModalMessage(
              "System is experiencing some problem, please try again later"
            );
          }
        );
    }
  }

  function deleteImage(event) {
    event.preventDefault();

    const uid = user._id;
    console.log("Logged in user id" + uid);
    console.log("Logged in user profile image" + profileImage);

    if (uid) {
      const loggedinuser = {
        id: uid,
      };

      fetch(profileimageapi, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(loggedinuser),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.status === "success") {
              console.log(result.message);
              console.log(result.profile);
              setModalMessage(result.message);
              setModalTitle("Success");
              setUser(result.profile);
              setProfileImage(result.profile.profileImage);
              setShow(true);
              resetBrowse();
            } else {
              setModalTitle("Error");
              setModalMessage(
                "System is experiencing some problem, please try again later"
              );
            }
          },
          (error) => {
            console.log(error);
            setModalTitle("Error");
            setModalMessage(
              "System is experiencing some problem, please try again later"
            );
          }
        );
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <TopNav />
        <Modal
          modalTitle={modalTitle}
          modalMessage={modalMessage}
          onClose={() => setShow(false)}
          show={show}
        />
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img
                  className="img-account-profile rounded-circle image-profile"
                  src={!!profileImage ? profileImage : ""}
                  onChange={handleOnChange}
                  onClick={handleOnChange}
                  id="profileImage"
                  alt=""
                />

                <div className="small font-italic text-muted mb-4">
                  Image no larger than 5 MB
                </div>
                <div className="d-flex justify-content-center py-3">
                  <input
                    type="file"
                    id="profileImageBtn"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="d-flex justify-content-center py-3">
                  <button
                    className="btn btn-secondary me-2"
                    type="button"
                    onClick={deleteImage}
                  >
                    Delete Image{" "}
                  </button>
                  <div> </div>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={uploadImage}
                  >
                    Upload{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form onSubmit={handleProfileUpdate}>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1">First name</label>
                      <label className="form-control text-muted">
                        <b>
                          {!!user} {user.firstName}
                        </b>
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1">Last name</label>
                      <label className="form-control text-muted">
                        <b>
                          {!!user} {user.lastName}
                        </b>
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1">Email address</label>
                    <label className="form-control text-muted">
                      <b>
                        {!!user} {user.email}
                      </b>
                    </label>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="phone">
                        Phone number
                      </label>
                      <input
                        className="form-control"
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="interests">
                        Interests
                      </label>
                      <input
                        className="form-control"
                        id="interests"
                        type="text"
                        placeholder="Enter your interests"
                        value={interests}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6" hidden={addressView}>
                      <label className="small me-3">
                        {!!user.address && "Address"}
                      </label>
                      <label className="me-4">
                        <b>
                          {!!user.address && user.address.streetAddress}{" "}
                          {!!user.address && user.address.city}
                          {!!user.address && user.address.state}{" "}
                          {!!user.address && user.address.zipcode}{" "}
                        </b>
                      </label>
                      <button
                        onClick={showAddressEdit}
                        className="btn btn-primary"
                        type="button"
                      >
                        {" "}
                        Edit{" "}
                      </button>
                    </div>
                    <div className="mb-3" hidden={addressEdit}>
                      <label className="form-label">Street Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        value={streetAddress}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="mb-3" hidden={addressEdit}>
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={city}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="mb-3" hidden={addressEdit}>
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        value={state}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="mb-3" hidden={addressEdit}>
                      <label className="form-label">Zip Code</label>
                      <input
                        type="number"
                        className="form-control"
                        id="zipcode"
                        value={zipcode}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-md-6" hidden={addressEdit}>
                      <label className="small mb-1"></label>
                      <input
                        type="hidden"
                        id="uid"
                        value={!!user && user._id}
                        onChange={handleOnChange}
                      />
                      <button className="btn btn-primary" type="submit">
                        {" "}
                        Update{" "}
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
