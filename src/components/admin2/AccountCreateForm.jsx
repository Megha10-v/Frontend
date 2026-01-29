import React from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../../styles/admin/HomeAdmin.css'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { Button } from 'react-bootstrap'

const categories = {
  rent: [
    'Car',
    'Property',
    'Electronics',
    'Furniture',
    'Bike',
    'Cloth',
    'Tools',
    'Helicopter',
    'Other',
  ],
  service: [
    'Cleaning',
    'Repair',
    'Plumbing',
    'Electrician',
    'Carpentry',
    'Laundry',
    'Plumbing',
    'Saloon',
    'Other',
  ],
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, '10 digit phone')
    .required('Phone required'),

  type: Yup.string().required('Type required'),
  category: Yup.string().required('Category required'),

  ads: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required('Title required'),
        description: Yup.string().required('Description required'),
        location: Yup.string().required('Location required'),

        images: Yup.array().min(1, 'At least one image'),
       

        prices: Yup.array()
          .of(
            Yup.object({
              category: Yup.string().required(),
              unit: Yup.string().required('Unit required'),
              price: Yup.number()
                .typeError('Price must be number')
                .required('Price required'),
            }),
          )
          .min(1, 'At least one price option'),
      }),
    )
    .min(1, 'At least one ad required'),
})

export default function AccountCreateForm({ onSubmit }) {
  const initialValues = {
    name: '',
    phone: '',
    type: '',
    category: '',
    ads: [],
  }

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

            <FieldArray name="ads">
              {({ push, remove }) => (
                <>
                  {values.ads.map((ad, adIndex) => (
                    <div key={adIndex} className="ad-box">
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
                          {categories[values.ads?.[adIndex]?.type]?.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
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
                                gap: '10px',
                                borderRadius: '15px',
                                backgroundColor: '#4FBBB4',
                                borderColor: '#4FBBB4',
                                whiteSpace: 'nowrap',
                              }}
                              onClick={() =>
                                push({ category: '', unit: '', price: '' })
                              }
                            >
                              + Add Price Option
                            </Button>
                          </>
                        )}
                      </FieldArray>
                      <div className="form-group">
                        <Field
                          name={`ads.${adIndex}.location`}
                          placeholder="Location"
                        />
                        <ErrorMessage
                          name="location"
                          component="div"
                          className="error-text"
                        />
                      </div>

                      <div className="form-group">
                        <label>Upload Images</label>
                        <input
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
                        />

                        {/* Previews */}
                        <div className="image-preview-container">
                          {values.ads[adIndex].imagePreviews?.map((src, i) => (
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
                                  ].images.filter((_, idx) => idx !== i)
                                  const newPreviews = values.ads[
                                    adIndex
                                  ].imagePreviews.filter((_, idx) => idx !== i)
                                  setFieldValue(
                                    `ads.${adIndex}.images`,
                                    newFiles,
                                  )
                                  setFieldValue(
                                    `ads.${adIndex}.imagePreviews`,
                                    newPreviews,
                                  )
                                }}
                              >
                                <IoCloseCircleOutline />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {values.ads.length > 1 && (
                        <Button
                          style={{
                            gap: '10px',
                            borderRadius: '15px',
                            backgroundColor: '#4FBBB4',
                            borderColor: '#4FBBB4',
                            whiteSpace: 'nowrap',
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
                        gap: '10px',
                        borderRadius: '15px',
                        backgroundColor: '#4FBBB4',
                        borderColor: '#4FBBB4',
                        whiteSpace: 'nowrap',
                      }}
                      onClick={() =>
                        push({
                          title: '',
                          description: '',
                          location: '',
                          images: [],
                          prices: [{ category: '', unit: '', price: '' }],
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
          <Button
            style={{
              gap: '10px',
              borderRadius: '15px',
              backgroundColor: '#4FBBB4',
              borderColor: '#4FBBB4',
              whiteSpace: 'nowrap',
            }}
            className="btn-secondary"
          >
            Submit All
          </Button>
        </Form>
      )}
    </Formik>
  )
}
