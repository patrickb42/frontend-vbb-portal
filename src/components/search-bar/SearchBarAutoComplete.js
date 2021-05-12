import SearchModalContent from '../Modal/SeachModalFragment'
import React, { useEffect, useState } from 'react';
import { AutoComplete, Input, Modal, Button} from 'antd';
import useModal from '../Modal/useModal'
import { v4 as uuidv4 } from 'uuid';
import dummy from './MOCK_DATA.json';
import AllAPIS from "./SearchbarAPI";

const SearchBarAutoComplete = () => {

  const SearchModal = Modal
 const {isVisible, selectedUser, toggleModal } = useModal(SearchModal)
  const [editUser, setEditUser] = useState();
  const [errorMessage, setErrorMessage] = useState();

//Need to connect with back end and have a PUT request for Edit button, this endpoint requires an external id
//Once backend is ready and seeded, use the searchbarAPI to make requests to the backend
useEffect(() => {
  fetch('vbb-backend.herokuapp.com/api/v1/mentor/{external_id}')
    .then(async res => {
      const data = await res.json();
      if (!res.ok) {
        const err = (data && data.message) || res.status;
        return Promise.reject(err);
      }
      setEditUser(data.id);
    })
    .catch(error => {
      setErrorMessage(error);
      console.error("error", error);
    });
},[]);

  const renderTitle = (title) => {
    return (
      <span>
        {title}
        <a
          style={{ float: 'right' }}
          href="https://www.google.com/search?q=antd"
          rel="noopener noreferrer"
        >
          More
        </a>
      </span>
    );
  };

  const renderItem = (user, key) => ({
    value: user.full_name,
    label: (
      <div
        key={key}
        style={{ display: 'flex', justifyContent: 'space-between' }}
        onClick={() => toggleModal(SearchModal, user)}
      >
        {user.full_name}
      </div>
    ),
    key,
  });

  const options = dummy.map((user) => {
    const reformattedUser = {
      ...user,
      full_name: `${user.first_name} ${user.last_name}`,
    };
    return reformattedUser;
  });

  /**
   * @description This an array that display different sections in the search-bar sepereated by Students and Students
   */
  const listOptions = [
    {
      label: renderTitle('Students'),
      options: options.map((user) => renderItem(user, uuidv4())),
    },
    {
      label: renderTitle('Teachers'),
      options: options.map((user) => renderItem(user, uuidv4())),
    },
  ];

  const handleEdit = () => {
    setEditUser();
  }

  return (
    <>
      <AutoComplete
        style={{ width: 500 }}
        options={listOptions}
        filterOption={true}
        autoClearSearchValue={true}
      >
        <Input.Search size="large" placeholder="Find User" />
      </AutoComplete>
      <SearchModal visible={isVisible} onOk={toggleModal} onCancel={toggleModal} destroyOnClose={true} >
        <SearchModalContent user={selectedUser}/>
        <Button onClick={handleEdit}>Edit</Button>
      </SearchModal>
    </>
  );
};

export default SearchBarAutoComplete;
