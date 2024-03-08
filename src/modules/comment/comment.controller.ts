import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CommentService } from './services/comment.service';

@ApiTags('Tag')
@Controller('tags')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
}
