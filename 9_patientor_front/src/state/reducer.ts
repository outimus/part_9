import { State } from "./state";
import { Patient, Diagnose } from "../types";

/*export const setPatientList = (content: Patient[]) => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: content
  };
};

export const addPatient = (content: Patient) => {
  return{
    type: "ADD_PATIENT",
    payload: content
  };
};

export const getIndividualData = (content: Patient) => {
  return {
    type: "INDIVIDUAL_PATIENT_DATA",
    payload: content
  };
};*/

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "INDIVIDUAL_PATIENT_DATA";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnose[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
            ...action.payload.reduce(
              (memo, patient) => ({ ...memo, [patient.id]: patient }),
              {}
            ),
            ...state.patients
          }
        };
      case "ADD_PATIENT":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload
          }
        };
      case "INDIVIDUAL_PATIENT_DATA":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload
          }
        };
      case "SET_DIAGNOSES":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnoses) => ({ ...memo, [diagnoses.code]: diagnoses }),
              {}
            ),
          }
          };
      case "ADD_ENTRY":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload
          }
        };
    default:
      return state;
  }
};