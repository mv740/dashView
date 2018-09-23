import { Test, TestingModule } from '@nestjs/testing';
import { GitlabService } from './gitlab.service';

describe('GitlabService', () => {
  let service: GitlabService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GitlabService],
    }).compile();
    service = module.get<GitlabService>(GitlabService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
