import { UserResponseDto } from '../../../user/models/dto/response/user.response.dto';

export class ArticleResponseDto {
  id: string;
  title: string;
  description: string;
  body: string;
  created: Date;
  updated: Date;
  user?: UserResponseDto;
  isLiked: boolean;
  tags: string[];
  comments: string[];
}
