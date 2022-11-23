import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export const User = () => {
  const { id: userId } = useParams();

  const user = useSelector((state) =>
    state.users.find((user) => user.id === userId),
  );

  const userBlogs = useSelector((state) =>
    state.blogs.filter((blog) => blog.user.id === userId),
  );

  const userHasBlogs = userBlogs.length > 0;

  if (!user) return null;

  return (
    <Paper elevation={4} className="container">
      <Typography variant="h6" display="flex" alignItems="center">
        {user.name}
      </Typography>
      <Box mb={2} />
      <Typography
        variant="body1"
        display="flex"
        justifyContent="space-between"
        padding={1}
      >
        Blogs created: <span>{userBlogs.length}</span>
      </Typography>
      <Divider />
      {userHasBlogs ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Blog name</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userBlogs.map((blog) => (
              <TableRow key={blog.id} hover>
                <TableCell>
                  <Link
                    to={`/blogs/${blog.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography variant="overline" color="primary">
                      {blog.title}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.url}</TableCell>
                <TableCell>{blog.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>User has no blogs</div>
      )}
    </Paper>
  );
};
