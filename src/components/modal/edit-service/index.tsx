import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { ServiceValidationSchema } from "../../../utils/validation";
import service from "../../../service/service";
import Notification from "../../../utils/notification";
import {ServiceFormValues} from "../../../types/service"

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

const initialValues: ServiceFormValues = {
  name: "",
  price: 0,
};

const AddService: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (values: ServiceFormValues, { setSubmitting }: FormikHelpers<ServiceFormValues>) => {
    try {
      const response = await service.add(values);
      if (response.status === 201) {
        Notification({
          title: "Successfully added",
          type: "success",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error("Error:", response.statusText, response.data);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Add Service
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Service
            </Typography>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={ServiceValidationSchema}
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
                    helperText={<ErrorMessage name="name" component="span" className="text-[red] text-[15px]" />}
                  />
                  <Field
                    name="price"
                    type="number"
                    as={TextField}
                    label="Service Price"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="price" component="span" className="text-[red] text-[15px]" />}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      gap: "12px",
                      marginTop: "5px",
                    }}
                  >
                    <Button onClick={handleClose} type="button" variant="contained" color="warning">
                      Close
                    </Button>
                    <Button type="submit" variant="contained" color="success" disabled={isSubmitting}>
                      Add
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddService;
