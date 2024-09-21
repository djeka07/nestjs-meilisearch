/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import {
  DocumentOptions,
  DocumentsDeletionQuery,
  DocumentsIds,
  DocumentsQuery,
  EnqueuedTask,
  Index,
  IndexOptions,
  MeiliSearch,
} from 'meilisearch';
import { InjectMeiliSearch } from './meilisearch.decorators';

@Injectable()
export class MeiliSearchService {
  constructor(
    @InjectMeiliSearch() private readonly meiliSearchClient: MeiliSearch,
  ) {}

  async getIndex(name: string): Promise<Index<Record<string, any>>> {
    return await this.meiliSearchClient.getIndex(name);
  }

  async createIndex(
    name: string,
    options?: IndexOptions,
  ): Promise<EnqueuedTask> {
    return await this.meiliSearchClient.createIndex(name, options);
  }

  async updateIndex(
    name: string,
    options?: IndexOptions,
  ): Promise<EnqueuedTask> {
    return await this.meiliSearchClient.updateIndex(name, options);
  }

  async deleteIndex(name: string): Promise<EnqueuedTask> {
    return await this.meiliSearchClient.deleteIndex(name);
  }

  async deleteIndexIfExists(name: string): Promise<boolean> {
    return await this.meiliSearchClient.deleteIndexIfExists(name);
  }

  async addDocuments(
    index: string,
    documents: Array<Record<string, any>>,
    options?: DocumentOptions,
  ): Promise<EnqueuedTask> {
    return await this.meiliSearchClient
      .index(index)
      .addDocuments(documents, options);
  }

  async getDocuments(
    index: string,
    parameters?: DocumentsQuery<Record<string, any>>,
  ): Promise<any> {
    return await (
      await this.meiliSearchClient.getIndex(index)
    ).getDocuments(parameters);
  }

  async updateDocuments(
    index: string,
    documents: Array<Partial<Record<string, any>>>,
  ): Promise<EnqueuedTask> {
    return await this.meiliSearchClient.index(index).updateDocuments(documents);
  }

  async deleteDocument(index: string, docId: string): Promise<EnqueuedTask> {
    return await this.meiliSearchClient.index(index).deleteDocument(docId);
  }

  async deleteDocuments(
    index: string,
    documents: DocumentsDeletionQuery | DocumentsIds,
  ): Promise<EnqueuedTask> {
    return await this.meiliSearchClient.index(index).deleteDocuments(documents);
  }

  async deleteAllDocuments(index: string) {
    return await this.meiliSearchClient.index(index).deleteAllDocuments();
  }
}
