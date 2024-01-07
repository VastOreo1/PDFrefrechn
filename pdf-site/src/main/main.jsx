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
          Отпустите файлы (только PDF)
        </div>
      ) : (
        <div
          className='drop-area'
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
        >
          {files.length > 0 ? (
            // Если есть выбранный PDF-файл, отобразите его
            <iframe title="pdfViewer" src={URL.createObjectURL(files[0])} width="100%" height="600px" />
          ) : (
            // Если нет выбранного файла, отобразите текст
            <span>Перетащите файлы (только PDF)</span>
          )}
        </div>
      )}
    </div>
  );
}
