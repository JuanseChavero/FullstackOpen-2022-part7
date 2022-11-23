import { Delete, MoreVert, ThumbUpOutlined } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { deleteBlog, voteBlog } from '../library/reducers/blogReducer';
import { connect, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentSection } from './CommentSection';

const Blog = (props) => {
  const navigate = useNavigate();
  const { id: blogId } = useParams();

  // For likes request
  const [isLoading, setIsLoading] = useState(false);

  // For "more" menu position
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { voteBlog, deleteBlog } = props;
  const { blog, user } = useSelector((state) => {
    return {
      blog: state.blogs.find((blog) => blog.id === blogId),
      user: state.user,
    };
  });

  if (!blog) return null;

  const isBlogCreator = blog.user.id === user.id;

  const handleUpdateLikes = async () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };

    // This could probably be improved using react-query
    setIsLoading(true);
    await voteBlog(likedBlog);
    setIsLoading(false);
  };

  const removeBlog = async () => {
    if (!isBlogCreator) return;

    // Close the menu
    handleClose();

    // Delete the blog
    await deleteBlog(blog);

    // Navigate to the blogs list
    navigate('/blogs');
  };

  const menuStyle = {
    elevation: 0,
    sx: {
      mt: 1,
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      bgcolor: '#0A1929',
      minWidth: 150,
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: '#0A1929',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  };

  return (
    <Paper elevation={2} className="container" sx={{ padding: 1 }}>
      {/* Likes button */}
      <Stack direction="row">
        <Stack justifyContent="flex-start" alignItems="center">
          <IconButton
            id="like-button"
            onClick={handleUpdateLikes}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : <ThumbUpOutlined />}
          </IconButton>
          <Typography className="blog-likes" variant="button">
            {blog.likes}
          </Typography>
        </Stack>

        {/* Blog body */}
        <Container disableGutters sx={{ padding: '0 10px' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="overline" color="#9ca3af">
              Posted by: {blog.user.name}
            </Typography>

            {isBlogCreator ? (
              <Box>
                <Tooltip title="More" arrow>
                  <IconButton id="more-button" onClick={handleClick}>
                    <MoreVert />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="blog-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={menuStyle}
                >
                  <MenuItem id="delete-button" onClick={removeBlog}>
                    <Delete fontSize="small" sx={{ marginRight: 1 }} />
                    Delete
                  </MenuItem>
                </Menu>
              </Box>
            ) : null}
          </Stack>
          <Stack>
            <Typography variant="h6" sx={{ marginTop: '-7px' }}>
              {blog.title}
            </Typography>
            <Box mb={1} />
            <Typography
              component="a"
              fontSize={18}
              href={blog.url}
              color="primary"
            >
              {blog.url}
            </Typography>
            <Typography fontSize={14}>By: {blog.author}</Typography>
          </Stack>
        </Container>
      </Stack>

      <Box mb={2} />
      <Divider variant="middle" />
      <CommentSection blogId={blog.id} />
    </Paper>
  );
};

const mapDispatchToProps = {
  voteBlog,
  deleteBlog,
};

export default connect(null, mapDispatchToProps)(Blog);
