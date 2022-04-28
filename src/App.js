import "./App.css";
import { useState, useEffect } from "react";
import { app, database, storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [array, setArray] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [picUrl, setPicUrl] = useState("");

  const [coolText, setCoolText] = useState({
    cool: " andrew",
  });
  const [newData, setNewData] = useState("");
  const [progress, setProgress] = useState(0);

  const auth = getAuth();

  const dbInstance = collection(database, "users");

  const handleInputs = (e) => {
    let inputs = { [e.target.name]: e.target.value };

    setData({ ...data, ...inputs });
  };
  const handleSignin = (e) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        alert(res.user);
        console.log(res.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert("you are signedout");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSubmit = (e) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        alert(res.user);
        return database.collection("users").doc(e.user.uid).set({
          bio: "testong".value,
        });
      })
      .catch((err) => {
        alert(err.message);
      })
      .then(() => {});
  };

  const handleDoc = (e) => {
    addDoc(dbInstance, coolText)
      .then(() => {
        alert("Data sent0");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getData = async () => {
    const dataFetch = await getDocs(dbInstance);
    // setNewData(dataFetch)
    setArray(
      dataFetch.docs.map((item) => {
        return { ...item.data(), id: item.id };
      })
    );
  };

  const updateData = (id) => {
    let dataToUpdate = doc(database, "users", id);
    updateDoc(dataToUpdate, {
      name: "alex",
      email: "wild to alex@gmail",
      password: "my pass",
    })
      .then(() => {
        alert("data updated");
        getData();
      })
      .catch((err) => console.log(err.message));
  };

  const deleteData = (id) => {
    let dataToDelete = doc(database, "users", id);
    deleteDoc(dataToDelete)
      .then(() => {
        alert("data deleted");
        getData();
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getData();
  });

  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(prog);
      },
      (err) => alert(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setPicUrl(url));
      }
    );
  };

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  return (
    <div className="App-header">
      <input
        placeholder="Email"
        name="email"
        type="email"
        className="input-fields"
        onChange={(event) => handleInputs(event)}
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        className="input-fields"
        onChange={(event) => handleInputs(event)}
      />

      <input
        placeholder="name"
        name="name"
        type="text"
        className="input-fields"
        onChange={(event) => handleInputs(event)}
      />
      <button className="login-button" onClick={handleSubmit}>
        Signup
      </button>
      <button className="signin-button" onClick={handleSignin}>
        Signin
      </button>
      <button className="out-button" onClick={handleSignOut}>
        signout
      </button>

      <button className="signin-button" onClick={handleDoc}>
        Add data
      </button>

      <button className="signin-button" onClick={getData}>
        get data
      </button>

      <button className="update" onClick={updateData}>
        update
      </button>

      {array.map((item) => {
        return (
          <div>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.password}</p>
            <button onClick={() => updateData(item.id)}>update all</button>
            <button onClick={() => deleteData(item.id)}>Delete</button>
            <hr />
          </div>
        );
      })}

      <form onSubmit={formHandler}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form>
      <hr />
      <h3>Uploaded {progress}%</h3>

      <h1>{newData}</h1>

      <img src={picUrl} alt="" />
    </div>
  );
}

export default App;
