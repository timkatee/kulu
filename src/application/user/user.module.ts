import { Module } from "@nestjs/common";
import { UserService } from "@application/user/user.service";
import { RepositoryPrisma } from "@infrastructure/database/repository.prisma";

@Module({
  providers: [
    UserService,
    {
      provide: "Repository",
      useValue: new RepositoryPrisma("Users"),
    },
  ],
})
export class UserModule {}
