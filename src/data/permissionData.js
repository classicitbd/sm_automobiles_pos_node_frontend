const permissionsData = [
  {
    Name: "Dashboard",
    Type: ["dashboard_show"],
  },
  {
    Name: "Category",
    Type: [
      "category_show",
      "category_create",
      "category_update",
      "category_delete",
    ],
  },
  {
    Name: "Sub Category",
    Type: [
      "sub_category_show",
      "sub_category_create",
      "sub_category_update",
      "sub_category_delete",
    ],
  },
  {
    Name: "Child Category",
    Type: [
      "child_category_show",
      "child_category_create",
      "child_category_update",
      "child_category_delete",
    ],
  },
  {
    Name: "Brand",
    Type: ["brand_show", "brand_create", "brand_update", "brand_delete"],
  },

  {
    Name: "Specification",
    Type: [
      "specification_show",
      "specification_create",
      "specification_update",
      "specification_delete",
    ],
  },

  {
    Name: "Attribute",
    Type: [
      "attribute_show",
      "attribute_create",
      "attribute_update",
      "attribute_delete",
    ],
  },
  {
    Name: "Product",
    Type: [
      "product_show",
      "product_create",
      "product_update",
      "product_delete",
    ],
  },
  {
    Name: "Offer",
    Type: ["offer_show", "offer_create", "offer_update", "offer_delete"],
  },

  {
    Name: "Campaign",
    Type: [
      "campaign_show",
      "campaign_create",
      "campaign_update",
      "campaign_delete",
    ],
  },

  {
    Name: "Staff",
    Type: ["staff_show", "staff_create", "staff_update", "staff_delete"],
  },
  {
    Name: "Staff Permission",
    Type: [
      "staff_permission_show",
      "staff_permission_create",
      "staff_permission_update",
      "staff_permission_delete",
    ],
  },

  {
    Name: "Review",
    Type: ["review_show", "review_create", "review_update", "review_delete"],
  },
  {
    Name: "Question",
    Type: [
      "question_show",
      "question_create",
      "question_update",
      "question_delete",
    ],
  },
];

export default permissionsData;
