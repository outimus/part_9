import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, DiagnosisSelection, EntryOption } from "./FormField";
import { Entry, EntryType, UnionOmit } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = UnionOmit<Entry, 'id' | "type">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryOptions: EntryOption[] = [
  { value: EntryType.HospitalEntry, label: "Hospital" },
  { value: EntryType.OccupationalHealthcareEntry, label: "OccupationalHealthcare" },
  { value: EntryType.HealthCheckEntry, label: "HealthCheck" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "",
        healthCheckRating: "",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        },
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const numberError = "Please place a number between 0-3";
        const wrongFormatError = "Please fill the date in format YYYY-MM-DD";

        const errors: { [field: string ]: string } = {};

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date.length !== 10) {
          errors.date = wrongFormatError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === "OccupationalHealthcare" && !values.employerName) {
          errors.employerName = requiredError;
        }
        //miten lisään error messagen objektiin?
        if (values.type === "Hospital" && !values.discharge.criteria) {
          /*errors.discharge.criteria = requiredError;*/
        }
        if (values.type === "Hospital" && !values.discharge.date || values.discharge.date.length !== 10) {
          /*errors.discharge.date = requiredError;*/
        }
        if (values.type === "HealthCheck" && Number(values.healthCheckRating) < 0 || Number(values.healthCheckRating) > 3) {
          errors.healthCheckRating = numberError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <SelectField label="Type" name="type" options={entryOptions} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <h2>Hospital</h2>
            <h4>Discharge:</h4>
            <Field
              style={{ marginBottom: "1em" }}
              name="discharge.date"
              label="Date"
              placeholder="YYYY-MM-DD"
              component={TextField}
              />
            <Field
              style={{ marginBottom: "1em" }}
              name="discharge.criteria"
              label="Criteria"
              placeholder="Criteria"
              component={TextField}
              />

            <h2>Occupational healthcare</h2>
            <>Sickleave:</><br></br>
            <em>(optional)</em>
            <Field
              style={{ marginBottom: "1em" }}
              name="sickLeave.startDate"
              label="Starts"
              placeholder="YYYY-MM-DD"
              component={TextField}
              />
            <Field
              style={{ marginBottom: "1em" }}
              name="sickLeave.endDate"
              label="Ends"
              placeholder="YYYY-MM-DD"
              component={TextField}
              />
            <Field
              label="Employer"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />

            <h2>Healthcheck</h2> 
            <em>0=healthy, 1=lowrisk, 2=highrisk, 3=criticalrisk</em>
            <p></p>
            <Field
              label="Rating"
              min="0"
              max="3"
              name="healthCheckRating"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
