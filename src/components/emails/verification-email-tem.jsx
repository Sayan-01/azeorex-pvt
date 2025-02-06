export const EmailTemplate = ({ firstName, varifiedToken }) => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="flex items-center justify-center flex-col gap-y-5">
      <h1>Welcome, {firstName}!</h1>
      <div>Thank you for registering. Please use the following verification code to complete your registration:</div>
      <br></br>
      <hr></hr>
      <br></br>
      <div>
        Your varification code is :{" "}
        <b>
          <i>{varifiedToken}</i>
        </b>
      </div>
      <br></br>
      <hr></hr>
      <br></br>
      <div>If you did not request this code, please ignore this email.</div>
    </div>
  </div>
);

