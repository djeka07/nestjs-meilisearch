import { Test } from '@nestjs/testing';
import { MeiliSearchModule } from './meilisearch.module';
import { Options } from './meilisearch.interface';
import { MEILI_CLIENT } from './meilisearch.constants';
import { MeiliSearchService } from './meilisearch.service';
import MeiliSearch from 'meilisearch';

describe('GIVEN MeiliSearchModule', () => {
  it('WHEN forRoot THEN should be defined', async () => {
    const options: Options = {
      host: 'http://127.0.0.0',
      apiKey: '',
    };

    const module = await Test.createTestingModule({
      imports: [MeiliSearchModule.forRoot(options)],
    }).compile();

    const config = module.get(MEILI_CLIENT) as MeiliSearch;
    const service = module.get(MeiliSearchService);
    expect(config.config.apiKey).toBe(options.apiKey);
    expect(config.config.host).toBe(options.host);
    expect(module).toBeDefined();
    expect(service).toBeInstanceOf(MeiliSearchService);
  });

  it('WHEN forRootAsync THEN should be defined', async () => {
    const options: Options = {
      host: 'http://127.0.0.0',
      apiKey: '',
    };

    const module = await Test.createTestingModule({
      imports: [MeiliSearchModule.forRootAsync({ useFactory: () => options })],
    }).compile();

    const config = module.get(MEILI_CLIENT);
    const service = module.get(MeiliSearchService);
    expect(config.config.apiKey).toBe(options.apiKey);
    expect(config.config.host).toBe(options.host);
    expect(module).toBeDefined();

    expect(service).toBeInstanceOf(MeiliSearchService);
  });
});
