import React, { useState } from "react";
import MainScree from "./../../components/mainScree";
import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { createNoteAction } from "../../actions/noteAction";
import { useNavigate } from 'react-router-dom';
const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const noteCreate = useSelector(state => state.noteCreate);
  // const { loading, error, note } = noteCreate;
  
  const submithandler = (e) => {
    e.preventDefault();

    
    if (!title || !content || !category) {
      return;
    }
    dispatch(createNoteAction(title, content, category));
    resethandler();
    navigate('/mynotes');
  };
  const resethandler = async () => {
    setTitle("");
    setCategory("");
    setContent("");
  }

  return (
    <>
      <MainScree title="Create New Notes">
        <form onSubmit={submithandler} className="fw-bold">
          <div className="mb-3">
            <label className="form-label">Enter Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Enter Content</label>
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Enter Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <button type="submit" className="btn btn-sm shadow-lg btn-primary mt-3 fw-bold">
            Add Note
          </button>
          <button onClick={resethandler} type="submit" className="btn btn-sm px-4 shadow-lg btn-danger mt-3 ms-3 fw-bold">
            Reset
          </button>
          <div className="card p-2 mt-3">
            <footer className="fw-light text-dark">
             Creating on - {new Date().toLocaleDateString()}
            </footer>
          </div>
        </form>
      </MainScree>
    </>
  );
};

export default CreateNote;
