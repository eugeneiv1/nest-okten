import { ArticleEntity } from '../../../database/entities/article.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { ArticleListRequestDto } from '../dto/request/article-list.request.dto';
import { ArticleResponseDto } from '../dto/response/article.response.dto';
import { ArticleListResponseDto } from '../dto/response/article-list.response.dto';

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
      isLiked: !!articleEntity.likes?.[0],
      tags: articleEntity.tags ? articleEntity.tags.map((tag) => tag.name) : [],
      comments: articleEntity.comments
        ? articleEntity.comments.map((comment) => comment.body)
        : [],
      user: articleEntity.user
        ? UserMapper.toResponseDto(articleEntity.user)
        : null,
    };
  }

  public static toListResponseDto(
    entities: ArticleEntity[],
    total: number,
    query: ArticleListRequestDto,
  ): ArticleListResponseDto {
    return {
      data: entities.map(this.toResponseDto),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total: total,
      },
    };
  }
}
