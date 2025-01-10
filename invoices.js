function loadInvoices() {
    var allInvoices = JSON.parse(localStorage.getItem('allInvoices')) || [];
    var table = document.getElementById('invoicesTable').getElementsByTagName('tbody')[0];

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
                <button class="btn btn-primary" onclick="editInvoice(${index})">تعديل</button>
                <button class="btn btn-danger" onclick="deleteInvoice(${index})">حذف</button>
            </td>
        `;
    });
}

function editInvoice(index) {
    var allInvoices = JSON.parse(localStorage.getItem('allInvoices')) || [];
    var invoice = allInvoices[index];

    document.getElementById('editCustomerName').value = invoice.customerName;
    document.getElementById('editInvoiceDate').value = invoice.invoiceDate;
    document.getElementById('editProducts').value = invoice.products.map(p => p.productName).join(', ');
    document.getElementById('editPrices').value = invoice.products.map(p => p.price).join(', ');
    document.getElementById('editQuantities').value = invoice.products.map(p => p.quantity).join(', ');
    document.getElementById('editTotal').value = invoice.total;
    document.getElementById('editTaxes').value = invoice.taxes;
    document.getElementById('editFinalTotal').value = invoice.finalTotal;

    // Store the index of the invoice being edited
    localStorage.setItem('editInvoiceIndex', index);

    // Show the modal
    $('#editInvoiceModal').modal('show');
}

function calculateTotals() {
    var products = document.getElementById('editProducts').value.split(',').map(p => p.trim());
    var prices = document.getElementById('editPrices').value.split(',').map(p => parseFloat(p.trim()));
    var quantities = document.getElementById('editQuantities').value.split(',').map(q => parseInt(q.trim()));

    var total = products.reduce((sum, p, index) => sum + (quantities[index] * prices[index]), 0);
    var taxes = total * 0.15; 
    var finalTotal = total + taxes;

    document.getElementById('editTotal').value = total.toFixed(2);
    document.getElementById('editTaxes').value = taxes.toFixed(2);
    document.getElementById('editFinalTotal').value = finalTotal.toFixed(2);
}

function saveEditedInvoice() {
    var index = localStorage.getItem('editInvoiceIndex');
    var allInvoices = JSON.parse(localStorage.getItem('allInvoices')) || [];

    var invoice = allInvoices[index];
    invoice.customerName = document.getElementById('editCustomerName').value;
    invoice.invoiceDate = document.getElementById('editInvoiceDate').value;
    invoice.products = document.getElementById('editProducts').value.split(',').map((p, i) => {
        return {
            productName: p.trim(),
            price: parseFloat(document.getElementById('editPrices').value.split(',')[i].trim()),
            quantity: parseInt(document.getElementById('editQuantities').value.split(',')[i].trim())
        };
    });
    invoice.total = document.getElementById('editTotal').value;
    invoice.taxes = document.getElementById('editTaxes').value;
    invoice.finalTotal = document.getElementById('editFinalTotal').value;

    allInvoices[index] = invoice;
    localStorage.setItem('allInvoices', JSON.stringify(allInvoices));

    // Hide the modal
    $('#editInvoiceModal').modal('hide');

    location.reload(); 
}

function deleteInvoice(index) {
    var allInvoices = JSON.parse(localStorage.getItem('allInvoices')) || [];
    allInvoices.splice(index, 1);
    localStorage.setItem('allInvoices', JSON.stringify(allInvoices));
     location.reload(); 
}

window.onload = loadInvoices;