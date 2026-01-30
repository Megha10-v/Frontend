import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../styles/admin/HomeAdmin.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const categories = {
  rent: [
    "Car",
    "Property",
    "Electronics",
    "Furniture",
    "Bike",
    "Cloth",
    "Tools",
    "Helicopter",
    "Other",
  ],
  service: [
    "Cleaning",
    "Repair",
    "Plumbing",
    "Electrician",
    "Carpentry",
    "Laundry",
    "Plumbing",
    "Saloon",
    "Other",
  ],
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "10 digit phone")
    .required("Phone required"),
  location: Yup.string().required("Location required"),
  ads: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required("Title required"),
        description: Yup.string().required("Description required"),

        images: Yup.array().nullable(),

        prices: Yup.array()
          .of(
            Yup.object({
              category: Yup.string().required("Category Required"),
              unit: Yup.string().required("Unit required"),
              price: Yup.number()
                .typeError("Price must be number")
                .required("Price required"),
            }),
          )
          .min(1, "At least one price option"),
      }),
    )
    .min(1, "At least one ad required"),
});

export default function AccountCreateForm() {
  const navigate = useNavigate();
  const [locationLoading, setLocationLoading] = useState(false);
  const initialValues = {
    name: "",
    phone: "",
    location: "",
    latitude: "",
    longitude: "",
    ads: [],
  };
  const handleUseCurrentLocation = async (setFieldValue) => {
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const payload = { latitude, longitude };
          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/get_place`,
            payload,
          );
          const placeName = response.data.place;
          setFieldValue("location", placeName);
          setFieldValue("latitude", latitude);
          setFieldValue("longitude", longitude);
        } catch (err) {
          console.error("Error reverse geocoding:", err);
          alert("Could not fetch location");
        } finally {
          setLocationLoading(false);
        }
      },
      (err) => {
        console.error(err);
        alert("Location permission denied");
        setLocationLoading(false);
      },
    );
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form submitted values:", values);
      }}
    >
      {({ values, setFieldValue, errors }) => {
        console.log(errors);
        return (
          <Form className="offer-form">
            <div className="form-row">
              <div className="form-group">
                <Field
                  name="name"
                  placeholder="Name"
                  className="styled-input"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-text"
                />
              </div>
              <div className="form-group">
                <Field
                  name="phone"
                  placeholder="Phone"
                  className="styled-input"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="error-text"
                />
              </div>
              <div className="form-group">
                <div style={{ display: "flex", gap: "5px", height: "40px" }}>
                  <Field
                    name="location"
                    placeholder="Location"
                    className="styled-input"
                    readOnly
                  />
                  <Button
                    type="outline-primary"
                    onClick={() => handleUseCurrentLocation(setFieldValue)}
                    disabled={locationLoading}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {locationLoading ? "Fetching..." : "📍 Set Current"}
                  </Button>
                </div>
                <ErrorMessage
                  name="location"
                  component="div"
                  className="error-text"
                />
                <Field type="hidden" name="latitude" />
                <Field type="hidden" name="longitude" />
              </div>

              <FieldArray name="ads">
                {({ push, remove }) => (
                  <>
                    {errors.ads && typeof errors.ads === "string" && (
                      <div className="error-text w-100">{errors.ads}</div>
                    )}
                    {values.ads.map((ad, adIndex) => (
                      <div
                        key={adIndex}
                        style={{
                          border: "1px solid #ddd",
                          padding: "15px",
                          borderRadius: "10px",
                          marginBottom: "15px",
                          backgroundColor: "#f9f9f9",
                          width: "800px",
                        }}
                      >
                        <h3>Ad {adIndex + 1}</h3>
                        <div className="form-group">
                          <Field
                            as="select"
                            name={`ads.${adIndex}.type`}
                            className="styled-input"
                          >
                            <option value="">Select Type</option>
                            <option value="rent">Rent</option>
                            <option value="service">Service</option>
                          </Field>
                          <ErrorMessage
                            name={`ads.${adIndex}.type`}
                            component="div"
                            className="error-text"
                          />
                        </div>

                        <div className="form-group">
                          <Field
                            as="select"
                            name={`ads.${adIndex}.category`}
                            className="styled-input"
                          >
                            <option value="">Select Category</option>
                            {categories[values.ads?.[adIndex]?.type]?.map(
                              (c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ),
                            )}
                          </Field>
                          <ErrorMessage
                            name={`ads.${adIndex}.category`}
                            component="div"
                            className="error-text"
                          />
                        </div>

                        <div className="form-group">
                          <Field
                            name={`ads.${adIndex}.title`}
                            placeholder="Title"
                            className="styled-input"
                          />
                          <ErrorMessage
                            name={`ads.${adIndex}.title`}
                            component="div"
                            className="error-text"
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            as="textarea"
                            name={`ads.${adIndex}.description`}
                            placeholder="Description"
                            className="styled-input"
                          />
                          <ErrorMessage
                            name={`ads.${adIndex}.description`}
                            component="div"
                            className="error-text"
                          />
                        </div>
                        <FieldArray name={`ads.${adIndex}.prices`}>
                          {({ push, remove }) => (
                            <>
                              {ad.prices.map((price, priceIndex) => (
                                <div
                                  key={priceIndex}
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "15px",
                                    borderRadius: "10px",
                                    marginBottom: "15px",
                                    backgroundColor: "white",
                                  }}
                                >
                                  <div className="form-group">
                                    <Field
                                      name={`ads.${adIndex}.prices.${priceIndex}.category`}
                                      as="select"
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
                                  </div>
                                  {values.ads[adIndex].prices[priceIndex]
                                    .category === "custom" && (
                                    <div className="form-group">
                                      <Field
                                        name={`ads.${adIndex}.prices.${priceIndex}.unit`}
                                        placeholder="Custom Unit"
                                        className="styled-input"
                                      />

                                      <ErrorMessage
                                        name={`ads.${adIndex}.prices.${priceIndex}.unit`}
                                        component="div"
                                        className="error-text"
                                      />
                                    </div>
                                  )}
                                  {values.ads[adIndex].prices[priceIndex]
                                    .category === "size" && (
                                    <div className="form-group">
                                      <Field
                                        name={`ads.${adIndex}.prices.${priceIndex}.unit`}
                                        as="select"
                                        className="styled-input"
                                      >
                                        <option value="">Unit</option>
                                        <option value="hour">Inch</option>
                                        <option value="day">Centimeter</option>
                                      </Field>
                                      <ErrorMessage
                                        name={`ads.${adIndex}.prices.${priceIndex}.unit`}
                                        component="div"
                                        className="error-text"
                                      />
                                    </div>
                                  )}
                                  {values.ads[adIndex].prices[priceIndex]
                                    .category === "duration" && (
                                    <div className="form-group">
                                      <Field
                                        name={`ads.${adIndex}.prices.${priceIndex}.unit`}
                                        as="select"
                                        className="styled-input"
                                      >
                                        <option value="">Unit</option>
                                        <option value="hour">Hour</option>
                                        <option value="day">Day</option>
                                        <option value="week">Week</option>
                                        <option value="week">Month</option>
                                      </Field>
                                      <ErrorMessage
                                        name={`ads.${adIndex}.prices.${priceIndex}.unit`}
                                        component="div"
                                        className="error-text"
                                      />
                                    </div>
                                  )}

                                  <div className="form-group">
                                    <Field
                                      name={`ads.${adIndex}.prices.${priceIndex}.price`}
                                      placeholder="Price"
                                    />
                                    <ErrorMessage
                                      name={`ads.${adIndex}.prices.${priceIndex}.price`}
                                      component="div"
                                      className="error-text"
                                    />
                                  </div>

                                  {ad.prices.length > 1 && (
                                    <Button
                                      variant="link"
                                      className="p-0 text-decoration-none"
                                      onClick={() => remove(priceIndex)}
                                    >
                                      <IoCloseCircleOutline />
                                    </Button>
                                  )}
                                </div>
                              ))}

                              <Button
                                style={{
                                  gap: "10px",
                                  borderRadius: "15px",
                                  backgroundColor: "#4FBBB4",
                                  borderColor: "#4FBBB4",
                                  whiteSpace: "nowrap",
                                  marginTop: "10px",
                                }}
                                onClick={() =>
                                  push({ category: "", unit: "", price: "" })
                                }
                              >
                                + Add Price Option
                              </Button>
                            </>
                          )}
                        </FieldArray>

                        <div className="form-group">
                          <label>Upload Images</label>
                          {/* <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            const files = Array.from(e.target.files)
                            setFieldValue(`ads.${adIndex}.images`, files)

                            // optional: create previews inside ad object
                            const previews = files.map((file) =>
                              URL.createObjectURL(file),
                            )
                            setFieldValue(
                              `ads.${adIndex}.imagePreviews`,
                              previews,
                            )
                          }}
                        /> */}

                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                              const newFiles = Array.from(e.target.files);

                              const existingFiles =
                                values.ads[adIndex].images || [];
                              const existingPreviews =
                                values.ads[adIndex].imagePreviews || [];

                              const newPreviews = newFiles.map((file) =>
                                URL.createObjectURL(file),
                              );

                              setFieldValue(`ads.${adIndex}.images`, [
                                ...existingFiles,
                                ...newFiles,
                              ]);

                              setFieldValue(`ads.${adIndex}.imagePreviews`, [
                                ...existingPreviews,
                                ...newPreviews,
                              ]);
                              e.target.value = "";
                            }}
                          />

                          {/* Previews */}
                          <div className="image-preview-container">
                            {values.ads[adIndex].imagePreviews?.map(
                              (src, i) => (
                                <div key={i} className="image-preview">
                                  <img src={src} alt={`preview-${i}`} />
                                  <Button
                                    variant="link"
                                    className="p-0 text-decoration-none"
                                    type="button"
                                    onClick={() => {
                                      // Remove the image
                                      const newFiles = values.ads[
                                        adIndex
                                      ].images.filter((_, idx) => idx !== i);
                                      const newPreviews = values.ads[
                                        adIndex
                                      ].imagePreviews.filter(
                                        (_, idx) => idx !== i,
                                      );
                                      setFieldValue(
                                        `ads.${adIndex}.images`,
                                        newFiles,
                                      );
                                      setFieldValue(
                                        `ads.${adIndex}.imagePreviews`,
                                        newPreviews,
                                      );
                                    }}
                                  >
                                    <IoCloseCircleOutline />
                                  </Button>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {values.ads.length > 1 && (
                          <Button
                            style={{
                              gap: "10px",
                              borderRadius: "15px",
                              backgroundColor: "#4FBBB4",
                              borderColor: "#4FBBB4",
                              whiteSpace: "nowrap",
                              marginTop: "10px",
                            }}
                            onClick={() => remove(adIndex)}
                          >
                            Remove Ad
                          </Button>
                        )}
                      </div>
                    ))}

                    <div className="w-100">
                      <Button
                        style={{
                          gap: "10px",
                          borderRadius: "15px",
                          backgroundColor: "#4FBBB4",
                          borderColor: "#4FBBB4",
                          whiteSpace: "nowrap",
                          marginTop: "10px",
                        }}
                        onClick={() =>
                          push({
                            title: "",
                            description: "",
                            location: "",
                            images: [],
                            prices: [{ category: "", unit: "", price: "" }],
                          })
                        }
                      >
                        + Add Another Ad
                      </Button>
                    </div>
                  </>
                )}
              </FieldArray>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Button
                type="submit"
                style={{
                  gap: "10px",
                  borderRadius: "15px",
                  backgroundColor: "#4FBBB4",
                  borderColor: "#4FBBB4",
                  whiteSpace: "nowrap",
                }}
                className="btn-secondary"
              >
                Submit All
              </Button>

              <Button
                type="button"
                style={{
                  gap: "10px",
                  borderRadius: "15px",
                  backgroundColor: "#fefdfdff",
                  borderColor: "#ccc",
                  whiteSpace: "nowrap",
                  color: "black",
                }}
                onClick={() => navigate("/admin/accounts")}
              >
                Cancel
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
