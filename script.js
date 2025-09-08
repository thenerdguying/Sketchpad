document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  const wordCount = document.getElementById('wordCount');
  const charCount = document.getElementById('charCount');
  const fontFamily = document.getElementById('fontFamily');
  const fontSize = document.getElementById('fontSize');
  const bold = document.getElementById('bold');
  const italic = document.getElementById('italic');
  const underline = document.getElementById('underline');
  const textColor = document.getElementById('textColor');
  const alignLeft = document.getElementById('alignLeft');
  const alignCenter = document.getElementById('alignCenter');
  const alignRight = document.getElementById('alignRight');

  // Update counts
  function updateCounts() {
    const text = editor.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    
    wordCount.textContent = `Words: ${words}`;
    charCount.textContent = `Characters: ${chars}`;
  }

  // Format functions
  function formatText(command, value = null) {
    document.execCommand(command, false, value);
    editor.focus();
  }

  // Event listeners for formatting
  fontFamily.addEventListener('change', () => formatText('fontName', fontFamily.value));
  fontSize.addEventListener('change', () => formatText('fontSize', fontSize.value));
  bold.addEventListener('click', () => {
    formatText('bold');
    bold.classList.toggle('active');
  });
  italic.addEventListener('click', () => {
    formatText('italic');
    italic.classList.toggle('active');
  });
  underline.addEventListener('click', () => {
    formatText('underline');
    underline.classList.toggle('active');
  });
  textColor.addEventListener('input', () => formatText('foreColor', textColor.value));
  alignLeft.addEventListener('click', () => formatText('justifyLeft'));
  alignCenter.addEventListener('click', () => formatText('justifyCenter'));
  alignRight.addEventListener('click', () => formatText('justifyRight'));

  // Update counts on editor changes
  editor.addEventListener('input', updateCounts);
  
  // Handle keyboard shortcuts
  editor.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          bold.click();
          break;
        case 'i':
          e.preventDefault();
          italic.click();
          break;
        case 'u':
          e.preventDefault();
          underline.click();
          break;
      }
    }
  });

  // Handle paste to strip formatting
  editor.addEventListener('paste', (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, text);
  });

  // Initialize counts
  updateCounts();
});

// Save content to localStorage every 5 seconds
setInterval(() => {
  localStorage.setItem('wordpadContent', document.getElementById('editor').innerHTML);
}, 5000);

// Load content from localStorage on page load
if (localStorage.getItem('wordpadContent')) {
  document.getElementById('editor').innerHTML = localStorage.getItem('wordpadContent');
}