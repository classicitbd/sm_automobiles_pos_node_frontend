import { DateTimeFormat } from "@/utils/dateTimeFormet";
import { toWords } from "number-to-words";

const PaidPaymentVoucher = ({ voucherData }) => {
  console.log(voucherData);

  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${String(date).padStart(2, "0")}-${String(
    month
  ).padStart(2, "0")}-${year}`;

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
                {/* {voucherData?.customer_id?.customer_name} */}
              </span>
            </p>
            <p
              style={{
                fontSize: "18px",
              }}
            >
              Address :{" "}
              <span style={{ marginLeft: "49px", fontSize: "18px" }}>
                {/* {voucherData?.customer_id?.customer_address} */}
              </span>
            </p>
            <p
              style={{
                fontSize: "18px",
              }}
            >
              Billing Date :{" "}
              <span style={{ marginLeft: "20px", fontSize: "18px" }}>
                {/* {formattedDate} */}
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
              color: "black",
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
                  {/* {DateTimeFormat(voucherData?.createdAt)} */}
                </td>
                <td
                  style={{
                    border: "1px solid gray",
                    fontSize: "20px",
                  }}
                >
                  {voucherData?.order_id?.grand_total_amount}
                </td>
                <td
                  style={{
                    border: "1px solid gray",
                    fontSize: "20px",
                  }}
                >
                  {/* {voucherData?.pay_amount} */}
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
                {/* In Word : {formatAmountToWords(voucherData?.pay_amount)} Only */}
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
            <p style={{ fontSize: "18px", textAlign: "center" }}>
              {" "}
              {/* {voucherData?.customer_id?.customer_name} */}
            </p>
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
            <p style={{ fontSize: "18px", textAlign: "center" }}>
              {voucherData?.check_publisher_id?.user_name}
            </p>
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
      </section>
    </div>
  );
};

export default PaidPaymentVoucher;
