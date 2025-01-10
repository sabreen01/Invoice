function loadInvoices() {
    var allInvoices = JSON.parse(localStorage.getItem('allInvoices')) || [];
    var table = document.getElementById('invoicesTable');

    allInvoices.forEach((invoice, index) => {
        var newRow = table.insertRow(-1);
        newRow.innerHTML = `
            <td>${invoice.customerName}</td>
            <td>${invoice.invoiceDate}</td>
            <td>${invoice.products.map(p => `${p.productName} (${p.quantity})`).join(', ')}</td>
            <td>${invoice.total}</td>
            <td>${invoice.taxes}</td>
            <td>${invoice.finalTotal}</td>
            <td>
                <button onclick="editInvoice(${index})">تعديل</button>
                <button onclick="deleteInvoice(${index})">حذف</button>
            </td>
        `;
    });
}

function editInvoice(index) {
    var allInvoices = JSON.parse(localStorage.getItem('allInvoices')) || [];
    var invoice = allInvoices[index];
    // Implement edit functionality here
    // You can redirect to the main page with the invoice data pre-filled for editing
}

function deleteInvoice(index) {
    var allInvoices = JSON.parse(localStorage.getItem('allInvoices')) || [];
    allInvoices.splice(index, 1);
    localStorage.setItem('allInvoices', JSON.stringify(allInvoices));
    location.reload();
}

window.onload = loadInvoices;