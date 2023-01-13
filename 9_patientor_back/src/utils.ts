import { NewEntryWithoutId, NewPatientEntry, Diagnose } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const parseThis = (x: unknown): string => {
  if (!x || !isString(x)) {
    throw new Error('Incorrect or missing variable');
  }
  return x;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

type FieldsToNewEntry = { 
  type: "Hospital" | "OccupationalHealthcare" | "HealthCheck",
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes: Array<Diagnose>,
  healthCheckRating: number,
  employerName: string,
  sickLeave: {
    startDate: string;
    endDate: string
},
  discharge: {
    date: string;
    criteria: string
}
 };

export const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation} : Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseThis(name),
    dateOfBirth: parseThis(dateOfBirth),
    ssn: parseThis(ssn),
    gender: parseThis(gender),
    occupation: parseThis(occupation)
  };
  return newEntry;
};

export const toNewEntry = ({type, description, date, specialist, diagnosisCodes, healthCheckRating, employerName, sickLeave, discharge } : FieldsToNewEntry ): NewEntryWithoutId => {
  switch (type) {
    case "Hospital":
      const newHospitalEntry: NewEntryWithoutId = {
            date: parseThis(date),
            type: type,
            specialist: parseThis(specialist),
            diagnosisCodes: diagnosisCodes,
            description: parseThis(description),
            discharge: { date: parseThis(discharge.date), criteria: parseThis(discharge.criteria)}
          };
          return newHospitalEntry;

      case "OccupationalHealthcare":
        if (sickLeave.startDate !== "" && sickLeave.endDate !== "") {
          const newOccupationalEntry: NewEntryWithoutId = {
            date: parseThis(date),
            type: type,
            specialist: parseThis(specialist),
            diagnosisCodes: diagnosisCodes,
            description: parseThis(description),
            employerName: parseThis(employerName),
            sickLeave: { startDate: parseThis(sickLeave.startDate), endDate: parseThis(sickLeave.endDate)}
          };
          return newOccupationalEntry;
        } else {
          const newOccupationalEntry: NewEntryWithoutId = {
            date: parseThis(date),
            type: type,
            specialist: parseThis(specialist),
            diagnosisCodes: diagnosisCodes,
            description: parseThis(description),
            employerName: parseThis(employerName)
          };
          return newOccupationalEntry;
        }
        

      case "HealthCheck":
        const newHealthCheckEntry: NewEntryWithoutId = {
          date: parseThis(date),
          type: type,
          specialist: parseThis(specialist),
          diagnosisCodes: diagnosisCodes,
          description: parseThis(description),
          healthCheckRating: Number(parseThis(healthCheckRating)),
        }; return newHealthCheckEntry;
}};