import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { CourseModule } from './course/course.module';
import { StatsModule } from './stats/stats.module';
import { UserModule } from './user/user.module';
import { EmailsModule } from './emails/emails.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
console.log(join(__dirname, '..', '/uploads'))
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    CourseModule,
    ContentModule,
    StatsModule,
    EmailsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/uploads'), 
      serveRoot: '/uploads',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
