function toggleSummary() {
    var content = document.querySelector('.summary-content');
    var icon = document.querySelector('.summary-icon');
    
    if (content.style.display === 'none') {
      content.style.display = 'block';
      icon.innerHTML = '&#9660;';
    } else {
      content.style.display = 'none';
      icon.innerHTML = '&#9658;';
    }
  }
  