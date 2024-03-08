import { Injectable } from '@nestjs/common';

import { CommentRepository } from '../../repository/services/comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  // public async getPopular(): Promise<TagResponseDto[]> {
  //   const tags = await this.commentRepository.getPopular();
  //   return TagMapper.toListResponseDto(tags);
  // }
}
