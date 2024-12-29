const permissionsData = [
  {
    Name: "Dashboard",
    Type: ["dashboard_show"],
  },
  {
    Name: "Category Create and Update Permissino",
    Type: ["category_post", "category_patch"],
  },
  {
    Name: "Brand",
    Type: ["brand_post", "brand_patch"],
  },
  {
    Name: "Unit",
    Type: ["unit_dashboard_show", "unit_post", "unit_patch"],
  },
  {
    Name: "Site Setting",
    Type: ["site_setting_patch"],
  },
  {
    Name: "User Permission",
    Type: ["user_post", "user_patch", "user_dashboard_show"],
  },
  {
    Name: "Role Permission",
    Type: ["role_post", "role_patch"],
  },
  {
    Name: "Sale Target",
    Type: ["sale_target_post", "sale_target_patch"],
  },
  {
    Name: "Supplier",
    Type: ["supplier_dashboard_show", "supplier_post", "supplier_patch"],
  },
  {
    Name: "Supplier Payment Permission",
    Type: [
      "supplier_payment_dashboard_show",
      "supplier_payment_post",
      "supplier_payment_patch",
      "supplier_paid_payment_show",
      "supplier_unpaid_payment_show",
    ],
  },
  {
    Name: "Supplier Cheak and Cash Permission",
    Type: ["supplier_check_or_cash_out_payment_show"],
  },
  {
    Name: "Cash Update Permission",
    Type: ["cash_patch"],
  },
  {
    Name: "Bank",
    Type: ["bank_dashboard_show", "bank_post", "bank_patch"],
  },
  {
    Name: "Customer",
    Type: [
      "customer_dashboard_show",
      "customer_post",
      "customer_patch",
      "customer_ar_show",
    ],
  },
  {
    Name: "Check",
    Type: [
      "check_post",
      "check_patch",
      "check_dashboard_show",
      "check_today_dashboard_show",
      "check_due_dashboard_show",
      "check_or_cash_in_payment_show",
    ],
  },
  {
    Name: "Product",
    Type: ["product_dashboard_show", "product_post", "product_patch"],
  },
  {
    Name: "Stock",
    Type: ["stock_post", "stock_ap_show"],
  },
  {
    Name: "Expense",
    Type: ["expense_show", "expense_post"],
  },
  {
    Name: "Income",
    Type: ["income_show"],
  },
  {
    Name: "Order",
    Type: ["order_dashboard_show", "order_post", "order_patch"],
  },
  {
    Name: "Profit",
    Type: ["profit_show"],
  },
  {
    Name: "Management Order",
    Type: [
      "management_order_show",
      "account_order_show",
      "warehouse_order_show",
      "out_of_warehouse_order_show",
    ],
  },
  {
    Name: "Ledger",
    Type: ["ledger_show"],
  },
  {
    Name: "Invoice",
    Type: ["order_invoice_print", "order_challan_print"],
  },
];

export default permissionsData;
