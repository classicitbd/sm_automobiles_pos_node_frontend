import { LuPrinter } from "react-icons/lu";
const PdfPrintPage = () => {
  //    function of Pdf
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
    <div className="max-w-7xl mx-auto">
      {/*Sales InVoice Start  */}
      <section id="invoicePrintArea">
        {/* Start 1st section */}
        <div style={{ textAlign: "center" }}>
          {" "}
          <h3>RM AutoMobiles</h3>
          <p>Import ManuFacture & General Trading</p>
          <p>
            Corporate Office-56/2 West PanthPath Wahed Tower Lift #11
            Dahaka-1205
          </p>
          <p>0987872376,0147847385</p>
          <p>E-mail:admin123@gmail.com</p>
        </div>
        {/* End 1st section */}
        <div
          style={{
            width: "100%",
            border: "1px dashed gray",
            marginTop: "4px",
            marginBottom: "4px",
          }}
        ></div>

        {/* Start 2nd section */}
        <div
          style={{
            marginBottom: "2px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <span
            style={{
              border: "2px solid",
              padding: "3px 15px",
              fontWeight: "bold",
            }}
          >
            SALES INVOICE
          </span>
        </div>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            <p>
              Bill No : <span style={{ fontWeight: "bold" }}>S24-9295B </span>
            </p>
            <p>
              Showroom:{" "}
              <span style={{ fontWeight: "normal" }}>Lubricants </span>
            </p>
            <p>
              Billing Date :{" "}
              <span style={{ fontWeight: "normal" }}>30-Nov-2024</span>
            </p>
            <p>
              Served By : <span style={{ fontWeight: "normal" }}>Ahamed </span>
            </p>
            <p>
              Party Id : <span style={{ fontWeight: "normal" }}>21166 </span>
            </p>
            <p>
              Officer :{" "}
              <span style={{ fontWeight: "normal" }}>089 Ruhul Amin</span>
            </p>
            <p>
              Party Name :{" "}
              <span style={{ fontWeight: "" }}>
                Mrs Rhul Motors [Mr. Sohidul Islam]
              </span>
            </p>
            <p>
              Off. Mobile :{" "}
              <span style={{ fontWeight: "normal" }}>+098765 </span>
            </p>
            <p>
              Party Address :{" "}
              <span style={{ fontWeight: "normal" }}>
                {" "}
                Hazi Allauddhin Market,New Dhaka,Road Sirajgong
              </span>
            </p>
            <p>
              Entry Time :{" "}
              <span style={{ fontWeight: "normal" }}>30-11-2024 2:24 PM</span>
            </p>
            <p>
              Mobile : <span style={{ fontWeight: "" }}>0178945824</span>
            </p>
          </div>
        </div>
        {/* End 2nd section */}

        {/* Start 3rd Section */}
        <table
          style={{
            width: "100%",
          }}
        >
          <thead
            style={{
              textAlign: "center",
            }}
          >
            <tr
              style={{
                border: "1px solid",
              }}
            >
              <th style={{ padding: "2px" }}>Sl. No.</th>
              <th>Prod. ID</th>
              <th>Group</th>
              <th>Product Name</th>
              <th>D.%</th>
              <th>Qty.</th>
              <th>Unit Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody
            style={{
              textAlign: "center",
            }}
          >
            {Array.from({ length: 3 }, (_, i) => (
              <tr key={i}>
                <td
                  style={{
                    borderLeft: "1px solid",
                    borderRight: "1px solid",
                  }}
                >
                  {i + 1}
                </td>
                <td style={{ padding: "4px" }}>0076</td>
                <td>Bajaj</td>
                <td>Engine Oil Bajaj Genuine DTS-I20W50 [1 L X 10 PCS]</td>
                <td
                  style={{
                    borderLeft: "1px solid",
                    borderRight: "1px solid",
                  }}
                >
                  0
                </td>
                <td
                  style={{
                    borderLeft: "1px solid",
                    borderRight: "1px solid",
                  }}
                >
                  100
                </td>
                <td
                  style={{
                    borderLeft: "1px solid",
                    borderRight: "1px solid",
                  }}
                >
                  400.00
                </td>
                <td
                  style={{
                    borderLeft: "1px solid",
                    borderRight: "1px solid",
                  }}
                >
                  40,000.00
                </td>
              </tr>
            ))}
            {/* Last Footer */}
            <tr
              style={{
                border: "1px solid",
              }}
            >
              <td colSpan={7}>Total Amount</td>
              <td>63000</td>
            </tr>
            <tr
              style={{
                border: "1px solid",
              }}
            >
              <td colSpan={7}>Net Amount</td>
              <td>63000</td>
            </tr>
            <tr
              style={{
                borderLeft: "1px solid",
                borderRight: "1px solid",
              }}
            >
              <td colSpan={7}>(+) B/F Blance</td>
              <td>63000</td>
            </tr>
            <tr
              style={{
                borderLeft: "1px solid",
                borderRight: "1px solid",
              }}
            >
              <td colSpan={7}>(+) Cash Received</td>
              <td>63000</td>
            </tr>
            <tr
              style={{
                borderLeft: "1px solid",
                borderRight: "1px solid",
              }}
            >
              <td colSpan={7}>Net Blance</td>
              <td>63000</td>
            </tr>
            <tr
              style={{
                border: "1px solid",
              }}
            >
              <td style={{ textAlign: "end", padding: "4px 12px" }} colSpan={8}>
                (Taka Sixty three Thousand Four Hundred Only)
              </td>
            </tr>
            {/* Last Footer */}
          </tbody>
        </table>
        {/*End 3rd Section */}
        <div style={{ marginTop: "6px" }}>
          <p>
            <span style={{ fontWeight: "bold" }}>Remarks </span> : Transport
            cash booking
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "20px",
            marginTop: "80px",
          }}
        >
          <div>
            <div
              style={{
                width: "100%",
                border: "1px solid",
                marginTop: "4px",
                marginBottom: "4px",
              }}
            ></div>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              {" "}
              Customer <br /> Signature
            </p>
          </div>
          <div>
            <div
              style={{
                width: "100%",
                border: "1px solid",
                marginTop: "4px",
                marginBottom: "4px",
              }}
            ></div>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              {" "}
              Warehouse Incharge <br /> Signature
            </p>
          </div>
          <div>
            <div
              style={{
                width: "100%",
                border: "1px solid",
                marginTop: "4px",
                marginBottom: "4px",
              }}
            ></div>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              {" "}
              HR & Accounts <br /> Signature
            </p>
          </div>
          <div>
            <div
              style={{
                width: "100%",
                border: "1px solid",
                marginTop: "4px",
                marginBottom: "4px",
              }}
            ></div>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              {" "}
              Deputy Manager <br /> Signature
            </p>
          </div>
        </div>
      </section>
      {/*Sales InVoice End  */}

      <div className="mt-5 flex justify-end">
        <button
          className="border px-8 py-2 bg-blue-600 text-white font-bold hover:bg-violet-600 transition-all duration-200 flex items-center gap-3 rounded"
          onClick={() => handlePrint()}
        >
          <LuPrinter size={20} />
          Print
        </button>
      </div>
    </div>
  );
};

export default PdfPrintPage;
