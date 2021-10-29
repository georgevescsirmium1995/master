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
    Object.assign(table, {
        className: 'data-table mobile'
    })

    Array.from(header.cells).forEach((th_element, indx) => {
        table.insertRow().append(
            th_element.cloneNode(true), 
            row.cells[indx].cloneNode(true)
        )
    })
    return table
}