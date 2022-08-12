import React, { useEffect } from "react";
import MainScree from "../../components/mainScree";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "./../../actions/noteAction";
import Loading from "./../../components/Loading";
import ErrorMessage from "./../../components/ErrorMessage";
const MyNotes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);

  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector(state => state.noteCreate);
  const { success: scuuessCreate } = noteCreate;

  const noteDelete = useSelector(state => state.noteDelete);
  const { success:successDelete } = noteDelete;

 

  const deletehandle = (id) => {
       
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
      
    }

  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo, scuuessCreate, successDelete]);

  return (
    <>
      <MainScree title={`welocme to ${userInfo.name}`}>
        <Link to="/createnote">
          <button className="btn btn-sm p-2 rounded btn-primary fw-bold border-0 shadow-sm">
            CREATE NEW NOTE
          </button>
        </Link>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {notes?.reverse().map((note, index) => {
          return (
            <div key={index} className="card mt-3">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id={`headingOne${index}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapseOne${index}`}
                      aria-expanded="false"
                      aria-controls={`collapseOne${index}`}
                    >
                      <span className="fw-bold text-secondary fs-5">
                        {" "}
                        {note.title}{" "}
                      </span>
                    </button>
                  </h2>
                  <div
                    id={`collapseOne${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`headingOne${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="float-end mt-3">
                        <Link
                          className="text-white"
                          style={{ textDecoration: "none" }}
                          to={`/edit/${note._id}`}
                        ><button className="btn btn-sm btn-warning fw-bold px-3 rounded border-0">
                         
                            Edit
                        </button>
                          </Link>
                        <button
                          onClick={() => deletehandle(note._id)}
                          className="btn btn-sm btn-danger fw-bold ms-3 rounded border-0"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="card-body">
                        <span className="badge bg-success border-0">
                          Category - {note.category}
                        </span>
                        <blockquote className="blockquote mt-2 mb-0">
                          <p>{note.content}</p>
                          <footer className="blockquote-footer">
                            created on{" "}
                            <cite title="Source Title">
                              {note.createdAt.substr(0, 10)}
                            </cite>
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </MainScree>
    </>
  );
};

export default MyNotes;
