import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import style from "./Post.module.css";
import { Comment } from "../comment/Comment";
import { useState, FormEvent, ChangeEvent } from 'react';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: string;
  content: string;
}

interface PostProps{
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState([
    'Brabo em'
  ]);
  const [commentText, setCommentText] = useState('');

  const publishedDateFormat = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleSubmitComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, commentText]);
    setCommentText('');
  }

  function handleSetCommentText(event: ChangeEvent<HTMLTextAreaElement>){
    setCommentText(event.target.value);
  }

  function removeComment(comment: string){
    const commentsWithoutDeletedOne = comments.filter(
      content => content!=comment
    );
    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentInputEmpty = commentText.length === 0;

  return (
    <article className={style.article}>
      <header className={style.header}>
        <div>
          <h3>{author.name}</h3>
          <small>{author.role}</small>
        </div>
        <time 
          title={publishedDateFormat} 
          dateTime={publishedAt.toISOString()}
        >X
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={style.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form className={style.comments} onSubmit={handleSubmitComment}>
        <strong>Deixe seu feedback!</strong>
        <textarea 
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleSetCommentText}
          value={commentText}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentInputEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={style.commentList}>
        {comments.map(comment => {
          return <Comment 
                  key={comment}
                  content={comment}
                  onRemoveComment={removeComment}
                />
        })}
      </div>
    </article>
  );
}
