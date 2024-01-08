export type User = {
  accessToken: string;
  auth: {
    app: string;
    heartbeatServiceProvider: string;
    appCheckServiceProvider: string;
    config: {};
    currentUser: string;
    // ...
  };
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    createdAt: string;
    lastLoginAt: string;
    lastSignInTime: string;
    creationTime: string;
  };
  phoneNumber: string | null;
  photoURL: string;
  proactiveRefresh: {
    user: string;
    isRunning: boolean;
    timerId: number | null;
    errorBackoff: number;
  };
  providerData: {};
  providerId: string;
  reloadListener: null | any;
  reloadUserInfo: {
    localId: string;
    email: string;
    displayName: string;
    photoUrl: string;
    emailVerified: boolean;
    // ...
  };
  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  tenantId: string | null;
  uid: string;
};

export type JSONResponse = {
  status: "success" | "fail";
  data?: any;
  error?: any;
};

export type NxFormInput = {
  label?: string;
  id: string;
  type?:
  | "input:text"
  | "input:password"
  | "input:email"
  | "input:number"
  | "textarea"
  | "select";
  options?: Array<string>;
  disabled?: boolean;
  show?: boolean;
  value?: string;
};

export type NxLink = {
  name: string;
  link?: string;
  disabled?: boolean;
  show?: boolean;
  hasBorder?: boolean;
  showChildren?: boolean;
  children?: NxLinks;
  bold?: boolean;
  group?: string;
};

export type NxLinks = Array<NxLink>;