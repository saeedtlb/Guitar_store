const purchase = (name, data) => {
  let subTotal = 0;

  // make numbers below 10 show in 2 digit e.g: 9 = 09
  const fixDateNumber = (n) => (n < 10 ? '0' + n : n);

  // Show today date in this format: 2020 / 06 / 21
  const date = () => {
    const d = new Date();
    return `${d.getFullYear()} / ${fixDateNumber(
      d.getMonth()
    )} / ${fixDateNumber(d.getDate())}`;
  };

  // Create row for each product which differ from other ones
  const generateProducts = () => {
    let template;

    data.product.forEach((item) => {
      subTotal += (item.quantity * item.price).toFixed(2);
      template += `
                <tr>
                <td
                    style="
                    font-size: 12px;
                    font-family: 'Open Sans', sans-serif;
                    color: #85b62c;
                    line-height: 18px;
                    vertical-align: top;
                    padding: 10px 0;
                    "
                    class="article"
                >
                    ${item.brand} ${item.name}
                </td>
                <td
                    style="
                    font-size: 12px;
                    font-family: 'Open Sans', sans-serif;
                    color: #646a6e;
                    line-height: 18px;
                    vertical-align: top;
                    padding: 10px 0;
                    "
                    align="center"
                >
                    ${item.quantity}
                </td>
                <td
                    style="
                    font-size: 12px;
                    font-family: 'Open Sans', sans-serif;
                    color: #1e2b33;
                    line-height: 18px;
                    vertical-align: top;
                    padding: 10px 0;
                    "
                    align="right"
                >
                    $${item.price}
                </td>
                </tr>
            `;
    });

    return template;
  };

  const shipping = (subTotal / 100) * 110;
  const Total = subTotal + shipping;

  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
            href="https://fonts.googleapis.com/css2?family=Monoton&family=Oswald:wght@300;400;500&display=swap"
            rel="stylesheet"
            />
            <title>Invoice</title>
            <style>
            body {
                overflow: hidden;
            }
            .logo {
                text-transform: uppercase;
                font-family: 'Monoton' cursive;
                font-size: 40px;
                color: #79776d;
                font-weight: bold;
            }
            </style>
        </head>
        
        <body
            style="margin: 0; padding: 0; background-color: #eaeced;"
            background-color="#eaeced"
        >
            <!-- Header -->
            <table
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            class="fullTable"
            bgcolor="#e1e1e1"
            >
            <tr>
                <td height="20"></td>
            </tr>
            <tr>
                <td>
                <table
                    width="600"
                    border-radius:
                    15px
                    15px
                    0
                    0;
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    class="Table"
                    bgcolor="#ffffff"
                >
                    <tr>
                    <td>
                        <table
                        width="480"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        align="center"
                        class="fullPadding"
                        >
                        <tbody>
                            <tr>
                            <td>
                                <table
                                width="220"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="col"
                                >
                                <tbody>
                                    <tr>
                                    <td align="left">
                                        <br />
                                        <div class="logo">waves</div>
                                    </td>
                                    </tr>
                                    <tr class="hiddenMobile">
                                    <td height="50"></td>
                                    </tr>
                                    <tr>
                                    <td
                                        style="
                                        font-size: 12px;
                                        color: #5b5b5b;
                                        font-family: 'Open Sans', sans-serif;
                                        line-height: 18px;
                                        vertical-align: top;
                                        text-align: left;
                                        "
                                    >
                                        Hello, Johnathan Doe.
                                        <br />
                                        Thank ${name} for shopping from our store and for
                                        your order.
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                                <table
                                width="220"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="right"
                                class="col"
                                >
                                <tbody>
                                    <tr class="visibleMobile">
                                    <td height="20"></td>
                                    </tr>
                                    <tr>
                                    <td height="5"></td>
                                    </tr>
                                    <tr>
                                    <td
                                        style="
                                        font-size: 21px;
                                        color: #85b62c;
                                        letter-spacing: -1px;
                                        font-family: 'Open Sans', sans-serif;
                                        line-height: 1;
                                        vertical-align: top;
                                        text-align: right;
                                        "
                                    >
                                        Invoice
                                    </td>
                                    </tr>
                                    <tr></tr>
                                    <tr class="hiddenMobile">
                                    <td height="60"></td>
                                    </tr>
                                    <tr class="visibleMobile">
                                    <td height="20"></td>
                                    </tr>
                                    <tr>
                                    <td
                                        style="
                                        font-size: 12px;
                                        color: #5b5b5b;
                                        font-family: 'Open Sans', sans-serif;
                                        line-height: 18px;
                                        vertical-align: top;
                                        text-align: right;
                                        "
                                    >
                                        Order:${data.product[0].porder}
                                        <br />
                                        <small>Date: ${date()}</small>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
            <!-- /Header -->
            <!-- Order Details -->
            <table
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            class="fullTable"
            bgcolor="#e1e1e1"
            >
            <tbody>
                <tr>
                <td>
                    <table
                    width="600"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    class="Table"
                    bgcolor="#ffffff"
                    >
                    <tbody>
                        <tr></tr>
                        <tr class="visibleMobile">
                        <td height="50"></td>
                        </tr>
                        <tr>
                        <td>
                            <table
                            width="480"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            align="center"
                            class="fullPadding"
                            >
                            <tbody>
                                <tr>
                                <th
                                    style="
                                    font-size: 12px;
                                    font-family: 'Open Sans', sans-serif;
                                    color: #5b5b5b;
                                    font-weight: normal;
                                    line-height: 1;
                                    vertical-align: top;
                                    padding: 0 10px 7px 0;
                                    "
                                    width="52%"
                                    align="left"
                                >
                                    Item
                                </th>
                                <th
                                    style="
                                    font-size: 12px;
                                    font-family: 'Open Sans', sans-serif;
                                    color: #5b5b5b;
                                    font-weight: normal;
                                    line-height: 1;
                                    vertical-align: top;
                                    padding: 0 0 7px;
                                    "
                                    align="center"
                                >
                                    Quantity
                                </th>
                                <th
                                    style="
                                    font-size: 12px;
                                    font-family: 'Open Sans', sans-serif;
                                    color: #1e2b33;
                                    font-weight: normal;
                                    line-height: 1;
                                    vertical-align: top;
                                    padding: 0 0 7px;
                                    "
                                    align="right"
                                >
                                    Subtotal
                                </th>
                                </tr>
                                <tr>
                                <td
                                    height="1"
                                    style="background: #bebebe;"
                                    colspan="4"
                                ></td>
                                </tr>
                                <tr>
                                <td height="10" colspan="4"></td>
                                </tr>
                                
                                    ${generateProducts()}
                                
                                <tr>
                                <td
                                    height="1"
                                    colspan="4"
                                    style="border-bottom: 1px solid #e4e4e4;"
                                ></td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                        <tr>
                        <td height="20"></td>
                        </tr>
                    </tbody>
                    </table>
                </td>
                </tr>
            </tbody>
            </table>
            <!-- /Order Details -->
            <!-- Total -->
            <table
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            class="fullTable"
            bgcolor="#e1e1e1"
            >
            <tbody>
                <tr>
                <td>
                    <table
                    width="600"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    class="Table"
                    bgcolor="#ffffff"
                    >
                    <tbody>
                        <tr>
                        <td>
                            <!-- Table Total -->
                            <table
                            width="480"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            align="center"
                            class="fullPadding"
                            >
                            <tbody>
                                <tr>
                                <td
                                    style="
                                    font-size: 12px;
                                    font-family: 'Open Sans', sans-serif;
                                    color: #646a6e;
                                    line-height: 22px;
                                    vertical-align: top;
                                    text-align: right;
                                    "
                                >
                                    Subtotal
                                </td>
                                <td
                                    style="
                                    font-size: 12px;
                                    font-family: 'Open Sans', sans-serif;
                                    color: #646a6e;
                                    line-height: 22px;
                                    vertical-align: top;
                                    text-align: right;
                                    white-space: nowrap;
                                    "
                                    width="80"
                                >
                                    $${subTotal}
                                </td>
                                </tr>
                                <tr>
                                <td
                                    style="
                                    font-size: 12px;
                                    font-family: 'Open Sans', sans-serif;
                                    color: #646a6e;
                                    line-height: 22px;
                                    vertical-align: top;
                                    text-align: right;
                                    "
                                >
                                    Shipping &amp; Handling
                                </td>
                                <td
                                    style="
                                    font-size: 12px;
                                    font-family: 'Open Sans', sans-serif;
                                    color: #646a6e;
                                    line-height: 22px;
                                    vertical-align: top;
                                    text-align: right;
                                    "
                                >
                                    $${shipping}
                                </td>
                                </tr>
                                <tr>
                                <td
                                    style="
                                    font-size: 12px;
                                    font-family: 'Open Sans', sans-serif;
                                    color: #000;
                                    line-height: 22px;
                                    vertical-align: top;
                                    text-align: right;
                                    "
                                >
                                    <strong>Grand Total</strong>
                                </td>
                                <td
                                    style="
                                    font-size: 12px;
                                    font-family: 'Open Sans', sans-serif;
                                    color: #000;
                                    line-height: 22px;
                                    vertical-align: top;
                                    text-align: right;
                                    "
                                >
                                    <strong>$${Total}</strong>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                            <!-- /Table Total -->
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </td>
                </tr>
            </tbody>
            </table>
            <!-- /Total -->
            <!-- Information -->
            <table
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            class="fullTable"
            bgcolor="#e1e1e1"
            >
            <tbody>
                <tr>
                <td>
                    <table
                    width="600"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    class="Table"
                    bgcolor="#ffffff"
                    >
                    <tbody>
                        <tr class="visibleMobile">
                        <td height="40"></td>
                        </tr>
                        <tr>
                        <td>
                            <table
                            width="480"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            align="center"
                            class="fullPadding"
                            >
                            <tbody>
                                <tr>
                                <td>
                                    <table
                                    width="220"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="left"
                                    class="col"
                                    >
                                    <tbody>
                                        <tr>
                                        <td
                                            style="
                                            font-size: 11px;
                                            font-family: 'Open Sans', sans-serif;
                                            color: #5b5b5b;
                                            line-height: 1;
                                            vertical-align: top;
                                            "
                                        >
                                            <strong>BILLING INFORMATION</strong>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td width="100%" height="10"></td>
                                        </tr>
                                        <tr>
                                        <td
                                            style="
                                            font-size: 12px;
                                            font-family: 'Open Sans', sans-serif;
                                            color: #5b5b5b;
                                            line-height: 20px;
                                            vertical-align: top;
                                            "
                                        >
                                            ABC company<br />
                                            Public Wales, Somewhere<br />
                                            New York NY<br />
                                            4468, United States<br />
                                            T: 202-555-0133
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
        
                                    <table
                                    width="220"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="right"
                                    class="col"
                                    >
                                    <tbody>
                                        <tr class="visibleMobile">
                                        <td height="20"></td>
                                        </tr>
                                        <tr>
                                        <td
                                            style="
                                            font-size: 11px;
                                            font-family: 'Open Sans', sans-serif;
                                            color: #5b5b5b;
                                            line-height: 1;
                                            vertical-align: top;
                                            "
                                        >
                                            <strong>PAYMENT METHOD</strong>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td width="100%" height="10"></td>
                                        </tr>
                                        <tr>
                                        <td
                                            style="
                                            font-size: 12px;
                                            font-family: 'Open Sans', sans-serif;
                                            color: #5b5b5b;
                                            line-height: 20px;
                                            vertical-align: top;
                                            "
                                        >
                                            Credit Card<br />
                                            Credit Card Type: Visa<br />
                                            Worldpay Transaction ID:
                                            <a
                                            href="#"
                                            style="
                                                color: #ff0000;
                                                text-decoration: underline;
                                            "
                                            >4185939336</a
                                            ><br />
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <table
                            width="480"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            align="center"
                            class="fullPadding"
                            >
                            <tbody>
                                <tr>
                                <td>
                                    <table
                                    width="220"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="left"
                                    class="col"
                                    >
                                    <tbody>
                                        <tr class="hiddenMobile">
                                        <td height="35"></td>
                                        </tr>
                                        <tr class="visibleMobile">
                                        <td height="20"></td>
                                        </tr>
                                        <tr>
                                        <td
                                            style="
                                            font-size: 11px;
                                            font-family: 'Open Sans', sans-serif;
                                            color: #5b5b5b;
                                            line-height: 1;
                                            vertical-align: top;
                                            "
                                        >
                                            <strong>SHIPPING INFORMATION</strong>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td width="100%" height="10"></td>
                                        </tr>
                                        <tr>
                                        <td
                                            style="
                                            font-size: 12px;
                                            font-family: 'Open Sans', sans-serif;
                                            color: #5b5b5b;
                                            line-height: 20px;
                                            vertical-align: top;
                                            "
                                        >
                                            Sup Inc<br />
                                            Another Place, Somewhere<br />
                                            New York NY<br />
                                            4468, United States<br />
                                            T: 202-555-0171
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
        
                                    <table
                                    width="220"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="right"
                                    class="col"
                                    >
                                    <tbody>
                                        <tr class="hiddenMobile">
                                        <td height="35"></td>
                                        </tr>
                                        <tr class="visibleMobile">
                                        <td height="20"></td>
                                        </tr>
                                        <tr>
                                        <td
                                            style="
                                            font-size: 11px;
                                            font-family: 'Open Sans', sans-serif;
                                            color: #5b5b5b;
                                            line-height: 1;
                                            vertical-align: top;
                                            "
                                        >
                                            <strong>SHIPPING METHOD</strong>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td width="100%" height="10"></td>
                                        </tr>
                                        <tr>
                                        <td
                                            style="
                                            font-size: 12px;
                                            font-family: 'Open Sans', sans-serif;
                                            color: #5b5b5b;
                                            line-height: 20px;
                                            vertical-align: top;
                                            "
                                        >
                                            UPS: U.S. Shipping Services
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                        <tr class="visibleMobile">
                        <td height="30"></td>
                        </tr>
                    </tbody>
                    </table>
                </td>
                </tr>
            </tbody>
            </table>
            <!-- /Information -->
            <table
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            class="fullTable"
            bgcolor="#e1e1e1"
            >
            <tr>
                <td>
                <table
                    width="600"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    class="Table"
                    bgcolor="#ffffff"
                    style="border-radius: 0 0 10px 10px;"
                >
                    <tr>
                    <td>
                        <table
                        width="480"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        align="center"
                        class="fullPadding"
                        >
                        <tbody>
                            <tr>
                            <td
                                style="
                                font-size: 22px;
                                color: #79776d;
                                font-family: 'Open Sans', sans-serif;
                                line-height: 18px;
                                vertical-align: top;
                                text-align: left;
                                "
                            >
                                Have a nice day.
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                    </tr>
                    <tr class="spacer">
                    <td height="50"></td>
                    </tr>
                </table>
                </td>
            </tr>
            <tr>
                <td height="20"></td>
            </tr>
            </table>
        </body>
        </html>
    `;
};

module.exports = purchase;
