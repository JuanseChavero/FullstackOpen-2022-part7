import { Send } from '@mui/icons-material';
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useField } from '../hooks';
import { addComment } from '../library/reducers/blogReducer';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const Comment = ({ comment }) => {
  return (
    <Stack padding={1}>
      <Typography variant="body1">{comment.message}</Typography>
      <Typography variant="overline" color="#9ca3af">
        {dateFormatter.format(Date.parse(comment.createdAt))}
      </Typography>
    </Stack>
  );
};

export const CommentSection = ({ blogId }) => {
  const dispatch = useDispatch();
  const [comment, resetComment] = useField('textarea');
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId),
  );

  if (!blog) return null;

  const isCommentSectionEmpty = blog.comments.length <= 0;

  const handleAddComment = (e) => {
    e.preventDefault();
    const newComment = comment.value;
    dispatch(addComment(blog.id, newComment));
    resetComment();
  };

  return (
    <Container>
      <Box mt={2} />
      <Typography variant="h6">Comments</Typography>
      <Box mb={1} />
      <form
        onSubmit={handleAddComment}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <TextField
          id="comment-input"
          placeholder="Write something"
          variant="outlined"
          name="comment"
          {...comment}
          multiline
          rows={4}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Submit comment" arrow>
                  <span>
                    <IconButton
                      aria-label="Submit comment"
                      type="submit"
                      edge="end"
                      color="primary"
                      disabled={!comment.value}
                    >
                      {<Send color={comment.value ? 'primary' : 'disabled'} />}
                    </IconButton>
                  </span>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </form>
      <Box mb={3} />
      <section>
        <Stack>
          {isCommentSectionEmpty ? (
            <Typography sx={{ paddingY: 1 }}>
              No comments yet. Be the first!
            </Typography>
          ) : (
            blog.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          )}
        </Stack>
      </section>
    </Container>
  );
};
