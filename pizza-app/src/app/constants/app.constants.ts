import { MatSnackBarConfig } from "@angular/material/snack-bar";

export const apiUrl = 'http://localhost:5004/api';

export const snackBarConfig: MatSnackBarConfig = {
  verticalPosition: 'top', // Allowed values: 'top' or 'bottom'
  horizontalPosition: 'end', // Allowed values: 'start', 'center', 'end', 'left', or 'right'
  duration: 3000, // Duration in milliseconds
}