const permissionsData = [
  {
    Name: "Dashboard",
    Type: ["dashboard_show"],
  },
  {
    Name: "Pos",
    Type: ["pos_page_show"],
  },
  {
    Name: "Employe",
    Type: ["employe_payment_list_show", "customer_payment_create"],
  },
  {
    Name: "Incomes",
    Type: ["income_show", "income_get"],
  },

  {
    Name: "All Order",
    Type: ["all_order_page_show", "all_order_page_get"],
  },
  {
    Name: "Out of Warehouse Order",
    Type: [
      "out_of_warehouse_order_list_show",

      "out_of_warehouse_order_list_get",
    ],
  },
  {
    Name: "Profit",
    Type: ["profit_list_show", "profit_list_get"],
  },

  {
    Name: "Check In",
    Type: ["check_in_list_show", "check_in_list_get"],
  },
  {
    Name: "Check Out",
    Type: ["check_out_list_show", "check_out_list_get"],
  },
  {
    Name: "Cash In",
    Type: ["cash_in_list_show", "cash_in_list_get"],
  },
  {
    Name: "Cash Out",
    Type: ["cash_out_list_show", "cash_out_list_get"],
  },
  {
    Name: "Paid Payment List",
    Type: ["paid_payment_list_show", "paid_payment_list_get"],
  },
  {
    Name: "Account Receive",
    Type: ["account_receive_list_show", "account_receive_list_get"],
  },
  {
    Name: "Expense",
    Type: ["expense_show", "expense_create", "expense_get"],
  },

  {
    Name: "Management Order List",
    Type: [
      "management_order_list_show",
      "management_order_list_update",
      "management_order_list_get",
    ],
  },
  {
    Name: "Management Account Order List",
    Type: [
      "management_account_order_list_show",
      "management_account_order_list_update",
      "management_account_order_list_get",
    ],
  },
  {
    Name: "Warehouse Order",
    Type: [
      "warehouse_order_list_show",
      "warehouse_order_list_update",
      "warehouse_order_list_get",
    ],
  },

  {
    Name: "Payment List",
    Type: ["payment_list_show", "payment_list_get", "payment_list_update"],
  },

  {
    Name: "Due Payment List",
    Type: [
      "due_payment_list_show",
      "due_payment_list_get",
      "due_payment_list_update",
    ],
  },
  {
    Name: "Today Payment List",
    Type: [
      "today_payment_list_show",
      "today_payment_list_get",
      "today_payment_list_update",
    ],
  },
  {
    Name: "Account Payable",
    Type: ["account_payable_list_show", "account_payable_list_get"],
  },
  {
    Name: "All Paid Payment List",
    Type: ["all_paid_payment_list_show", "all_paid_payment_list_get"],
  },

  {
    Name: "Unpaid Payment List",
    Type: [
      "unpaid_payment_list_show",
      "unpaid_payment_list_get",
      "unpaid_payment_list_update",
    ],
  },
  {
    Name: "Category",
    Type: [
      "category_show",
      "category_create",
      "category_update",
      "category_get",
    ],
  },
  {
    Name: "Brand",
    Type: ["brand_show", "brand_create", "brand_update", "brand_get"],
  },
  {
    Name: "Units",
    Type: ["unit_show", "unit_create", "unit_update", "unit_get"],
  },
  {
    Name: "Staff",
    Type: ["staff_show", "staff_create", "staff_update", "staff_get"],
  },
  {
    Name: "Sales Target",
    Type: [
      "sale_target_show",
      "sale_target_create",
      "sale_target_update",
      "sale_target_get",
    ],
  },
  {
    Name: "Bank Account",
    Type: [
      "bank_account_show",
      "bank_account_create",
      "bank_account_update",
      "bank_account_get",
    ],
  },
  {
    Name: "Customers",
    Type: [
      "customer_show",
      "customer_create",
      "customer_update",
      "customer_get",
    ],
  },

  {
    Name: "Supplier List",
    Type: [
      "supplier_list_show",
      "supplier_list_create",
      "supplier_list_update",
      "supplier_list_get",
      "supplier_add_payment",
    ],
  },

  {
    Name: "Product",
    Type: [
      "product_show",
      "product_create",
      "product_update",
      "product_purchage_create",
      "product_get",
    ],
  },
];

export default permissionsData;
