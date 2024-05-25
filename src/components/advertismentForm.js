import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAdvertisment, updateAdvertisment } from '../actions/advertismentActions';
import { v4 as uuid } from 'uuid';

const AdvertismentForm = ({ advertismentToEdit, onCancel = () => {} }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(advertismentToEdit ? advertismentToEdit.title : '');
  const [description, setDescription] = useState(advertismentToEdit ? advertismentToEdit.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const advertisment = { title, description, id: advertismentToEdit ? advertismentToEdit.id : uuid() };

    if (advertismentToEdit) {
      dispatch(updateAdvertisment(advertisment.id, advertisment));
    } else {
      dispatch(addAdvertisment(advertisment));
    }
    setTitle('');
    setDescription('');
    onCancel();
  };

  return (
    <div className="form-container">
      <div className="advertisement-card">
        <h2>{advertismentToEdit ? 'Edit Advertisement' : 'Add Advertisement'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit" className={advertismentToEdit ? 'update-button' : 'add-button'}>
            {advertismentToEdit ? 'Update' : 'Add'}
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AdvertismentForm;
