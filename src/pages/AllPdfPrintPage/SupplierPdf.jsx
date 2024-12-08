import { LuPrinter } from "react-icons/lu";

const SupplierPdf = () => {
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
        {/* Start 2nd section */}
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
              border: "2px solid",
              padding: "3px 15px",
              fontWeight: "bold",
            }}
          >
            ALL SUPPLIER
          </span>
        </div>
        {/* End 2nd section */}

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
                borderTop: "1px solid gray",
                borderBottom: "1px solid gray",
              }}
            >
              <td style={{ padding: "2px" }}>Sl. No.</td>
              <td>NAME</td>
              <td>TYPE</td>
              <td>PHONE</td>
              <td>ADDRESS</td>
              <td
                style={{
                  color: "red",
                }}
              >
                ENTRY DATE
              </td>
              <td>BALANCE</td>
            </tr>
          </thead>
          <tbody
            style={{
              textAlign: "center",
            }}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <tr
                style={{
                  borderTop: "1px solid gray",
                  borderBottom: "1px solid gray",
                }}
                key={i}
              >
                <td>{i + 1}</td>
                <td
                  style={{
                    color: "#44cfcb",
                    padding: "2px",
                  }}
                >
                  Oil Cost
                </td>
                <td>Supplier</td>
                <td>01789456821</td>
                <td>Lalmatia,Dhaka</td>
                <td>2021-11-04</td>
                <td style={{ color: i % 2 === 0 ? "red" : "green" }}>
                  {i + 200}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default SupplierPdf;
