function selectedTrend(element) {
  let selectedElement = document.querySelector(element);
  
  if (selectedElement.classList.contains('isToggled')) {
  selectedElement.classList.remove('isToggled');
  return;
  }
  selectedElement.classList.add('isToggled');
}