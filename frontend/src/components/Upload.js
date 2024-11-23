// src/components/Upload.js
import React, { useState } from "react";
import api from "../api";

function Upload() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            setStatus("Uploading...");
            const response = await api.uploadFile(file);
            setStatus(`Upload successful: ${response.message}`);
        } catch (error) {
            setStatus("Upload failed");
        }
    };

    return (
        <div>
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>{status}</p>
        </div>
    );
}

export default Upload;

