import { LuPrinter } from "react-icons/lu";

const PaymentVoucher = () => {
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
      <section
        style={{
          width: "600px",
          margin: "0 auto",
        }}
        id="invoicePrintArea"
      >
        {" "}
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
            border: "1px solid gray",
            marginTop: "4px",
            marginBottom: "4px",
          }}
        ></div>
        <div
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <span
            style={{
              fontSize: "25px",
            }}
          >
            PAYMENT VOUCHER
          </span>
        </div>
        <div>
          <div
            style={{
              marginBottom: "10px",
              fontSize: "15px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
              }}
            >
              Party Name :{" "}
              <span style={{ marginLeft: "20px", fontSize: "18px" }}>
                Mahin Uddin{" "}
              </span>
            </p>
            <p
              style={{
                fontSize: "18px",
              }}
            >
              Address :{" "}
              <span style={{ marginLeft: "49px", fontSize: "18px" }}>
                Lalmatia , Mohammadpur{" "}
              </span>
            </p>
            <p
              style={{
                fontSize: "18px",
              }}
            >
              Billing Date :{" "}
              <span style={{ marginLeft: "20px", fontSize: "18px" }}>
                30-Nov-2024
              </span>
            </p>
          </div>
        </div>
        {/* table Start */}
        <table
          style={{
            width: "100%",
            marginTop: "50px",
          }}
        >
          <thead
            style={{
              textAlign: "center",
            }}
          >
            <tr
              style={{
                border: "1px solid gray",
              }}
            >
              <td
                style={{
                  padding: "10px",
                  border: "1px solid gray",
                  fontSize: "20px",
                }}
              >
                DATE
              </td>
              <td
                style={{
                  border: "1px solid gray",
                  fontSize: "20px",
                }}
              >
                PREVIOUS DUE
              </td>
              <td
                style={{
                  border: "1px solid gray",
                  fontSize: "20px",
                }}
              >
                RECEIVED
              </td>
            </tr>
          </thead>
          <tbody
            style={{
              textAlign: "center",
            }}
          >
            {Array.from({ length: 1 }, (_, i) => (
              <tr
                style={{
                  border: "1px solid gray",
                }}
                key={i}
              >
                <td
                  style={{
                    border: "1px solid gray",
                    fontSize: "20px",
                    padding: "6px",
                  }}
                >
                  2024-11-06
                </td>
                <td
                  style={{
                    border: "1px solid gray",
                    fontSize: "20px",
                  }}
                >
                  $ 200
                </td>
                <td
                  style={{
                    border: "1px solid gray",
                    fontSize: "20px",
                  }}
                >
                  $ 150
                </td>
              </tr>
            ))}
            <tr
              style={{
                border: "1px solid gray",
              }}
            >
              <td
                style={{
                  textAlign: "start",
                  padding: "10px 12px",
                  fontSize: "20px",
                }}
                colSpan={3}
              >
                In Word : Five hundred Thousand , Five Hundred
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
            marginTop: "100px",
          }}
        >
          <div>
            <div
              style={{
                width: "100%",
                border: "1px dashed",
                marginTop: "4px",
                marginBottom: "4px",
              }}
            ></div>
            <p style={{ textAlign: "center", fontSize: "18px" }}>
              {" "}
              Customer Signature
            </p>
          </div>
          <div>
            <div
              style={{
                width: "100%",
                border: "1px dashed",
                marginTop: "4px",
                marginBottom: "4px",
              }}
            ></div>
            <p style={{ fontSize: "18px", textAlign: "center" }}>
              {" "}
              Authorised Signature
            </p>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            border: "1px solid #297c7a",
            marginTop: "60px",
            marginBottom: "4px",
          }}
        ></div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            marginTop: "10px",
          }}
        >
          <div>
            <p style={{ fontSize: "18px", paddingLeft: "10px" }}>
              {" "}
              Powered By Global IT
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: "18px",
                textAlign: "end",
                paddingRight: "10px",
              }}
            >
              {" "}
              www.itofglobal.com
            </p>
          </div>
        </div>
      </section>
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

export default PaymentVoucher;
