import {
  Box,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Users = () => {
  const { users, blogs } = useSelector((state) => state);

  return (
    <Paper id="userlist" elevation={2} className="container">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingY={1}
      >
        <Typography variant="h5" paddingLeft={1}>
          Users
        </Typography>
      </Stack>
      <Box mb={1} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const userBlogAmount = blogs.filter(
              (blog) => blog.user.id === user.id,
            ).length;

            return (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Link
                    to={`/users/${user.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography variant="overline" color="primary">
                      {user.name}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell align="right">{userBlogAmount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};
