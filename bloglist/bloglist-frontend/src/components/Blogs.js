import { Add, ThumbUpAltOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export const Blogs = () => {
  const navigate = useNavigate();

  const sortedBlogs = useSelector((state) =>
    state.blogs.slice().sort((a, b) => b.likes - a.likes),
  );

  const goToBlogForm = () => navigate('/blogs/new');

  return (
    <Paper id="bloglist" elevation={2} className="container">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingY={1}
      >
        <Typography variant="h5" paddingLeft={1}>
          Blogs
        </Typography>
        <Button startIcon={<Add />} variant="contained" onClick={goToBlogForm}>
          NEW BLOG
        </Button>
      </Stack>
      <Box mb={1} />
      <Stack spacing={1}>
        {sortedBlogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            style={{ textDecoration: 'none' }}
            className="bloglist-card"
          >
            <Card
              variant="outlined"
              sx={{ backgroundColor: '#0c4a6e', color: '#f5f5f5' }}
            >
              <CardActionArea>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">{blog.title}</Typography>
                    <Typography variant="subtitle2" color="#d1d5db">
                      By {blog.author}
                    </Typography>
                  </div>
                  <Tooltip title={`${blog.likes} likes`} arrow>
                    <Chip
                      label={blog.likes}
                      icon={
                        <ThumbUpAltOutlined
                          sx={{ fontSize: 15 }}
                          color="primary"
                        />
                      }
                      sx={{
                        color: '#f5f5f5',
                        fontWeight: 'bold',
                        width: '6em',
                      }}
                    />
                  </Tooltip>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </Stack>
    </Paper>
  );
};
