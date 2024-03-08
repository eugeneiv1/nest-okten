import { IsString, Length } from 'class-validator';

export class CommentRequestDto {
  @IsString()
  @Length(1, 1000)
  body: string;
}
