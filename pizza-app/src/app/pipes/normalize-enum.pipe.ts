import { Pipe, PipeTransform } from '@angular/core';

// Pipes are used only in the html template
// This pipe is used to normalize the enum values to be more human-readable
@Pipe({
  name: 'normalizeEnum',
  // Pipes are used only in the html template
// This pipe is used to normalize the enum values to be more human-readable
  standalone: true
})
export class NormalizeEnumPipe implements PipeTransform {

  transform(value: string | string[]): string {
    if (Array.isArray(value)) {
      return value.map((v) => this.capitalizeIngredient(v)).join(', ')
    }

    if (typeof value !== 'string' || !value?.length) {
      return '';
    }
    return this.capitalizeIngredient(value);
  }

  capitalizeIngredient(value: string): string {
    const firsLetter = value.charAt(0).toUpperCase();
    const lowercaseValue = value.slice(1).toLowerCase();

    return `${firsLetter}${lowercaseValue}`.replace('_', ' '); // replace method: Chilli_Pepper ==> Chilli Pepper
  }

}
