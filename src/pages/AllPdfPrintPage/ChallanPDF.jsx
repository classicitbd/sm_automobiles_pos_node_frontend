import { DateTimeFormat } from "@/utils/dateTimeFormet";
import { toWords } from "number-to-words";

const ChallanPDF = ({ challanOpenData }) => {
  const formatAmountToWords = (amount) => {
    const [wholePart, decimalPart] = amount.toFixed(2).split(".");
    const words = toWords(parseInt(wholePart));
    const fractionalWords = decimalPart
      ? `${toWords(parseInt(decimalPart))} cents`
      : "";
    return fractionalWords ? `${words} and ${fractionalWords}` : words;
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
          <p>Cell: +88 01708 415900, +88 01708415902</p>
          <p>E-mail:rmautomobiles.dhk@gmail.com</p>
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
            CHALLAN
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
              Bill No :{" "}
              <span style={{ fontWeight: "bold" }}>
                {challanOpenData?.order_id}{" "}
              </span>
            </p>
            <p>
              Served By :{" "}
              <span style={{ fontWeight: "normal" }}></span>
            </p>
            <p>
              Billing Date :{" "}
              <span style={{ fontWeight: "normal" }}>
                {DateTimeFormat(Date.now())}
              </span>
            </p>
            <p>
              Officer :{" "}
              <span style={{ fontWeight: "normal" }}>
                {challanOpenData?.order_publisher_id?.user_name}
              </span>
            </p>
            <p>
              Party Name :{" "}
              <span style={{ fontWeight: "" }}>
                {challanOpenData?.customer_id?.customer_name}
              </span>
            </p>
            <p>
              Off. Mobile :{" "}
              <span style={{ fontWeight: "normal" }}>
                {challanOpenData?.order_publisher_id?.user_phone}
              </span>
            </p>
            <p>
              Party Address :{" "}
              <span style={{ fontWeight: "normal" }}>
                {" "}
                {challanOpenData?.customer_id?.customer_address}
              </span>
            </p>
            <p>
              Entry Time :{" "}
              <span style={{ fontWeight: "normal" }}>
                {DateTimeFormat(challanOpenData?.createdAt)}
              </span>
            </p>
            <p>
              Mobile :{" "}
              <span style={{ fontWeight: "" }}>
                {challanOpenData?.customer_id?.customer_phone}
              </span>
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
            {challanOpenData?.order_products?.map((item, i) => (
              <tr key={i}>
                <td
                  style={{
                    borderLeft: "1px solid",
                    borderRight: "1px solid",
                  }}
                >
                  {i + 1}
                </td>
                <td style={{ padding: "4px" }}>
                  {item?.product_id?.product_id}
                </td>
                <td>{item?.product_id?.brand_id?.brand_name || "-"}</td>
                <td>{item?.product_id?.product_name}</td>
                <td
                  style={{
                    borderLeft: "1px solid",
                    borderRight: "1px solid",
                  }}
                >
                  {item?.discount_percent}
                </td>
                <td
                  style={{
                    borderLeft: "1px solid",
                    borderRight: "1px solid",
                  }}
                >
                  {item?.product_quantity}{" "}{item?.product_unit_name}
                </td>
                <td
                  style={{
                    borderLeft: "1px solid",
                    borderRight: "1px solid",
                  }}
                >
                  {item?.product_price}
                </td>
                <td
                  style={{
                    borderLeft: "1px solid",
                    borderRight: "1px solid",
                  }}
                >
                  {item?.grand_total}
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
              <td>{challanOpenData?.sub_total_amount}</td>
            </tr>
            <tr
              style={{
                border: "1px solid",
              }}
            >
              <td colSpan={7}>Discount(%)</td>
              <td>{challanOpenData?.discount_percent_amount}</td>
            </tr>
            <tr
              style={{
                border: "1px solid",
              }}
            >
              <td colSpan={7}>Net Amount</td>
              <td>{challanOpenData?.grand_total_amount}</td>
            </tr>
            <tr
              style={{
                borderLeft: "1px solid",
                borderRight: "1px solid",
              }}
            >
              <td colSpan={7}>(+) Cash Received</td>
              <td>{challanOpenData?.received_amount}</td>
            </tr>
            <tr
              style={{
                borderLeft: "1px solid",
                borderRight: "1px solid",
              }}
            >
              <td colSpan={7}>Due Balance</td>
              <td>{challanOpenData?.due_amount}</td>
            </tr>
            <tr
              style={{
                border: "1px solid",
              }}
            >
              <td style={{ textAlign: "end", padding: "4px 12px" }} colSpan={8}>
                ({formatAmountToWords(challanOpenData?.due_amount)}) Only
              </td>
            </tr>
            {/* Last Footer */}
          </tbody>
        </table>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "20px",
            marginTop: "80px",
          }}
        >
          <div>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              {challanOpenData?.customer_id?.customer_name}
            </p>
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
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              {challanOpenData?.warehouse_user_id?.user_name}
            </p>
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
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              {challanOpenData?.account_user_id?.user_name}
            </p>
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
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              {challanOpenData?.management_user_id?.user_name}
            </p>
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
    </div>
  );
};

export default ChallanPDF;
