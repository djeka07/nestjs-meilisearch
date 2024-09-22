/* eslint-disable @typescript-eslint/no-explicit-any */
import { Global, Module, Provider } from '@nestjs/common';
import MeiliSearch from 'meilisearch';
import { MEILI_CLIENT, MEILI_MODULE_OPTIONS } from './meilisearch.constants';
import { Options, OptionsAsync } from './meilisearch.interface';
import { MeiliSearchService } from './meilisearch.service';

@Global()
@Module({})
export class MeiliSearchModule {
  private static createConnectionFactory(options: Options) {
    return new MeiliSearch(options);
  }
  public static forRoot(options: Options) {
    const meiliOptions: Provider = {
      provide: MEILI_MODULE_OPTIONS,
      useValue: options,
    };

    const connectionProvider: Provider = {
      provide: MEILI_CLIENT,
      useFactory: async () => this.createConnectionFactory(options),
    };

    return {
      module: MeiliSearchModule,
      providers: [meiliOptions, connectionProvider, MeiliSearchService],
      exports: [MeiliSearchService],
    };
  }

  public static forRootAsync(config: OptionsAsync) {
    return {
      module: MeiliSearchModule,
      imports: config.imports || [],
      providers: [...this.createAsyncProviders(config), MeiliSearchService],
      exports: [MeiliSearchService],
    };
  }

  private static createAsyncProviders(options: OptionsAsync): Provider[] {
    const connectionProvider: Provider = {
      provide: MEILI_CLIENT,
      useFactory: async (...args: any[]) => {
        const factoryOptions = await options.useFactory(...args);
        return this.createConnectionFactory(factoryOptions);
      },
      inject: options.inject || [],
    };
    return [
      connectionProvider
    ];
  }
}
