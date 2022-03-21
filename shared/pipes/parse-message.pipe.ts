import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

export class ParseMessagePipe implements PipeTransform {
  transform(message: any, metadata: ArgumentMetadata): any {
    const { value } = message;

    if (!value) {
      throw new BadRequestException('Invalid message!');
    }

    return value;
  }
}
