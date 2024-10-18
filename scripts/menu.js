function toggleSidebar() {
	const sidebar = document.querySelector('.sidebar')
	const menuButton = document.querySelector('.menu-button')

	sidebar.classList.toggle('active')
	menuButton.classList.toggle('active')
}
