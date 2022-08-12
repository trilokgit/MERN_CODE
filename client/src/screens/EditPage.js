import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import MainScree from './../components/mainScree';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateNoteAction } from '../actions/noteAction';
import { axios } from 'axios';
const EditPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [editdata, setEditDate] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const submithandler = (e) => {
        e.preventDefault();


        if (!title || !content || !category) {
            return;
        }
        dispatch(updateNoteAction(id,title, content, category));
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
          <MainScree title="Edit Note">
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
                  <button type="submit" className="btn px-4 btn-sm shadow-lg btn-primary mt-3 fw-bold">
                      Edit 
                  </button>
                  <button onClick={resethandler} type="submit" className="btn btn-sm px-4 shadow-lg btn-danger mt-3 ms-3 fw-bold">
                      Reset
                  </button>
                  <div className="card p-2 mt-3">
                      <footer className="fw-light text-dark">
                          Edit on - {new Date().toLocaleDateString()}
                      </footer>
                  </div>
              </form>
          </MainScree>
    </>
  )
}

export default EditPage