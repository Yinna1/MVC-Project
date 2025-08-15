const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')
const openSidebarButton = document.getElementById('open-sidebar-button')

const media = window.matchMedia("(width < 450px)")


function toggleSidebar(){
  if(media.matches) {
    closeSidebar();
    return;
  }

  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')
  
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}

function toggleSubMenu(button){
  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')
  
  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

media.addEventListener('change', (e) => updateNavbar(e));

function updateNavbar(e) {

  const isMobile = e.matches;
  console.log(isMobile);
  
  if (isMobile) {
    sidebar.setAttribute('inert', '')
  }
  else {
    sidebar.removeAttribute('inert');
  }
}
function openSidebar() {
  sidebar.classList.add('addShow');
  openSidebarButton.setAttribute('aria-expanded', 'true');
  sidebar.removeAttribute('inert');
  document.getElementById('overlay').style.display = 'block';
}

function closeSidebar() {
  sidebar.classList.remove('addShow');
  openSidebarButton.setAttribute('aria-expanded', 'false');
  sidebar.setAttribute('inert', '');
  document.getElementById('overlay').style.display = 'none';
}

  updateNavbar(media)
