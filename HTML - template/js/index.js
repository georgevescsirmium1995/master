// Add mobile tables
[...document.querySelectorAll('#data>table')].forEach(table => {
    addMobileTable(table)
})
function addMobileTable(table) {
    // const target = document.querySelectorAll('')
    const [header, ...rows] = table.rows
    rows.forEach(row => {
        table.after(makeMobileTable(header, row))
    })
}
function makeMobileTable(header, row) {
    const table = document.createElement('table')
    table.classList.add('mobile') 

    Array.from(header.cells).forEach((th_element, indx) => {
        table.insertRow().append(
            th_element.cloneNode(true), 
            row.cells[indx].cloneNode(true)
        )
    })
    return table
}

// Handle Hamburger toggle
document.getElementById('hamburger-toggle').addEventListener('click', event => {
    const toggle = event.target
    

    toggle.value = toggle.value === "Off" ? "On" : "Off"
    toggleHamburgerMenu(toggle.value)
})
function toggleHamburgerMenu(toggle) {
    const menu = document.querySelector('.menu.mobile')
    const userPanel = document.getElementById('user-panel')
    const sidePanel = document.getElementById('side-panel')
    if(toggle === "On"){
        menu.style.backgroundPosition = '-80% 0';
        userPanel.style.transform = 'translateX(0)'
        sidePanel.style.transform = 'translateX(50%)'
    }
    if(toggle === "Off"){
        menu.style.backgroundPosition = 'center';
        userPanel.style.transform = 'translateX(100%)'
        sidePanel.style.transform = 'translateX(100%)'
    }
}

// Set current date
const setDate = (() => {
    const today = new Date()
    const date = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`
    document.querySelectorAll('.current-date').forEach((date_elm) => {
        date_elm.innerHTML = date
    })
})();