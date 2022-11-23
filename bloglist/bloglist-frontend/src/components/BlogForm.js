import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';
import { createBlog } from '../library/reducers/blogReducer';

const BlogForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, resetTitle] = useField('text');
  const [author, resetAuthor] = useField('text');
  const [url, resetUrl] = useField('text');

  const resetForm = () => {
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    dispatch(createBlog(newBlog));

    // Form resets even if the creation of the blog failed.
    // I'm not sure on how to handle this. Maybe using react-query
    // to try to see if the request failed?.
    resetForm();
    navigate(`/blogs`);
  };

  return (
    <Paper elevation={2} className="container">
      <Container maxWidth="sm">
        {/* Title */}
        <Typography variant="h5">Create a new blog</Typography>
        <Box mb={2} />
        {/* Form */}
        <form
          onSubmit={handleOnSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {/* Title Input */}
          <TextField
            id="title"
            label="Title"
            size="small"
            name="Title"
            fullWidth
            {...title}
          />

          <Box mb={1} />

          {/* Author Input */}
          <TextField
            id="author"
            label="Author"
            size="small"
            name="Author"
            fullWidth
            {...author}
          />

          <Box mb={1} />

          {/* Url Input */}
          <TextField
            id="url"
            label="URL"
            size="small"
            name="Url"
            fullWidth
            {...url}
          />

          <Box mb={2} />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            id="create-button"
            sx={{ alignSelf: 'flex-end' }}
          >
            CREATE
          </Button>
        </form>
      </Container>
    </Paper>
  );
};

export default BlogForm;
