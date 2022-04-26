import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import { useEffect } from 'react';
import { setUsersData } from '../../features/users/usersSlice';
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'Username', width: 130 },
  { field: 'first_name', headerName: 'First name', width: 130 },
  { field: 'last_name', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'role', headerName: 'Role', width: 130 },
  { field: 'created_at', headerName: 'First created', width: 130 },
  { field: 'updated_at', headerName: 'Last updated', width: 130 },
  { field: 'is_active', headerName: 'Status', type: 'number', width: 90 },
  { field: 'posts', headerName: 'Posts', type: 'number', width: 90 },
];

export default function Dashboard() {
  const dispatch = useDispatch();

  const rows = useSelector((state) => state.users.users);

  useEffect(() => {
    axios
      .get('api/dashboard')
      .then((res) => dispatch(setUsersData(res.data.userList)));
  }, [dispatch]);

  return (
    <Container>
      <div style={{ height: 630, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Container>
  );
}
