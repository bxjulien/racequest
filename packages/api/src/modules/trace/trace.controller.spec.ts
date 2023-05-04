import { Test, TestingModule } from '@nestjs/testing';
import { TraceController } from './trace.controller';

describe('TraceController', () => {
  let controller: TraceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TraceController],
    }).compile();

    controller = module.get<TraceController>(TraceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
