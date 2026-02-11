import React, {useState} from "react";
import { chatService } from "../services/api";

function UploadFile() {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState('idle'); // 'idle', 'uploading', 'success', 'error'


    const handleFileInputChange = (event) => {
        if (event.target.files[0]) {
            setFile(event.target.files[0])
            setStatus('idle'); 
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return;

        setIsUploading(true);
        setStatus('uploading');

        try {
            const data = await chatService.uploadPDF(file)

           
            setStaus('success');
            console.log("File uploaded sucessfully:", data);
            
        } catch(error) {
            setStatus('error');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }

    return(
        <div className="upload-file-container">
            <h1>Upload File</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="custom-file-upload">
                    {file ? "Change File" : "Choose PDF"}
                </label>

                <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                />
                

                <button 
                    className={`submit-button ${status}`}
                    type="submit"
                    disabled={isUploading || !file}
                    >
                        {isUploading ? "Processing" : "Upload File"}
                    </button>
            </form>
            {file && (
                <div className="file-info">
                    <span className="file-name">📄 {file.name}</span>
                    {status === 'success' && <span className="success-tag">Ready</span>}
                </div>
            )}
        </div>
    );
}

export default UploadFile