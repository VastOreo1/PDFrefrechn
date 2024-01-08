import React, { useState } from 'react';
import placeholderImage from './filer.png'; 

const App = () => {
  const [isHighlight, setIsHighlight] = useState(false);
  const [pdfData, setPdfData] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsHighlight(true);
  };

  const handleDragLeave = () => {
    setIsHighlight(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsHighlight(false);
    const file = event.dataTransfer.files[0];

    if (file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const pdfData = event.target.result;
        setPdfData(pdfData);
        setIsModalVisible(true);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Это не PDF...');
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <header>
        <h1>Просмотр PDF</h1>
      </header>
      <div
        id="drop-area"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={isHighlight ? 'highlight' : ''}
      >
        <div id="image-placeholder">
          <img src={placeholderImage} alt="Placeholder" className="adjustable-image"/>
        </div>
        <p>Переместите файл PDF сюда или выберите PDF из компьютера</p>
        <button onClick={handleCloseModal}>Подтвердить</button>
        <div id="divider-line"></div>
      </div>
      {pdfData && (
        <div id="pdf-viewer">
          <object data={pdfData} type="application/pdf" width="100%" height="100%"></object>
        </div>
      )}
      {isModalVisible && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <p>чо это</p>
          </div>
        </div>
      )}
    </>
  );
};

export default App;