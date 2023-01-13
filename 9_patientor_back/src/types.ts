export type Diagnose = 'M24.2' | 'M51.2' | 'S03.5' | 'J10.1' | 'J06.9'| 'Z57.1' | 'N30.0' | 'H54.7' | 'J03.0'| 'L60.1' | 'Z74.3' | 'L20' | 'F43.2'| 'S62.5' | 'H35.29';

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Diagnose[]; //diagnosisCodes?: Array<Diagnosis['code']>;
  }

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string
    }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string
    }
}

export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntryWithoutId = UnionOmit<Entry, 'id'>;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: string;
    dateOfBirth: string;
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export interface NonSensitivePatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    occupation: string
}

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string
}