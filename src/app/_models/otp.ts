export interface Otp {
    profile_id : String;
    user_id    : String;
    ip_address : String;
    lang       : String;
    mode       : Number; // 1 for email, 2 for mobile and 3 for both
}