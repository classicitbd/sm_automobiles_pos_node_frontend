import { FaEye, FaPrint, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { id } = useParams();
  console.log(id);

  const handlePrint = () => {
    const printContent = document.getElementById("invoicePrintArea");
    const originalBody = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;

    window.print();

    // Restore the original content after printing
    document.body.innerHTML = originalBody;

    // Reload the page after printing
    setTimeout(() => {
      location.reload();
    }, 10);
  };

  return (
    <div className="">
      <section className="max-w-7xl mx-auto border rounded py-4">
        <div className="">
          <div className="flex justify-between px-4">
            <div className="flex items-center text-2xl gap-2 text-gray-800">
              <FaEye size={20} /> View Order Information
            </div>
            <Link
              to="/order"
              className="flex items-center bg-blue-600 px-3 py-2 rounded gap-2 text-white"
              type="button"
            >
              <FaRegArrowAltCircleLeft /> Back To List
            </Link>
          </div>
        </div>
        <div>
          <div id="invoicePrintArea">
            <div className="my-page page" size="A4">
              <div className="invoice__body">
                <div className="customer__info table__space">
                  <ul>
                    <h1
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                      }}
                    >
                      Invoice
                    </h1>
                    <div
                      style={{
                        display: "flex",
                        justifyItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <img
                        className="invoiceLogo"
                        src="https://hips.hearstapps.com/hmg-prod/images/close-up-of-blossoming-rose-flower-royalty-free-image-1580853844.jpg?crop=0.668xw:1.00xh;0.248xw,0&resize=980:*"
                        alt="logo"
                      />
                      <h4 className="ps-1" style={{ marginBottom: "0", marginLeft:'8px'}}>
                        Classic It
                      </h4>
                    </div>
                  </ul>
                  <ul>
                    <h4>Classic It</h4>
                    <li style={{ fontSize: "16px" }}>
                      Uttora, Ajompur , 12-Sector
                    </li>
                    <li style={{ fontSize: "16px" }}>Mobile: 01794481642</li>
                  </ul>
                </div>
                <div
                  className="customer__info table__space"
                  style={{ paddingTop: "10px" }}
                >
                  <ul>
                    <li>
                      <span>Courier Name </span>
                      <span className="courier_name">
                        <h4 className="">
                          :{" "}
                          <strong style={{ fontSize: "18px" }}>
                            Sundorban
                          </strong>
                        </h4>
                      </span>
                    </li>
                    <li>
                      <span>Customer Name</span>
                      <span>:Najmul Islam</span>
                    </li>

                    <li>
                      <span>Customer Email</span>
                      <span>: najmul123@gmail.com</span>
                    </li>
                    <li>
                      <span>Customer Phone</span>
                      <span>: 0175864926</span>
                    </li>
                    <li>
                      <span>Address</span>
                      <span>: Lalmatia, b-block</span>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>Invoice No</span>
                      <span>: INV-SALE-000019</span>
                    </li>
                    <li>
                      <span>Order Date</span>
                      <span>: 29 Aug 24</span>
                    </li>

                    <li>
                      <span>Delivery Method</span>
                      <span>: Cash On Delivery</span>
                    </li>
                  </ul>
                </div>

                <div className="table__space" style={{ paddingTop: "0" }}>
                  <table
                    style={{ width: "100%" }}
                    className="saleInvoice__table"
                  >
                    <thead
                      style={{ background: "#F4F4F4" }}
                      className="sales___invoice sales__invoice__heading"
                    >
                      <tr>
                        <th
                          style={{
                            width: "2%",
                            padding: "5px",
                            color: "rgb(0 0 1 / 70%)",
                          }}
                        >
                          SL
                        </th>
                        <th
                          style={{
                            width: "5%",
                            padding: "5px",
                            color: "rgb(0 0 1 / 70%)",
                          }}
                        >
                          Item Image
                        </th>
                        <th
                          style={{
                            width: "20%",
                            padding: "5px",
                            color: "rgb(0 0 1 / 70%)",
                          }}
                        >
                          Item Name
                        </th>
                        <th
                          style={{
                            width: "10%",
                            padding: "5px",
                            color: "rgb(0 0 1 / 70%)",
                            textAlign: "center",
                          }}
                        >
                          Unit Price
                        </th>
                        <th
                          style={{
                            width: "10%",
                            padding: "5px",
                            color: "rgb(0 0 1 / 70%)",
                            textAlign: "center",
                          }}
                        >
                          Quantity
                        </th>
                        <th
                          style={{
                            width: "10%",
                            padding: "5px",
                            color: "rgb(0 0 1 / 70%)",
                            textAlign: "center",
                          }}
                        >
                          Discount
                        </th>
                        <th
                          style={{
                            width: "10%",
                            padding: "5px",
                            color: "rgb(0 0 1 / 70%)",
                            textAlign: "center",
                          }}
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="sales___invoice">
                      <tr>
                        <td>{1}</td>
                        <td>
                          <img
                            style={{
                              width: "65px",
                              height: "65px",
                              padding: "5px 0",
                            }}
                            src="https://hips.hearstapps.com/hmg-prod/images/close-up-of-blossoming-rose-flower-royalty-free-image-1580853844.jpg?crop=0.668xw:1.00xh;0.248xw,0&resize=980:*"
                          />
                        </td>
                        <td>Item name</td>
                        <td style={{ textAlign: "center" }}>Unit Price</td>
                        <td style={{ textAlign: "center" }}>2</td>
                        <td style={{ textAlign: "center" }}>10</td>
                        <td style={{ textAlign: "center" }}>120</td>
                      </tr>
                    </tbody>
                  </table>

                  <p
                    style={{
                      marginTop: "5px",
                      marginBottom: "0",
                      width: "60%",
                      display: "inline-block",
                      position: "absolute",
                      fontSize: "14px",
                      lineHeight: "1.3",
                    }}
                    className="note__size"
                  >
                    {" "}
                    <strong style={{ color: "red" }}>Note: </strong>
                    Write Note
                  </p>

                  <div
                    className="customer__info"
                    style={{ paddingTop: "10px" }}
                  >
                    <ul
                      style={{ textAlign: "center" }}
                      className="barcode__space"
                    >
                      <li>
                        <div style={{ paddingBottom: "25px" }}>
                          {/* <img
                                          style={{
                                            width: "250px",
                                            height: "50px",
                                          }}
                                          src=''
                                          alt=""
                                        /> */}
                          QR code
                        </div>
                        <p>
                          Have a great day! Thank you for shopping on Classic IT
                        </p>
                      </li>
                    </ul>
                    <ul className="barcode__right">
                      <li className="float-end">
                        <p>
                          <span>Subtotal</span>
                          <span>2000</span>
                        </p>
                        <p>
                          <span>Shipping</span>
                          <span>500</span>
                        </p>

                        <p>
                          <span>Discount On Subtotal</span>
                          <span>1200</span>
                        </p>

                        <p>
                          <span>Total Amount</span>
                          <span>158</span>
                        </p>
                        <p>
                          <span>Paid Amount</span>
                          <span>021</span>
                        </p>
                        <p>
                          <span>Due Amount</span>
                          <span>158</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="table__space subtotal__amount"
                  style={{
                    paddingTop: "0",
                    position: "relative",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className=" px-3 mb-1">
          <div className="mb-1 pb-1 flex justify-end">
            <button
              type="button"
              onClick={() => handlePrint()}
              className="bg-cyan-500 text-white me-1 flex items-center px-3 py-1 rounded gap-2"
            >
              <FaPrint /> Print
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
