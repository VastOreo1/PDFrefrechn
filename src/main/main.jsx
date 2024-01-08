import React, { useState } from 'react';

import './main.css';

export default function Main() {
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState([]);

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e) {
    e.preventDefault();
    const droppedFiles = [...e.dataTransfer.files];

    // Фильтрация файлов: только PDF
    const pdfFiles = droppedFiles.filter(file => file.type === 'application/pdf');

    setFiles(pdfFiles);
    setDrag(false);
  }

  function openFolder() {
    // Create an input element dynamically
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf'; // Restrict to PDF files

    // Handle file selection
    input.addEventListener('change', (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type === 'application/pdf') {
        setFiles([selectedFile]);
      }
    });

    // Trigger the file input
    input.click();
  }
  function closePDF() {
    setFiles([]);
  }
  return (
    <div>
      <button onClick={openFolder}>Нажмите здесь, чтобы выбрать файл PDF</button>
      <button className='close-btn' onClick={closePDF}>Закрыть PDF</button>
      {drag ? (
        <div
          className={`drop-area ${files.length > 0 ? 'hidden' : 'visible'}`}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
        >
          Отпустите файлы (только PDF)
        </div>
      ) : (
        <div
          className={`drop-area ${files.length > 0 ? 'hidden' : 'visible'}`}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
        >
          Перетащите файлы (только PDF)
        </div>
      )}
      <div className='pdf'>
        {files.length > 0 &&(
            <iframe title="pdfViewer" src={URL.createObjectURL(files[0])} width="100%" height="600px" />
          )}
      </div>
      
    </div>
  );
}