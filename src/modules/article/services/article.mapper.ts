import { ArticleEntity } from '../../../database/entities/article.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { ArticleResponseDto } from '../dto/response/article.respomse.dto';

export class ArticleMapper {
  public static toResponseDto(
    articleEntity: ArticleEntity,
  ): ArticleResponseDto {
    return {
      id: articleEntity.id,
      body: articleEntity.body,
      title: articleEntity.title,
      description: articleEntity.description,
      created: articleEntity.created,
      updated: articleEntity.updated,
      user: articleEntity.user
        ? UserMapper.toResponseDto(articleEntity.user)
        : null,
    };
  }
}
