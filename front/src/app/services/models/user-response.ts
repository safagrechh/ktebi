export interface UserResponse {
  id?: number;
  firstname?: string;
  lastname?: string;
  dateOfBirth?: string; // Adjust type based on how it's formatted (e.g., Date | string)
  email?: string;
  accountLocked?: boolean;
  enabled?: boolean;
  roles?: string[]; // Adjust type if roles are not simple strings
  createdDate?: string; // Adjust type based on how it's formatted (e.g., Date | string)
  lastModifiedDate?: string; // Adjust type based on how it's formatted (e.g., Date | string)
}
