import React, { useEffect } from "react";
import { Box, Typography, Modal, Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { ServiceValidationSchema } from "../../../utils/validation";
import service from "../../../service/service";
import Notification from "../../../utils/notification";
import { ServiceFormValues2, ServiceModalProps } from "../../../types/service";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  borderRadius: 1.3,
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 3,
  outline: "none",
};

const ServiceModal: React.FC<ServiceModalProps> = ({ open, handleClose, edit, fetchData }) => {

  const initialValues: ServiceFormValues2 = {
    name: edit ? edit.name : "",
    price: edit ? edit.price : 0,
  };


  const handleSubmit = async (
    values: ServiceFormValues2,
    { setSubmitting }: FormikHelpers<ServiceFormValues2>
  ) => {
    try {
      let response;
      if (edit?.id) {
        response = await service.edit({ id: edit.id, ...values });
        Notification({
          title: "Successfully edited",
          type: "success",
        });
      } else {
        response = await service.add(values);
        Notification({
          title: "Successfully added",
          type: "success",
        });
      }
      if (response.status === 200 || response.status === 201) {
        fetchData();
        handleClose();
      } else {
        console.error("Error:", response.statusText, response.data);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error.response ? error.response.data : error);
    } finally {
      setSubmitting(false);
    }
  };


  useEffect(() => {
    if (edit) {
      console.log("Edit mode enabled", edit);
    }
  }, [edit]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {edit ? "Edit Service" : "Add Service"}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={ServiceValidationSchema}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="name"
                  type="text"
                  as={TextField}
                  label="Service Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="name" component="span" />}
                />
                <Field
                  name="price"
                  type="number"
                  as={TextField}
                  label="Service Price"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="price" component="span" />}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "12px",
                    marginTop: "5px",
                  }}
                >
                  <Button
                    onClick={handleClose}
                    type="button"
                    variant="contained"
                    color="warning"
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={isSubmitting}
                  >
                    {edit ? "Update" : "Add"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </Modal>
  );
};

export default ServiceModal;
