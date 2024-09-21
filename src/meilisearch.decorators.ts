import { Inject } from '@nestjs/common';
import { MEILI_CLIENT } from './meilisearch.constants';

export function InjectMeiliSearch() {
  return Inject(MEILI_CLIENT);
}
