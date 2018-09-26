import { Test } from '@nestjs/testing';
import { BuildbotController } from './buildbot.controller';
import { BuildbotService } from './buildbot.service';
// typescrippt alias don't work in emmited code ... https://github.com/Microsoft/TypeScript/issues/26722
import { BuildResponse } from '@shared/buildbot/response/build-response.model';
import { Meta } from '@shared/buildbot/meta.model';
import { HttpModule } from '@nestjs/common';
describe('BuildbotController', () => {
  let buildbotController: BuildbotController;
  let buildbotService: BuildbotService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BuildbotController],
      imports: [HttpModule],
      providers: [BuildbotService],
    }).compile();

    buildbotService = module.get<BuildbotService>(BuildbotService);
    buildbotController = module.get<BuildbotController>(BuildbotController);
  });

  describe('getProgress', () => {
    it('should return a BuildResponse', async () => {
      const meta: Meta = { total: 1 };
      const result: BuildResponse = { builds: null, meta };
      const spy = jest.spyOn(buildbotService, 'getBuildsInProgress').mockImplementation(() => result);

      expect( await buildbotController.getProgress()).toBe(result);
      expect(spy).toHaveBeenCalled();
    });
  });
});