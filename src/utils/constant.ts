const IP ='http://localhost:4000';

export const USER_AUTH = `${IP}/api/cheques`;
export const USER_PROP = `${IP}/api/dashboard`;
export const USER_DATA = `${IP}/api/wizard-form`;

export const ENDPOINTS = {
  login: '/login',                                   //
  signup: '/signup',                                //
  LOGOUT: '/logout',
  VERIFY: '/me',
  CHEQUE_PRINTING: '/cheque-printing',               //
  CREATE_CHEQUE: '/create',
  GET_CHEQUE:'/get-cheque',
  GET_CHEQUE_ID:"/get-cheque/:id",
  PAYMENT_CREATE:'/order',
  PAYMENT_VERIFY:'/verify',
  CREATE_PLAN:'/plan-create',
  GET_PLAN:'/plan',                                    //
  GET_PLAN_ID:'/plans/:id',
  DELETE_PLAN:'/plans/:id',
  SUBSCRIBE_PLAN:'/plans/subscribe',
  GST_VALIDATE: '/validate-gst',
  GST_ORDER_DETAIL: '/calculate-gst',
  USER_DASHBOARD:'/user',                                //
  USER_DASHBOARD_RESETPASSWORD:'/dashboard/resetpassword',//
  STEP2 :'/step2',
  ORDER_DETAIL:'/order-details',
  REVIEW:'/review',
  FINAL:'/finalize'

} as const;