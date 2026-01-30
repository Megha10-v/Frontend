import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const AdminDashboard = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [preview, setPreview] = useState(null);

  const initialValues = {
    phoneNumber: "",
    postType: "rental",
    title: "",
    price: "",
    price: "",
    description: "",
    location: "",
    image: null,
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("Required"),
    title: Yup.string().min(5, "Too short").required("Required"),
    price: Yup.number().positive("Must be positive").required("Required"),
    description: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    image: Yup.mixed()
      .required("Required")
      .test("fileType", "Unsupported File Format", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      }),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e, setFieldValue) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFieldValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (values) => {
    console.log("Submission:", JSON.stringify(values, null, 2));
    setSubmissionStatus("success");
    alert("Success");
    // resetForm(); // Optional? User didn't say reset, just "log and show success alert".
    // I'll leave it without reset for now so user can see what they submitted, usually better for preview.
    // Actually, "log the values ... and show a 'Success' alert".
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Header className="bg-primary text-white text-center py-4 rounded-top-4">
              <h3 className="mb-0 fw-bold">Create New Ad</h3>
              <p className="mb-0 text-white-50">
                Post your service or rental ad
              </p>
            </Card.Header>
            <Card.Body className="p-4 p-md-5">
              {submissionStatus === "success" && (
                <Alert
                  variant="success"
                  onClose={() => setSubmissionStatus(null)}
                  dismissible
                >
                  Ad submitted successfully! Check console for details.
                </Alert>
              )}

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  values,
                  touched,
                  errors,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    {/* User Identification */}
                    <Form.Group className="mb-3" controlId="phoneNumber">
                      <Form.Label className="fw-semibold">
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter 10-digit number"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                        className="bg-light"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phoneNumber}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Post Type Selection */}
                    <Form.Group className="mb-4">
                      <Form.Label className="d-block fw-semibold">
                        Ad Type
                      </Form.Label>
                      <div className="d-flex gap-3">
                        <Form.Check
                          type="radio"
                          id="type-rental"
                          name="postType"
                          label="Rental Ad"
                          value="rental"
                          checked={values.postType === "rental"}
                          onChange={handleChange}
                          className="custom-radio"
                        />
                        <Form.Check
                          type="radio"
                          id="type-service"
                          name="postType"
                          label="Service Ad"
                          value="service"
                          checked={values.postType === "service"}
                          onChange={handleChange}
                          className="custom-radio"
                        />
                      </div>
                    </Form.Group>

                    {/* Title */}
                    <Form.Group className="mb-3" controlId="title">
                      <Form.Label className="fw-semibold">Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.title && !!errors.title}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Price */}
                    <Form.Group className="mb-3" controlId="price">
                      <Form.Label className="fw-semibold">Price</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="price"
                          value={values.price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.price && !!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.price}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-3" controlId="description">
                      <Form.Label className="fw-semibold">
                        Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.description && !!errors.description}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Location */}
                    <Form.Group className="mb-3" controlId="location">
                      <Form.Label className="fw-semibold">Location</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          name="location"
                          value={values.location}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.location && !!errors.location}
                          placeholder="Enter location"
                        />
                        <Button
                          variant="outline-primary"
                          onClick={() =>
                            setFieldValue("location", "Current Location")
                          }
                        >
                          📍 Set Current
                        </Button>
                        <Form.Control.Feedback type="invalid">
                          {errors.location}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    {/* Image Upload */}
                    <Form.Group className="mb-4" controlId="image">
                      <Form.Label className="fw-semibold">
                        Upload Image
                      </Form.Label>
                      <div
                        className={`border rounded-3 p-4 text-center ${touched.image && errors.image ? "border-danger" : "border-secondary"} bg-light`}
                        style={{
                          borderStyle: "dashed",
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, setFieldValue)}
                        onClick={() =>
                          document.getElementById("imageInput").click()
                        }
                      >
                        <input
                          id="imageInput"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, setFieldValue)}
                          style={{ display: "none" }}
                        />
                        {preview ? (
                          <div className="text-center">
                            <img
                              src={preview}
                              alt="Preview"
                              style={{
                                maxHeight: "150px",
                                maxWidth: "100%",
                                borderRadius: "8px",
                              }}
                            />
                            <p className="mt-2 mb-0 text-muted small">
                              Click or Drag to replace
                            </p>
                          </div>
                        ) : (
                          <div className="py-3">
                            <div className="fs-2 mb-2">☁️</div>
                            <p className="mb-1 fw-medium">
                              Click or Drag & Drop to Upload
                            </p>
                            <p className="text-muted small mb-0">
                              SVG, PNG, JPG
                            </p>
                          </div>
                        )}
                      </div>
                      {touched.image && errors.image && (
                        <div className="text-danger small mt-1">
                          {errors.image}
                        </div>
                      )}
                    </Form.Group>

                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      className="w-100 rounded-pill py-2 fw-bold shadow-sm"
                    >
                      Submit Ad
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
