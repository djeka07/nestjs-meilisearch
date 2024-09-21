/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModuleMetadata } from '@nestjs/common';

export interface Options {
  host: string;
  apiKey?: string;
  headers?: object;
}
export interface OptionsFactory {
  createMeiliOptions(): Promise<Options> | Options;
}

export interface OptionsAsync extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Options | Promise<Options>;
  inject?: any[];
}
