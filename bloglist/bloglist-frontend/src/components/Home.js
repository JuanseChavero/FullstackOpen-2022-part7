import {
  ArrowUpward,
  Book,
  MoreVert,
  NavigateNext,
  People,
  ThumbUp,
} from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const trendingBlogs = useSelector((state) =>
    state.blogs
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3),
  );

  // Sort the users by the ones that have the most amount of blogs
  // In reality, this should probably be sorted by date and total amount of likes
  const mostPopularUsers = useSelector((state) =>
    state.users
      .slice()
      .sort((a, b) => b.blogs.length - a.blogs.length)
      .slice(0, 3),
  );

  return (
    <Grid container spacing={1}>
      <Grid xs={6}>
        <Card sx={{ height: 320, bgcolor: '#001E3C' }}>
          <CardHeader
            avatar={
              <Avatar>
                <Book />
              </Avatar>
            }
            action={
              <Tooltip title="Go to blogs" onClick={() => navigate('/blogs')}>
                <IconButton>
                  <NavigateNext />
                </IconButton>
              </Tooltip>
            }
            title="Blogs"
            subheader="Trending"
            titleTypographyProps={{ variant: 'h6' }}
            sx={{ paddingTop: 2, paddingBottom: 0 }}
          />
          <CardContent sx={{ paddingY: 0.5 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Likes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trendingBlogs.map((blog) => (
                  <TableRow
                    key={blog.id}
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                    hover
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{blog.title}</TableCell>
                    <TableCell align="right">{blog.likes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={6}>
        <Card sx={{ height: 320, bgcolor: '#001E3C' }}>
          <CardHeader
            avatar={
              <Avatar>
                <People />
              </Avatar>
            }
            action={
              <Tooltip title="Go to users" onClick={() => navigate('/users')}>
                <IconButton>
                  <NavigateNext />
                </IconButton>
              </Tooltip>
            }
            title="Users"
            subheader="Most Popular"
            titleTypographyProps={{ variant: 'h6' }}
            sx={{ paddingTop: 2, paddingBottom: 0 }}
          />
          <CardContent sx={{ paddingY: 0.5 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mostPopularUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    onClick={() => navigate(`/users/${user.id}`)}
                    hover
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
