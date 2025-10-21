interface ICredentials {
    username: string;
    password: string;
}

interface IUserData {
    title: string;
    credentials: ICredentials;
    message: string;
}
const validationMessages = {
    0: "Username is required",
    1: "Username should contain at least 3 characters",
    2: "Successfully registered! Please, click Back to return on login page",
    3: "Prefix and postfix spaces are not allowed is username",
    4: "Please, provide valid data",
    5: "Password must be less than or equal to 20 characters",
    6: "Password should contain at least one character in upper case",
    7: "Password is required",
    8: "Password should contain at least 8 characters",
    9: "Password should contain at least one character in lower case"
}

const invalidTestData: IUserData[] = [
    {
        credentials: { username: "", password: "ValidPass1" },
        message: validationMessages[0],
        title: "Register with empty username",
    },
    {
        credentials: { username: "ab", password: "ValidPass1" },
        message: validationMessages[1],
        title: "Register with a username of less than 3 characters",
    },
    {
        credentials: { username: "a".repeat(41), password: "ValidPass1" },
        message: validationMessages[2],
        title: "Register with a username of more than 40 characters",
    },
    {
        credentials: { username: " user", password: "ValidPass1" },
        message: validationMessages[3],
        title: "Register with a space at the beginning (username)",
    },
    {
        credentials: { username: "user ", password: "ValidPass1" },
        message: validationMessages[3],
        title: "Register with a space at the end (username)",
    },
    {
        credentials: { username: " user ", password: "ValidPass1" },
        message: validationMessages[3],
        title: "Register with spaces at the beginning and end (username)",
    },
    {
        credentials: { username: "  ", password: "ValidPass1" },
        message: validationMessages[3],
        title: "Register with only spaces (username)",
    },
    {
        credentials: { username: "validuser", password: " " },
        message: validationMessages[7],
        title: "Register with a space in the password",
    },
    {
        credentials: { username: "validuser", password: "Short1" },
        message: validationMessages[8],
        title: "Register with a short password",
    },
    {
        credentials: { username: "validuser", password: "A".repeat(19) + "a" },
        message: validationMessages[2],
        title: "Register with a long password",
    },
    {
        credentials: { username: "validuser", password: "lowercase1" },
        message: validationMessages[6],
        title: "Register with a lowercase password",
    },
    {
        credentials: { username: "validuser", password: "UPPERCASE1" },
        message: validationMessages[9],
        title: "Register with an uppercase password",
    },
    {
        credentials: { username: "validuser", password: "" },
        message: validationMessages[7],
        title: "Register with an empty password",
    },
    {
        credentials: { username: "va", password: "pa" },
        message: validationMessages[4],
        title: "Register with unvalid username and password",
    },
];

export default invalidTestData;