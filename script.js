const screenSizeButton = document.getElementById('screen-size-button');

screenSizeButton.addEventListener('click', () => {
  const width = screen.width;
  const height = screen.height;

  alert(`Ширина экрана: ${width}px\nВысота экрана: ${height}px`);
});
