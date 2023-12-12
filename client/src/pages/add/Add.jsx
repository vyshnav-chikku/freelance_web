import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      // const cover = "dkfjdfigjdfi"
      // const images = []


      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      console.log("gig",gig);

      return newRequest.post("/gigs", {
        gig:gig,
        userId: JSON.parse(localStorage.getItem("currentUser"))?._id
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs")
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="Not Selected">--Select--</option>
              <option value="Design">Design</option>
              <option value="Web Developer">Web Developer</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Content Creator">Content Creator</option>
              <option value="Financial Advisor">Financial Advisor</option>
              <option value="Writer">Writer</option>
              <option value="SEO Professional">SEO Professional</option>
              <option value="Marketing Consultant">Marketing Consultant</option>
              <option value="Researcher">Researcher</option>
              <option value="Voice Actor">Voice Actor</option>
              <option value="Vlogger">Vlogger</option>
              <option value="Talent Manager">Talent Manager</option>
              <option value="Technology Specialist">Technology Specialist</option>
              <option value="Accountant">Accountant</option>
              <option value="Data Engineer">Data Engineer</option>
              <option value="Lifestyle Guru">Lifestyle Guru</option>
              <option value="Web Designer">Web Designer</option>
              <option value="Business Consultant">Business Consultant</option>
              <option value="Website Content Writer">Website Content Writer</option>
              <option value="Photographer">Photographer</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Adviser">Adviser</option>
              <option value="Makeup Artist">Makeup Artist</option>
              <option value="Video Game Developer">Video Game Developer</option>
              <option value="Architect">Architect</option>
              <option value="Game Programmer">Game Programmer</option>
              <option value="Manager">Manager</option>
              <option value="Auditor">Auditor</option>
              <option value="Translator">Translator</option>
              <option value="Animator">Animator</option>
              <option value="Art Director">Art Director</option>
              <option value="Furniture Designer">Furniture Designer</option>
              <option value="Analyst">Analyst</option>
              <option value="Film Editor">Film Editor</option>
              <option value="Proof Reader">Proof Reader</option>
              <option value="Influencers/ Internet Celebrity">Influencers/ Internet Celebrity</option>
              <option value="Copy Writer">Copy Writer</option>
              <option value="Teacher/ Tutor">Teacher/ Tutor</option>
              <option value="Consultant">Consultant</option>
              <option value="Videographer">Videographer</option>


            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
