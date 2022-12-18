import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsImageValidatorConstraint
  implements ValidatorConstraintInterface
{
  async validate(url: string) {
    const isUrl = /[\w-]+.(jpg|png|svg)/.test(url);
    return isUrl;
  }

  defaultMessage(): string {
    return '$property should be image url';
  }
}

export function IsImage(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsImage',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsImageValidatorConstraint,
    });
  };
}
