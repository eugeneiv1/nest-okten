import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../configs/config';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [
    UserModule,
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PostgresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
