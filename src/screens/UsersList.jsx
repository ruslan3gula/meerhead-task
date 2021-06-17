import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const getColumns = (history, setUserToDelete, dispatch) => [
  { field: 'id', headerName: 'Id', width: 100 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'surname', headerName: 'Surname', width: 130 },
  { field: 'desc', headerName: 'Desc', width: 200 },
  {
    field: '',
    headerName: 'Actions',
    width: 200,
    renderCell: param => (
      <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            dispatch({ type: 'ACTION_STORE_USER_TO_EDIT', payload: param.row });
            history.push(`edit-user/${param.id}`);
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            setUserToDelete(param.id);
          }}
        >
          Delete
        </Button>
      </>
    ),
  },
];

export const UsersList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(state => state.users);
  const [userToDelete, setUserToDelete] = useState(null);
  useEffect(() => dispatch({ type: 'ACTION_GET_USERS' }), []);

  return (
    <>
      <div style={{ height: 400, padding: 32 }}>
        <h2>Users list</h2>
        <Button
          style={{ marginBottom: 16 }}
          onClick={() => {
            history.push('add-user');
          }}
          variant="contained"
          color="primary"
        >
          Add user
        </Button>
        <DataGrid
          rows={users.users ? users.users : []}
          columns={getColumns(history, setUserToDelete, dispatch)}
          pageSize={5}
          disableSelectionOnClick
          isRowSelectable={false}
        />
      </div>
      <Dialog open={!!userToDelete} onClose={() => setUserToDelete(null)}>
        <DialogTitle>Delete user</DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setUserToDelete(null)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: 'ACTION_DELETE_USER', payload: userToDelete });
              setUserToDelete(null);
            }}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
