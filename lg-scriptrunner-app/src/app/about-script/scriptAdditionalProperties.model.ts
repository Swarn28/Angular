import { Comment } from '../view-scripts/comment.model';
import { Argument } from '../view-scripts/argument.model';
// src/app/shared/script.model.ts

export interface ScriptAdditionalProps {
  name: string;
  id: Number;
  arguments: Argument[];
  hits: Number;
  likes: Number;
  comments: Comment[];
  developers: string[];
  lastModified: string;
}
