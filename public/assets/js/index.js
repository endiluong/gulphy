function showMenuFunc() {
  document.getElementById('dropdownMenu').classList.toggle('show');
}

window.onclick = function (event) {
  console.log('🚀 ~ file: index.js ~ line 6 ~ event', event);
  if (!event.target.matches('dropdown-btn')) {
    console.log('unmatch');
    var dropdowns = document.getElementsByClassName('dropdownMenu');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
