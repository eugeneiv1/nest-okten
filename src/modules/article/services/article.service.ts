import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/services/article.repository';
import { LikeRepository } from '../../repository/services/like.repository';
import { ArticleListRequestDto } from '../dto/request/article-list.request.dto';
import { CreateArticleRequestDto } from '../dto/request/create-article.request.dto';
import { EditArticleRequestDto } from '../dto/request/edit-article.request.dto';
import { ArticleResponseDto } from '../dto/response/article.response.dto';
import { ArticleListResponseDto } from '../dto/response/article-list.response.dto';
import { ArticleMapper } from './article.mapper';

@Injectable()
export class ArticleService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly articleRepository: ArticleRepository,
  ) {}

  public async getList(
    query: ArticleListRequestDto,
    userData: IUserData,
  ): Promise<ArticleListResponseDto> {
    const [entities, total] = await this.articleRepository.getList(
      query,
      userData,
    );

    return ArticleMapper.toListResponseDto(entities, total, query);
  }

  public async create(
    dto: CreateArticleRequestDto,
    userData: IUserData,
  ): Promise<ArticleResponseDto> {
    const article = await this.articleRepository.save(
      this.articleRepository.create({ ...dto, user_id: userData.userId }),
    );
    return ArticleMapper.toResponseDto(article);
  }

  public async getArticleById(
    articleId: string,
    userData: IUserData,
  ): Promise<ArticleResponseDto> {
    const article = await this.articleRepository.getArticleById(
      articleId,
      userData,
    );
    if (!article) {
      throw new UnprocessableEntityException();
    }
    return ArticleMapper.toResponseDto(article);
  }

  public async editArticleById(
    articleId: string,
    userData: IUserData,
    dto: EditArticleRequestDto,
  ): Promise<ArticleResponseDto> {
    const article = await this.findMyOneByIdOrThrow(articleId, userData.userId);
    const newArticle = await this.articleRepository.save({
      ...article,
      ...dto,
    });
    return ArticleMapper.toResponseDto(newArticle);
  }

  public async deleteArticleById(
    articleId: string,
    userData: IUserData,
  ): Promise<void> {
    const article = await this.findMyOneByIdOrThrow(articleId, userData.userId);
    await this.articleRepository.remove(article);
  }

  public async like(articleId: string, userData: IUserData): Promise<void> {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (article.user_id === userData.userId) {
      throw new ForbiddenException(`You can't like your own article`);
    }

    const like = await this.likeRepository.findOneBy({
      user_id: userData.userId,
      article_id: article.id,
    });
    if (like) {
      throw new ForbiddenException('You already like this article');
    }

    await this.likeRepository.save(
      this.likeRepository.create({
        user_id: userData.userId,
        article_id: article.id,
      }),
    );
  }

  public async dislike(articleId: string, userData: IUserData): Promise<void> {
    const article = await this.articleRepository.findOneBy({ id: articleId });

    const like = await this.likeRepository.findOneBy({
      user_id: userData.userId,
      article_id: article.id,
    });
    if (!like) {
      throw new ForbiddenException(`You can't dislike this article`);
    }

    await this.likeRepository.remove(like);
  }

  private async findMyOneByIdOrThrow(
    articleId: string,
    userId: string,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({
      id: articleId,
    });
    if (!article) {
      throw new UnprocessableEntityException();
    }
    if (article.user_id !== userId) {
      throw new ForbiddenException();
    }
    return article;
  }
}
