export const EmailTemplate = ({ firstName, email, budget, select, description, topic }:any) => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="flex items-center justify-center flex-col gap-y-5">
      <h2>
        Topic: <span>{topic}</span>
      </h2>
      <h3>Name: {firstName}</h3>
      <h3>Email: {email}</h3>
      <h4>Budget: {budget}</h4>
      <br></br>
      <hr></hr>
      <br></br>
      <div>
        User interested in: <span>{select}</span>
      </div>
      <br></br>
      <hr></hr>
      <br></br>
      <div>
        Description: <span>{description}</span>
      </div>
      <br></br>
      <hr></hr>
      <br></br>
      Thanks...
    </div>
  </div>
);
