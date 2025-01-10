function calculateTotal(element) {
    var row = element.closest('tr');
    var price = row.querySelector('.price').value||0;
    var quantity = element.value||0;
    var total = price * quantity;
    row.querySelector('.total').innerText = total;
    All();
}

function All() {
    var totals = document.querySelectorAll('.total');
    var grandTotal = 0;

    totals.forEach(function (total) {
        grandTotal += parseInt(total.innerText);
    });

    document.getElementById('total').innerText = grandTotal;
    var taxes = grandTotal * 0.15;
    document.getElementById('taxes').innerText = taxes;
    document.getElementById('finalTotal').innerText = (grandTotal + taxes);
} 

function addRow() {
    var table = document.getElementById('productTable');
    var newRow = table.insertRow(-1);

    newRow.innerHTML = `
        <td><input type="text" value="منتج جديد"></td>
        <td><input type="number" value="0" class="price"></td>
        <td><input type="number" value="0" class="quantity" onchange="calculateTotal(this)"></td>
        <td class="total">0.00</td>
    `;
}

function save() {
    var customerName = document.getElementById('customerName').value;
    var invoiceDate = document.getElementById('invoiceDate').value;

    if (!customerName || !invoiceDate) {
        alert('يرجى تعبئة جميع الحقول');
        return;
    }

    var rows = document.querySelectorAll('#productTable tr');
    var products = [];
    rows.forEach((row, index) => {
        if (index > 0) {
            var productName = row.cells[0].querySelector('input').value;
            var price = row.cells[1].querySelector('input').value;
            var quantity = row.cells[2].querySelector('input').value;
            var total = row.cells[3].innerText;

            products.push({ productName, price, quantity, total });
        }
    });

    var newInvoice = {
        customerName,
        invoiceDate,
        products,
        total: document.getElementById('total').innerText,
        taxes: document.getElementById('taxes').innerText,
        finalTotal: document.getElementById('finalTotal').innerText,
    };

    
    var allInvoices = JSON.parse(localStorage.getItem('allInvoices')) || [];
    allInvoices.push(newInvoice);
    localStorage.setItem('allInvoices', JSON.stringify(allInvoices));

    alert('تم حفظ الفاتورة بنجاح!');
   // printInvoice()
   // clearInvoice();

}


function printInvoice() {
    var customerName = document.getElementById('customerName').value;
    var invoiceDate = document.getElementById('invoiceDate').value;

    if (!customerName || !invoiceDate) {
        alert('يرجى تعبئة اسم العميل وتاريخ الفاتورة قبل الطباعة');
        return;
    }

    var printContents = `
        <div style="text-align: center; font-family: 'Arial', sans-serif;">
            <p><strong>اسم العميل:</strong> ${customerName}</p>
            <p><strong>تاريخ الفاتورة:</strong> ${invoiceDate}</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;" border="1">
                <tr>
                    <th>المنتج</th>
                    <th>السعر</th>
                    <th>الكمية</th>
                    <th>المجموع</th>
                </tr>
    `;


    var rows = document.querySelectorAll('#productTable tr');
    rows.forEach((row, index) => {
        if (index > 0) { 
            var productName = row.cells[0].querySelector('input').value;
            var price = row.cells[1].querySelector('input').value;
            var quantity = row.cells[2].querySelector('input').value;
            var total = row.cells[3].innerText;

            printContents += `
                <tr>
                    <td>${productName}</td>
                    <td>${price}</td>
                    <td>${quantity}</td>
                    <td>${total}</td>
                </tr>
            `;
        }
    });
    var total = document.getElementById('total').innerText;
    var taxes = document.getElementById('taxes').innerText;
    var finalTotal = document.getElementById('finalTotal').innerText;

    printContents += `
            </table>
            <p><strong>المجموع الإجمالي:</strong> ${total}</p>
            <p><strong>الضرائب (15%):</strong> ${taxes}</p>
            <p><strong>المجموع النهائي:</strong> ${finalTotal}</p>
        </div>
    `;

    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload(); 
}

function clearInvoice() {
    var table = document.getElementById('productTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    document.getElementById('customerName').value = '';
    document.getElementById('invoiceDate').value = '';
    document.getElementById('total').innerText = '0';
    document.getElementById('taxes').innerText = '0';
    document.getElementById('finalTotal').innerText = '0';
}
window.onload = function () {
    clearInvoice();
};
