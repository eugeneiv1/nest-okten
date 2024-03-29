import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CommentRequestDto } from '../comment/models/dto/comment.request.dto';
import { ArticleListRequestDto } from './dto/request/article-list.request.dto';
import { CreateArticleRequestDto } from './dto/request/create-article.request.dto';
import { EditArticleRequestDto } from './dto/request/edit-article.request.dto';
import { ArticleResponseDto } from './dto/response/article.response.dto';
import { ArticleListResponseDto } from './dto/response/article-list.response.dto';
import { ArticleService } from './services/article.service';

@ApiBearerAuth()
@ApiTags('Article')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  public async getList(
    @Query() query: ArticleListRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<ArticleListResponseDto> {
    return await this.articleService.getList(query, userData);
  }

  @Put()
  public async create(
    @Body() dto: CreateArticleRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<ArticleResponseDto> {
    return await this.articleService.create(dto, userData);
  }

  @Get(':articleId')
  public async getArticleById(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<ArticleResponseDto> {
    return await this.articleService.getArticleById(articleId, userData);
  }

  @Put(':articleId')
  public async editArticleById(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @Body() dto: EditArticleRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<ArticleResponseDto> {
    return await this.articleService.editArticleById(articleId, userData, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':articleId')
  public async deleteArticleById(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.articleService.deleteArticleById(articleId, userData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':articleId/like')
  public async like(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.articleService.like(articleId, userData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':articleId/like')
  public async dislike(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.articleService.dislike(articleId, userData);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':articleId/comment')
  public async addComment(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @Body() commentBody: CommentRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.articleService.addComment(articleId, commentBody, userData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':articleId/comment/:commentId')
  public async deleteComment(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<void> {
    await this.articleService.deleteComment(articleId, commentId);
  }
}
