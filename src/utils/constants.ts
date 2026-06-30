export class Constants {
  public static ACCESS_TOKEN = "accessToken";
  public static REFRESH_TOKEN = "refreshToken";
  public static LOCAL_CART = "localCart";
  public static AUTH_TYPE = { basic: "basic", bearer: "bearer" };
  public static USER_INFO = "userInfo";
  public static USER_SCOPES = "userScopes";

  static S3_BUCKET_NAME =
    process.env.NEXT_PUBLIC_S3_BUCKET_NAME || "webswift-live";
  static S3_DIR_NAME = process.env.NEXT_PUBLIC_S3_DIR_NAME || "files";
  static S3_REGION = process.env.NEXT_PUBLIC_S3_REGION || "us-east-2";
  static S3_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID || "";
  static S3_ACCESS_KEY_SECRET =
    process.env.NEXT_PUBLIC_S3_ACCESS_KEY_SECRET || "";

  static S3_FILE_NAME = (key: string) =>
    `${+new Date()}-${key.replace(/[ ,.]/g, "-")}`;
  static S3_WS_BANNERS = (key?: string) =>
    `${this.S3_DIR_NAME}/web-setup/banners${
      key ? `/${key.replace(/[ ,.]/g, "-")}` : ""
    }`;
  static S3_WS_CATEGORIES = (key?: string) =>
    `${this.S3_DIR_NAME}/web-setup/categories${
      key ? `/${key.replace(/[ ,.]/g, "-")}` : ""
    }`;
  static S3_WS_SUB_CATEGORIES = (key?: string) =>
    `${this.S3_DIR_NAME}/web-setup/sub-categories${
      key ? `/${key.replace(/[ ,.]/g, "-")}` : ""
    }`;
  static S3_BASE_URL = (key: string) =>
    `https://webswift-live.s3.us-east-2.amazonaws.com/${key}`;

  public static CLIENT_ID = "demo-client";
  public static CLIENT_SECRET = "demo-secret";

  public static BASE_ENDPOINT = "https://api.shamagra.com/back-end/";

  // public static BASE_ENDPOINT = "http://localhost:3333/back-end/";
  // Comilla
  // public static BASE_ENDPOINT = "http://192.168.0.111:3333/back-end/";
  // Dhaka
  // public static BASE_ENDPOINT = "http://192.168.0.106:3333/back-end/";

  public static AUTH_ENDPOINT = "auth";
  public static UTILITIES = "utilities";
  public static DASHBOARD = "dashboard";
  public static USER_MANAGEMENT = "user-management";
  public static WEB_SETUP = "web-setup";
  public static WORKSPACE = "workspace";
  public static CLIENTS = "clients";
  public static MEDIA_FILES = "media-files";

  static STATUS = [
    { label: "Available", value: "active" },
    { label: "Unavailable", value: "inactive" },
  ];

  static GENDER = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "Others" },
  ];

  static BANNER_PAGES = [{ label: "Landing", value: "landing" }];

  static BANNER_POSITIONS = [
    { label: "Hero Slider", value: "Hero Slider" },
    { label: "Promotional Banner", value: "Promotional Banner" },
    { label: "Advertisement Banner", value: "Advertisement Banner" },
    { label: "Pre Footer Banner", value: "Pre Footer Banner" },
  ];

  static ACQUISITION_FIELD_TYPES = [
    { label: "Text", value: "text" },
    { label: "Email", value: "email" },
    { label: "Number", value: "number" },
    { label: "Enum", value: "enum" },
    { label: "Boolean", value: "boolean" },
    { label: "Dropdown", value: "dropdown" },
    { label: "Date", value: "date" },
    { label: "Datetime", value: "datetime" },
    { label: "Media", value: "media" },
    { label: "File", value: "file" },
  ];

  static ACQUISITIONS_LEAD_STATUS = Object.freeze({
    pending: "pending",
    approved: "approved",
    declined: "declined",
  });

  static WITHDRAWAL_STATUS = Object.freeze({
    generated: "generated",
    disbursed: "disbursed",
  });

  static ROLES = Object.freeze({
    SUPER_ADMIN: "SuperAdmin",
  });

  static ORDER_STATUS = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
    RETURNED: "returned",
  };

  static ORDER_WITH_SHIPPING_STATUS = [
    { label: "Pending", value: this.ORDER_STATUS.PENDING },
    { label: "Confirmed", value: this.ORDER_STATUS.CONFIRMED },
    { label: "Processing", value: this.ORDER_STATUS.PROCESSING },
    { label: "Shipped", value: this.ORDER_STATUS.SHIPPED },
    { label: "Delivered", value: this.ORDER_STATUS.DELIVERED },
    { label: "Cancelled", value: this.ORDER_STATUS.CANCELLED },
    { label: "Returned", value: this.ORDER_STATUS.RETURNED },
  ];
}
