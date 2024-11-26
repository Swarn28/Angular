import { Comment } from './comment.model';
import { Argument } from './argument.model';
// src/app/shared/script.model.ts

export interface Script {
  name: string; // display Name
  id: Number;
  description: string;
  type: string;
  status: string;
  scriptName: string;

}
