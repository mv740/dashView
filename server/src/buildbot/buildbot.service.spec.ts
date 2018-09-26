import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BuildbotService } from './buildbot.service';

describe('BuildbotService', () => {
  let service: BuildbotService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BuildbotService],
    }).compile();
    service = module.get<BuildbotService>(BuildbotService);
  });
  it('should be defined', () => {
     expect(service).toBeDefined();
  });

 // afterAll(() => setTimeout(() => process.exit(), 1000));
});
