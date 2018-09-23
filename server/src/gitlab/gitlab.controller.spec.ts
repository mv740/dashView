import { Test, TestingModule } from '@nestjs/testing';
import { GitlabController } from './gitlab.controller';

describe('Gitlab Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [GitlabController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: GitlabController = module.get<GitlabController>(GitlabController);
    expect(controller).toBeDefined();
  });
});
