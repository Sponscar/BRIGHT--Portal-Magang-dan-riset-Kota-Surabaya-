export declare enum OtpType {
    REGISTER = "register",
    RESET_PASSWORD = "reset_password"
}
export declare class OtpToken {
    id: string;
    email: string;
    code: string;
    type: OtpType;
    expiresAt: Date;
    used: boolean;
    createdAt: Date;
}
