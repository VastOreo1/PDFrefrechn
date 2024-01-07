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
    setFiles(droppedFiles);
    setDrag(false);
  }

  return (
    <div>
      {drag ? (
        <div
          className='drop-area'
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
        >
          Отпустите файлы
        </div>
      ) : (
        <div
          className='drop-area'
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
        >
          {/* Добавьте iframe, если есть выбранный файл */}
          {files.length > 0 && (
            <iframe title="pdfViewer" src={URL.createObjectURL(files[0])} width="100%" height="600px" />
          )}
          {!files.length > 0 && (
            <span>Перетащите файлы</span>
          )}
        </div>
      )}

    </div>
  );
}
