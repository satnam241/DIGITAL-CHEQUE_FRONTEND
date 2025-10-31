const IP = 'http://localhost:4000';

export const USER_AUTH = `${IP}/api/cheques`;
export const USER_PROP = `${IP}/api/dashboard`;
export const USER_DATA = `${IP}/api/wizard-form`;
export const USER_PAYMENT = `${IP}/api/payment`;
export const ADMIN = `${IP}/api/admin`;

export const ENDPOINTS = {
  // Login / Signup
  login: '/login',               // generic
  loginUser: '/login/user',      // User login
  loginAdmin: '/login/admin',    // Admin login
  signup: '/signup',             
  LOGOUT: '/logout',
  VERIFY: '/me',
  forgotPassword:'/forgot-password',
  RESET_PASSWORD_OTP:'/reset-password',
  UPDATE_PASSWORD:'/dashboard/resetpassword',

  // Cheque routes
  CHEQUE_PRINTING: '/cheque-printing',
  CREATE_CHEQUE: '/create',
  GET_CHEQUE: '/get-cheque',
  GET_CHEQUE_ID: '/get-cheque/:id',

  // Payment
  PAYMENT_CREATE: '/order',
  PAYMENT_VERIFY: '/verify',

  // Plans
  CREATE_PLAN: '/plan-create',
  GET_PLAN: '/plan',
  GET_PLAN_ID: '/plans/:id',
  DELETE_PLAN: '/plans/:id',
  SUBSCRIBE_PLAN: '/plans/subscribe',
  GST_VALIDATE: '/validate-gst',
  GST_ORDER_DETAIL: '/calculate-gst',

  // User dashboard
  USER_DASHBOARD: '/user',
  USER_DASHBOARD_RESETPASSWORD: '/dashboard/resetpassword',
  STEP2: '/step2',
  ORDER_DETAIL: '/order-details',
  REVIEW: '/review',
  FINAL: '/finalize',

  // Admin
  GET_USER: '/users',
  USER_UPDATE: '/user/:userId/toggle',
  GST_UPDATE: 'plan/:planId/gst',
  GST_TRANSACTION: '/transactions',
  REVANUE: '/earnings',
} as const;
