import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../styles/admin/HomeAdmin.css";
import { IoCloseCircleOutline } from "react-icons/io5";

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

  type: Yup.string().required("Type required"),
  category: Yup.string().required("Category required"),

  ads: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required("Title required"),
        description: Yup.string().required("Description required"),
        location: Yup.string().required("Location required"),

        images: Yup.array().min(1, "At least one image"),

        prices: Yup.array()
          .of(
            Yup.object({
              category: Yup.string().required(),
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

export default function AccountCreateForm({ onSubmit }) {
  const initialValues = {
    name: "",
    phone: "",
    type: "",
    category: "",
    ads: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="offer-form">
          <div className="form-row">
            <div className="form-group">
              <Field name="name" placeholder="Name" className="styled-input" />
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
              <Field as="select" name="type" className="styled-input">
                <option value="">Select Type</option>
                <option value="rent">Rent</option>
                <option value="service">Service</option>
              </Field>
              <ErrorMessage
                name="type"
                component="div"
                className="error-text"
              />
            </div>

            {/* CATEGORY */}
            {values.type && (
              <div className="form-group">
                <Field as="select" name="category" className="styled-input">
                  <option value="">Select Category</option>
                  {categories[values.type].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="error-text"
                />
              </div>
            )}

            <FieldArray name="ads">
              {({ push, remove }) => (
                <>
                  {values.ads.map((ad, adIndex) => (
                    <div key={adIndex} className="ad-box">
                      <h3>Ad {adIndex + 1}</h3>
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
                              <div key={priceIndex}>
                                <div className="form-group">
                                  <Field
                                    name={`ads.${adIndex}.prices.${priceIndex}.category`}
                                    as="select"
                                    className="styled-input"
                                  >
                                    <option value="">Category</option>
                                    <option value="rent">Rent</option>
                                    <option value="service">Service</option>
                                  </Field>
                                  <ErrorMessage
                                    name={`ads.${adIndex}.prices.${priceIndex}.category`}
                                    component="div"
                                    className="error-text"
                                  />
                                </div>
                                <div className="form-group">
                                  <Field
                                    name={`ads.${adIndex}.prices.${priceIndex}.unit`}
                                    placeholder="Unit (hour/day)"
                                    className="styled-input"
                                  />
                                  <ErrorMessage
                                    name={`ads.${adIndex}.prices.${priceIndex}.unit`}
                                    component="div"
                                    className="error-text"
                                  />
                                </div>
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
                                  <button
                                    type="button"
                                    onClick={() => remove(priceIndex)}
                                  >
                                  <IoCloseCircleOutline/>
                                  </button>
                                )}
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() =>
                                push({ category: "", unit: "", price: "" })
                              }
                            >
                              + Add Price Option
                            </button>
                          </>
                        )}
                      </FieldArray>

                      <Field
                        name={`ads.${adIndex}.location`}
                        placeholder="Location"
                      />

                      {/* IMAGES */}
                      <input
                        type="file"
                        multiple
                        onChange={(e) =>
                          setFieldValue(
                            `ads.${adIndex}.images`,
                            Array.from(e.target.files),
                          )
                        }
                      />

                      {values.ads.length > 1 && (
                        <button type="button" onClick={() => remove(adIndex)}>
                          Remove Ad
                        </button>
                      )}
                    </div>
                  ))}

                  {values.category && (
                    <div>
                      <button
                        type="button"
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
                      </button>
                    </div>
                  )}
                </>
              )}
            </FieldArray>
          </div>

          <button type="submit">Submit All</button>
        </Form>
      )}
    </Formik>
  );
}
