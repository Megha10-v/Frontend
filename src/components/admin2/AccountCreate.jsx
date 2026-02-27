import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./create.css";
import Sidebar from "./SideBar";

const categories = {
  rent: ["Cars", "Properties", "Electronics", "Furnitures", "Bikes", "Clothes", "Tools", "Others"],
  service: ["Cleaning", "Repairing", "Plumbing", "Electrician", "Carpentry", "Laundry", "Saloon", "Others"],
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "10 digit phone")
    .required("Phone required"),
  location: Yup.object({
    place: Yup.string().required("Location required"),
  }),
  ads: Yup.array()
    .of(
      Yup.object({
        type: Yup.string().required("Type required"),
        category: Yup.string().required("Category required"),
        title: Yup.string().required("Title required"),
        description: Yup.string().required("Description required"),
        prices: Yup.array()
          .of(
            Yup.object({
              category: Yup.string().required("Category required"),
              unit: Yup.string().required("Unit required"),
              price: Yup.number()
                .typeError("Must be number")
                .required("Price required"),
            })
          )
          .min(1, "Add at least one price"),
      })
    )
    .min(1, "Add at least one ad"),
});

export default function AccountCreateMobile() {
  const navigate = useNavigate();
  const [locationLoading, setLocationLoading] = useState(false);
  const token = localStorage.getItem('elk_authorization_token');

  const initialValues = {
    name: "",
    phone: "",
    location: { place: "" },
    ads: [],
  };

  const handleUseCurrentLocation = (setFieldValue) => {
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/get_place`,
            { latitude, longitude },
          );
          setFieldValue("location.place", res.data?.place);
        } catch (err) {
          alert("Location fetch failed");
        } finally {
          setLocationLoading(false);
        }
      },
      () => {
        alert("Permission denied");
        setLocationLoading(false);
      }
    );
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("location", JSON.stringify(values.location));

      const adsPayload = values.ads.map((ad, adIndex) => {
        ad.images?.forEach((file) => {
          formData.append(`ads[${adIndex}][images]`, file);
        });

        return {
          type: ad.type,
          category: ad.category,
          title: ad.title,
          description: ad.description,
          prices: ad.prices,
        };
      });

      formData.append("ads", JSON.stringify(adsPayload));

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/admin-ad-create`,
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      alert("Submitted successfully");
      navigate("/sales");
    } catch (err) {
      alert("Submit failed: "+err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Sidebar />
      <br />
      <div className="mobile-container">
        <div className="header">Create Account</div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <>
              {/* FULL SCREEN LOADER */}
              {isSubmitting && (
                <div className="fullscreen-loader">
                  <div className="loader-box">
                    <div className="spinner-border text-primary"></div>
                    <p>Submitting...</p>
                  </div>
                </div>
              )}

              <Form>
                <div className="card-box">
                  <h5>Basic Details</h5>

                  <Field name="name" placeholder="Name" className="styled-input" />
                  <ErrorMessage name="name" component="div" className="error-text" />

                  <Field name="phone" placeholder="Phone" className="styled-input" />
                  <ErrorMessage name="phone" component="div" className="error-text" />
                  <div className="location-row">
                    <Field
                      name="location.place"
                      placeholder="Location"
                      className="styled-input"
                      readOnly
                    />
                    <Button
                      type="button"
                      className="location-btn"
                      onClick={() => handleUseCurrentLocation(setFieldValue)}
                    >
                      {locationLoading ? "..." : "📍"}
                    </Button>
                  </div>
                  <ErrorMessage name="location.place" component="div" className="error-text" />
                </div>

                {/* ADS */}
                <FieldArray name="ads">
                  {({ push, remove }) => (
                    <>
                      {values.ads.map((ad, adIndex) => (
                        <div key={adIndex} className="card-box">
                          <div className="card-header-row">
                            <h6>Ad {adIndex + 1}</h6>
                            <IoCloseCircleOutline
                              size={22}
                              color="red"
                              onClick={() => remove(adIndex)}
                            />
                          </div>

                          <Field as="select" name={`ads.${adIndex}.type`} className="styled-input">
                            <option value="">Select Type</option>
                            <option value="rent">Rent</option>
                            <option value="service">Service</option>
                          </Field>

                          <Field as="select" name={`ads.${adIndex}.category`} className="styled-input">
                            <option value="">Select Category</option>
                            {categories[values.ads?.[adIndex]?.type]?.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </Field>

                          <Field
                            name={`ads.${adIndex}.title`}
                            placeholder="Title"
                            className="styled-input"
                          />

                          <Field
                            as="textarea"
                            name={`ads.${adIndex}.description`}
                            placeholder="Description"
                            className="styled-input"
                          />

                          {/* PRICE */}
                          <FieldArray name={`ads.${adIndex}.prices`}>
                            {({ push: pushPrice, remove: removePrice }) => (
                              <>
                                {ad.prices?.map((price, priceIndex) => (
                                  <div key={priceIndex} className="price-box">

                                    {/* CATEGORY SELECT */}
                                    <Field
                                      as="select"
                                      name={`ads.${adIndex}.prices.${priceIndex}.category`}
                                      className="styled-input"
                                    >
                                      <option value="">Category</option>
                                      <option value="duration">Duration</option>
                                      <option value="size">Size</option>
                                      <option value="custom">Custom</option>
                                    </Field>

                                    <ErrorMessage
                                      name={`ads.${adIndex}.prices.${priceIndex}.category`}
                                      component="div"
                                      className="error-text"
                                    />

                                    {/* UNIT FIELD BASED ON CATEGORY */}
                                    {values.ads[adIndex].prices[priceIndex].category === "custom" && (
                                      <Field
                                        name={`ads.${adIndex}.prices.${priceIndex}.unit`}
                                        placeholder="Custom Unit"
                                        className="styled-input"
                                      />
                                    )}

                                    {values.ads[adIndex].prices[priceIndex].category === "size" && (
                                      <Field
                                        as="select"
                                        name={`ads.${adIndex}.prices.${priceIndex}.unit`}
                                        className="styled-input"
                                      >
                                        <option value="">Unit</option>
                                        <option value="Inch">Inch</option>
                                        <option value="Centimeter">Centimeter</option>
                                      </Field>
                                    )}

                                    {values.ads[adIndex].prices[priceIndex].category === "duration" && (
                                      <Field
                                        as="select"
                                        name={`ads.${adIndex}.prices.${priceIndex}.unit`}
                                        className="styled-input"
                                      >
                                        <option value="">Unit</option>
                                        <option value="Hour">Hour</option>
                                        <option value="Day">Day</option>
                                        <option value="Week">Week</option>
                                        <option value="Month">Month</option>
                                      </Field>
                                    )}

                                    <ErrorMessage
                                      name={`ads.${adIndex}.prices.${priceIndex}.unit`}
                                      component="div"
                                      className="error-text"
                                    />

                                    {/* PRICE */}
                                    <Field
                                      name={`ads.${adIndex}.prices.${priceIndex}.price`}
                                      placeholder="Price"
                                      className="styled-input"
                                    />

                                    <ErrorMessage
                                      name={`ads.${adIndex}.prices.${priceIndex}.price`}
                                      component="div"
                                      className="error-text"
                                    />

                                    {/* REMOVE BUTTON */}
                                    {ad.prices.length > 1 && (
                                      <IoCloseCircleOutline
                                        size={20}
                                        color="red"
                                        onClick={() => removePrice(priceIndex)}
                                      />
                                    )}
                                  </div>
                                ))}

                                <button
                                  type="button"
                                  className="add-small-btn"
                                  onClick={() =>
                                    pushPrice({ category: "", unit: "", price: "" })
                                  }
                                >
                                  + Add Price
                                </button>
                              </>
                            )}
                          </FieldArray>

                          {/* IMAGE UPLOAD */}
                          <div className="upload-box">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) => {
                                const newFiles = Array.from(e.target.files);
                              
                                const existingFiles = values.ads[adIndex].images || [];
                                const existingPreviews = values.ads[adIndex].imagePreviews || [];
                              
                                const newPreviews = newFiles.map((file) =>
                                  URL.createObjectURL(file)
                                );
                              
                                setFieldValue(
                                  `ads.${adIndex}.images`,
                                  [...existingFiles, ...newFiles]
                                );
                              
                                setFieldValue(
                                  `ads.${adIndex}.imagePreviews`,
                                  [...existingPreviews, ...newPreviews]
                                );
                              
                                e.target.value = null;
                              }}
                            />
                          </div>

                          <div className="image-preview-container">
                            {ad.imagePreviews?.map((src, i) => (
                              <div key={i} className="preview-box">
                                <img src={src} alt="preview" />

                                <IoCloseCircleOutline
                                  size={20}
                                  color="red"
                                  onClick={() => {
                                    const updatedFiles = [...values.ads[adIndex].images];
                                    const updatedPreviews = [...values.ads[adIndex].imagePreviews];

                                    updatedFiles.splice(i, 1);
                                    updatedPreviews.splice(i, 1);

                                    setFieldValue(`ads.${adIndex}.images`, updatedFiles);
                                    setFieldValue(`ads.${adIndex}.imagePreviews`, updatedPreviews);
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="add-ad-btn"
                        onClick={() =>
                          push({
                            type: "",
                            category: "",
                            title: "",
                            description: "",
                            prices: [{ category: "", unit: "", price: "" }],
                            images: [],
                            imagePreviews: [],
                          })
                        }
                      >
                        + Add Ad
                      </button>
                    </>
                  )}
                </FieldArray>

                {/* SUBMIT */}
                <div className="bottom-bar">
                  <Button
                    type="submit"
                    className="primary-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Submitting...
                      </>
                    ) : (
                      "SUBMIT ALL"
                    )}
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
}