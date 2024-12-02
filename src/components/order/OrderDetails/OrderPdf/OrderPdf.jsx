const OrderPdf = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1>Classic It</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        <p>
          Dhaka 1207, Lalmatia, Mohammadpur, Bangladesh 001749858,
          ahamed123455@gamil.com
        </p>
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <table
          style={{
            width: "100%",
            maxWidth: "1200px",
            borderCollapse: "collapse",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <thead
            style={{
              border: "1px solid",
            }}
          >
            <tr>
              <th
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                Sl
              </th>
              <th
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                Customer Name
              </th>
              <th
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                Phone Or Email
              </th>
              <th
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                OrderId
              </th>
              <th
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                Sub total
              </th>
              <th
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                Discount
              </th>
              <th
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                Grand Total
              </th>
              <th
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                1
              </td>
              <td
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                Ahamed
              </td>
              <td
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                01248656558
              </td>
              <td
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                #er12sds34
              </td>
              <td
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                2000
              </td>
              <td
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                55%
              </td>
              <td
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                3050
              </td>
              <td
                style={{
                  border: "1px solid",
                  padding: "10px",
                }}
              >
                SuccessFull
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p>
          All Information Generated From{" "}
          <a
            href=""
            style={{
              textDecoration: "underline",
              color: "blue",
              fontWeight: "bold",
            }}
          >
            ClassicIt.com
          </a>{" "}
          Dec 02,2024
        </p>
      </div>
    </div>
  );
};

export default OrderPdf;
