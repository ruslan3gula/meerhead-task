import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const UserEdit = () => {
  const param = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const editMode = !!param.id;
  const user = useSelector(state => state.users.user ?? {});

  const [name, setName] = useState(user.name ?? '');
  const [surname, setSurname] = useState(user.surname ?? '');
  const [desc, setDesc] = useState(user.desc ?? '');

  useEffect(() => {
    setName(user.name ?? '');
    setSurname(user.surname ?? '');
    setDesc(user.desc ?? '');
  }, [editMode, user.id]);

  return (
    <div style={{ padding: 32 }}>
      <h2>{editMode ? 'Edit user' : 'Add user'}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 500 }}>
        <TextField
          key="name"
          style={{ paddingBottom: 32 }}
          required
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          key="surname"
          style={{ paddingBottom: 32 }}
          label="Surname"
          value={surname}
          onChange={e => setSurname(e.target.value)}
        />
        <TextField
          style={{ paddingBottom: 32 }}
          label="Desc"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
      </div>
      <div style={{ paddingTop: 32 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            history.goBack();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            if (editMode) {
              dispatch({
                type: 'ACTION_EDIT_USER',
                payload: {
                  name,
                  surname,
                  desc,
                  id: user.id,
                },
              });
            } else {
              dispatch({
                type: 'ACTION_ADD_USER',
                payload: {
                  name,
                  surname,
                  desc,
                },
              });
            }
            history.push('/');
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
