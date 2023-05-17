import { Module } from "@nestjs/common";
import { UserService } from "@application/user/user.service";
import { RepositoryPrisma } from "@kulu/common";
import { ConfigService } from "@nestjs/config";
import { prisma } from "@infrastructure/database/prisma/client";

@Module({
  providers: [
    UserService,
    {
      provide: "Repository",
      useFactory: (configService: ConfigService) =>
        new RepositoryPrisma("Users", configService, prisma),
      inject: [ConfigService],
    },
  ],
})
export class UserModule {}
