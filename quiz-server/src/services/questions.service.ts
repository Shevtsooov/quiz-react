// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { Questions } from '../models/questions/questions.model';

export class QuestionsService {
  findById (itemId: string, arr: Questions[]): Questions | undefined {
    return arr.find((phone) => phone.itemId === itemId);
  }
}
