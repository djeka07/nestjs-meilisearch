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
  ResourceResults,
  Task,
  TasksResults,
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

  async getTask(taskUid: number): Promise<Task> {
    return this.meiliSearchClient.getTask(taskUid);
  }

  async getTasks(): Promise<TasksResults> {
    return this.meiliSearchClient.getTasks();
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

  async addDocuments<T extends Record<string, any>>(
    index: string,
    documents: Array<T>,
    options?: DocumentOptions,
  ): Promise<EnqueuedTask> {
    return await this.meiliSearchClient
      .index(index)
      .addDocuments(documents, options);
  }

  async getDocuments<T extends Record<string, any>>(
    index: string,
    parameters?: DocumentsQuery<T>,
  ): Promise<ResourceResults<T[]>> {
    return await (
      await this.meiliSearchClient.getIndex(index)
    ).getDocuments(parameters);
  }

  async updateDocuments<T extends Record<string, any>>(
    index: string,
    documents: Array<Partial<T>>,
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
