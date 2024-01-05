const dropArea = document.getElementById('drop-area');
const pdfViewer = document.getElementById('pdf-viewer');

dropArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', (event) => {
  event.preventDefault();
  dropArea.classList.remove('highlight');
  const file = event.dataTransfer.files[0];
  
  if (file.type === 'application/pdf') {
    const reader = new FileReader();
    reader.onload = function(event) {
      const pdfData = event.target.result;
      pdfViewer.innerHTML = `<embed src="${pdfData}" type="application/pdf" width="100%" height="100%">`;
    };
    reader.readAsDataURL(file);
  } else {
    alert('Пожалуйста, загрузите файл в формате PDF.');
  }
});